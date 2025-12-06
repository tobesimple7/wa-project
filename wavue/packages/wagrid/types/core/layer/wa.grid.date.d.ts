import { WaGrid } from '../wa.grid';
export declare class WaGridDate {
    colType: any;
    grid: WaGrid;
    gridId: string;
    column: object;
    input: HTMLInputElement;
    constructor(grid: WaGrid, column: object, input: HTMLInputElement);
    create(): void;
    clear(): void;
    setData(data?: any): void;
    getToday(): string;
    today(): void;
    prev(): void;
    next(): void;
    selectMonth(value: any): void;
    addEvent(): void;
    addZero(value: any): any;
    destroy(): void;
}
