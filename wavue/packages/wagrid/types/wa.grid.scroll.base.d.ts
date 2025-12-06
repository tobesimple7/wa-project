import { WaGrid } from './wa.grid';
export declare class WaGridScrollBase {
    grid: WaGrid;
    selector: string;
    constructor(grid: any);
    setPanelSize(): void;
    setBarPosition(type: string, topRowIndex?: number): void;
    setBarPositionByDirection(type: string, rowIndex?: number): number;
    getContentPanelLeft(value: any): string;
    setContentPanelLeft(value: any): void;
    setContentPanelLeftMove(value: any): void;
    setColumnWidth(panelName: any, colIndex: any, value: any): void;
    setColumnWidth20(panelName: any, colIndex: any, value: any): void;
    setColumnWidth22(panelName: any, colIndex: any, value: any): void;
    getFixedColumnsWidth(): number;
    setAllColumnWidth(arr: any): void;
    setPageRowCount(panelName?: string): void;
}
