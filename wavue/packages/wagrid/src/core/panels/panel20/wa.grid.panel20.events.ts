// import { WaGridCore } from '../wa.grid';
// import { WaGridColumnDrag } from './wa.grid.panel20.drag.column';
// import { WaHeaderSelect } from './wa.grid.panel20.select.header';
// import { WaGridAutoScroll } from './wa.grid.panel20.scroll.autoscroll';
// import {WaColumnProperty} from "@/core/columns/WaGridColumn.enum"
// export class WaPanel20Events {
//     grid: WaGridCore;
//     selector: string;
//     panelName: string;
//     drag: WaGridColumnDrag;
//     select: WaHeaderSelect;
//     scroll: WaGridAutoScroll;
//
//     constructor(grid: WaGridCore, selector: string, panelName: string) {
//         this.grid = grid;
//         this.selector = selector;
//         this.panelName = panelName;
//         this.drag = new WaGridColumnDrag(grid, selector);
//         this.select = new WaHeaderSelect(grid, selector, panelName);
//         this.scroll = new WaGridAutoScroll(grid, selector, panelName);
//     }
//
//     bind() {
//         const eventPanel = document.querySelector(`${this.selector} .wa-grid-${this.panelName}`);
//         if (!eventPanel) return;
//         eventPanel.addEventListener('mousedown', this.onMouseDown.bind(this));
//     }
//
//     onMouseDown(e: MouseEvent) {
//         const grid = this.grid;
//         const cell = (e.target as HTMLElement).closest('.wa-grid-cell');
//         if (!cell || (e.target as HTMLElement).classList.contains('wa-grid-html-resize')) return;
//
//         grid.startX = window.pageXOffset + e.clientX;
//         grid.startY = window.pageYOffset + e.clientY;
//         grid.lastX = grid.startX;
//         grid.lastY = grid.startY;
//         grid.startCellIndex = cell.cellIndex;
//         grid.lastCellIndex = cell.cellIndex;
//
//         this.select.onStart(e);
//         document.addEventListener('mousemove', this.onMouseMove);
//         document.addEventListener('mouseup', this.onMouseUp);
//     }
//
//     onMouseMove = (e: MouseEvent) => {
//         e.preventDefault();
//         e.stopPropagation();
//
//         this.grid.lastX = window.pageXOffset + e.clientX;
//         this.grid.lastY = window.pageYOffset + e.clientY;
//
//         this.drag.onMove(e);
//         this.select.onMove(e);
//         this.scroll.onMove(e);
//     };
//
//     onMouseUp = (e: MouseEvent) => {
//         const grid = this.grid;
//         grid.lastX = window.pageXOffset + e.clientX;
//         grid.lastY = window.pageYOffset + e.clientY;
//
//         if (grid.isInPanel(e, 'panel80')) return grid.classGroup.handleDrop(e);
//         if (grid.isInPanel(e, 'panel90')) return grid.classSort.handleDrop(e);
//         if ((e.target as HTMLElement).classList.contains('wa-grid-html-checkbox'))
//             return grid.classCheckbox.handleClick(e);
//
//         const dx = Math.abs(grid.startX - grid.lastX);
//         const dy = Math.abs(grid.startY - grid.lastY);
//         if (dx < grid.mousePointRange && dy < grid.mousePointRange) grid.classSort.handleSingleClick(e);
//         else this.drag.onDrop(e);
//
//         this.cleanup();
//     };
//
//     cleanup() {
//         document.removeEventListener('mousemove', this.onMouseMove);
//         document.removeEventListener('mouseup', this.onMouseUp);
//         document.querySelector('.wa-grid-move')?.remove();
//         this.grid.input_focus();
//     }
// }
