// import { WaPanelBase } from './wa.grid.panel.base';
// import { WaRenderPanelInfo } from './wa.grid.render.panel.info';
// import { WaTable } from '../wa.grid.table';
// import { WaGridCore } from '../wa.grid';
// import { WaColumnProperty, CellType } from '../wa.grid.types';
// import { WaPanel20Events } from './wa.grid.panel20.events';
//
// export class WaPanel20 extends WaPanelBase {
//     isChecked: boolean;
//
//     constructor(grid: WaGridCore) {
//         super(grid);
//         this.isChecked = false;
//         this.panelName = 'panel20';
//         this.panelName1 = 'panel21';
//         this.panelName2 = 'panel22';
//     }
//
//     createHtml(parentElement: HTMLElement) {
//         parentElement.insertAdjacentHTML(
//             'beforeend',
//             `
//       <div class="wa-grid-group21">
//         <div class="wa-grid-panel">
//           <div class="wa-grid-panel21"><table class="wa-grid-table"></table></div>
//           <div class="wa-grid-panel22"><table class="wa-grid-table"></table></div>
//         </div>
//       </div>
//       <div class="wa-grid-group20">
//         <div class="wa-grid-panel">
//           <div class="wa-grid-panel20"><table class="wa-grid-table"></table></div>
//         </div>
//       </div>
//       `
//         );
//     }
//
//     createTable() {
//         const grid = this.grid;
//         const table = new WaTable(grid);
//         ['panel21', 'panel22', 'panel20'].forEach(name => table.createTable(name, 0, grid.headerRowCount));
//         this.setDataPanel();
//     }
//
//     setDataPanel() {
//         const grid = this.grid;
//         this.setDataPanelSub('panel21');
//         this.setDataPanelSub('panel22');
//         this.setDataPanelSub('panel20');
//         grid.horizontalScroll.setScroll(grid.code_horizontal);
//     }
//
//     setDataPanelSub(panelName: string) {
//         const grid = this.grid;
//         const selector = this.selector;
//         grid.classRow.setTableHead(grid, panelName);
//
//         const rows = document.querySelectorAll(`${selector} .wa-grid-${panelName} .wa-grid-table tbody tr`);
//
//         for (let i = 0; i < grid.headerRowCount; i++) {
//             const row: any = rows[i];
//             for (let x = 0; x < grid.info_column_table.count(); x++) {
//                 const cell: any = row.childNodes[x];
//                 const column = grid.info_column_table.data[x];
//                 cell.dataset.rowIndex = i;
//                 cell.dataset.cellType = column[WaColumnProperty.type];
//
//                 const renderInfo = new WaRenderPanelInfo(grid);
//                 renderInfo.start(panelName, cell, column, i, x);
//                 grid.classCell.showSelectedCells(grid, panelName, cell, i, 0);
//             }
//         }
//     }
//
//     /** 이벤트 초기화 */
//     bindEvents() {
//         const eventManager = new WaPanel20Events(this.grid, this.selector, this.panelName);
//         eventManager.bind();
//     }
// }
