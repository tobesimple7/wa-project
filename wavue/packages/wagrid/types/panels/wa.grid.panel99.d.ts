import { WaGridPanelBase } from './wa.grid.panel.base';
import { WaGrid } from '../wa.grid';
export declare class WaGridPanel99 extends WaGridPanelBase {
    constructor(grid: WaGrid);
    createHtml(parentElement: any): void;
    createTable(): void;
    panel99_select(): void;
    setPageRowCountList(data?: any[]): void;
    showPagePanel(): void;
    hidePagePanel(): void;
}
