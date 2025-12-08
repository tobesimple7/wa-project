import type { COLUMN_KIND } from '@/core/columns/ColumnEnum';

export interface HeaderColumnDef {
  kind?: COLUMN_KIND | 'empty';
  name?: string | null;
  align?: 'left' | 'center' | 'right' | null;
  text?: string | null;
  className?: string | null;
  visible?: boolean;

  rowSpan?: number | null;
  colSpan?: number | null;
  rowIndex?: number;
  colIndex?: number | null;

  type?: string;
  children?: null;   

  _rowId?: number;
  _rowMode?: string;
  _colIndex?: number;
  _name?: string;
}
