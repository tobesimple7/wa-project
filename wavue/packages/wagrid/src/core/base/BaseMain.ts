import {AddRowDirection, CellType, GridMode, OptionAlias} from "@/core/Grid.types"
import {WaColumnProperty} from "@/core/columns/ColumnEnum"
import {WaGridCore} from "@/core/WaGridCore";
import {WaDom} from "../Dom";
import {WaGridExcel} from "@/core/export/GridExcel";

export class WaBaseMain {

    constructor() {
    }

    getRenderer(this: WaGridCore, columnName: string, property: string) {
        let result = null;
        if (arguments.length == 2) {
            if (this.renderer && this.renderer[columnName] && this.renderer[columnName][property])
                result = this.renderer[columnName][property];
        }
        else if (arguments.length == 1) {
            if (this.renderer && this.renderer[columnName]) result = this.renderer[columnName];
        }
        else {
            if (this.renderer) result = this.renderer;
        }
        return result;
    }

    setRenderer(this: WaGridCore, renderer: any) {
        this.renderer = renderer;
    }

    getInfoRenderer(this: WaGridCore, columnName: string, property: string) {
        let result = null;
        const renderer = this.infoRenderer;
        if (arguments.length == 2) {
            if (renderer && renderer[columnName] && renderer[columnName][property])
                result = renderer[columnName][property];
        }
        else if (arguments.length == 1) {
            if (renderer && renderer[columnName]) result = renderer[columnName];
        }
        else {
            if (renderer) result = renderer;
        }
        return result;
    }

    setInfoRenderer(this: WaGridCore, renderer: any) { this.infoRenderer = renderer; }

    /**
     * Display grid
     */

    apply(this: WaGridCore) {
        let selector = `#${this.gridId}`;
        const grid = this;

        let topRowIndex = grid.getFirstRowIndex();
        grid.waPanel20.setDataPanel(topRowIndex);
        grid.waPanel30.setDataPanel(topRowIndex);
        grid.waPanel40.setDataPanel();
        grid.waPanel50.setDataPanel();
    }

    /**
     * Main Functions
     */

    createHtml(this: WaGridCore) {
        let selector = '#' + this.gridId;
        const grid = this;

        let elementRoot = document.querySelector(selector);
        elementRoot.insertAdjacentHTML('beforeend', '<div class="wa-grid" tabindex="1" style=""></div>');

        let elementGrid = elementRoot.querySelector('.wa-grid');
        grid.waPanel10.createHtml(elementGrid);
        grid.waPanel80.createHtml(elementGrid);
        grid.waPanel90.createHtml(elementGrid);

        elementGrid.insertAdjacentHTML('beforeend', '<div class="wa-grid-main"><div class="wa-grid-wrap" /></div>');
        let elementMain = document.querySelector(`${selector} .wa-grid-main`);
        let elementWrap = document.querySelector(`${selector} .wa-grid-wrap`);

        grid.waPanel20.createHtml(elementWrap);
        grid.waPanel70.createHtml(elementWrap);
        grid.waPanel40.createHtml(elementWrap);
        grid.waPanel30.createHtml(elementWrap);
        grid.waPanel50.createHtml(elementWrap);
        grid.waPanel99.createHtml(elementGrid);

        grid.waPanelBase.createEtcHtml(elementMain);
        elementRoot.insertAdjacentHTML('beforeend', '<div class="wa-grid-layer" style="left:70000px;display: none;"></div>');
        this.topLineDiv    = document.querySelector(`${selector} .wa-grid-top-line`);
        this.bottomLineDiv = document.querySelector(`${selector} .wa-grid-bottom-line`);
        this.leftLineDiv   = document.querySelector(`${selector} .wa-grid-left-line`);
        this.rightLineDiv  = document.querySelector(`${selector} .wa-grid-right-line`);
    }

    setGrid(this: WaGridCore, columns: any[], options: any = {}) {
        const grid = this;

        grid.createOption(options);

        grid.columns = grid.copyJson(columns);

        grid.classColumn.createColumns(grid.columns); // add columns(first) or add column

        grid.classColumn.createColumnTable();

        grid.classHeader.createHeaderColumns();

        grid.classHeader.createHeaderColumnTable();

        grid.createGrid();

        grid.waPanel70.setDataPanel();
    }

    createGrid(this: WaGridCore) {
        const grid = this;

        this.createHtml();
        this.waPanel10.createTable();
        this.waPanel80.createTable();
        this.waPanel90.createTable();

        this.waPanel20.createTable();
        this.waPanel70.createTable();
        this.waPanel40.createTable();
        this.waPanel50.createTable();

        this.classScroll.setPanelSize();
        this.waPanel30.createTable();

        this.horizontalScroll.setScroll(grid.code_horizontal);
        this.tbs_addEventAll();
    }

    updateGrid(this: WaGridCore) {
        const grid = this;

        this.waPanel20.createTable();
        this.waPanel70.createTable();
        this.waPanel40.createTable();
        this.waPanel50.createTable();

        this.classScroll.setPanelSize();
        this.waPanel30.createTable();

        this.horizontalScroll.setScroll(grid.code_horizontal);;
        //this.tbs_addEventAll();
    }

    getTextWidth(this: WaGridCore, canvas, text, fontSize, fontFamily) {
        let selector = '#' + this.gridId;
        const grid = this;

        let context = canvas.getContext("2d");
        context.fontSize = fontSize;
        context.fontFamily = fontFamily;
        let metrics = context.measureText(text);
        return metrics.width;
    };

    getTextWidth2(this: WaGridCore, context, text) {
        let selector = '#' + this.gridId;
        const grid = this;

        let metrics = context.measureText(text);
        return metrics.width;
    };

    setColumnAutoWidth(this: WaGridCore){
        let selector = '#' + this.gridId;
        const grid = this;

        let canvas = document.querySelector(selector + ' .wa-grid-canvas').childNodes[0];
        let arr = [];
        for (let x = 0, len = grid.column_table.count(); x < len; x++) arr[x] = 0;

        let fontSize = grid.getConfigFont('fontSize');
        let fontFamilty = grid.getConfigFont('fontFamily');

        for (let i = 0, len = grid.header_column_table.data.length; i < len; i++){
            for (let x = 0, len2 = grid.column_table.count(); x < len2; x++){
                if (grid.header_column_table.data[i][x][WaColumnProperty.kind] == 'column') {
                    let width = parseInt(grid.getTextWidth(canvas, grid.header_column_table.data[i][x][WaColumnProperty.text], fontSize, fontFamilty));
                    if (width >= arr[x]) {
                        arr[x] = width;
                    }
                }
            }
        }
        for (let i = 0, len = grid.view_table.count(); i < len; i++){
            for (let x = 0, len2 = grid.column_table.count(); x < len2; x++){
                let columnName = grid.getColumnName(x);
                let column = grid.getColumn(columnName);
                let val = grid.getValueByColumnIndex(i, x);
                let width = parseInt(grid.getTextWidth(canvas, grid.getFormatText(column, val), fontSize, fontFamilty));

                if (width >= arr[x]) arr[x] = width;
            }
        }
        for (let x = 0, len = grid.column_table.count(); x < len; x++) arr[x] += 20;
        grid.classScroll.setAllColumnWidth(arr);
        grid.waPanel20.setDataPanel();
    }

    setRowHeight(this: WaGridCore, type, rowHeight) {
        let selector = '#' + this.gridId;
        const grid = this;

        if (type == undefined) {
            this.setRowHeight('header' , rowHeight);
            this.setRowHeight('content', rowHeight);
            this.setRowHeight('top'    , rowHeight);
            this.setRowHeight('footer' , rowHeight);
        }
        else {
            if (type == 'header') {
                this.headerRowHeight = rowHeight;
                this.classScroll.setPanelSize();
                this.horizontalScroll.setScroll(grid.code_horizontal);;
                this.verticalScroll.setScroll(grid.code_vertical);
                this.waPanel30.setDataPanel(0);
            }
            if (type == 'content') {
                this.rowHeight = rowHeight;
                (document.querySelector(selector + ' .wa-grid-input') as any).style.height = rowHeight + 'px';
                this.classScroll.setPanelSize();
                this.horizontalScroll.setScroll(grid.code_horizontal);;
                this.verticalScroll.setScroll(grid.code_vertical);
                this.waPanel30.setDataPanel(0);
            }
            if (type == 'top') {
                this.topRowHeight = rowHeight;
                this.classScroll.setPanelSize();
                this.horizontalScroll.setScroll(grid.code_horizontal);;
                this.verticalScroll.setScroll(grid.code_vertical);
                this.waPanel30.setDataPanel(0);
            }
            if (type == 'footer') {
                this.footerRowHeight = rowHeight;
                this.classScroll.setPanelSize();
                this.horizontalScroll.setScroll(grid.code_horizontal);;
                this.verticalScroll.setScroll(grid.code_vertical);
                this.waPanel30.setDataPanel(0);
            }

        }
    }

    // setGridModePage(this: WaGridCore) {
    //     let selector = `#${this.gridId}`;
    //     const grid = this;
    //
    //     let page: any = document.querySelector(`${selector} .wa-grid-panel10-page`);
    //     page.style.display = '';
    //
    //     grid.classPage.pageRowCount = grid.options.pageRowCount;
    // }
    //
    // setGridModePagination(this: WaGridCore) {
    //     let selector = `#${this.gridId}`;
    //     const grid = this;
    //
    //     const page: any = document.querySelector(`${selector} .wa-grid-panel10-page`);
    //     page.style.display = '';
    // }

    setData(this: WaGridCore, data: any[], openDepth: number = 0, isFirst: boolean = true) {
        const grid = this;

        if (grid.group_column_table.count() > 0) grid.classGroup.setGroupData(data, openDepth, isFirst);
        else if (grid.grid_mode == GridMode.tree) grid.classTree.setTreeData(data, openDepth, isFirst);
        else if (grid.grid_mode == GridMode.page) grid.classPage.setPageData(data, isFirst);
        else if (grid.grid_mode == GridMode.pagination) grid.classPagination.setPaginationData(data);
        else grid.setGridData(data, isFirst);
    }

    setGridMode(this: WaGridCore, gridMode: GridMode) {
        const grid = this;

        grid.grid_mode = grid.trim(gridMode);

        if (grid.grid_mode == GridMode.page) {
            grid.waPanel99.showPagePanel();
        }
        else if (grid.grid_mode == GridMode.pagination) {
            grid.waPanel99.showPagePanel();
        }
    }

    setGridData(this: WaGridCore, data: any[], isFirst: boolean) {
        let selector = `#${this.gridId}`;
        const grid = this;

        if (data == undefined) return;

        // this.data_insert = [];
        // this.data_update = [];
        // this.data_delete = [];
        if (isFirst) {
            this.source_table.remove();
            this.view_table.remove();
            this.data_select_panel30 = [];
            this.data_select_panel31 = [];
        }

        for (let i = 0, len = data.length; i < len; i++) {
            const dataRow = data[i];

            const source = {};
            const columns: any[] = grid.column_table.selectRows();
            for (let x = 0, len = columns.length; x < len; x++) {
                const column = columns[x];
                let columnName  = column[WaColumnProperty.name];
                source[columnName] = this.null(dataRow[columnName]) ? null : this.getFormatValue(column, dataRow[columnName]);
            }

            // const dataColumns: any[] = grid.field_table.selectRows();
            // for (let x = 0, len = dataColumns.length; x < len; x++) {
            //     const column = dataColumns[x];
            //     let columnName  = column[WaColumnProperty.name];
            //     source[columnName] = dataRow[columnName];
            // }

            this.source_table.insert(source);
            this.view_table.insert(grid.copyJson(source));
        }

        /* create top_data */
        grid.classTop.setTopData();

        /* create footer_data */
        grid.classFooter.setFooterData();

        //if (this.isAutoWidthColumn()) this.setColumnAutoWidth();

        (document.querySelector(selector + ' .wa-grid-panel10-filter-input') as any).value = '';
        this.classRange.removeRange(0, -1);
        let _topRowIndex = this.classRange.selectRange(0, 0, 0, 0);

        if (data.length == 0) {
            document.querySelector(selector + ' .wa-grid-panel21 td div').textContent = '0';
            grid.waPanel30.setDataPanel(0);
            grid.verticalScroll.setScroll(grid.code_vertical);
        }
        else {
            document.querySelector(`${selector} .wa-grid-panel21 td div`).textContent = String(data.length);
            grid.waPanel30.setDataPanel(0);
            grid.verticalScroll.setScroll(grid.code_vertical);
            grid.waPanel40.setDataPanel();
            grid.waPanel50.setDataPanel();
        }
    }

    refreshRefData(this: WaGridCore) {
        // Data Init
        let selector = '#' + this.gridId;
        const grid = this;

        let data = this.view_table.data;
        this.data_select_panel30 = [];  // select color : value 0, 1
        this.data_select_panel31 = [];	// view - filter

        for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
            let itemSelect = {};
            let itemLeftSelect = {};
            let itemLeftView = {};

            itemSelect[WaColumnProperty.rowId] = data[rowIndex][WaColumnProperty.rowId];
            itemSelect = new Uint8ClampedArray([]); //new

            itemLeftView[WaColumnProperty.rowMode] = ''; //insert, update, delete
            itemLeftView[WaColumnProperty.rowId] = data[rowIndex][WaColumnProperty.rowId];

            itemLeftSelect[WaColumnProperty.rowMode] = 0; //insert, update, delete
            itemLeftSelect[WaColumnProperty.rowId] = data[rowIndex][WaColumnProperty.rowId];

            this.data_select_panel30.push(itemSelect);
            this.data_select_panel31.push(itemLeftSelect);
        }
        this.classRange.removeRange(0, -1);
        this.waPanel30.setDataPanel(0);
    }

    /**
     * Range Functiopns
     */

    setRange(this: WaGridCore, rowIndex1: number, toRowIndex2: number, columnIndex1: number, columnIndex2: number): void {
        let _topRowIndex = this.classRange.selectRange(rowIndex1, toRowIndex2, columnIndex1, columnIndex2);
        this.waPanel30.setDataPanel(_topRowIndex);
    }

    selectRange(this: WaGridCore, rowIndex1: number, toRowIndex2: number, columnIndex1: number, columnIndex2: number): void {
        if (this.view_table.count() == 0 || this.column_table.count() == 0) return;
        let _topRowIndex = this.classRange.selectRange(rowIndex1, toRowIndex2, columnIndex1, columnIndex2);
        this.waPanel30.setDataPanel(_topRowIndex);
    }

    /**
     * Dom Lib
     */

    addUserClass(this: WaGridCore, element: any, className: string): void { WaDom.addUserClass(element, className); }

    removeUserClass(this: WaGridCore, element: any): void { WaDom.removeUserClass(element); }

    /**
     * Export Excel
     */

    exportExcel(this: WaGridCore, options: any) {
        const excel = new WaGridExcel(this);
        excel.exportExcel(options);
    }

    /**
     * Pagination
     */
    setTotalRowCount(this: WaGridCore, totalRowCount: number) {
        this.classPagination.setTotalRowCount(totalRowCount);
    }
}