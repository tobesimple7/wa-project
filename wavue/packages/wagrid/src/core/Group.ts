import {WaGridCore} from "@/core/WaGridCore"
import {GridMode, OptionAlias} from "@/core/Grid.types"
import {WaColumnProperty} from "@/core/columns/ColumnEnum"
export class WaGridGroup {
    grid: WaGridCore;
    selector: string;
    openDepth: number;
    splitChar: string;

    constructor(grid) {
        this.grid       = grid;
        this.selector   = '#' + grid.gridId;
        this.openDepth = null;
        this.splitChar = '__$__'
    }

    setGroupData(data, openDepth = 1, isFirst = true) {
        let selector = this.selector;
        const grid = this.grid;

        if (isFirst) { if (grid.null(data) || data.length == 0) return; }

        /**
         * set openDepth
         */

        openDepth = grid.isNull(openDepth, grid.group_column_table.count() + 1);

        if (openDepth == 0) openDepth = grid.group_column_table.count() + 1;
        else if (openDepth > grid.group_column_table.count() + 1) openDepth = grid.group_column_table.count() + 1;

        this.openDepth = openDepth;

        // create source_data, view_table.data
        if (isFirst) {
            grid.source_table.remove();

            for (let i = 0, len = data.length; i < len; i++) {
                const dataRow = data[i];

                const item = {};
                for (let x = 0, len = grid.column_table.count(); x < len; x++) {
                    const column = grid.column_table.data[x];
                    let columnName = column[WaColumnProperty.name];
                    let val = grid.null(dataRow[columnName]) ? null : dataRow[columnName];
                    item[columnName] = val;
                }

                // const dataColumns: any[] = grid.field_table.selectRows();
                // for (let x = 0, len = dataColumns.length; x < len; x++) {
                //     const column = dataColumns[x];
                //     let columnName  = column[WaColumnProperty.name];
                //     item[columnName] = dataRow[columnName];
                // }

                grid.source_table.insert(item);
            }
        }

        grid.group_header_table.remove();
        grid.group_table.remove();
        grid.view_table.remove();


        grid.source_table.data.map(dataRow => grid.view_table.insert(grid.copyJson(dataRow)));

        /* Filter */
        grid.classFilter.filters();

        /* Add Group Column */
        grid.sort_column_table.data.map(dataRow => grid.temp_table.insert(grid.copyJson(dataRow)));
        grid.sort_column_table.remove();

        grid.group_column_table.data.map(dataRow => {
            let columnName = dataRow[WaColumnProperty.name];
            //let groupOrder = grid.isNull(dataRow[WaColumnProperty.order], '');

            const row = grid.temp_table.selectRow(WaColumnProperty.name, columnName);
            if (row) {
                let order = row[WaColumnProperty.order];
                if (order == '') order = 'asc';

                row[WaColumnProperty.order] = order;
                grid.sort_column_table.insert(row);
                // grid.group_column_table.update(columnName, WaColumnProperty.order, order);
            }
            else {
                const item = {};
                item[WaColumnProperty.name] = columnName;
                item[WaColumnProperty.order] = 'asc';
                grid.sort_column_table.insert(item);
                // grid.group_column_table.update(columnName, WaColumnProperty.order, 'asc');
            }
            let rowIndex = grid.temp_table.selectRowIndex(WaColumnProperty.name, columnName);
            if (grid.notNull(rowIndex)) grid.temp_table.remove(rowIndex);
        });

        grid.temp_table.data.map(dataRow => grid.sort_column_table.insert(grid.copyJson(dataRow)));
        grid.temp_table.remove();

        /* Sorting */
        grid.classSort.orderBy();

        /* create group data */
        grid.classGroup.createGroupData();

        /* insert into view_table from group_table */
        grid.view_table.remove();
        for (let i = 0, len = grid.group_table.count(); i < len; i++) {
            let dataRow = grid.group_table.data[i];

            dataRow[WaColumnProperty.rowMode]   = ''; // S, U, I, D, blank
            dataRow[WaColumnProperty.isOpen] = false;

            for (let x = 0, len = grid.column_table.count(); x < len; x++) {
                let column = grid.column_table.data[x];
                let columnName = column[WaColumnProperty.name];
                let val = grid.null(dataRow[columnName]) ? null : dataRow[columnName];

                dataRow[columnName] = val;
            }
            grid.view_table.insert(grid.copyJson(dataRow));
        }
        grid.group_table.remove();

        /* Summary */
        grid.classGroup.getGroupSummary();

        // open depth
        grid.view_table.data.map(row => {
            let depth = row[WaColumnProperty.depth];

            row[WaColumnProperty.isOpen] = (depth < openDepth) ? true : false;
            row[WaColumnProperty.childRows] = [];
        })

        if (openDepth <= grid.group_column_table.count()) {
            for (let i = grid.view_table.count() - 1; i >= 0; i--) {
                const rootRow = grid.view_table.selectRowByRowIndex(i);
                let rootDepth = rootRow[WaColumnProperty.depth];

                if (rootDepth == openDepth && rootDepth <= grid.group_column_table.count()) {
                    this.closeGroupRow(i);
                }
            }
        }

        (document.querySelector(selector + ' .wa-grid-panel10-filter-input') as any).value = '';
        if (grid.view_table.count() == 0) {
            document.querySelector(selector + ' .wa-grid-panel21 td div').textContent = '0';
            grid.verticalScroll.setScroll(grid.code_vertical);
            grid.waPanel30.setDataPanel(0);
        }
        else {
            // @ts-ignore
            document.querySelector(selector + ' .wa-grid-panel21 td div').textContent = toString(grid.view_table.count());

            grid.verticalScroll.setScroll(grid.code_vertical);
            grid.waPanel30.setDataPanel(0);
            grid.waPanel40.setDataPanel();
            grid.waPanel50.setDataPanel();
        }
        if (grid.options[WaColumnProperty.autoWidth] == true)  grid.setColumnAutoWidth();

        grid.classGroup.getGroupButtonList();
        grid.classScroll.setPanelSize();

        grid.classRange.removeRange(0, -1);
        let _topRowIndex = grid.classRange.selectRange(0, 0, 0, 0);
        grid.waPanel30.setDataPanel(_topRowIndex);
    }

    createGroupData(){
        const grid = this.grid;

        // create group data
        const groupData = grid.classGroup.createGroupKeyData(grid.view_table.data);
        groupData.map(row => {
            grid.source_table.currentRowId += 1;
            row[WaColumnProperty.rowId] = grid.source_table.currentRowId;
            grid.group_header_table.insert(grid.copyJson(row));
        });

        // insert group table  select * from view_table, group_header_table
        for (let i = 0, len = grid.group_header_table.count(); i < len; i++) {
            const rootRow = grid.group_header_table.selectRowByRowIndex(i);
            const children = [];
            const item = {}
            let rootDepth = rootRow[WaColumnProperty.depth];
            let rootString = this.getGroupKeyByDepth(rootRow, rootDepth);

            // get children group
            let isChild = false;
            for (let x = 0, len2 = grid.group_header_table.count(); x < len2; x++) {
                const row = grid.group_header_table.selectRowByRowIndex(x);
                let depth = row[WaColumnProperty.depth];
                let childString = this.getGroupKeyByDepth(row, rootDepth);
                if (rootDepth + 1 == depth && rootString == childString) {
                    isChild = true;
                    children.push(row[WaColumnProperty.rowId]);
                }
                else {
                    if (isChild) break;
                }
            }

            // insert group_header_table
            rootRow[WaColumnProperty.childRowIds] = children;
            rootRow[WaColumnProperty.isOpen] = false;
            grid.group_table.insert(rootRow);

            // insert view_table
            const arr = []
            isChild = false;
            if (rootDepth == grid.group_column_table.count()) {
                for (let x = 0, len2 = grid.view_table.count(); x < len2; x++) {
                    const row = grid.view_table.selectRowByRowIndex(x);
                    let depth = grid.group_column_table.count() + 1;
                    let childString = this.getGroupKeyByDepth(row, rootDepth);
                    if (rootString == childString) {
                        isChild = true;
                        children.push(row[WaColumnProperty.rowId]);
                        arr.push(x);
                        row[WaColumnProperty.isOpen] = false;
                        row[WaColumnProperty.depth] = grid.group_column_table.count() + 1;
                        grid.group_table.insert(grid.copyJson(row));
                    }
                    else {
                        if (isChild) break;
                    }
                }
                rootRow[WaColumnProperty.childRowIds] = children;
                //delete row
                if (arr.length > 0) {
                    let startRowIndex = arr[0]
                    let lastRowIndex = arr[arr.length - 1];
                    for (let x = lastRowIndex; x >= startRowIndex; x--) {
                        if (arr.indexOf(x) != -1) grid.view_table.remove(x);
                    }
                }
            }
        }
    }

    createGroupKeyData(dataRows, depth = 1){
        const grid = this.grid;
        const resultRows = [];
        const result = [];

        for (let i = depth, len = grid.group_column_table.count() + 1; i < len; i++) {
            let rows = dataRows.reduce((acc, row) => {
                let key = grid.classGroup.getGroupKeyByDepth(row, i);
                let tempRow = grid.classGroup.getGroupKeyRowByDepth(row, i);
                if (acc.hasOwnProperty(key) == false) acc[key] = tempRow;
                return acc;
            }, {});
            rows = Object.values(rows);
            rows.map(row => resultRows.push(row));
        }

        const addRow = function (dataRow) {
            let rootDepth = dataRow[WaColumnProperty.depth];
            let rootStr = grid.classGroup.getGroupKeyByDepth(dataRow, rootDepth);

            result.push(dataRow);

            for (let i = depth, len = resultRows.length; i < len; i++) {
                const row = resultRows[i];
                let depth = row[WaColumnProperty.depth];
                let str = grid.classGroup.getGroupKeyByDepth(row, rootDepth);
                if (rootDepth + 1 == depth && rootStr == str) {
                    addRow(row);
                }
            }
        }

        for (let i = 0, len = resultRows.length; i < len; i++) {
            let depth = resultRows[i][WaColumnProperty.depth];
            if (depth == 1) addRow(resultRows[i]);
        }
        return result;
    }

    getGroupKeyByDepth(row, depth) {
        const grid = this.grid;
        let key = '';
        for (let i = 0; i < depth; i++) {
            let groupColumn = grid.group_column_table.data[i];
            let name = groupColumn[WaColumnProperty.name];
            key += this.splitChar + grid.isNull(row[name], '');
        }
        return key;
    }

    getGroupKeyRowByDepth(row, depth) {
        const grid = this.grid;

        let tempRow = {};
        for (let i = 0; i < depth; i++) {
            let groupColumn = grid.group_column_table.data[i];
            let name = groupColumn[WaColumnProperty.name];
            tempRow[name] = row[name];
            tempRow[WaColumnProperty.depth] = depth;
        }
        return tempRow;
    }

    /**
     * Group Sum, Avg
     */
    getGroupDepthSummary(rowIndex) {
        // 최 하위 depth
        const grid = this.grid;

        const rootRow = grid.view_table.selectRowByRowIndex(rowIndex)
        const rootDepth = rootRow[WaColumnProperty.depth];

        // if (rootDepth <= grid.group_column_table.count()) return;

        const resultRows = [];
        for (let i = rowIndex + 1, len = grid.view_table.count(); i < len; i++) {
            const row = grid.view_table.data[i];

            if (grid.null(row)) break;

            let depth = row[WaColumnProperty.depth];
            if (rootDepth + 1 == depth) resultRows.push(row);
            else if (rootDepth == depth) break;
        }

        for (let i = 0, len = grid.column_table.count(); i < len; i++) {
            const column = grid.column_table.data[i];
            let columnName = column[WaColumnProperty.name];

            if (grid.null(column[WaColumnProperty.summaryType])) continue;

            let summaryType = column[WaColumnProperty.summaryType];

            const arrayItem = [];
            resultRows.map(row => {
                let item = grid.isNull(row[columnName], 0);
                item = item == '' ? 0  : item;
                arrayItem.push(Number(item));
            });

            let result;
            if (summaryType == 'sum') {
                result = arrayItem.reduce((a, b) => a + b, 0);
            }
            else if (summaryType == 'avg') {
                result = arrayItem.reduce((a, b) => a + b, 0);
            }
            else if (summaryType == 'max') {
                result = Math.max.apply(null, arrayItem);
            }
            else if (summaryType == 'min') {
                result = Math.min.apply(null, arrayItem);
            }
            rootRow[columnName] = result;
        }

        let childCount = 0;
        if (rootDepth < grid.group_column_table.count()) {
            resultRows.map(row => childCount += row[WaColumnProperty.childCount]);
        }
        else {
            childCount = resultRows.length;
        }
        rootRow[WaColumnProperty.childCount] = childCount;
    }

    getGroupSummary() {
        const grid = this.grid;

        for (let depthIndex = grid.group_column_table.count(); depthIndex >= 1; depthIndex--) {
            for (let i = grid.view_table.count() - 1; i >= 0; i--) {
                const row = grid.view_table.data[i];
                let depth = row[WaColumnProperty.depth];
                if (depth == depthIndex) this.getGroupDepthSummary(i);
            }
        }

        // agv 만 나중에...
        for (let i = grid.view_table.count() - 1; i >= 0; i--) {
            const row = grid.view_table.data[i];
            let depth = row[WaColumnProperty.depth];
            if (depth <= grid.group_column_table.count()) {
                for (let x = 0, len2 = grid.column_table.count(); x < len2; x++) {
                    const column = grid.column_table.data[x];
                    let columnName = column[WaColumnProperty.name];
                    let summaryType = grid.isNull(column[WaColumnProperty.summaryType], '');
                    if (summaryType == 'avg') {
                        row[columnName] = row[columnName] / row[WaColumnProperty.childCount];
                    }
                }
            }
        }
    }

    /**
     * spanIcon, spanImg, spanText
     */

    setGroupIcon(tableCell: any, rowIndex: number) {
        const grid = this.grid;

        const row = grid.getRow(rowIndex);
        const childRows = grid.isNull(row[WaColumnProperty.childRows], []);
        const element = tableCell.querySelector('.wa-grid-html-icon');

        if (childRows.length > 0) grid.classGroup.toggleGroupIcon(element, 'closed');
        else grid.classGroup.toggleGroupIcon(element, 'open');
    }

    toggleGroupIcon(element, type) {
        const grid = this.grid;

        if (grid.null(element)) return;

        if (type == WaColumnProperty.open) {
            element.classList.remove('wa-grid-html-icon-closed');
            element.classList.add('wa-grid-html-icon-open');
        }
        else if (type == WaColumnProperty.closed) {
            element.classList.remove('wa-grid-html-icon-open');
            element.classList.add('wa-grid-html-icon-closed');
        }
        else {
            element.classList.remove('wa-grid-html-icon-open');
            element.classList.remove('wa-grid-html-icon-closed');
        }
    }

    setGroupFolding(tableCell) {
        const grid = this.grid;

        let rowIndex = parseInt(tableCell.parentNode.dataset.rowIndex);
        let row = grid.getRow(rowIndex);
        let spanIcon = tableCell.querySelector('.wa-grid-html-icon');
        if (grid.null(spanIcon)) return;

        let folding = grid.classGroup.getGroupFoldingStatus(tableCell);
        if      (folding == WaColumnProperty.open)   grid.classGroup.closeGroupRow(rowIndex);
        else if (folding == WaColumnProperty.closed) grid.classGroup.openGroupRow(rowIndex);

        grid.horizontalScroll.setScroll(grid.code_horizontal);;
        grid.verticalScroll.setScroll(grid.code_vertical);
        grid.waPanel30.setDataPanel(grid.getFirstRowIndex());
    }

    getGroupFoldingStatus(tableCell) {
        const grid = this.grid;

        let spanIcon = tableCell.querySelector('.wa-grid-html-icon');
        if (grid.null(spanIcon)) return null;

        if (spanIcon.className.includes('wa-grid-html-icon-open')) return WaColumnProperty.open;
        else if (spanIcon.className.includes('wa-grid-html-icon-closed')) return WaColumnProperty.closed;
        else return null;
    }

    openChildRow(arrayRows, rootRow) {
        const rootChildRows = [...rootRow[WaColumnProperty.childRows]];

        let isOpen = rootRow[WaColumnProperty.isOpen];

        if (isOpen && rootChildRows.length > 0) {
            rootRow[WaColumnProperty.childRows] = [];
            arrayRows.push(rootRow);

            for (let i = 0; i < rootChildRows.length; i++) {
                const row = rootChildRows[i];
                this.openChildRow(arrayRows, row)
            }
        }
        else {
            arrayRows.push(rootRow);
        }
    }

    openGroupRow(rowIndex?: number) {
        const grid = this.grid;

        const arrayRows = [];

        const rootDataRow = grid.view_table.selectRowByRowIndex(rowIndex);
        const rootDepth = rootDataRow[WaColumnProperty.depth];
        const rootChildRows = [...rootDataRow[WaColumnProperty.childRows]];

        rootDataRow[WaColumnProperty.childRows] = [];
        rootDataRow[WaColumnProperty.isOpen] = true;

        if (rootChildRows.length == 0) return;

        for (let i = 0; i < rootChildRows.length; i++) {
            this.openChildRow(arrayRows, rootChildRows[i])
        }

        grid.view_table.insertRowsAfter(arrayRows, rowIndex);

        grid.data_select_panel30 = [];
        grid.data_select_panel31 = [];
    }

    closeChildRow(rowIndex) {
        const grid = this.grid;

        const rootDataRow = grid.view_table.selectRowByRowIndex(rowIndex);
        const rootDepth = rootDataRow[WaColumnProperty.depth];

        const rootChildRows = grid.isNull(rootDataRow[WaColumnProperty.childRows], []);

        if (rootChildRows.length > 0) return;

        const arrayRowIndex = [];
        for (let i = rowIndex + 1, len = grid.view_table.count(); i < len; i++) {
            const row = grid.view_table.selectRowByRowIndex(i);
            if (grid.null(row)) break;

            let depth = row[WaColumnProperty.depth];
            if (depth == rootDepth + 1) {
                rootDataRow[WaColumnProperty.childRows].push(row);
                arrayRowIndex.push(i);
            }
            else break;
        }

        for (let i = arrayRowIndex.length - 1; i >= 0; i--) grid.view_table.remove(arrayRowIndex[i]);
    }

    closeGroupRow(rowIndex) {
        const grid = this.grid;

        const rootDataRow = grid.view_table.selectRowByRowIndex(rowIndex);
        const rootDepth = rootDataRow[WaColumnProperty.depth];
        rootDataRow[WaColumnProperty.isOpen] = false;

        const arrayRowIndex = [];
        for (let i = rowIndex + 1, len = grid.view_table.count(); i < len; i++) {
            const row = grid.view_table.selectRowByRowIndex(i);
            if (grid.null(row)) break;
            let depth = row[WaColumnProperty.depth];
            if (depth > rootDepth && depth <= grid.group_column_table.count()) arrayRowIndex.push(i);
            else if (depth == rootDepth) break;
        }

        for (let i = arrayRowIndex.length - 1; i >= 0; i--) this.closeChildRow(arrayRowIndex[i]);

        this.closeChildRow(rowIndex);

        grid.data_select_panel30 = [];
        grid.data_select_panel31 = [];
    }

    /**
     * Group Button
     */

    changeGroupButtonOrder(name, text, order, targetIndex) {
        let selector = this.selector;
        const grid = this.grid;

        let groupColumns = grid.group_column_table.data;

        /* targetIndex != name Index */
        let sourceIndex = grid.group_column_table.selectRowIndex(WaColumnProperty.name, name);
        if (sourceIndex == targetIndex) return;

        /* create column */
        let dataRow = {};
        dataRow[WaColumnProperty.name] = name;
        dataRow[WaColumnProperty.text] = text;

        /* update source column */
        grid.group_column_table.updateByRowIndex(sourceIndex, WaColumnProperty.name, '_temp_group');

        /* add dataRow */
        if (grid.null(targetIndex)) grid.group_column_table.insert(dataRow);
        else grid.group_column_table.insertBefore(dataRow, targetIndex);

        /* remove source */
        sourceIndex = grid.group_column_table.selectRowIndex(WaColumnProperty.name, '_temp_group');
        grid.group_column_table.remove(sourceIndex);

        /* add button in group panel */
        let button = grid.classGroup.createGroupButton(name);
        let bar = document.querySelector(selector + ' .wa-grid-panel80 .wa-grid-panel-bar');
        if (grid.notNull(targetIndex)) bar.insertBefore(button, bar.childNodes[targetIndex]);
        else bar.append(button);

        grid.classGroup.toggleGroupPlaceHolder();
        grid.classGroup.setGroupData(grid.view_table.data, null, false);
    }

    addGroupButton(name, text, order, targetIndex) {
        let selector = this.selector;
        const grid = this.grid;

        /* Check Existing */
        if (grid.group_column_table.selectRows(WaColumnProperty.name, name, 1).length > 0) return;

        /* create dataRow */
        let dataRow = {};
        dataRow[WaColumnProperty.name] = name;
        dataRow[WaColumnProperty.text] = text;

        /* add dataRow */
        if (grid.null(targetIndex)) grid.group_column_table.insert(dataRow);
        else grid.group_column_table.insertBefore(dataRow, targetIndex);

        /* add button in group panel */
        let button = grid.classGroup.createGroupButton(name);
        let bar = document.querySelector(selector + ' .wa-grid-panel80 .wa-grid-panel-bar');
        if (grid.notNull(targetIndex)) bar.insertBefore(button, bar.childNodes[targetIndex]);
        else bar.append(button);

        //grid.classGroup.toggleGroupPlaceHolder();
        let data = grid.view_table.data;
        grid.classGroup.setGroupData(data, this.openDepth, false);
    }

    removeGroupButton(element) {
        let selector = this.selector;
        const grid = this.grid;

        /* get column name */
        let name = element.dataset.name;

        /* remove group data */
        let rowIndex = grid.group_column_table.selectRowIndex(WaColumnProperty.name, name);
        grid.group_column_table.remove(rowIndex);

        // remove button in group panel
        let button = element.parentNode;
        button.remove();

        grid.classGroup.toggleGroupPlaceHolder();

        if (grid.group_column_table.count() > 0) {
            let data = grid.view_table.data;
            grid.classGroup.setGroupData(data, null, false);
        }
        else {
            this.initGroupData();
        }
    }

    removeGroupButtonList() {
        let selector = this.selector;
        const grid = this.grid;

        let buttons = document.querySelectorAll(selector + ' .wa-grid-panel80 .wa-grid-panel-bar .wa-grid-panel-button');
        for (let i = buttons.length - 1; i >= 0; i--) buttons[i].remove();
    }

    getGroupButtonList() {
        let selector = this.selector;
        const grid = this.grid;

        grid.classGroup.removeGroupButtonList();

        let bar = document.querySelector(selector + ' .wa-grid-panel80 .wa-grid-panel-bar');
        let groupColumns= grid.group_column_table.data;

        for (let i = 0, len = groupColumns.length; i < len; i++) {
            let groupColumn = groupColumns[i];
            let button = grid.classGroup.createGroupButton(groupColumn[WaColumnProperty.name]);
            let bar = document.querySelector(selector + ' .wa-grid-panel80 .wa-grid-panel-bar');
            if (grid.null(bar)) return;
            bar.append(button);
        }
        grid.classGroup.toggleGroupPlaceHolder();
    }

    createGroupButton(columnName) {
        let selector = this.selector;
        const grid = this.grid;

        let column = grid.getColumn(columnName);

        let text= document.createElement('span');
        text.classList.add('wa-grid-panel-button-text');
        text.textContent  = column.header[WaColumnProperty.text];
        text.dataset.name = columnName;

        let icon= document.createElement('span');
        icon.classList.add('wa-grid-html-icon-remove');
        icon.dataset.name = columnName;

        let button = document.createElement('div');
        button.classList.add('wa-grid-panel-button');
        button.dataset.name = columnName;

        button.append(text);
        button.append(icon);

        return button;
    }

    toggleGroupPlaceHolder() {
        let selector = this.selector;
        const grid = this.grid;

        const buttons = document.querySelectorAll(selector + ' .wa-grid-panel80 .wa-grid-panel-bar .wa-grid-panel-button');
        const span: any = document.querySelector(selector + ' .wa-grid-panel80 .wa-grid-panel-bar-span');
        if (buttons.length > 0) span.style.display = 'none';
        else span.style.display = '';

        grid.classControl.after_setColumnVisible();
    }

    destroy() {
        const grid = this.grid;

        grid.setGridMode(GridMode.grid)
        grid.group_column_table.remove();
        grid.group_table.remove();
        grid.classGroup.hideGroupPanel();
        grid.classRange.removeRange(0, -1);
        grid.classScroll.setPanelSize();
        grid.setData(grid.source_table.data, null, false);
    }

    showGroupPanel() {
        let selector = this.selector;
        const grid = this.grid;

        grid.classGroup.getGroupButtonList();

        grid.options.showGroupPanel = true;
        let panel = document.querySelector(selector + ' .wa-grid-panel80');
        panel.classList.remove('wa-grid-hide');
        panel.classList.add('wa-grid-show');

        grid.apply();
    }

    hideGroupPanel() {
        let selector = this.selector;
        const grid = this.grid;

        grid.classGroup.removeGroupButtonList();

        grid.options.showGroupPanel = false;
        let panel = document.querySelector(selector + ' .wa-grid-panel80');
        panel.classList.remove('wa-grid-show');
        panel.classList.add('wa-grid-hide');

        grid.apply();
    }

    initGroupData() {
        const grid = this.grid;

        grid.setGridMode(GridMode.grid);
        grid.group_column_table.remove();
        grid.sort_column_table.remove();
        grid.group_table.remove();
        grid.view_table.remove();

        grid.classGroup.removeGroupButtonList();

        grid.classRange.removeRange(0, -1);
        grid.classScroll.setPanelSize();
        grid.verticalScroll.setScroll(grid.code_vertical);
        //if (grid.view_table.count() >= 0 && grid.null(grid.view_table.data[0]['group_column'])) grid.setData(grid.view_table.data, null, false);
        grid.setData(grid.source_table.data, null, false);
        grid.apply();
    }

    getGroupRow(columnName) { return this.grid.group_column_table.selectRow(WaColumnProperty.name, columnName); }

    expandGroup() {
        let selector = this.selector;
        const grid = this.grid;

        if (grid.group_column_table.count() == 0) return;
        let openDepth = grid.classGroup.openDepth;

        if (grid.null(grid.classGroup.openDepth)) openDepth = 1;
        else openDepth += 1;

        if (openDepth > grid.group_column_table.count() + 1) openDepth =  grid.group_column_table.count();

        grid.classGroup.openDepth = openDepth;

        grid.classGroup.setGroupData(grid.view_table.data, openDepth, false);
    }

    collapseGroup() {
        let selector = this.selector;
        const grid = this.grid;

        if (grid.group_column_table.count() == 0) return;
        let openDepth = grid.classGroup.openDepth;

        if (grid.null(grid.classGroup.openDepth)) openDepth = grid.group_column_table.count();
        else openDepth -= 1;

        if (openDepth <= 0) openDepth =  1;

        grid.classGroup.openDepth = openDepth;

        grid.classGroup.setGroupData(grid.view_table.data, openDepth, false);
    }
}
