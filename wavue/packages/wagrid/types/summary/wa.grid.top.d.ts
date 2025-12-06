import { WaGrid } from '../wa.grid';
export declare class WaGridTop {
    grid: WaGrid;
    selector: string;
    constructor(grid: any);
    setTopColumns(columns: any): void;
    setTopData(): void;
    setTopValue(rowIndex: any, columnName: any, value: any): void;
}
