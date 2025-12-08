import { WaBase } from '../base/Base'
import { CellType } from '@/core/Grid.types'
import { SortColumnDef } from '@/core/sort/SortColumnDef'
import { COLUMN_KEYS } from '@/core/columns/ColumnEnum'
import { ColumnDef } from '../columns/ColumnDef'

type Row = Record<string, any>
type KeyOf<T> = keyof T & string

export class WaDataTable<T extends Row = Row> extends WaBase {
  tableName: string
  data: T[]
  currentRowId: number
  type: string

  constructor(tableName: string) {
    super()
    this.tableName = tableName
    this.data = []
    this.currentRowId = -1
    this.type = 'table'
  }

  /**
   * select functions
   */
  select(): T[] {
    // TODO: where/order 조건식 설계되면 타입 안전하게 확장 가능
    return this.data
  }

  // ── selectRows: 오버로드 (파라미터 없음 = 전체, 있으면 필터) ──
  selectRows(): T[]
  selectRows<K extends KeyOf<T>>(field: K, value: T[K], topIndex?: number): T[]
  selectRows(field?: string, value?: unknown, topIndex?: number): T[] {
    if (field === undefined) return this.data

    const out: T[] = []
    for (let i = 0, len = this.data.length; i < len; i++) {
      const row = this.data[i]
      if (row[field] == value) {
        out.push(row)
        if (topIndex !== undefined && out.length === topIndex) break
      }
    }
    return out
  }

  selectRow<K extends KeyOf<T>>(field: K, value: T[K]): T | null {
    const rows = this.selectRows(field, value, 1)
    return rows.length > 0 ? rows[0] : null
  }

  selectRowByRowIndex(rowIndex: number): T {
    return this.data[rowIndex]
  }

  selectRowByRowId(rowId: T[typeof COLUMN_KEYS.rowId]): T | null {
    const rows = this.selectRows(COLUMN_KEYS.rowId as KeyOf<T>, rowId as any, 1)
    return rows.length > 0 ? rows[0] : null
  }

  selectRowIndexByRowId(rowId: T[typeof COLUMN_KEYS.rowId]): number {
    return this.selectRowIndex(COLUMN_KEYS.rowId as KeyOf<T>, rowId as any)
  }

  selectRowIndex<K extends KeyOf<T>>(field: K, value: T[K]): number {
    let result: number = null as unknown as number
    for (let i = 0, len = this.data.length; i < len; i++) {
      const row = this.data[i]
      if (row[field] == value) { result = i; break }
    }
    return result
  }

  selectRowIdByRowIndex(rowIndex: number) {
    const row = this.selectRowByRowIndex(rowIndex)
    return row[COLUMN_KEYS.rowId as KeyOf<T>]
  }

  selectRowRange(startRowIndex = 0, endRowIndex = this.count() - 1): T[] {
    const out: T[] = []
    for (let i = startRowIndex; i <= endRowIndex; i++) out.push(this.data[i])
    return out
  }

  selectValue<K extends KeyOf<T>>(rowIndex: number, field: K): T[K] {
    return this.data[rowIndex][field]
  }

  isRow<K extends KeyOf<T>>(field: K, value: T[K]) {
    return this.selectRows(field, value, 1).length > 0
  }

  /**
   * Insert
   */
  insertRows(rows: T[]) {
    if (this.type === 'table') {
      rows.forEach((row) => {
        this.currentRowId += 1
        ;(row as Row)[COLUMN_KEYS.rowId] = this.currentRowId
        ;(row as Row)[COLUMN_KEYS.rowMode] = 'I'
      })
    }
    this.data.push(...rows)
  }

  insertRowsBefore(rows: T[], rowIndex: number) {
    if (this.type === 'table') {
      rows.forEach((row) => {
        this.currentRowId += 1
        ;(row as Row)[COLUMN_KEYS.rowId] = this.currentRowId
        ;(row as Row)[COLUMN_KEYS.rowMode] = 'I'
      })
    }
    if (rowIndex < this.data.length) this.data.splice(rowIndex, 0, ...rows)
    else this.data.push(...rows)
  }

  insertRowsAfter(rows: T[], rowIndex: number) {
    if (this.type === 'table') {
      rows.forEach((row) => {
        this.currentRowId += 1
        ;(row as Row)[COLUMN_KEYS.rowId] = this.currentRowId
        ;(row as Row)[COLUMN_KEYS.rowMode] = 'I'
      })
    }
    if (rowIndex + 1 < this.data.length) this.data.splice(rowIndex + 1, 0, ...rows)
    else this.data.push(...rows)
  }

  insert(row: T) {
    if (this.type === 'table') {
      this.currentRowId += 1
      ;(row as Row)[COLUMN_KEYS.rowId] = this.currentRowId
      ;(row as Row)[COLUMN_KEYS.rowMode] = 'I'
    }
    this.data.push(row)
  }

  insertBefore(row: T, rowIndex: number) {
    if (this.type === 'table') {
      this.currentRowId += 1
      ;(row as Row)[COLUMN_KEYS.rowId] = this.currentRowId
      ;(row as Row)[COLUMN_KEYS.rowMode] = 'I'
    }
    if (rowIndex < this.data.length) this.data.splice(rowIndex, 0, row)
    else this.data.push(row)
  }

  insertAfter(row: T, rowIndex: number) {
    if (this.type === 'table') {
      this.currentRowId += 1
      ;(row as Row)[COLUMN_KEYS.rowId] = this.currentRowId
      ;(row as Row)[COLUMN_KEYS.rowMode] = 'I'
    }
    if (rowIndex + 1 < this.data.length) this.data.splice(rowIndex + 1, 0, row)
    else this.data.push(row)
  }

  /**
   * Remove
   */
  remove(rowIndex?: number) {
    if (arguments.length === 1) this.data.splice(rowIndex!, 1)
    else this.data = []
  }

  removeByRowId(rowId: T[typeof COLUMN_KEYS.rowId]) {
    const index = this.selectRowIndex(COLUMN_KEYS.rowId as KeyOf<T>, rowId as any)
    if (this.notNull(index)) this.remove(index)
  }

  /**
   * Update
   */
  update<K extends KeyOf<T>>(columnName: T[typeof COLUMN_KEYS.name], field: K, value: T[K]) {
    const rows = this.selectRows(COLUMN_KEYS.name as KeyOf<T>, columnName as any)
    rows.forEach((r) => (r[field] = value))
  }

  updateRow<K extends KeyOf<T>>(columnName: T[typeof COLUMN_KEYS.name], field: K, value: T[K]) {
    const rows = this.selectRows(COLUMN_KEYS.name as KeyOf<T>, columnName as any)
    rows.forEach((r) => (r[field] = value))
  }

  updateByRowIndex<K extends KeyOf<T>>(rowIndex: number, field: K, value: T[K]) {
    const row = this.data[rowIndex]
    row[field] = value
  }

  updateByRowId<K extends KeyOf<T>>(rowId: T[typeof COLUMN_KEYS.rowId], field: K, value: T[K]) {
    const row = this.selectRowByRowId(rowId)
    if (row) row[field] = value
  }

  count(): number
  count<K extends KeyOf<T>>(field: K, value: T[K]): number
  count(field?: string, value?: unknown): number {
    if (arguments.length > 0) return this.selectRows(field as any, value as any).length
    return this.data.length
  }

  /**
   * orderBy
   * @param column_table : 컬럼 메타(컬럼 타입/이름 등 포함)
   * @param sort_column_table : 정렬 스펙 테이블( name, order 등 )
   */
  orderBy(
    column_table: WaDataTable<ColumnDef>,
    sort_column_table: WaDataTable<SortColumnDef>
  ): T[] {
    return this.data.sort((a: Row, b: Row) => {
      for (let i = 0, len = sort_column_table.count(); i < len; i++) {
        const sortCol = sort_column_table.data[i] as SortColumnDef & Row
        const name = sortCol[COLUMN_KEYS.name] as string
        const order = (sortCol[COLUMN_KEYS.order] as string) || 'asc'

        const column = column_table.selectRow(COLUMN_KEYS.name as any, name) as Row | null
        const type = (column?.[COLUMN_KEYS.type] as CellType) ?? CellType.string

        if (order === 'asc') {
          if (type === CellType.number) {
            const x = a[name] != null && isNaN(a[name]) === false ? Number(String(a[name]).replace(/,/g, '')) : 0
            const y = b[name] != null && isNaN(b[name]) === false ? Number(String(b[name]).replace(/,/g, '')) : 0
            if (x < y) return -1
            else if (x > y) return 1
          } else {
            const xs = String(a[name] ?? '').toLowerCase()
            const ys = String(b[name] ?? '').toLowerCase()
            if (xs < ys) return -1
            else if (xs > ys) return 1
          }
        } else if (order === 'desc') {
          if (type === CellType.number) {
            const x = a[name] != null && isNaN(a[name]) === false ? Number(String(a[name]).replace(/,/g, '')) : 0
            const y = b[name] != null && isNaN(b[name]) === false ? Number(String(b[name]).replace(/,/g, '')) : 0
            if (x < y) return 1
            else if (x > y) return -1
          } else {
            const xs = String(a[name] ?? '').toLowerCase()
            const ys = String(b[name] ?? '').toLowerCase()
            if (xs < ys) return 1
            else if (xs > ys) return -1
          }
        }
      }
      return 0
    })
  }

  getSum(columnName: string) {
    let result = 0
    for (let i = 0, len = this.count(); i < len; i++) {
      const row = this.data[i] as Row
      const v = row[columnName]
      result += isNaN(v) ? 0 : parseFloat(v)
    }
    return result
  }

  getAvg(columnName: string) {
    const n = this.count()
    return n === 0 ? 0 : this.getSum(columnName) / n
  }

  getMax(columnName: string): number {
    const arr: number[] = []
    for (let i = 0, len = this.count(); i < len; i++) {
      const row = this.data[i] as Row
      const v = row[columnName]
      arr.push(isNaN(v) ? 0 : parseFloat(v))
    }
    return Math.max.apply(null, arr)
  }

  getMin(columnName: string): number {
    const arr: number[] = []
    for (let i = 0, len = this.count(); i < len; i++) {
      const row = this.data[i] as Row
      const v = row[columnName]
      arr.push(isNaN(v) ? 0 : parseFloat(v))
    }
    return Math.min.apply(null, arr)
  }
}

// import {WaBase} from '@/core/base/Base';
// import {CellType, SortColumnDef} from "@/core/Grid.types"
// import {COLUMN_KEYS} from "@/core/columns/ColumnEnum"
// export class WaDataTable extends WaBase {
//     tableName: string;
//     data: any[];
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

//     select() {
//         /**
//          * whereColumns = [*{name: 'userName', type: include | startWith | lastWith }, count: 10}]
//          * orderColumns = [*{name: 'userName', order: asc | desc }]
//          * return : [{}, {}];
//          */

//     }

//     selectRows(field?: string, value?: any, topIndex?: number) {
//         let result: object[] = [];
//         if (arguments.length == 0) {
//             result = this.data;
//         }
//         else {
//             for (let i = 0, len = this.data.length; i < len; i++) {
//                 let dataRow = this.data[i];
//                 if (dataRow[field] == value) {
//                     result.push(dataRow);
//                     if (topIndex != undefined) {
//                         if (result.length == topIndex) break;
//                     }
//                 }
//             }
//         }
//         return result;
//     }

//     selectRow(field: any, value: any): object {
//         const dataRows = this.selectRows(field, value, 1);
//         return dataRows.length > 0 ? dataRows[0] : null;
//     }

//     selectRowByRowIndex(rowIndex: number): object { return this.data[rowIndex]; }

//     selectRowByRowId(rowId: any) : object {
//         const dataRows: object[] = this.selectRows(COLUMN_KEYS.rowId, rowId, 1);
//         return dataRows.length > 0 ? dataRows[0] : null;
//     }

//     selectRowIndexByRowId(rowId: any) : number { return this.selectRowIndex(COLUMN_KEYS.rowId, rowId); }

//     selectRowIndex(field: any, value: any) : number {
//         let result: number = null;
//         for (let i = 0, len = this.data.length; i < len; i++) {
//             const dataRow = this.data[i];
//             if (dataRow[field] == value) { result = i; break; }
//         }
//         return result;
//     }

//     selectRowIdByRowIndex(rowIndex: any) {
//         const dataRow = this.selectRowByRowIndex(rowIndex);
//         return dataRow[COLUMN_KEYS.rowId];
//     }

//     selectRowRange(startRowIndex?: number, endRowIndex?: number) {
//         if (endRowIndex == undefined) endRowIndex = this.count() - 1

//         const result: object[] = [];
//         for (let i: number = startRowIndex!; i <= endRowIndex!; i++) result.push(this.data[i]);
//         return result;
//     }

//     selectValue(rowIndex: any, field: any) {
//         return this.data[rowIndex][field];
//     }

//     isRow(field: any, value: any) {
//         const dataRows = this.selectRows(field, value, 1);
//         return dataRows.length > 0;
//     }

//     /**
//      * Insert
//      */
//     insertRows(dataRows: any) {
//         if (this.type == 'table') {
//             dataRows.map(dataRow => {
//                 this.currentRowId += 1;
//                 dataRow[COLUMN_KEYS.rowId] = this.currentRowId;
//                 dataRow[COLUMN_KEYS.rowMode] = 'I';
//             });
//         }
//         this.data.push(...dataRows);
//     }

//     insertRowsBefore(dataRows: object[], rowIndex: number) {
//         if (this.type == 'table') {
//             dataRows.map(dataRow => {
//                 this.currentRowId += 1;
//                 dataRow[COLUMN_KEYS.rowId] = this.currentRowId;
//                 dataRow[COLUMN_KEYS.rowMode] = 'I';
//             });
//         }
//         if (rowIndex < this.data.length) this.data.splice(rowIndex, 0, ...dataRows);
//         else this.data.push(...dataRows);
//     }

//     insertRowsAfter(dataRows: object[], rowIndex: number) {
//         if (this.type == 'table') {
//             dataRows.map(dataRow => {
//                 this.currentRowId += 1;
//                 dataRow[COLUMN_KEYS.rowId] = this.currentRowId;
//                 dataRow[COLUMN_KEYS.rowMode] = 'I';
//             });
//         }

//         if (rowIndex + 1 < this.data.length) this.data.splice(rowIndex + 1, 0, ...dataRows);
//         else this.data.push(...dataRows);
//     }

//     insert(dataRow: object) {
//         if (this.type == 'table') {
//             this.currentRowId += 1;
//             dataRow[COLUMN_KEYS.rowId] = this.currentRowId;
//             dataRow[COLUMN_KEYS.rowMode] = 'I';
//         }
//         this.data.push(dataRow);
//     }

//     insertBefore(dataRow: object, rowIndex: any) {
//         if (this.type == 'table') {
//             this.currentRowId += 1;
//             dataRow[COLUMN_KEYS.rowId] = this.currentRowId;
//             dataRow[COLUMN_KEYS.rowMode] = 'I';
//         }

//         if (rowIndex < this.data.length) this.data.splice(rowIndex, 0, dataRow);
//         else this.data.push(dataRow);
//     }

//     insertAfter(dataRow: any, rowIndex: number) {
//         if (this.type == 'table') {
//             this.currentRowId += 1;
//             dataRow[COLUMN_KEYS.rowId] = this.currentRowId;
//             dataRow[COLUMN_KEYS.rowMode] = 'I';
//         }

//         if (rowIndex + 1 < this.data.length) this.data.splice(rowIndex + 1, 0, dataRow);
//         else this.data.push(dataRow);
//     }

//     /**
//      * Remove
//      */
//     remove(rowIndex?: number) {
//         if (arguments.length == 1) this.data.splice(rowIndex, 1);
//         else this.data = [];
//     }

//     removeByRowId(rowId: any) {
//         let rowIndex = this.selectRowIndex(COLUMN_KEYS.rowId, rowId);
//         if (this.notNull(rowIndex)) this.remove(rowIndex);
//     }

//     /**
//      * Update
//      */

//     update(columnName: string, field: string, value: any) {
//         let dataRows = this.selectRows(COLUMN_KEYS.name, columnName);
//         dataRows.map(dataRow => dataRow[field] = value);
//     }
//     updateRow(columnName: string, field: string, value: any) {
//         let dataRows = this.selectRows(COLUMN_KEYS.name, columnName);
//         dataRows.map(dataRow => dataRow[field] = value);
//     }
//     updateByRowIndex(rowIndex: number, name: string, value: any) {
//         let dataRow = this.data[rowIndex];
//         dataRow[name] = value;
//     }

//     updateByRowId(rowId: number, name: string, value: any) {
//         const dataRow = this.selectRowByRowId(rowId);
//         dataRow[name] = value;
//     }

//     count(field?: any, value?: any) {
//         if (arguments.length > 0) {
//             return this.selectRows(field, value).length;
//         }
//         else {
//             return this.data.length;
//         }
//     }

//     /**
//      * orderBy
//      * @param sortColumns : [{ name : , order :, dataType: string | number }, ...]
//      */
//     orderBy(column_table: WaDataTable, sort_column_table: WaDataTable) {
//         return this.data.sort((a, b) => {
//             for (let i = 0, len: number = sort_column_table.count(); i < len; i++) {
//                 const sortColumn: any = sort_column_table.data[i];
//                 const name: string = sortColumn[COLUMN_KEYS.name];
//                 const order: string = (sortColumn[COLUMN_KEYS.order]) ? sortColumn[COLUMN_KEYS.order] : 'asc';

//                 const column: any = column_table.selectRow(COLUMN_KEYS.name, name);
//                 const type: string = column[COLUMN_KEYS.type];

//                 if (order == 'asc') {
//                     if (type == CellType.number) {
//                         let x = a[name] != null && isNaN(a[name]) == false ? Number(a[name].toString().replace(/\,/g, '')): 0;
//                         let y = b[name] != null && isNaN(b[name]) == false ? Number(b[name].toString().replace(/\,/g, '')): 0;
//                         if (x < y) return -1;
//                         else if (x > y) return 1;
//                     }
//                     else {
//                         if ((a[name] == null ? '' : a[name]).toString().toLowerCase() < (b[name] == null ? '' : b[name]).toString().toLowerCase()) return -1;
//                         else if ((a[name] == null ? '' : a[name]).toString().toLowerCase() > (b[name] == null ? '' : b[name]).toString().toLowerCase()) return 1;
//                     }
//                 }
//                 else if (order == 'desc') {
//                     if (type == CellType.number){
//                         let x = a[name] != null && isNaN(a[name]) == false ? Number(a[name].toString().replace(/\,/g, '')) : 0;
//                         let y = b[name] != null && isNaN(b[name]) == false ? Number(b[name].toString().replace(/\,/g, '')) : 0;
//                         if (x < y) return 1;
//                         else if (x > y) return -1;
//                     }
//                     else {
//                         if ((a[name] == null ? '' : a[name]).toString().toLowerCase() < (b[name] == null ? '' : b[name]).toString().toLowerCase()) return 1;
//                         else if ((a[name] == null ? '' : a[name]).toString().toLowerCase() > (b[name] == null ? '' : b[name]).toString().toLowerCase()) return -1;
//                     }
//                 }
//             }
//         });
//     }

//     getSum(columnName: string) {
//         let result = 0;
//         for (let i = 0, len = this.count(); i < len; i++) {
//             const dataRow = this.data[i];
//             result += isNaN(dataRow[columnName]) ? 0 : parseFloat(dataRow[columnName]);
//         }
//         return result;
//     }

//     getAvg(columnName: string) {
//         let rowCount = this.count();
//         let result = rowCount == 0 ? 0 : this.getSum(columnName) / rowCount;
//         return result
//     }

//     getMax(columnName: string): number {
//         const arrayItem: number[] = [];

//         let result: number = 0;
//         for (let i: number = 0, len: number = this.count(); i < len; i++) {
//             const dataRow = this.data[i];
//             result = isNaN(dataRow[columnName]) ? 0 : parseFloat(dataRow[columnName]);
//             arrayItem.push(result);
//         }
//         return Math.max.apply(null, arrayItem);
//     }

//     getMin(columnName: string): number {
//         const arrayItem: number[] = [];

//         let result: number = 0;
//         for (let i: number = 0, len: number = this.count(); i < len; i++) {
//             const dataRow = this.data[i];
//             result = isNaN(dataRow[columnName]) ? 0 : parseFloat(dataRow[columnName]);
//             arrayItem.push(result);
//         }
//         return Math.min.apply(null, arrayItem);
//     }

//     // filter(data, filterColumn) {
//     //     const grid = this.grid;
//     //
//     //     let column = grid.getColumn(filterColumn.name);
//     //     let columnType = column[COLUMN_KEYS.type];
//     //     let columnName = filterColumn.name;
//     //     let filterType = filterColumn.type;
//     //     let value = filterColumn.value;
//     //
//     //     return data.filter(function(dataRow) {
//     //         let bool = true;
//     //         if (columnType == CellType.number) {
//     //             let columnText = dataRow[columnName];
//     //             let isExist = grid.classFilter.filterNumberByType(filterType, value, columnText);
//     //             return isExist;
//     //         }
//     //         else if (columnType == CellType.string || columnType == CellType.date || columnType || CellType.combo) {
//     //             let val = dataRow[columnName];
//     //             let columnText = grid.getFormatText(column, val);
//     //
//     //             let isExist = grid.classFilter.filterStringByType(filterType, value, columnText);
//     //             return isExist;
//     //         }
//     //         else return true;
//     //     });
//     // }
//     //
//     // filterNumberByType(filterType, n, targetNumber) {
//     //     let selector = this.selector;
//     //     const grid = this.grid;
//     //
//     //     // @Rule : when number is null, number is zero
//     //     if (grid.null(n)) n = 0;
//     //     if (grid.null(targetNumber)) targetNumber = 0;
//     //
//     //     let toNumber = null;
//     //     if (filterType == grid.const_filterBetween) {
//     //         let arr = n.split('-');
//     //         n = parseFloat(arr[0]);
//     //         if (arr.length > 1) {
//     //             toNumber = parseFloat(arr[1]);
//     //         }
//     //         else {
//     //             toNumber = 99999999999999;
//     //         }
//     //     }
//     //     else {
//     //         n = parseFloat(n);
//     //         toNumber = null;
//     //     }
//     //
//     //     targetNumber = parseFloat(targetNumber);
//     //
//     //     if      (filterType == tbsGridTypes.FILTER_TYPES.Equal) {
//     //         return (n == targetNumber) ? true : false;
//     //     }
//     //     else if (filterType == tbsGridTypes.FILTER_TYPES.NotEqual) {
//     //         return (n != targetNumber) ? true : false;
//     //     }
//     //     else if (filterType == tbsGridTypes.FILTER_TYPES.Greater) {
//     //         return (n < targetNumber) ? true : false;
//     //     }
//     //     else if (filterType == tbsGridTypes.FILTER_TYPES.GreaterEqual) {
//     //         return (n <= targetNumber) ? true : false;
//     //     }
//     //     else if (filterType == tbsGridTypes.FILTER_TYPES.Less) {
//     //         return (n > targetNumber) ? true : false;
//     //     }
//     //     else if (filterType == tbsGridTypes.FILTER_TYPES.LessEqual) {
//     //         return (n >= targetNumber) ? true : false;
//     //     }
//     //     else if (filterType == tbsGridTypes.FILTER_TYPES.Between) {
//     //         return (targetNumber >= n && targetNumber <= toNumber) ? true : false;
//     //     }
//     //     else if (filterType == tbsGridTypes.FILTER_TYPES.Blank) {
//     //         return grid.null(targetNumber) || targetNumber == 0;
//     //     }
//     // }
//     //
//     // filterStringByType(filterType, s, targetString) {
//     //     let selector = this.selector;
//     //     const grid = this.grid;
//     //     let regExp;
//     //
//     //     // String comparisons are case-insensitive.
//     //     s = s.toLowerCase();
//     //     targetString = targetString.toLowerCase();
//     //     if      (filterType == tbsGridTypes.FILTER_TYPES.Equal) {
//     //         regExp =new RegExp(`^${s}$`)
//     //         return regExp.test(targetString);
//     //     }
//     //     else if (filterType == tbsGridTypes.FILTER_TYPES.NotEqual) {
//     //         regExp = new RegExp(`^${s}$`);
//     //         return regExp.test(targetString) == false ? true : false;
//     //     }
//     //     else if (filterType == tbsGridTypes.FILTER_TYPES.Include) {
//     //         regExp = new RegExp(`${s}`);
//     //         return regExp.test(targetString);
//     //     }
//     //     else if (filterType == tbsGridTypes.FILTER_TYPES.NotInclude) {
//     //         regExp = new RegExp(`${s}`);
//     //         return regExp.test(targetString) == false ? true : false;
//     //     }
//     //     else if (filterType == tbsGridTypes.FILTER_TYPES.StartCharacter) {
//     //         regExp = new RegExp(`^${s}`);
//     //         return regExp.test(targetString);
//     //     }
//     //     else if (filterType == tbsGridTypes.FILTER_TYPES.EndCharacter) {
//     //         regExp = new RegExp(`${s}$`);
//     //         return regExp.test(targetString);
//     //     }
//     //     else if (filterType == tbsGridTypes.FILTER_TYPES.Blank) {
//     //         regExp = new RegExp(`^$`);
//     //         return regExp.test(targetString);
//     //     }
//     // }
// }