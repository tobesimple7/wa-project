import { WaGrid } from './wa.grid';
export declare class WaGridSort {
    grid: WaGrid;
    selector: string;
    sortColumns: any[];
    options: any;
    constructor(grid: WaGrid);
    orderBy(): void;
    getSortRow(columnName: string): object;
    changeSortButtonOrder(name: string, text: string, order: string, targetIndex: number): void;
    addSortButton(name: any, text: any, order: any, targetIndex: any): void;
    removeSortButton(element: any): void;
    removeSortButtonList(): void;
    getSortButtonList(): void;
    createSortButton(columnName: any): HTMLDivElement;
    toggleSortPlaceHolder(): void;
    showSortPanel(): void;
    hideSortPanel(): void;
    initSortData(): void;
}
