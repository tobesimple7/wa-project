import { WaGrid } from '../wa.grid';
export declare class WaGridCombo {
    colType: any;
    grid: WaGrid;
    gridId: string;
    column: object;
    input: HTMLInputElement;
    input_code: HTMLInputElement;
    constructor(grid: WaGrid, column: any, input: any, input_code: any);
    create(): void;
    clear(): void;
    setData(): void;
    AddEvent(): void;
    destroy(): void;
}
