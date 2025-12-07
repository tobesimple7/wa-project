// export class WaHeaderSelect {
//     grid: any;
//     selector: string;
//     panelName: string;
//
//     constructor(grid, selector, panelName) {
//         this.grid = grid;
//         this.selector = selector;
//         this.panelName = panelName;
//     }
//
//     onStart(e: MouseEvent) {
//         if ((e.target as HTMLElement).classList.contains('wa-grid-html-checkbox')) return;
//         const grid = this.grid;
//         grid.classRange.removeRange(0, -1);
//     }
//
//     onMove(e: MouseEvent) {
//         const grid = this.grid;
//         const moveX = grid.lastX - grid.startX;
//         const tableCells = document.querySelectorAll(
//             `${this.selector} .wa-grid-${this.panelName} .wa-grid-table td`
//         );
//
//         let maxCell = -1;
//         tableCells.forEach((cell: any) => {
//             if (moveX > 0 && grid.lastX > cell.getBoundingClientRect().left) maxCell = cell.cellIndex;
//         });
//
//         if (maxCell >= 0) {
//             grid.classRange.removeRange(0, -1);
//             const topRow = grid.classRange.selectRange(0, -1, grid.startCellIndex, maxCell);
//             grid.waPanel30.setDataPanel(topRow);
//         }
//     }
// }
