import { WaGrid } from './wa.grid';
export declare class WaGridControl {
    grid: WaGrid;
    selector: string;
    constructor(grid: WaGrid);
    after_changeColumnOrder(): void;
    after_addColumn(): void;
    after_removeColumn(headerColumns: any, columns: any): void;
    after_showFilterPanel(): void;
    after_hideFilterPanel(): void;
    after_showSortrPanel(): void;
    after_hideSortPanel(): void;
    after_setColumnVisible(): void;
}
