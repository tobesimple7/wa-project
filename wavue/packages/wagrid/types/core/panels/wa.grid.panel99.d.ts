import { WaPanelBase } from './wa.grid.panel.base';
import { WaGrid } from '../wa.grid';
export declare class WaPanel99 extends WaPanelBase {
    constructor(grid: WaGrid);
    createHtml(parentElement: any): void;
    createTable(): void;
    panel99_select(): void;
    setPageRowCountList(data?: any[]): void;
    showPagePanel(): void;
    hidePagePanel(): void;
}
