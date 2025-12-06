import { WaGridPanelBase } from './wa.grid.panel.base';
import { WaGrid } from '../wa.grid';
export declare class WaGridPanel10 extends WaGridPanelBase {
    constructor(grid: WaGrid);
    createHtml(parentElement: any): void;
    createTable(): void;
    panel10_select(): void;
    showToolbarPanel(): void;
    hideToolbarPanel(): void;
    showToolbarButtons(buttonType: any): void;
    hideToolbarButtons(buttonType: any): void;
}
