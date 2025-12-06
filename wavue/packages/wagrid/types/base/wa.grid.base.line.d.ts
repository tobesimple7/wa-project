import { WaGrid } from '../wa.grid';
export declare class WaGridBaseLine {
    constructor();
    /**
     * Select Line Functions
     *
     */
    getFirstSelectedTableCell(this: WaGrid, panelName: string): any;
    getLastSelectedTableCell(this: WaGrid, panelName: string): any;
    clearSelectedLine(this: WaGrid): void;
    setSelectedLine(this: WaGrid, lineWidth: number, lineHeight: number, rectTop: number, rectBottom: number, rectLeft: number, rectRight: number): void;
    displaySelectedLine(this: WaGrid): void;
    displayOneSelection(this: WaGrid, startRowIndex: number, startCellIndex: number): void;
    getFirstDisplayRowIndex(this: WaGrid, panelName?: string): number;
    getFirstRowIndex(this: WaGrid, panelName?: string): number;
    getLastRowIndex(this: WaGrid): number;
    getLastTableRowIndex(this: WaGrid): number;
}
