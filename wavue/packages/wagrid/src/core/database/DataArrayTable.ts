// src/core/data/WaDataArrayTable.ts
import { WaBase } from "../base/Base";
import { COLUMN_KEYS } from "@/core/columns/ColumnEnum";

export class WaDataArrayTable<T extends Record<string, any> = Record<string, any>> extends WaBase {
  tableName: string;
  data: T[][];
  currentRowId: number;
  type: string;

  constructor(tableName: string) {
    super();
    this.tableName = tableName;
    this.data = [];
    this.currentRowId = -1;
    this.type = "table";
  }

  // ---------- Select ----------
  selectRows<K extends keyof T>(arrayIndex: number, field: K, value: T[K], topIndex?: number): T[] {
    const bucket = this.data[arrayIndex] ?? [];
    const result: T[] = [];
    for (let i = 0; i < bucket.length; i++) {
      const row = bucket[i];
      if (row[field] === value) {
        result.push(row);
        if (topIndex !== undefined && result.length === topIndex) break;
      }
    }
    return result;
  }

  selectRow<K extends keyof T>(arrayIndex: number, field: K, value: T[K]): T | null {
    const rows = this.selectRows(arrayIndex, field, value, 1);
    return rows.length ? rows[0] : null;
  }

  selectRowByRowIndex(arrayIndex: number, rowIndex: number): T | undefined {
    return this.data[arrayIndex]?.[rowIndex];
  }

  selectRowByRowId(arrayIndex: number, rowId: number): T | null {
    const k = COLUMN_KEYS.rowId as keyof T;
    const rows = this.selectRows(arrayIndex, k, rowId as unknown as T[typeof k], 1);
    return rows.length ? rows[0] : null;
  }

  selectRowIndex<K extends keyof T>(arrayIndex: number, field: K, value: T[K]): number | null {
    const bucket = this.data[arrayIndex] ?? [];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][field] === value) return i;
    }
    return null;
  }

  selectRowIndexByRowId(arrayIndex: number, rowId: number): number | null {
    const k = COLUMN_KEYS.rowId as keyof T;
    return this.selectRowIndex(arrayIndex, k, rowId as unknown as T[typeof k]);
  }

  selectRowRange(arrayIndex: number, startRowIndex: number, endRowIndex?: number): T[] {
    const bucket = this.data[arrayIndex] ?? [];
    const end = endRowIndex === undefined ? bucket.length - 1 : endRowIndex;
    if (startRowIndex < 0 || startRowIndex >= bucket.length) return [];
    if (end < startRowIndex) return [];
    return bucket.slice(startRowIndex, Math.min(end + 1, bucket.length));
  }

  selectValue<K extends keyof T>(arrayIndex: number, rowIndex: number, field: K): T[K] | undefined {
    return this.data[arrayIndex]?.[rowIndex]?.[field];
  }

  isRow<K extends keyof T>(arrayIndex: number, field: K, value: T[K]): boolean {
    return this.selectRows(arrayIndex, field, value, 1).length > 0;
  }

  // ---------- Insert ----------
  insertRows(arrayIndex: number, rows: T[]): void {
    const bucket = (this.data[arrayIndex] ??= []);
    if (this.type === "table") {
      const kId = COLUMN_KEYS.rowId as keyof T;
      const kMode = COLUMN_KEYS.rowMode as keyof T;
      rows.forEach((r) => {
        this.currentRowId += 1;
        (r as any)[kId] = this.currentRowId;
        (r as any)[kMode] = "";
      });
    }
    bucket.push(...rows);
  }

  insertRowsBefore(arrayIndex: number, rows: T[], rowIndex: number): void {
    const bucket = (this.data[arrayIndex] ??= []);
    if (this.type === "table") {
      const kId = COLUMN_KEYS.rowId as keyof T;
      const kMode = COLUMN_KEYS.rowMode as keyof T;
      rows.forEach((r) => {
        this.currentRowId += 1;
        (r as any)[kId] = this.currentRowId;
        (r as any)[kMode] = "";
      });
    }
    if (rowIndex < bucket.length) bucket.splice(rowIndex, 0, ...rows);
    else bucket.push(...rows);
  }

  insertRowsAfter(arrayIndex: number, rows: T[], rowIndex: number): void {
    const bucket = (this.data[arrayIndex] ??= []);
    if (this.type === "table") {
      const kId = COLUMN_KEYS.rowId as keyof T;
      const kMode = COLUMN_KEYS.rowMode as keyof T;
      rows.forEach((r) => {
        this.currentRowId += 1;
        (r as any)[kId] = this.currentRowId;
        (r as any)[kMode] = "";
      });
    }
    if (rowIndex + 1 < bucket.length) bucket.splice(rowIndex + 1, 0, ...rows);
    else bucket.push(...rows);
  }

  insert(arrayIndex: number, row: T): void {
    const bucket = (this.data[arrayIndex] ??= []);
    if (this.type === "table") {
      const kId = COLUMN_KEYS.rowId as keyof T;
      const kMode = COLUMN_KEYS.rowMode as keyof T;
      this.currentRowId += 1;
      (row as any)[kId] = this.currentRowId;
      (row as any)[kMode] = "";
    }
    bucket.push(row);
  }

  insertBefore(arrayIndex: number, row: T, rowIndex: number): void {
    const bucket = (this.data[arrayIndex] ??= []);
    if (this.type === "table") {
      const kId = COLUMN_KEYS.rowId as keyof T;
      const kMode = COLUMN_KEYS.rowMode as keyof T;
      this.currentRowId += 1;
      (row as any)[kId] = this.currentRowId;
      (row as any)[kMode] = "";
    }
    if (rowIndex < bucket.length) bucket.splice(rowIndex, 0, row);
    else bucket.push(row);
  }

  insertAfter(arrayIndex: number, row: T, rowIndex: number): void {
    const bucket = (this.data[arrayIndex] ??= []);
    if (this.type === "table") {
      const kId = COLUMN_KEYS.rowId as keyof T;
      const kMode = COLUMN_KEYS.rowMode as keyof T;
      this.currentRowId += 1;
      (row as any)[kId] = this.currentRowId;
      (row as any)[kMode] = "";
    }
    if (rowIndex + 1 < bucket.length) bucket.splice(rowIndex + 1, 0, row);
    else bucket.push(row);
  }

  // ---------- Remove ----------
  remove(): void;
  remove(arrayIndex: number): void;
  remove(arrayIndex: number, rowIndex: number): void;
  remove(arrayIndex?: number, rowIndex?: number): void {
    if (arguments.length === 2) {
      const bucket = this.data[arrayIndex!];
      if (bucket) bucket.splice(rowIndex!, 1);
    } else if (arguments.length === 1) {
      this.data[arrayIndex!] = [];
    } else {
      this.data = [];
    }
  }

  removeByRowId(arrayIndex: number, rowId: number): void {
    const idx = this.selectRowIndexByRowId(arrayIndex, rowId);
    if (idx !== null) this.remove(arrayIndex, idx);
  }

  // ---------- Update ----------
  update<K extends keyof T>(
    arrayIndex: number,
    columnName: T[Extract<keyof T, string>],
    field: K,
    value: T[K]
  ): void {
    const kName = COLUMN_KEYS.name as keyof T;
    const rows = this.selectRows(arrayIndex, kName, columnName as T[typeof kName]);
    rows.forEach((r) => (r[field] = value));
  }

  updateRow<K extends keyof T>(
    arrayIndex: number,
    columnName: T[Extract<keyof T, string>],
    field: K,
    value: T[K]
  ): void {
    this.update(arrayIndex, columnName, field, value);
  }

  updateByRowIndex<K extends keyof T>(arrayIndex: number, rowIndex: number, field: K, value: T[K]): void {
    const row = this.data[arrayIndex]?.[rowIndex];
    if (row) row[field] = value;
  }

  updateByRowId<K extends keyof T>(arrayIndex: number, rowId: number, field: K, value: T[K]): void {
    const row = this.selectRowByRowId(arrayIndex, rowId);
    if (row) row[field] = value;
  }

  // ---------- Count ----------
  count(): number;
  count(arrayIndex: number): number;
  count<K extends keyof T>(arrayIndex: number, field: K, value: T[K]): number;
  count(arrayIndex?: number, field?: keyof T, value?: any): number {
    if (arguments.length === 3) {
      return this.selectRows(arrayIndex as number, field as keyof T, value).length;
    } else if (arguments.length === 1) {
      return (this.data[arrayIndex as number] ?? []).length;
    } else {
      return this.data.length;
    }
  }

  // ---------- Utils ----------
  makeColIndex(): void {
    const kColIndex = COLUMN_KEYS.colIndex as keyof T;
    for (let a = 0; a < this.data.length; a++) {
      const bucket = this.data[a] ?? [];
      bucket.forEach((row, idx) => ((row as any)[kColIndex] = idx));
    }
  }
}


// import {WaBase} from "../base/Base";
// import {COLUMN_KEYS} from "@/core/columns/ColumnEnum"

// export class WaDataArrayTable extends WaBase {

//     tableName: string;
//     data: object[][];
//     currentRowId: number;
//     type: string;

//     constructor(tableName: string) {
//         super();
//         this.tableName = tableName;
//         this.data = [];
//         this.currentRowId = -1;
//         this.type = 'table';
//     }

//     /**
//      * select functions
//      */
//     selectRows(arrayIndex: any, field: any, value: any, topIndex?: any) {
//         let result: object[] = [];
//         for (let i = 0, len = this.data[arrayIndex].length; i < len; i++) {
//             let dataRow = this.data[arrayIndex][i];
//             if (dataRow[field] == value) {
//                 result.push(dataRow);
//                 if (topIndex != undefined) {
//                     if (result.length == topIndex) break;
//                 }
//             }
//         }
//         return result;
//     }

//     selectRow(arrayIndex: any, field: any, value: any) {
//         let dataRows = this.selectRows(arrayIndex, field, value, 1);
//         return dataRows.length > 0 ? dataRows[0] : null;
//     }

//     selectRowByRowIndex(arrayIndex: any, rowIndex: any) { return this.data[arrayIndex][rowIndex]; }

//     selectRowByRowId(arrayIndex: any, rowId: any) {
//         let dataRows = this.selectRows(arrayIndex, COLUMN_KEYS.rowId, rowId, 1);
//         return dataRows.length > 0 ? dataRows[0] : null;
//     }

//     selectRowIndexByRowId(arrayIndex: any, rowId: any) { return this.selectRowIndex(arrayIndex, COLUMN_KEYS.rowId, rowId); }

//     selectRowIndex(arrayIndex: any, field: any, value: any) {
//         let result = null;
//         for (let i = 0, len = this.data[arrayIndex].length; i < len; i++) {
//             let dataRow = this.data[arrayIndex][i];
//             if (dataRow[field] == value) { result = i; break; }
//         }
//         return result;
//     }

//     selectRowIdByRowIndex(arrayIndex: any, rowIndex: any) {
//         const dataRow = this.selectRowByRowIndex(arrayIndex, rowIndex);
//         return dataRow[COLUMN_KEYS.rowId];
//     }

//     selectRowRange(arrayIndex: any, startRowIndex: any, endRowIndex: any) {
//         if (endRowIndex == undefined) endRowIndex = this.count() - 1

//         const result = [];
//         for (let i = startRowIndex; i <= endRowIndex; i++) result.push(this.data[i]);
//         return result;
//     }

//     selectValue(arrayIndex: any, rowIndex: any, field: any) {
//         return this.data[arrayIndex][rowIndex][field];
//     }

//     isRow(arrayIndex: any, field: any, value: any) {
//         let dataRows = this.selectRows(arrayIndex, field, value, 1);
//         return dataRows.length > 0;
//     }

//     /**
//      * Insert
//      */
//     insertRows(arrayIndex: any, dataRows: any) {
//         if (this.type == 'table') {
//             dataRows.map(dataRow => {
//                 this.currentRowId += 1;
//                 dataRow[COLUMN_KEYS.rowId] = this.currentRowId;
//                 dataRow[COLUMN_KEYS.rowMode] = '';
//             });
//         }
//         if (this.null(this.data[arrayIndex])) this.data[arrayIndex] = [];
//         this.data[arrayIndex].push(...dataRows);
//     }

//     insertRowsBefore(arrayIndex: any, dataRows: any, rowIndex: any) {
//         if (this.type == 'table') {
//             dataRows.map(dataRow => {
//                 this.currentRowId += 1;
//                 dataRow[COLUMN_KEYS.rowId] = this.currentRowId;
//                 dataRow[COLUMN_KEYS.rowMode] = '';
//             });
//         }
//         if (this.null(this.data[arrayIndex])) this.data[arrayIndex] = [];
//         if (rowIndex < this.data[arrayIndex].length) this.data[arrayIndex].splice(rowIndex, 0, ...dataRows);
//         else this.data[arrayIndex].push(...dataRows);
//     }

//     insertRowsAfter(arrayIndex: any, dataRows: any, rowIndex: any) {
//         if (this.type == 'table') {
//             dataRows.map(dataRow => {
//                 this.currentRowId += 1;
//                 dataRow[COLUMN_KEYS.rowId] = this.currentRowId;
//                 dataRow[COLUMN_KEYS.rowMode] = '';
//             });
//         }
//         if (this.null(this.data[arrayIndex])) this.data[arrayIndex] = [];
//         if (rowIndex + 1 < this.data[arrayIndex].length) this.data[arrayIndex].splice(rowIndex + 1, 0, ...dataRows);
//         else this.data[arrayIndex].push(...dataRows);
//     }

//     insert(arrayIndex: any, dataRow: any) {
//         if (this.type == 'table') {
//             this.currentRowId += 1;
//             dataRow[COLUMN_KEYS.rowId] = this.currentRowId;
//             dataRow[COLUMN_KEYS.rowMode] = '';
//         }
//         if (this.null(this.data[arrayIndex])) this.data[arrayIndex] = [];

//         this.data[arrayIndex].push(dataRow);
//     }

//     insertBefore(arrayIndex: any, dataRow: any, rowIndex: any) {
//         if (this.type == 'table') {
//             this.currentRowId += 1;
//             dataRow[COLUMN_KEYS.rowId] = this.currentRowId;
//             dataRow[COLUMN_KEYS.rowMode] = '';
//         }
//         if (this.null(this.data[arrayIndex])) this.data[arrayIndex] = [];

//         if (rowIndex < this.data[arrayIndex].length) this.data[arrayIndex].splice(rowIndex, 0, dataRow);
//         else this.data[arrayIndex].push(dataRow);
//     }

//     insertAfter(arrayIndex: any, dataRow: any, rowIndex: any) {
//         if (this.type == 'table') {
//             this.currentRowId += 1;
//             dataRow[COLUMN_KEYS.rowId] = this.currentRowId;
//             dataRow[COLUMN_KEYS.rowMode] = '';
//         }
//         if (this.null(this.data[arrayIndex])) this.data[arrayIndex] = [];
//         if (rowIndex + 1 < this.data[arrayIndex].length) this.data[arrayIndex].splice(rowIndex + 1, 0, dataRow);
//         else this.data[arrayIndex].push(dataRow);
//     }

//     /**
//      * Remove
//      */
//     remove(arrayIndex?: any, rowIndex?: any) {
//         if (arguments.length == 2) this.data[arrayIndex].splice(rowIndex, 1);
//         else if (arguments.length == 1) this.data[arrayIndex] = [];
//         else this.data = [];
//     }

//     removeByRowId(arryIndex: any, rowId: any) {
//         let rowIndex = this.selectRowIndex(arryIndex, COLUMN_KEYS.rowId, rowId);
//         if (this.notNull(rowIndex)) this.remove(rowIndex);
//     }

//     /**
//      * Update
//      */

//     update(arrayIndex: any, columnName: any, field: any, value: any) {
//         let dataRows = this.selectRows(arrayIndex, COLUMN_KEYS.name, columnName);
//         dataRows.map(dataRow => dataRow[field] = value);
//     }
//     updateRow(arrayIndex: any, columnName: any, field: any, value: any) {
//         let dataRows = this.selectRows(arrayIndex, COLUMN_KEYS.name, columnName);
//         dataRows.map(dataRow => dataRow[field] = value);
//     }
//     updateByRowIndex(arrayIndex: any, rowIndex: any, name: any, value: any) {
//         let dataRow = this.data[arrayIndex][rowIndex];
//         dataRow[name] = value;
//     }

//     updateByRowId(arrayIndex: any, rowId: any, name: any, value: any) {
//         let dataRow = this.selectRowByRowId(arrayIndex, rowId);
//         dataRow[name] = value;
//     }

//     count(arrayIndex?: any, field?: any, value?: any) : number {
//         if (arguments.length == 3) {
//             return this.selectRows(arrayIndex, field, value).length;
//         }
//         else if (arguments.length == 1) {
//             return this.data[arrayIndex].length;
//         }
//         else {
//             return this.data.length;
//         }
//     }

//     makeColIndex () : void {
//         for (let i = 0; i < this.count(); i++) {
//             const columns = this.data[i];
//             columns.map((column: any, index: any) => column[COLUMN_KEYS.colIndex] = index);
//         }
//     }
// }