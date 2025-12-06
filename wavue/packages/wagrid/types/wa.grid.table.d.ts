import { WaGrid } from './wa.grid';
export declare class WaGridTable {
    grid: WaGrid;
    constructor(grid: WaGrid);
    createTable(panelName: any, startRowIndex: any, rowCount: any): void;
    createTableHead(panelName: string, table: any): void;
    createTableHead1(panelName: string, table: any): void;
    createTableHead2(panelName: any, table: any): number;
    createTableHead0(panelName: any, table: any): number;
    createTableRow(panelName: any, tbody: any): void;
    updateTableRows(panelName: any, rowCount: any): void;
}
