import { WaPanelBase } from '../wa.grid.panel.base';
import { WaGrid } from '../../wa.grid';
export declare class WaPanel20 extends WaPanelBase {
    isChecked: boolean;
    constructor(grid: WaGrid);
    createHtml(parentElement: any): void;
    createTable(): void;
    setDataPanel(topRowIndex?: number): void;
    setDataPanel1(param: any): void;
    setDataPanel2(param: any): void;
    setDataPanel0(param: any): void;
    setDataPanelSub(panelName: string, param: any): void;
    panel21_select(): void;
    panel20_select(panelName: any): void;
}
