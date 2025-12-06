/*



 */
import {WaGridDom} from "./wa.grid.dom";
import {WaGridCore} from "@/core/wa.grid.core"
import {WaColumnProperty} from "@/core/columns/WaGridColumn.enum"

export class WaGridCell {
    grid: WaGridCore;
    column: any;

    constructor(grid: WaGridCore, column: any) {
        this.grid = grid;
        this.column = column;
    }

    createHtml() {
        // const grid = this.grid;
        //
        // let type = this.column[WaColumnProperty.type];
        // let cellTemplate = this.column[WaColumnProperty.cellTemplate];
        //
        // if (grid.null(cellTemplate)) {
        //     this.createCell(type);
        // }
        // else {
        //     this.createTemplate();
        // }
    }

    createCell() {

    }

    createTemplate() {

    }

    hideTableCells(grid, panelName, tableRow, lastColumnIndex) {
        if (grid.fixedColumnIndex != -1) {
            for (let x = 0, len = grid.column_table.count(); x < len; x++) {
                let tableCell = tableRow.childNodes[x];

                if (panelName.substring(6) == '2' && x > grid.fixedColumnIndex) {
                    WaGridDom.setCellStyle(tableCell, 'width', '0px');
                    WaGridDom.setCellStyle(tableCell, 'display', 'none');
                }
                else if (panelName.substring(6) == '0' && x <= grid.fixedColumnIndex) {
                    WaGridDom.setCellStyle(tableCell, 'width', '0px');
                    WaGridDom.setCellStyle(tableCell, 'display', 'none');
                }
            }
        }
    }

    showSelectedCells(grid, panelName, tableCell, rowIndex, cellIndex) {
        let value = grid.isSelectedCell(panelName, rowIndex, cellIndex);
        if (value == 1) {
            if (grid.startRowIndex == rowIndex && grid.startCellIndex == cellIndex) tableCell.classList.add('wa-grid-cell-start');
            else tableCell.classList.add('wa-grid-cell-select');
        }
    }
}
/*
export class WaGridCellGroup extends WaGridCell {}

export class WaGridCellTree extends WaGridCell {}

export class WaGridCellCheckbox extends WaGridCell {}

export class WaGridCellImage extends WaGridCell {}

export class WaGridCellButton extends WaGridCell {}

*/