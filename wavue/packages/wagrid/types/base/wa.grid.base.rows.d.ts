import { AddRowDirection } from '../wa.grid.types';
import { WaGrid } from '../wa.grid';
export declare class WaGridBaseRows {
    constructor();
    /**
     * view table rows
     */
    getRowCount(this: WaGrid, table?: any): any;
    getRow(this: WaGrid, rowIndex: number, table?: any): any;
    getRows(this: WaGrid, startRowIndex?: number, endRowIndex?: number, table?: any): any;
    getRowByRowId(this: WaGrid, rowId: number, table?: any): any;
    getRowIndexByRowId(this: WaGrid, rowId: number, table?: any): any;
    getCheckedRows(this: WaGrid): object[];
    getSelectedRows(this: WaGrid): any[];
    getSelectedRowsIndexArray(this: WaGrid): number[];
    getChangedRowsData(this: WaGrid): any[];
    getDeletedRowsData(this: WaGrid): any[];
    getUpdatedRowsData(this: WaGrid): any[];
    getInsertedRowsData(this: WaGrid): any[];
    createRow(this: WaGrid, row: any): any;
    addRow(this: WaGrid, row?: any, direction?: AddRowDirection): void;
    removeRows(this: WaGrid, rows: any[]): void;
    /**
     * source table rows
     */
    getSourceRowCount(this: WaGrid): number;
    getSourceRow(this: WaGrid, rowIndex: number): any;
    getSourceRows(this: WaGrid, startRowIndex: number, endRowIndex: number): any[];
    getSourceRowByRowId(this: WaGrid, rowId: number): any;
    getSourceRowIndexByRowId(this: WaGrid, rowId: number): number;
    /**
     * top table rows
     */
    getTopRowCount(this: WaGrid): number;
    getTopRow(this: WaGrid, rowIndex: number): any;
    getTopRows(this: WaGrid, startRowIndex: number, endRowIndex: number): any[];
    getTopRowByRowId(this: WaGrid, rowId: number): any;
    getTopRowIndexByRowId(this: WaGrid, rowId: number): number;
    /**
     * footer table rows
     */
    getFooterRowCount(this: WaGrid): number;
    getFooterRow(this: WaGrid, rowIndex: number): any;
    getFooterRows(this: WaGrid, startRowIndex: number, endRowIndex: number): any[];
    getFooterRowByRowId(this: WaGrid, rowId: number): any;
    getFooterRowIndexByRowId(this: WaGrid, rowId: number): number;
    /**
     * tree table rows
     */
    getTreeRowCount(this: WaGrid): number;
    getTreeRow(this: WaGrid, rowIndex: number): any;
    getTreeRows(this: WaGrid, startRowIndex: number, endRowIndex: number): any[];
    getTreeRowByRowId(this: WaGrid, rowId: number): any;
    getTreeRowIndexByRowId(this: WaGrid, rowId: number): number;
    /**
     * Row functions
     */
    getPageRowCount(this: WaGrid, panelName?: string): number;
    getTopRowIndex(this: WaGrid, panelName: string, topRowIndex: number): number;
    getBottomRowIndex(this: WaGrid, panelName: string, topRowIndex: number): number;
}
