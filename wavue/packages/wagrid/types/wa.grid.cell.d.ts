import { WaGrid } from './wa.grid';
export declare class WaGridCell {
    grid: WaGrid;
    column: any;
    constructor(grid: WaGrid, column: any);
    createHtml(): void;
    createCell(): void;
    createTemplate(): void;
    hideTableCells(grid: any, panelName: any, tableRow: any, lastColumnIndex: any): void;
    showSelectedCells(grid: any, panelName: any, tableCell: any, rowIndex: any, cellIndex: any): void;
}
