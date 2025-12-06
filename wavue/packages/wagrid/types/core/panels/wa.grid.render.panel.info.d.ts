import { WaGrid } from '../wa.grid';
export declare class WaGridRenderPanelInfo {
    /**
     * num, mode, checkbox
     */
    grid: WaGrid;
    selector: string;
    column: any;
    columnIndex: number;
    columnName: string;
    columnType: string;
    valueName: string;
    textName: string;
    rowIndex: number;
    cellValue: any;
    cellText: any;
    align: string;
    className: string;
    width: number;
    visible: boolean;
    editable: boolean;
    tableCell: any;
    panelName: string;
    constructor(grid: WaGrid);
    start(panelName: any, tableCell: any, column: any, rowIndex: any, columnIndex: any): void;
    createHtml(): void;
    setBounding(): void;
}
