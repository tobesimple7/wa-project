import { WaGrid } from '../wa.grid';
export declare class WaFooter {
    grid: WaGrid;
    selector: string;
    constructor(grid: WaGrid);
    setFooterColumns(columns: any): void;
    setFooterData(): void;
    setFooterValue(rowIndex: any, columnName: any, value: any): void;
}
