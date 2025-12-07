import {AddRowDirection} from "@/core/Grid.types"
import {WaColumnProperty} from "@/core/columns/ColumnEnum"
import {WaGridCore} from "@/core/WaGridCore";

export class WaBaseRows {

    constructor() {
    }

    /**
     * view table rows
     */

    getRowCount(this: WaGridCore, table?: any) { return this.isNull(table, this.view_table).count(); }

    getRow(this: WaGridCore,rowIndex: number, table?: any) { return this.isNull(table, this.view_table).selectRowByRowIndex(rowIndex); }

    getRows(this: WaGridCore,startRowIndex?: number, endRowIndex?: number, table?: any) { return this.isNull(table, this.view_table).selectRowRange(startRowIndex, endRowIndex); }

    getRowByRowId(this: WaGridCore,rowId: number, table?: any) { return this.isNull(table, this.view_table).selectRowByRowId(rowId); }

    getRowIndexByRowId(this: WaGridCore,rowId: number, table?: any) { return this.isNull(table, this.view_table).selectRowIndexByRowId(rowId); }

    getCheckedRows(this: WaGridCore) { return this.view_table.selectRows(WaColumnProperty.isChecked, true); }

    getSelectedRows(this: WaGridCore) {
        const result = [];
        for (let i = 0, len = this.view_table.count(); i < len; i++) {
            if (this.isSelectedCell31(i, 0) == 1) result.push(this.view_table.selectRowByRowIndex(i));
        }
        return result;
    }

    getSelectedRowsIndexArray(this: WaGridCore) {
        const result: number[] = [];
        for (let rowIndex = 0, len = this.view_table.count(); rowIndex < len; rowIndex++) {
            if (this.isSelectedCell31(rowIndex, 0) == 1) result.push(rowIndex);
        }
        return result;
    }

    getChangedRowsData(this: WaGridCore) {
        let result = [];
        let rows = this.getDeletedRowsData();
        for (let i = 0, len = rows.length; i < len; i++) {
            result.push(rows[i]);
        }
        rows = this.getUpdatedRowsData();
        for (let i = 0, len = rows.length; i < len; i++) {
            result.push(rows[i]);
        }
        rows = this.getInsertedRowsData();
        for (let i = 0, len = rows.length; i < len; i++) {
            result.push(rows[i]);
        }
        return result;
    }

    getDeletedRowsData(this: WaGridCore) {
        let rows = this.data_delete;
        let result = [];
        for (let i = 0, len = rows.length; i < len; i++) {
            let row = rows[i];
            let item = JSON.parse(JSON.stringify(row));
            item[WaColumnProperty.rowId] = row[WaColumnProperty.rowId];
            item[WaColumnProperty.rowMode]  = row[WaColumnProperty.rowMode];
            result.push(item);
        }
        return result;
    }

    getUpdatedRowsData(this: WaGridCore) {
        let rows = this.source_table.data;
        let result = [];
        for (let i = 0, len = rows.length; i < len; i++) {
            let row = rows[i];
            if (row.mode == 'U') {
                let item = JSON.parse(JSON.stringify(row));
                item[WaColumnProperty.rowId] = row[WaColumnProperty.rowId];
                item[WaColumnProperty.rowMode] = row[WaColumnProperty.rowMode];
                result.push(item);
            }
        }
        return result;
    }

    getInsertedRowsData(this: WaGridCore) {
        let rows = this.source_table.data;
        let result = [];
        for (let i = 0, len = rows.length; i < len; i++) {
            let row = rows[i];
            if (row[WaColumnProperty.rowMode] == 'I') {
                let item = JSON.parse(JSON.stringify(row));
                item[WaColumnProperty.rowId] = row[WaColumnProperty.rowId];
                item[WaColumnProperty.rowMode ] = row[WaColumnProperty.rowMode];
                result.push(item);
            }
        }
        return result;
    }

    createRow(this: WaGridCore,row: any): any {
        if (this.null(row)) row = {};

        const columns = this.column_table.data;
        const item: any = {};

        for (let i = 0, len = columns.length; i < len; i++) {
            const column: any = columns[i];
            let columnName: string = column[WaColumnProperty.name];
            item[columnName] = this.null(row[columnName]) ? null : row[columnName];
        }
        return item;
    }

    addRow(this: WaGridCore,row?: any, direction?: AddRowDirection) {
        //type : top, bottom, up, down
        const grid = this;

        const dataRow = this.createRow(row);

        const rowIndexList = this.getSelectedRowsIndexArray();

        if (rowIndexList.length == 0) direction = AddRowDirection.bottom;

        if (direction == AddRowDirection.top) {
            this.source_table.insertBefore(dataRow, 0)
            this.view_table.insertBefore(dataRow, 0)

            let topRowIndex = 0;

            this.verticalScroll.setScroll(grid.code_vertical);
            this.classScroll.setBarPosition(grid.code_vertical, topRowIndex);
            this.classRange.removeRange(0, -1);
            this.classRange.selectRange(topRowIndex, topRowIndex);
            this.waPanel30.setDataPanel(topRowIndex);
        }
        else if (direction == AddRowDirection.bottom) {
            this.source_table.insert(dataRow)
            this.view_table.insert(dataRow)

            let dataLength = this.view_table.count();
            let topRowIndex = this.getFirstRowIndex();

            topRowIndex = dataLength - this.pageRowCount;
            if (topRowIndex < 0) topRowIndex = 0;
            if (this.pageRowCount > this.pageIntRowCount) {
                topRowIndex = topRowIndex + 1;
            }
            this.verticalScroll.setScroll(grid.code_vertical);
            this.classScroll.setBarPosition(grid.code_vertical, topRowIndex);
            this.classRange.removeRange(0, -1);
            let _topRowIndex = this.classRange.selectRange(dataLength - 1, dataLength - 1);
            this.waPanel30.setDataPanel(topRowIndex);
        }
        else if (direction == AddRowDirection.before) {
            let minRowIndex = rowIndexList[0];
            this.source_table.insertBefore(dataRow, minRowIndex);
            this.view_table.insertBefore(dataRow, minRowIndex);

            let lastRowIndex = this.view_table.count() - 1;
            let topRowIndex = this.getFirstRowIndex();

            this.verticalScroll.setScroll(grid.code_vertical);
            this.classScroll.setBarPosition(grid.code_vertical, topRowIndex);
            this.classRange.removeRange(0, -1);
            let _topRowIndex = this.classRange.selectRange(minRowIndex, minRowIndex);
            this.waPanel30.setDataPanel(_topRowIndex);
        }
        else if (direction == AddRowDirection.after) {
            let minRowIndex = rowIndexList[0];
            let addRowIndex = minRowIndex + 1;
            this.source_table.insertAfter(dataRow, minRowIndex);
            this.view_table.insertAfter(dataRow, minRowIndex);

            this.classRange.removeRange(0, -1);
            let _topRowIndex = this.classRange.selectRange(addRowIndex, addRowIndex);
            this.waPanel30.setDataPanel(_topRowIndex);

            if (this.pageRowCount > this.pageIntRowCount) {
                if (addRowIndex == this.getLastRowIndex()) {
                    this.tbs_moveCell('down');

                    this.classRange.removeRange(0, -1);
                    let _topRowIndex = this.classRange.selectRange(addRowIndex, addRowIndex);
                    this.waPanel30.setDataPanel(_topRowIndex);

                    this.verticalScroll.setScroll(grid.code_vertical);
                    this.classScroll.setBarPosition(grid.code_vertical, grid.getFirstRowIndex());
                }
            }
        }
    }

    removeRows(this: WaGridCore,rows: any[]) {
        const grid = this;

        if (this.null(rows) || rows.length == 0) return;

        let topRowIndex = this.getFirstRowIndex();

        for (let i = 0, len = rows.length; i < len; i++) {
            const row = rows[i];
            let rowId = row[WaColumnProperty.rowId];
            this.source_table.removeByRowId(rowId);
            this.view_table.removeByRowId(rowId);
        }

        grid.verticalScroll.setScroll(grid.code_vertical);
        grid.classRange.removeRange(0, -1);
        let _topRowIndex = grid.classRange.selectRange(topRowIndex, topRowIndex, 0, 0);
        grid.classScroll.setBarPosition(grid.code_vertical, grid.getFirstRowIndex());
        grid.waPanel30.setDataPanel(_topRowIndex);
    }

    /**
     * source table rows
     */

    getSourceRowCount(this: WaGridCore): number { return this.getRowCount(this.source_table); }

    getSourceRow(this: WaGridCore, rowIndex: number): any { return this.getRow(rowIndex, this.source_table); }

    getSourceRows(this: WaGridCore, startRowIndex: number, endRowIndex: number): any[] { return this.getRows(startRowIndex, endRowIndex, this.source_table); }

    getSourceRowByRowId(this: WaGridCore, rowId: number): any { return this.getRowByRowId(rowId, this.source_table); }

    getSourceRowIndexByRowId(this: WaGridCore, rowId: number): number { return this.getRowIndexByRowId(rowId, this.source_table); }

    /**
     * top table rows
     */

    getTopRowCount(this: WaGridCore): number { return this.getRowCount(this.top_table); }

    getTopRow(this: WaGridCore,rowIndex: number): any { return this.getRow(rowIndex, this.top_table); }

    getTopRows(this: WaGridCore,startRowIndex: number, endRowIndex: number): any[] { return this.getRows(startRowIndex, endRowIndex, this.top_table); }

    getTopRowByRowId(this: WaGridCore,rowId: number): any { return this.getRowByRowId(rowId, this.top_table); }

    getTopRowIndexByRowId(this: WaGridCore,rowId: number): number { return this.getRowIndexByRowId(rowId, this.top_table); }

    /**
     * footer table rows
     */

    getFooterRowCount(this: WaGridCore): number { return this.getRowCount(this.footer_table); }

    getFooterRow(this: WaGridCore,rowIndex: number): any { return this.getRow(rowIndex, this.footer_table); }

    getFooterRows(this: WaGridCore,startRowIndex: number, endRowIndex: number): any[] { return this.getRows(startRowIndex, endRowIndex, this.footer_table); }

    getFooterRowByRowId(this: WaGridCore,rowId: number): any { return this.getRowByRowId(rowId, this.footer_table); }

    getFooterRowIndexByRowId(this: WaGridCore,rowId: number): number { return this.getRowIndexByRowId(rowId, this.footer_table); }

    /**
     * tree table rows
     */

    getTreeRowCount(this: WaGridCore): number { return this.getRowCount(this.tree_table); }

    getTreeRow(this: WaGridCore,rowIndex: number): any { return this.getRow(rowIndex, this.tree_table); }

    getTreeRows(this: WaGridCore, startRowIndex: number, endRowIndex: number): any[] { return this.getRows(startRowIndex, endRowIndex, this.tree_table); }

    getTreeRowByRowId(this: WaGridCore,rowId: number): any { return this.getRowByRowId(rowId, this.tree_table); }

    getTreeRowIndexByRowId(this: WaGridCore,rowId: number): number { return this.getRowIndexByRowId(rowId, this.tree_table); }

    /**
     * Row functions
     */

    getPageRowCount(this: WaGridCore, panelName?: string) { return this.pageRowCount; }

    getTopRowIndex(this: WaGridCore, panelName: string, topRowIndex: number) {
        // function : Validate Top rowIndex
        //
        // @panelName   : panel area name
        // @topRowIndex : topRowIndex
        //
        // @return : topRowIndex
        let selector = '#' + this.gridId;
        const grid = this;

        if (panelName == 'panel31' || panelName == 'panel32' || panelName == 'panel30') {
            let rowCount = this.getRowCount();
            if (this.pageRowCount > this.pageIntRowCount) {
                if (topRowIndex > (rowCount - this.pageRowCount + 1)) {
                    topRowIndex = rowCount - this.pageRowCount;
                    if (topRowIndex < 0) topRowIndex = 0;
                }
            }
            else {
                if (topRowIndex > (rowCount - this.pageRowCount)) {
                    topRowIndex = rowCount - this.pageRowCount;
                    if (topRowIndex < 0) topRowIndex = 0;
                }
            }
            if (topRowIndex < 0) topRowIndex = 0;
        }
        return topRowIndex;
    }

    getBottomRowIndex(this: WaGridCore, panelName: string, topRowIndex: number) {
        // function : Validate Bottom rowIndex
        //
        // @panelName   : panel area name
        // @topRowIndex : topRowIndex
        //
        // @return : bottomRowIndex
        let selector = '#' + this.gridId;
        const grid = this;
        let bottomRowIndex = 0;

        bottomRowIndex = topRowIndex + this.pageRowCount - 1;
        if (bottomRowIndex > this.getRowCount() - 1) bottomRowIndex = this.getRowCount() - 1;

        return bottomRowIndex;
    }


}