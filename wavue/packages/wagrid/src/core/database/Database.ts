// WaDatabase.ts
import { WaBase } from '../base/Base'
import { WaDataTable } from './DataTable'
import { WaDataArrayTable } from './DataArrayTable'

// 내부 기본 Row
type Row = Record<string, any>

// 두 테이블 공통 유니온을 제네릭으로
export type DataTableType<T extends Row = Row> =
  | WaDataTable<T>
  | WaDataArrayTable<T>

export class WaDatabase extends WaBase {
  // 이름→테이블 맵 (서로 다른 T 가능하게 any 수용)
  public tables = new Map<string, DataTableType<any>>()

  constructor() {
    super()
  }

  // ----- 생성기 (각 호출 시점에 T를 지정 가능) -----
  createTable<T extends Row = Row>(tableName: string): WaDataTable<T> {
    const table = new WaDataTable<T>(tableName)
    table.type = 'table'
    this.tables.set(tableName, table)
    return table
  }

  createView<T extends Row = Row>(tableName: string): WaDataTable<T> {
    const table = new WaDataTable<T>(tableName)
    table.type = 'view'
    this.tables.set(tableName, table)
    return table
  }

  createArrayTable<T extends Row = Row>(tableName: string): WaDataArrayTable<T> {
    const table = new WaDataArrayTable<T>(tableName)
    table.type = 'table'
    this.tables.set(tableName, table)
    return table
  }

  // ----- 조회기 (필요할 때 원하는 T로 캐스팅받음) -----
  getTable<T extends Row = Row>(tableName: string): DataTableType<T> | undefined {
    return this.tables.get(tableName) as DataTableType<T> | undefined
  }

  getDataTable<T extends Row = Row>(tableName: string): WaDataTable<T> | undefined {
    const t = this.tables.get(tableName)
    return t instanceof WaDataTable ? (t as WaDataTable<T>) : undefined
  }

  getArrayTable<T extends Row = Row>(tableName: string): WaDataArrayTable<T> | undefined {
    const t = this.tables.get(tableName)
    return t instanceof WaDataArrayTable ? (t as WaDataArrayTable<T>) : undefined
  }

  removeTable(tableName: string): void {
    this.tables.delete(tableName)
  }
}
