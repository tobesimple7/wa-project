import { WaGrid } from './wa.grid';
import { WaColumnProperty } from './wa.grid.types';
export declare class WaGridTree {
    grid: WaGrid;
    selector: string;
    openDepth: number;
    constructor(grid: any);
    createTreeData(): void;
    setTreeSortColumns(sortColumns: any): void;
    setTreeData(data: any, openDepth?: number, isFirst?: boolean): void;
    setTreeIcon(tableCell: any, rowIndex: any): void;
    toggleTreeIcon(element: any, type?: any): void;
    getTreeFoldingStatus(tableCell: any): WaColumnProperty.open | WaColumnProperty.closed;
    setTreeFolding(tableCell: any): void;
    getTreechildRows(folding: any, rowIndex: any, isAll?: boolean): any[];
    openTreeRow(rowIndex: any): void;
    closeTreeRow(rowIndex: any): void;
    addTreeRows(rowIndex: any): void;
    addTreeRow(startRowIndex: any, row: any): void;
    removeTreeRow(row: any): void;
}
