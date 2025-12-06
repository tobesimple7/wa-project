import { GridMode } from '../wa.grid.types';
import { WaGrid } from '../wa.grid';
export declare class WaGridBaseMain {
    constructor();
    getRenderer(this: WaGrid, columnName: string, property: string): any;
    setRenderer(this: WaGrid, renderer: any): void;
    getInfoRenderer(this: WaGrid, columnName: string, property: string): any;
    setInfoRenderer(this: WaGrid, renderer: any): void;
    /**
     * Display grid
     */
    apply(this: WaGrid): void;
    /**
     * Main Functions
     */
    createHtml(this: WaGrid): void;
    setGrid(this: WaGrid, columns: any[], options?: any): void;
    createGrid(this: WaGrid): void;
    updateGrid(this: WaGrid): void;
    getTextWidth(this: WaGrid, canvas: any, text: any, fontSize: any, fontFamily: any): any;
    getTextWidth2(this: WaGrid, context: any, text: any): any;
    setColumnAutoWidth(this: WaGrid): void;
    setRowHeight(this: WaGrid, type: any, rowHeight: any): void;
    setData(this: WaGrid, data: any[], openDepth?: number, isFirst?: boolean): void;
    setGridMode(this: WaGrid, gridMode: GridMode): void;
    setGridData(this: WaGrid, data: any[], isFirst: boolean): void;
    refreshRefData(this: WaGrid): void;
    /**
     * Range Functiopns
     */
    setRange(this: WaGrid, rowIndex1: number, toRowIndex2: number, columnIndex1: number, columnIndex2: number): void;
    selectRange(this: WaGrid, rowIndex1: number, toRowIndex2: number, columnIndex1: number, columnIndex2: number): void;
    /**
     * Dom Lib
     */
    addUserClass(this: WaGrid, element: any, className: string): void;
    removeUserClass(this: WaGrid, element: any): void;
    /**
     * Export Excel
     */
    exportExcel(this: WaGrid, options: any): void;
    /**
     * Pagination
     */
    setTotalRowCount(this: WaGrid, totalRowCount: number): void;
}
