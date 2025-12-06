import { WaGrid } from '../wa.grid';
export declare class WaGridBaseIs {
    constructor();
    /**
     * Is Functions
     *
     */
    isEditableColumn(this: WaGrid, columnName: string): boolean;
    isSortableColumn(this: WaGrid, columnName?: string): boolean;
    isResizableColumn(this: WaGrid, columnName: string): boolean;
    isMovableColumn(this: WaGrid, columnName?: string): boolean;
    isAutoResizableColumn(this: WaGrid, columnName: boolean): boolean;
    isAutoWidthColumn(this: WaGrid, columnName: any): boolean;
    isClassName(this: WaGrid, element: any, className: any): boolean;
    isNotValidColumnType(this: WaGrid, columnType: string): boolean;
    isInPanel(this: WaGrid, e: MouseEvent, panelName: string): boolean;
    isSelectedCell(this: WaGrid, panelName: string, rowIndex: number, cellIndex: number): number;
    isSelectedHeaderCell(this: WaGrid, panelName: string, cellIndex: number): number;
    isSelectedCell31(this: WaGrid, rowIndex: number, cellIndex: number): number;
    isSelectedCell30(this: WaGrid, rowIndex: number, cellIndex: number): number;
    isColumnName(this: WaGrid, columnName: string): boolean;
    isColumnTypeNumber(this: WaGrid, columnName: string): boolean;
    isFilterColumnName(this: WaGrid, columnName: string): boolean;
    isLastTopRowIndex(this: WaGrid, rowIndex: number): boolean;
}
