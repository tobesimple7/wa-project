import { WaGrid } from '../wa.grid';
export declare class WaGridBaseData {
    constructor();
    /**
     * Data Value, Text
     */
    getValue(this: WaGrid, rowIndex: number, columnName: string, table?: any): any;
    getValueByColumnIndex(this: WaGrid, rowIndex: number, columnIndex: number, table?: any): any;
    getText(this: WaGrid, rowIndex: number, columnName: string, table?: any): any;
    getTextByIndex(this: WaGrid, rowIndex: number, columnIndex: number, table?: any): any;
    setValue(this: WaGrid, rowIndex: number, columnName: string, value: any): void;
    setValueByColumnIndex(this: WaGrid, rowIndex: number, cellIndex: number, value: any): void;
    /** info_column_table */
    getInfoValue(this: WaGrid, columnName: string, property: string): any;
    setInfoValue(this: WaGrid, columName: string, property: string, value: any): void;
    /**
     * Check Box Options
     */
    getTrueValue(this: WaGrid, columnName: string): any;
    getFalseValue(this: WaGrid, columnName: string): any;
    getElseValue(this: WaGrid, columnName: string): any;
    getBooleanValue(this: WaGrid, columnName: string, valueType: string): any;
    reverseBoolean(this: WaGrid, columnName: string, value: any): any;
    /**
     * Format Functions
     *
     */
    getFormatValue(this: WaGrid, column: any, value: any): any;
    getFormatText(this: WaGrid, column: any, value: any): any;
    getFormat(this: WaGrid, column: any, value: any): any;
    getFormatNumber(this: WaGrid, column: any, value: any): any;
    getFormatDate(this: WaGrid, column: any, value: any): any;
}
