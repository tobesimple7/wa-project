import { WaGrid } from '../wa.grid';
export declare class WaGridBaseColumns {
    constructor();
    /**
     * Column Functions
     */
    setFixedColumn(this: WaGrid, fixedColumnIndex: number): void;
    removeFixedColumn(this: WaGrid): void;
    /**
     * Columns API.
     */
    getColumn(this: WaGrid, name: string, table?: any): any;
    getColumns(this: WaGrid, table?: any): any;
    getColumnByIndex(this: WaGrid, columnIndex: number, table?: any): any;
    getColumnName(this: WaGrid, columnIndex: number, table?: any): any;
    getColumnIndex(this: WaGrid, columnName: string, table?: any): any;
    setColumn(this: WaGrid, columnName: string, property: string, value: any, table?: any): void;
    /**
     * Filter Columns
     */
    getFilterColumn(this: WaGrid, columnName: string): any;
    getFilterColumnName(this: WaGrid, columnIndex: number): string;
    getFilterColumnIndex(this: WaGrid, columnName: string): number;
    /**
     * Columns API
     */
    setTopColumns(this: WaGrid, topColumns: any): void;
    setFooterColumns(this: WaGrid, footerColumns: any): void;
    /**
     * Header Columns API.
     */
    getHeaderColumn(this: WaGrid, rowIndex: number, columnIndex: number): object;
    getHeaderColumnByNumber(this: WaGrid, num: any): any;
    addColumn(this: WaGrid, addColumn: any, targetColumnIndex: number, orderType: string): void;
    removeColumn(this: WaGrid, targetColumnIndex: number): void;
    setHeaderProperty(this: WaGrid, rowIndex: number, colIndex: number, property: string, value: any): void;
}
