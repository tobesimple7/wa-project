import {WaColumnProperty} from "@/core/columns/WaGridColumn.enum"
import {WaGridCore} from "@/core/wa.grid.core";

export class WaGridBaseColumns {

    constructor() {
    }

    /**
     * Column Functions
     */

    setFixedColumn(this: WaGridCore, fixedColumnIndex: number) { this.classColumn.setFixedColumn(fixedColumnIndex); }

    removeFixedColumn(this: WaGridCore) { this.classColumn.removeFixedColumn(); }


    /**
     * Columns API.
     */

    getColumn(this: WaGridCore, name: string, table?: any) { return this.isNull(table, this.column_table).selectRow(WaColumnProperty.name, name); }

    getColumns(this: WaGridCore, table?: any) { return this.isNull(table, this.column_table).select();  }

    getColumnByIndex(this: WaGridCore, columnIndex: number, table?: any) { return this.isNull(table, this.column_table).selectRowByRowIndex(columnIndex); }

    getColumnName(this: WaGridCore, columnIndex: number, table?: any) { return this.isNull(table, this.column_table).selectValue(columnIndex, WaColumnProperty.name); }

    getColumnIndex(this: WaGridCore, columnName: string, table?: any) { return this.isNull(table, this.column_table).selectRowIndex(WaColumnProperty.name, columnName); }

    setColumn(this: WaGridCore, columnName: string, property: string, value: any, table?: any) { this.isNull(table, this.column_table).updateRow(columnName, property, value); }

    /**
     * Filter Columns
     */

    getFilterColumn(this: WaGridCore, columnName: string) { return this.getColumn(columnName, this.filter_column_table); }

    getFilterColumnName(this: WaGridCore, columnIndex: number): string { return this.getColumnName(columnIndex, this.filter_column_table); }

    getFilterColumnIndex(this: WaGridCore, columnName: string): number { return this.getColumnIndex(columnName, this.filter_column_table); }

    /**
     * Columns API
     */

    setTopColumns(this: WaGridCore, topColumns) { this.classTop.setTopColumns(topColumns); }

    setFooterColumns(this: WaGridCore, footerColumns) { this.classFooter.setFooterColumns(footerColumns); }

    /**
     * Header Columns API.
     */

    getHeaderColumn(this: WaGridCore, rowIndex: number, columnIndex: number) { return this.classHeader.getHeaderColumn(rowIndex, columnIndex); }

    getHeaderColumnByNumber(this: WaGridCore, num) { return this.classHeader.getHeaderColumnByNumber(num); }

    addColumn(this: WaGridCore, addColumn: any, targetColumnIndex: number, orderType: string) { this.classColumn.addColumn(addColumn, targetColumnIndex, orderType);}

    removeColumn(this: WaGridCore, targetColumnIndex: number) { this.classColumn.removeColumn(targetColumnIndex); }

    setHeaderProperty(this: WaGridCore, rowIndex: number, colIndex: number, property: string, value: any) { this.classHeader.setHeaderProperty(rowIndex, colIndex, property, value); }


}