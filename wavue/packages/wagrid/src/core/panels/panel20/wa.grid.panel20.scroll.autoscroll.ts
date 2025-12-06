// export class WaGridAutoScroll {
//     grid: any;
//     selector: string;
//     panelName: string;
//     flagLeft = false;
//     flagRight = false;
//
//     constructor(grid, selector, panelName) {
//         this.grid = grid;
//         this.selector = selector;
//         this.panelName = panelName;
//     }
//
//     onMove(e: MouseEvent) {
//         const rect = document
//             .querySelector(`${this.selector} .wa-grid-${this.panelName}`)
//             ?.getBoundingClientRect();
//         if (!rect) return;
//
//         const left = rect.left + window.pageXOffset;
//         const right = rect.right + window.pageXOffset;
//
//         if (e.pageX < left) {
//             this.flagLeft = true;
//             this.doScroll('left');
//         } else if (e.pageX > right) {
//             this.flagRight = true;
//             this.doScroll('right');
//         }
//     }
//
//     doScroll(direction: 'left' | 'right') {
//         const grid = this.grid;
//         if (direction === 'left') grid.classScroll.setBarPositionByDirection('left');
//         if (direction === 'right') grid.classScroll.setBarPositionByDirection('right');
//
//         setTimeout(() => {
//             if (this.flagLeft || this.flagRight) this.doScroll(direction);
//         }, 5);
//     }
// }
