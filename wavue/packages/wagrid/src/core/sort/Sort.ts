import {WaGridCore} from "@/core/WaGridCore"
//import {CellType, OptionAlias, SortColumnDef} from "@/core/WaGrid.types"
import { WaColumnProperty } from "@/core/columns/ColumnEnum"
import { SortColumnDef } from "./SortColumnDef";
import { SORT_KEYS } from "./SortColumnEnum";
export class WaSort {
    grid: WaGridCore;
    selector: string;

    sortColumns: SortColumnDef[];
    options: any;

    constructor(grid: WaGridCore) {
        this.grid       = grid;
        this.selector   = `#${grid.gridId}`;

        this.sortColumns = [];
        this.options = {}
    }
    orderBy() {
        const grid = this.grid;
        grid.view_table.orderBy(grid.column_table, grid.sort_column_table);
    }

    getSortRow(columnName: string) { return this.grid.sort_column_table.selectRow(WaColumnProperty.name, columnName); }

    changeSortButtonOrder(name: string, text: string, order: string, targetIndex: number) {
        const selector: string = this.selector;
        const grid: WaGridCore = this.grid;

        /* targetIndex <> name Index */
        let sourceIndex: number = null;
        for (let i = 0, len = grid.sort_column_table.count(); i < len; i++) {
            const sortColumn = grid.sort_column_table.data[i];
            if (name == sortColumn.name && i == targetIndex) return;
            else if (name == sortColumn.name) { sourceIndex = i;  break; }
        }

        /* new sort data */
        const sortColumn: SortColumnDef = {};
        sortColumn.name  = name;
        sortColumn.order = grid.sort_column_table.selectValue(sourceIndex, SORT_KEYS.order);

        /* update source column */
        grid.sort_column_table.updateByRowIndex(sourceIndex, WaColumnProperty.name, '_temp_sort');

        /* create sort data */
        if (grid.null(targetIndex)) grid.sort_column_table.insert(sortColumn);
        else grid.sort_column_table.insertBefore(sortColumn, targetIndex);

        /* remove source */
        sourceIndex = grid.sort_column_table.selectRowIndex(WaColumnProperty.name, '_temp_sort');
        grid.sort_column_table.remove(sourceIndex);

        const button = grid.classSort.createSortButton(name);
        const bar = document.querySelector(`${selector} .wa-grid-panel90 .wa-grid-panel-bar`);
        if (grid.notNull(targetIndex)) bar.insertBefore(button, bar.childNodes[targetIndex]);
        else bar.append(button);

        grid.classSort.getSortButtonList();

        grid.classSort.toggleSortPlaceHolder();
        grid.classSort.orderBy();
    }

    addSortButton(name, text, order, targetIndex) {
        let selector = this.selector;
        const grid = this.grid;

        // add sortColumn in grid.sort_data
        // already existing column
        let dataRows = grid.sort_column_table.selectRows(WaColumnProperty.name, name, 1);
        if (dataRows.length > 0) return;

        let dataRow = {};
        dataRow[WaColumnProperty.name]  = name;
        dataRow[WaColumnProperty.order] = order;

        /* create sort data */
        //console.log(name);
        if (grid.null(targetIndex)) grid.sort_column_table.insert(dataRow);
        else grid.sort_column_table.insertBefore(dataRow, targetIndex);

        // add button in group panel
        let button = grid.classSort.createSortButton(name);
        let bar = document.querySelector(selector + ' .wa-grid-panel90 .wa-grid-panel-bar');
        if (grid.notNull(targetIndex)) bar.insertBefore(button, bar.childNodes[targetIndex]);
        else bar.append(button);

        grid.classSort.toggleSortPlaceHolder();
        grid.classSort.orderBy();
    }

    removeSortButton(element) {
        let selector = this.selector;
        const grid = this.grid;

        // remove sortColumn in grid.sort_column_table.data
        let name = element.dataset.name;
        //console.log('name :' + name);

        let rowIndex = grid.sort_column_table.selectRowIndex(WaColumnProperty.name, name);

        //console.log('rowIndex :' + rowIndex);

        grid.sort_column_table.remove(rowIndex);

        // remove button in group panel
        let button = element.parentNode;
        button.remove();

        grid.classSort.toggleSortPlaceHolder();

        if (grid.group_column_table.count() > 0) {
            grid.setData(grid.view_table.data, null, false);
        }
        else {
            if (grid.isSortableColumn()) {
                grid.classSort.orderBy();
                grid.classRange.removeRange(0, -1);
                grid.waPanel30.setDataPanel(0);
            }
        }
    }

    removeSortButtonList() {
        let selector = this.selector;
        const grid = this.grid;

        let buttons = document.querySelectorAll(selector + ' .wa-grid-panel90 .wa-grid-panel-bar .wa-grid-panel-button');
        for (let i = buttons.length - 1; i >= 0; i--) buttons[i].remove();
    }

    getSortButtonList() {
        let selector = this.selector;
        const grid = this.grid;

        grid.classSort.removeSortButtonList();

        let bar = document.querySelector(selector + ' .wa-grid-panel90 .wa-grid-panel-bar');

        for (let i = 0, len = grid.sort_column_table.count(); i < len; i++) {
            let dataRow = grid.sort_column_table.data[i];
            let columnName = dataRow[WaColumnProperty.name];
            let button = grid.classSort.createSortButton(columnName);
            let bar = document.querySelector(selector + ' .wa-grid-panel90 .wa-grid-panel-bar');
            if (grid.null(bar)) return;
            bar.append(button);
        }
        grid.classSort.toggleSortPlaceHolder();
    }

    createSortButton(columnName) {
        let selector = this.selector;
        const grid = this.grid;

        let column = grid.getColumn(columnName);
        let sortColumn = grid.classSort.getSortRow(columnName);

        let order = sortColumn[WaColumnProperty.order];
        let orderChar = '';
        if (order == 'asc') orderChar = '▲';
        else if (order == 'desc') orderChar = '▼';
        else orderChar = '';

        const text= document.createElement('span');
        text.classList.add('wa-grid-panel-button-text');
        text.textContent  = column.header[WaColumnProperty.text] + orderChar;
        text.dataset.name = columnName;

        const icon= document.createElement('span');
        icon.classList.add('wa-grid-html-icon-remove');
        icon.dataset.name = columnName;

        let button = document.createElement('div');
        button.classList.add('wa-grid-panel-button');
        button.dataset.name = columnName;

        button.append(text);
        button.append(icon);

        return button;
    }

    toggleSortPlaceHolder() {
        let selector = this.selector;
        const grid = this.grid;

        const buttons = document.querySelectorAll(selector + ' .wa-grid-panel90 .wa-grid-panel-bar .wa-grid-panel-button');
        const span: any = document.querySelector(selector + ' .wa-grid-panel90 .wa-grid-panel-bar-span');
        if (buttons.length > 0) span.style.display = 'none';
        else span.style.display = '';

        grid.classControl.after_setColumnVisible();
    }

    showSortPanel() {
        let selector = this.selector;
        const grid = this.grid;

        grid.setOption('showSortPanel', true);

        let panel = document.querySelector(selector + ' .wa-grid-panel90');
        panel.classList.remove('wa-grid-hide');
        panel.classList.add('wa-grid-show');
        grid.classScroll.setPanelSize();
        //grid.classSort.initSortData();
        //grid.classControl.after_showSortrPanel();
        grid.classSort.getSortButtonList();
        grid.apply();
    }

    hideSortPanel() {
        let selector = this.selector;
        const grid = this.grid;

        grid.sort_column_table.remove();
        grid.setOption('showSortPanel', false);

        let panel = document.querySelector(selector + ' .wa-grid-panel90');
        panel.classList.remove('wa-grid-show');
        panel.classList.add('wa-grid-hide');
        grid.classScroll.setPanelSize();
        grid.apply();
        //grid.classSort.initSortData();
        //grid.classControl.after_hideSortPanel();
    }

    initSortData() {
        let selector = this.selector;
        const grid = this.grid;

        grid.sort_column_table.remove();
        grid.classSort.getSortButtonList();

        grid.view_table.remove();
        grid.source_table.data.map(dataRow => grid.view_table.insert(grid.copyJson(dataRow)));

        if (grid.options.showFilterPanel) {
            grid.classFilter.filters();
            grid.apply();
        }
        if (grid.group_column_table.count() > 0) {
            grid.setData(grid.view_table.data, null, false);
        }
        else {
            grid.classRange.removeRange(0, -1);
            grid.apply();
        }
    }


}

