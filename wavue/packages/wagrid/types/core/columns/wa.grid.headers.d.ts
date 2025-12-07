import { WaGrid } from '../wa.grid';
export declare class WaHeaders {
    grid: WaGrid;
    selector: string;
    constructor(grid: WaGrid);
    createHeaderColumns(): void;
    createHeaderColumnTable(): void;
    updateHeaderFixedColumns(): void;
    getDisplayedHeaderColumn(panelName?: string): {
        startColumnIndex: number;
        lastColumnIndex: number;
    };
    getHeaderColumn(rowIndex: number, columnIndex: number): object;
    getHeaderColumnByNumber(num: any): any;
    getHeaderPropertyByIndex(columnIndex: any, property: any): any;
    getHeaderProperty(columnName: any, property: any): any;
    setHeaderProperty(rowIndex: any, colIndex: any, property: any, value: any): void;
}
