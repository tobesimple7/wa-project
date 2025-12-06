import { WaBase } from '../wa.base';
import { WaDataTable } from './wa.data.table';
import { WaDataArrayTable } from './wa.data.array.table';
export type DataTableType = WaDataTable | WaDataArrayTable;
export declare class WaDatabase extends WaBase {
    tables: DataTableType[];
    constructor();
    createTable(tableName: string): WaDataTable;
    createView(tableName: string): WaDataTable;
    createArrayTable(tableName: string): WaDataArrayTable;
    removeTable(tableName: string): void;
    getTable(tableName: string): DataTableType;
}
