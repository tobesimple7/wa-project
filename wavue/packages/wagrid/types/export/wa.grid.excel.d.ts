import { WaGrid } from '../wa.grid';
export declare class WaGridExcel {
    grid: WaGrid;
    constructor(grid: WaGrid);
    exportExcel(options: any): void;
    s2ab(s: any): ArrayBuffer;
    createTableHead(): any[];
    createPanel20(): any[];
    createPanel30(): any[];
    createPanel40(): any[];
    createPanel50(): any[];
}
