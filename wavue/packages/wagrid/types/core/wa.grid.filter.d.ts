import { WaGrid } from './wa.grid';
import { FilterType } from './wa.grid.types';
export declare class WaGridFilter {
    grid: WaGrid;
    selector: string;
    constructor(grid: WaGrid);
    showFilterPanel(): void;
    hideFilterPanel(): void;
    filters(): void;
    filter(data: any, filterColumn: any): any;
    filterNumberByType(filterType: FilterType, n: any, targetNumber: any): boolean;
    filterStringByType(filterType: FilterType, s: any, targetString: any): boolean;
    setFilterColumn(column: any, filterType: any, word: any): void;
    removeFilterColumn(column: any): void;
    createFilterCombo(column: any): HTMLSelectElement;
    addFilterComboOption(combo: any, value: any, text: any): void;
    initFilterData(): void;
}
