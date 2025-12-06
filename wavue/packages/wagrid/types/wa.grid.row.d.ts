import { WaGrid } from './wa.grid';
export declare class WaGridRow {
    grid: WaGrid;
    constructor(grid: WaGrid);
    setTableHead(grid: WaGrid, panelName: string): void;
    setTableRow(grid: any, tableRow: any, rowIndex: any, panelName?: string): void;
    showAlternativeRowColor(grid: any, panelName: any, tableRow: any, rowIndex: any): void;
    hideTableRows(grid: any, panelName: any, tableRows: any, fromRowIndex: any, toRowIndex: any): void;
}
