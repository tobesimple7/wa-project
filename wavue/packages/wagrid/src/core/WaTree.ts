import {WaGridCore} from "@/core/WaGridCore"
import {OptionAlias} from "@/core/WaGrid.types"
import {WaColumnProperty} from "@/core/columns/WaColumnEnum"
export class WaGridTree {
    grid: WaGridCore;
    selector: string;
    openDepth: number;

    constructor(grid) {
        this.grid     = grid;
        this.selector = `#${grid.gridId}`;
        this.openDepth = null;
    }

    createTreeData() {
        const grid = this.grid;

        grid.tree_table.remove();

        const fn_getChildrenRowIds = function(row) {
            row[WaColumnProperty.children] = [];

            for (let i = 0, len = grid.view_table.count(); i < len; i++) {
                let dataRow = grid.view_table.data[i];
                if (row[grid.options.treeItemName] == dataRow[grid.options.treeParentName]) {
                    row[WaColumnProperty.children].push(dataRow[WaColumnProperty.rowId]);
                }
            }
        }

        const fn_setRelation = function(row, depth = 1) {
            fn_getChildrenRowIds(row);

            row[WaColumnProperty.depth] = depth;
            grid.tree_table.insert(grid.copyJson(row));

            let arr = row[WaColumnProperty.children];
            if (arr.length > 0) {
                for (let i = 0, len = grid.view_table.count(); i < len; i++) {
                    let dataRow = grid.view_table.data[i];
                    if (arr.indexOf(dataRow[WaColumnProperty.rowId]) != -1) fn_setRelation(dataRow, depth + 1);
                }
            }
        }

        for (let i = 0, len =grid.view_table.count(); i < len; i++) {
            let dataRow = grid.view_table.data[i];
            if (grid.options.treeRootValue == dataRow[grid.options.treeParentName]) {
                fn_setRelation(dataRow);
            }
        }
    }

    setTreeSortColumns(sortColumns) {
        const grid = this.grid;

        sortColumns.map(column => grid.sort_column_table.insert(grid.copyJson(column)))
    }

    setTreeData(data, openDepth  = 0, isFirst = true) {
        let selector = this.selector;
        const grid = this.grid;

        if (grid.null(data) || data.length == 0) return;
        this.openDepth = openDepth;

        /* create source_data */
        if (isFirst == true) {
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

        grid.view_table.remove();
        grid.source_table.data.map(dataRow => grid.view_table.insert(grid.copyJson(dataRow)));

        /* Filter */
        grid.classFilter.filters();

        /* Soring */
        grid.classSort.orderBy();

        /* insert into tree_table */
        grid.tree_table.remove();
        grid.view_table.data.map(dataRow => grid.tree_table.insert(grid.copyJson(dataRow)));

        /* create tree data */
        grid.classTree.createTreeData();

        /* insert into view_table from tree_table */
        grid.view_table.remove();
        for (let i = 0, len = grid.tree_table.count(); i < len; i++) {
            let dataRow = grid.tree_table.data[i];

            dataRow[WaColumnProperty.rowMode]      = '';
            dataRow[WaColumnProperty.isOpen]    = false;

            for (let x = 0, len = grid.column_table.count(); x < len; x++) {
                let column = grid.column_table.data[x];
                let columnName  = column[WaColumnProperty.name];
                let val = grid.null(dataRow[columnName]) ? null : dataRow[columnName];

                dataRow[columnName] = val;
            }
            grid.view_table.insert(grid.copyJson(dataRow));
        }

        /* Summary */
        // grid.classTree.getGroupSummary();

        /* create tree_table */
        grid.tree_table.remove();
        grid.view_table.data.map(dataRow => {
            let item = grid.copyJson(dataRow);
            item[WaColumnProperty.isOpen] = false;
            grid.tree_table.insert(item);
        });

        // open depth
        if (grid.notNull(openDepth)) {
            for (let i = grid.view_table.count() - 1; i >= 0; i--) {
                let row = grid.view_table.data[i];
                let depth = row[WaColumnProperty.depth];
                if (openDepth != 0 && depth > openDepth) grid.view_table.remove(i);
            }
        }

        (document.querySelector(selector + ' .wa-grid-panel10-filter-input') as any).value = '';
        if (grid.view_table.count() == 0) {
            document.querySelector(selector + ' .wa-grid-panel21 td div').textContent = '0';
            grid.verticalScroll.setScroll(grid.code_vertical);
            grid.waPanel30.setDataPanel(0);
        }
        else {
            document.querySelector(selector + ' .wa-grid-panel21 td div').textContent = String(grid.view_table.count());
            grid.verticalScroll.setScroll(grid.code_vertical);
            grid.waPanel30.setDataPanel(0);
            grid.waPanel40.setDataPanel();
            grid.waPanel50.setDataPanel();
        }
        if (grid.options[WaColumnProperty.autoWidth] == true)  grid.setColumnAutoWidth();

        grid.classRange.removeRange(0, -1);
        let _topRowIndex = grid.classRange.selectRange(0, 0, 0, 0);
        grid.waPanel30.setDataPanel(_topRowIndex);
    }

    setTreeIcon(tableCell, rowIndex) {
        const grid = this.grid;

        const row = grid.getRow(rowIndex);
        const arrayChildren = row[WaColumnProperty.children];
        const element = tableCell.querySelector('.wa-grid-html-icon');

        if (arrayChildren.length > 0) {
            const nextRow = grid.getRow(rowIndex + 1);
            if (grid.null(nextRow)) grid.classTree.toggleTreeIcon(element, 'closed');
            else {
                if (nextRow[grid.options.treeParentName] == row[grid.options.treeItemName])
                    grid.classTree.toggleTreeIcon(element, 'open');
                else
                    grid.classTree.toggleTreeIcon(element, 'closed');
            }
        }
        else grid.classTree.toggleTreeIcon(element);
    }

    toggleTreeIcon(element, type?) {
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

    getTreeFoldingStatus(tableCell) {
        const grid = this.grid;

        const spanIcon = tableCell.querySelector('.wa-grid-html-icon');
        if (grid.null(spanIcon)) return null;

        if (spanIcon.className.includes('wa-grid-html-icon-open')) return WaColumnProperty.open;
        else if (spanIcon.className.includes('wa-grid-html-icon-closed')) return WaColumnProperty.closed;
        else return null;
    }

    setTreeFolding(tableCell) {
        const grid = this.grid;

        let rowIndex = parseInt(tableCell.parentNode.dataset.rowIndex);
        let spanIcon = tableCell.querySelector('.wa-grid-html-icon');
        if (grid.null(spanIcon)) return;

        let folding = grid.classTree.getTreeFoldingStatus(tableCell);
        if      (folding == WaColumnProperty.open)   grid.classTree.closeTreeRow(rowIndex);
        else if (folding == WaColumnProperty.closed) grid.classTree.openTreeRow(rowIndex);

        grid.horizontalScroll.setScroll(grid.code_horizontal);;
        grid.verticalScroll.setScroll(grid.code_vertical);
        grid.waPanel30.setDataPanel(grid.getFirstRowIndex());
    }

    getTreechildRows(folding, rowIndex, isAll = true) {
        // folding : open, closed
        const grid = this.grid;

        let dataRows= grid.view_table.data;
        let resultRows= [];
        const fn_getchildRows = function(row, count) {
            if (Object.keys(row).length == 0) return;

            if (count > 1) resultRows.push(grid.copyJson(row));

            let arr = row[WaColumnProperty.children];
            if (arr.length > 0) {
                //default : get first lower rows
                if (count == 1) {
                    for (let i = 0, len = arr.length; i < len; i++) {
                        let dataRow = grid.getTreeRowByRowId(arr[i]);
                        fn_getchildRows(dataRow, count + 1);
                    }
                }
                else {
                    if (folding == WaColumnProperty.open) {
                        if (row[WaColumnProperty.isOpen]) {
                            for (let i = 0, len = arr.length; i < len; i++) {
                                let dataRow = grid.getTreeRowByRowId(arr[i]);
                                fn_getchildRows(dataRow, count + 1);
                            }
                        }
                    }
                    else {
                        for (let i = 0, len = arr.length; i < len; i++) {
                            let dataRow = grid.getTreeRowByRowId(arr[i]);
                            fn_getchildRows(dataRow, count + 1);
                        }
                    }
                }
            }
        }
        let row = grid.getRow(rowIndex);
        fn_getchildRows(row, 1);
        return resultRows;
    }

    openTreeRow(rowIndex) {
        const grid = this.grid;

        let row = grid.getRow(rowIndex);
        let rowId = row[WaColumnProperty.rowId];
        for (let i = 0, len = grid.source_table.count(); i < len; i++) {
            if (rowId == grid.source_table.data[i][WaColumnProperty.rowId])
                grid.source_table.data[i][WaColumnProperty.isOpen] = true; // keep folding status
        }

        let rows = grid.classTree.getTreechildRows(WaColumnProperty.open, rowIndex, false);
        grid.classTree.addTreeRows(rowIndex);

    }

    closeTreeRow(rowIndex) {
        const grid = this.grid;

        let row = grid.getRow(rowIndex);
        let rowId = row[WaColumnProperty.rowId];
        for (let i = 0, len = grid.source_table.count(); i < len; i++) {
            if (rowId == grid.source_table.data[i][WaColumnProperty.rowId])
                grid.source_table.data[i][WaColumnProperty.isOpen] = false; // keep folding status
        }

        let rows = grid.classTree.getTreechildRows(WaColumnProperty.closed, rowIndex, true);
        rows.map(row => grid.classTree.removeTreeRow(row));

    }

    addTreeRows(rowIndex) {
        const grid = this.grid;

        let rows = grid.classTree.getTreechildRows(WaColumnProperty.open, rowIndex, false);
        for (let i = 0, startRowIndex = rowIndex + 1, len = rows.length; i < len; i++, startRowIndex++) {
            grid.classTree.addTreeRow(startRowIndex, rows[i]);
        }
    }

    addTreeRow(startRowIndex, row) {
        const grid = this.grid;

        startRowIndex = parseInt(startRowIndex);
        if (startRowIndex == grid.view_table.count()) {
            grid.view_table.insert(row);
        }
        else {
            grid.view_table.insertBefore(row, startRowIndex);
        }
    }

    removeTreeRow(row) {
        const grid = this.grid;

        grid.view_table.removeByRowId(row[WaColumnProperty.rowId]);

        grid.data_select_panel30 = [];
        grid.data_select_panel31 = [];
    }
}




