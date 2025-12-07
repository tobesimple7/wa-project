
import { WaDom } from "./Dom";
import {WaGridCore} from "@/core/WaGridCore"
import {WaColumnProperty} from "@/core/columns/ColumnEnum"

export class WaGridRow {
    grid: WaGridCore;

    constructor(grid: WaGridCore) {
        this.grid = grid;
    }

    setTableHead(grid: WaGridCore, panelName: string) {
        let selector = '#' + grid.gridId;

        if (grid.fixedColumnIndex != -1) {
            let tableRow = document.querySelector(selector + ' .wa-grid-' + panelName + ' .wa-grid-table thead tr');

            for (let x = 0, len = grid.column_table.count(); x < len; x++) {
                let column = grid.column_table.data[x];
                let tableCell = tableRow.childNodes[x];

                WaDom.setCellStyle(tableCell, 'width', column[WaColumnProperty.width] + 'px');
                WaDom.setCellStyle(tableCell, 'display', '');
                if (column[WaColumnProperty.visible] == false) {
                    WaDom.setCellStyle(tableCell, 'width', '0px');
                    WaDom.setCellStyle(tableCell, 'display', 'none');
                }
                if (panelName.substring(6) == '2' && x > grid.fixedColumnIndex) {
                    WaDom.setCellStyle(tableCell, 'width', '0px');
                    WaDom.setCellStyle(tableCell, 'display', 'none');
                }
                else if (panelName.substring(6) == '0' && x <= grid.fixedColumnIndex) {
                    WaDom.setCellStyle(tableCell, 'width', '0px');
                    WaDom.setCellStyle(tableCell, 'display', 'none');
                }
            }
        }
        else {
            let tableRow = document.querySelector(selector + ' .wa-grid-' + panelName + ' .wa-grid-table thead tr');

            for (let x = 0, len = grid.column_table.count(); x < len; x++) {
                let column = grid.column_table.data[x];
                let tableCell = tableRow.childNodes[x];
                if (panelName.substring(6) == '0') {
                    WaDom.setCellStyle(tableCell, 'display', column[WaColumnProperty.visible] ? '' : 'none');
                    WaDom.setCellStyle(tableCell, 'width', column[WaColumnProperty.width] + 'px');
                }
            }
        }
    }

    setTableRow(grid, tableRow, rowIndex, panelName = 'panel30') {
        let selector = '#' + grid.gridId;

        tableRow.dataset.rowIndex = rowIndex;

        if (tableRow.style.height != grid.rowHeight + 'px') tableRow.style.height = grid.rowHeight + 'px';

        if (tableRow.style.display == 'none') tableRow.style.display = '';

        if (grid.group_column_table.count() > 0) {
            if (panelName.substring(6) == '0' || panelName.substring(6) == '2') {
                let rowData = grid.getRow(rowIndex);
                let depth = rowData[WaColumnProperty.depth];

                if (depth == grid.group_column_table.count() + 1) WaDom.addUserClass(tableRow, '.tbs-row-color-white');
                else if (depth <= 5) WaDom.addUserClass(tableRow, 'tbs-row-color' + depth);
                else WaDom.addUserClass(tableRow, '.tbs-row-color-white');
            }
            if (grid.onRowBounding) {
                if (panelName.substring(6) == '0' || panelName.substring(6) == '2') {
                    let param = {element: tableRow, rowIndex: rowIndex, data: grid.getRow(rowIndex)};
                    grid.executeEvent(grid.onRowBounding, 'onRowBounding', param);
                }
            }
        }
        else {
            WaDom.removeUserClass(tableRow);
            if (panelName.substring(6) == '0' || panelName.substring(6) == '2') {
                let param = {element: tableRow, rowIndex: rowIndex, data: grid.getRow(rowIndex)};
                grid.executeEvent(grid.onRowBounding, 'onRowBounding', param);
            }
        }
        /* row alternative background color */
        grid.classRow.showAlternativeRowColor(grid, panelName, tableRow, rowIndex);
    }

    showAlternativeRowColor(grid, panelName, tableRow, rowIndex) {
        return;
        // tableRow.classList.remove('wa-grid-tr-bg', 'wa-grid-tr-bg2');
        // if (rowIndex % 2) tableRow.classList.add('wa-grid-tr-bg2');
        // else tableRow.classList.add('wa-grid-tr-bg');
    }

    hideTableRows(grid, panelName, tableRows, fromRowIndex, toRowIndex) {
        if (grid.column_table.count() == 0) {
            fromRowIndex = 0;
        }
        for (let i = fromRowIndex, len = tableRows.length; i < len; i++) {
            const tableRow = tableRows[i];
            if (tableRow) {
                if (tableRow.style.display != 'none') tableRow.style.display = 'none';
            }
        }
    }
}


