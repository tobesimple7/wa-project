import { WaGrid } from '../wa.grid';
export declare class WaGridBaseEvent {
    constructor();
    event_input(this: WaGrid): void;
    event_input_icon(this: WaGrid): void;
    input_show(this: WaGrid, e: any, mode: any): void;
    input_hide(this: WaGrid): void;
    input_focus(this: WaGrid): void;
    editStart(this: WaGrid, e: any, mode: any): void;
    editing(this: WaGrid, e: any, mode: any): void;
    editEnd(this: WaGrid, e?: any, mode?: any): void;
    /**
     * Event Functions
     *
     */
    tbs_addEventAll(this: WaGrid): void;
    event_columnSort(this: WaGrid, cell: any): boolean;
    event_mobileTouchDrag(this: WaGrid): void;
    event_columnResize(this: WaGrid, panelName: any): void;
    event_wheel(this: WaGrid): void;
    event_scrollButton(this: WaGrid): void;
    event_railClick(this: WaGrid): void;
    event_dragScrollBar(this: WaGrid): void;
    tbs_moveCellLine(this: WaGrid, cell: any, rowIndex: any, cellIndex: any): void;
    isMovedPositionInConstRange(this: WaGrid, startX: any, startY: any, lastX: any, lastY: any): boolean;
    executeEvent(this: WaGrid, eventType: string, param: any): void;
    tbs_getMaxRowIndexByMouseMove(this: WaGrid): any;
    tbs_getMinRowIndexByMouseMove(this: WaGrid): any;
    tbs_getMaxCellIndexByMouseMove(this: WaGrid): any;
    tbs_getMinCellIndexByMouseMove(this: WaGrid): any;
    tbs_getMaxRowIndexByMouseMove2(this: WaGrid, panelName: any): any;
    tbs_getMinRowIndexByMouseMove2(this: WaGrid, panelName: any): any;
    tbs_getMaxCellIndexByMouseMove2(this: WaGrid, panelName: any): any;
    tbs_getMinCellIndexByMouseMove2(this: WaGrid, panelName: any): any;
    getOffset(this: WaGrid, el: any): {
        top: number;
        left: number;
    };
    tbs_moveNextRowCell(this: WaGrid, type: any): void;
    tbs_moveCell(this: WaGrid, type: any): void;
}
