import {WaBase} from '../base/Base';
import {WaDataTable} from "./DataTable";
import {WaDataArrayTable} from "./DataArrayTable";

export type DataTableType = WaDataTable | WaDataArrayTable;

export class WaDatabase extends WaBase {
    tables: DataTableType[];

    constructor() {
        super();
        this.tables = [];
    }

    createTable(tableName: string): WaDataTable {
        const table = new WaDataTable(tableName);
        table.type = 'table';
        this.tables.push(table);

        return this.getTable(tableName) as WaDataTable;
    }

    createView(tableName: string): WaDataTable {
        const table = new WaDataTable(tableName);
        table.type = 'view';
        this.tables.push(table);

        return this.getTable(tableName) as WaDataTable;
    }

    createArrayTable(tableName: string): WaDataArrayTable {
        const table = new WaDataArrayTable(tableName);
        table.type = 'table';
        this.tables.push(table);

        return this.getTable(tableName) as WaDataArrayTable;
    }

    removeTable(tableName: string): void {
        for (let i = 0, len = this.tables.length; i < len; i++) {
            const table: DataTableType = this.tables[i];
            if (table!.tableName === tableName) {
                this.tables.splice(i, 1);
                break;
            }
        }
    }

    getTable(tableName: string): DataTableType {
        let result: DataTableType = null;
        for (let i: number = 0, len: number = this.tables.length; i < len; i++) {
            const table: DataTableType = this.tables[i];
            if (table!.tableName == tableName) {
                result = table;
                break;
            }
        }
        return result;
    }
}

