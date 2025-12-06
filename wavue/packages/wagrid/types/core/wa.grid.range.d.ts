import { WaGrid } from './wa.grid';
export declare class WaGridRange {
    grid: WaGrid;
    selector: string;
    constructor(grid: WaGrid);
    removePanelRange: (panelName?: string) => void;
    selectRange: (startRowIndex: any, lastRowIndex: any, startCellIndex?: any, lastCellIndex?: any, topRowIndex?: number) => any;
    setRange: (startRowIndex: any, lastRowIndex: any, startCellIndex: any, lastCellIndex: any, topRowIndex: any, type?: string) => any;
    setRangeValue: (startRowIndex: any, lastRowIndex: any, startCellIndex: any, lastCellIndex: any) => void;
    removeRange: (startRowIndex: any, lastRowIndex: any, startCellIndex?: any, lastCellIndex?: any) => void;
    addRange: (startRowIndex: number, lastRowIndex: number, startCellIndex: number, lastCellIndex: number, topRowIndex: number) => void;
}
