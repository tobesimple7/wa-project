import { WaBase } from '../wa.base';
import { WaGrid } from '../wa.grid';
export declare class WaPanelBase extends WaBase {
    grid: WaGrid;
    selector: string;
    panelName: string;
    panelName1: string;
    panelName2: string;
    panelName0: string;
    constructor(grid: WaGrid);
    /**
     *  Panel Interface
     */
    createHtml(parentElement: any): void;
    createEtcHtml(parentElement: any): void;
}
