import { WaGrid } from './wa.grid';
import { WaColumnProperty } from './wa.grid.types';
export declare class WaGridGroup {
    grid: WaGrid;
    selector: string;
    openDepth: number;
    splitChar: string;
    constructor(grid: any);
    setGroupData(data: any, openDepth?: number, isFirst?: boolean): void;
    createGroupData(): void;
    createGroupKeyData(dataRows: any, depth?: number): any[];
    getGroupKeyByDepth(row: any, depth: any): string;
    getGroupKeyRowByDepth(row: any, depth: any): {};
    /**
     * Group Sum, Avg
     */
    getGroupDepthSummary(rowIndex: any): void;
    getGroupSummary(): void;
    /**
     * spanIcon, spanImg, spanText
     */
    setGroupIcon(tableCell: any, rowIndex: number): void;
    toggleGroupIcon(element: any, type: any): void;
    setGroupFolding(tableCell: any): void;
    getGroupFoldingStatus(tableCell: any): WaColumnProperty.open | WaColumnProperty.closed;
    openChildRow(arrayRows: any, rootRow: any): void;
    openGroupRow(rowIndex?: number): void;
    closeChildRow(rowIndex: any): void;
    closeGroupRow(rowIndex: any): void;
    /**
     * Group Button
     */
    changeGroupButtonOrder(name: any, text: any, order: any, targetIndex: any): void;
    addGroupButton(name: any, text: any, order: any, targetIndex: any): void;
    removeGroupButton(element: any): void;
    removeGroupButtonList(): void;
    getGroupButtonList(): void;
    createGroupButton(columnName: any): HTMLDivElement;
    toggleGroupPlaceHolder(): void;
    destroy(): void;
    showGroupPanel(): void;
    hideGroupPanel(): void;
    initGroupData(): void;
    getGroupRow(columnName: any): object;
    expandGroup(): void;
    collapseGroup(): void;
}
