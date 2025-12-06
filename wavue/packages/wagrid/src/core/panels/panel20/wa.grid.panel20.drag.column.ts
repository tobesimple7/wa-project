// import { WaColumnProperty } from '../wa.grid.types';
// import {WaColumnProperty} from "@/core/columns/WaGridColumn.enum"
// export class WaGridColumnDrag {
//     grid: any;
//     selector: string;
//     moveDiv: HTMLElement | null = null;
//
//     constructor(grid: any, selector: string) {
//         this.grid = grid;
//         this.selector = selector;
//     }
//
//     onMove(e: MouseEvent) {
//         if (!this.moveDiv) return;
//         this.moveDiv.style.left = `${e.pageX + 5}px`;
//         this.moveDiv.style.top = `${e.pageY + 5}px`;
//     }
//
//     onDrop(e: MouseEvent) {
//         const grid = this.grid;
//         const moveEl = document.querySelector('.wa-grid-move');
//         if (!moveEl) return;
//
//         const headerCols = grid.header_column_table.data;
//         const movingColumn = headerCols[grid.moveCellRowIndex - 1][grid.moveCellIndex];
//         const tdList = document.querySelectorAll(`${this.selector} .wa-grid-${grid.classPanel20.panelName} tbody td`);
//
//         const fixedWidth = 50;
//         const direction = grid.lastX - grid.startX > 0 ? 'after' : 'before';
//
//         for (let i = 0; i < tdList.length; i++) {
//             const cell = tdList[i] as HTMLTableCellElement;
//             const rect = cell.getBoundingClientRect();
//             const targetColumn = headerCols[cell.parentElement!.rowIndex - 1][cell.cellIndex];
//             const sameGroup =
//                 movingColumn[WaColumnProperty.parentNum] === targetColumn[WaColumnProperty.parentNum];
//             if (!sameGroup) continue;
//
//             const edge = direction === 'after' ? rect.right : rect.left;
//             if (grid.lastX - fixedWidth <= edge && grid.lastX + fixedWidth >= edge) {
//                 grid.classColumn.changeColumnOrder(movingColumn, targetColumn, direction);
//                 break;
//             }
//         }
//     }
// }
