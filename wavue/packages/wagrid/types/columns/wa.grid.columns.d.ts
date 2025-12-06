import { WaGrid } from '../wa.grid';
export declare class WaGridColumns {
    grid: WaGrid;
    selector: string;
    constructor(grid: any);
    getUserColumns(): any[];
    setColumnDefaultValue(column: any): any;
    createColumns(columns: any): void;
    createColumnTable(): void;
    addColumn(addColumn: any, columnIndex: any, orderType: any): void;
    removeColumn(targetColumnIndex: any): void;
    getParentTableCell(column: any): any;
    changeColumnOrder(moveColumn: any, targetColumn: any, orderType: any): void;
    getSelectedTableCell(rowIndex?: any, cellIndex?: any): any;
    getRowIndexInTable(tableRowIndex: any, panelName?: any): number;
    getLeftTableCell(rowIndex: any, panel?: any): any;
    getJsonRow(jsonArray: any, name: any, value: any): any;
    setFixedColumn(fixedColumnIndex: any): void;
    removeFixedColumn(): void;
    getFirstVisibleColumnIndex(): any;
    getLastVisibleColumnIndex(): any;
}
