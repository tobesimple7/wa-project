
import { WaPanelBase } from './PanelBase';
import { WaRenderPanel40 } from './RenderPanel40';
import { WaGridTable } from "../wa.grid.table";
import {WaColumnProperty} from "@/core/columns/WaGridColumn.enum"

export class WaPanel50 extends WaPanelBase {
    constructor(grid) {
        super(grid);
        this.panelName  = 'panel50';

        this.panelName1 = 'panel51';
        this.panelName2 = 'panel52';
        this.panelName0 = 'panel50';
    }
    createHtml(parentElement) {
        const grid = this.grid;
        let s = '';
        s += '<div class="wa-grid-group51">';
            s += '<div class="wa-grid-panel">';
            s += '<div class="wa-grid-panel51"><table class="wa-grid-table"></table></div>';
            s += '<div class="wa-grid-panel52"><table class="wa-grid-table"></table></div>';
            s += '</div>';
        s += '</div>';
        s += '<div class="wa-grid-group50">';
            s += '<div class="wa-grid-panel">';
            s += '<div class="wa-grid-panel50"><table class="wa-grid-table"></table></div>';
            s += '</div>';
        s += '</div>';
        parentElement.insertAdjacentHTML('beforeend', s);
    }

    createTable() {
        const grid = this.grid;

        if(grid.footer_column_table.count() == 0) return;

        const classTable = new WaGridTable(grid);
        classTable.createTable('panel51', 0, 1);
        classTable.createTable('panel52', 0, 1);
        classTable.createTable('panel50', 0, 1);
    }

    setDataPanel() {
        let selector = this.selector;
        const grid = this.grid;

        grid.classRange.removePanelRange('panel50');
        this.setDataPanel2();
        this.setDataPanel1();
        this.setDataPanel0();
    }
    setDataPanel1() {
        let selector = this.selector;
        const grid = this.grid;
        let panelName = this.panelName1;

        if (grid.footer_table.count() == 0) return;

        let topRowIndex = 0;
        let bottomRowIndex = 0;

        let pageRowCount = 1;
        let rowHeight = grid.rowHeight;

        let tableRows = document.querySelectorAll(selector + ' .wa-grid-' + panelName + ' .wa-grid-table tbody tr');
        if (tableRows.length == 0) return;

        //startColumnIndex, lastColumIndex
        let result = grid.classHeader.getDisplayedHeaderColumn();
        let startColumnIndex= result.startColumnIndex;
        let lastColumnIndex = result.lastColumnIndex;

        let tableRowIndex = 0;

        for (let i = topRowIndex; i < bottomRowIndex + 1; i++) {
            let tableRow: any = tableRows[tableRowIndex];

            /* Render: TableRow */
            grid.classRow.setTableRow(grid, tableRow, i, panelName);

            const tableCell: any = tableRow.childNodes[0];
            tableCell.dataset.rowIndex = i;
            tableCell.dataset.displayRowIndex = i;

            tableRow.childNodes[0].dataset.cellType = 'number';
            grid.classCell.showSelectedCells(grid, panelName, tableCell, 0, i);
        }
    }
    setDataPanel2() {
        let selector = this.selector;
        const grid = this.grid;

        if (grid.fixedColumnIndex == -1) return;

        let panelName = this.panelName2;

        if (grid.footer_table.count() == 0) return;

        //startColumnIndex, lastColumIndex
        let result = grid.classHeader.getDisplayedHeaderColumn();
        let startColumnIndex= result.startColumnIndex;
        let lastColumnIndex = result.lastColumnIndex;

        /* table thead */
        grid.classRow.setTableHead(grid, panelName);

        /* table tbody */
        let tableRows = document.querySelectorAll(selector + ' .wa-grid-' + panelName + ' .wa-grid-table tbody tr');
        let tableRow = tableRows[0];
        for (let x = 0; x <= lastColumnIndex; x++) {
            let column = grid.column_table.data[x];
            let tableCell = tableRow.childNodes[x];

            if (x > grid.fixedColumnIndex && x < startColumnIndex) continue;

            let tbsGridRender = new WaRenderPanel40(grid);
            tbsGridRender.start(panelName, tableCell, column, 0, x);
            tbsGridRender = null;
            //grid.classRender.start(panelName, tableCell, column, 0, x);

            grid.classCell.showSelectedCells(grid, panelName, tableCell, 0, x);
        }
        // on fixed columns
        const tbsGridCell = grid.classCell.hideTableCells(grid, panelName, tableRow, lastColumnIndex);
    }
    setDataPanel0() {
        let selector = this.selector;
        const grid = this.grid;
        let panelName = this.panelName0;

        if (grid.footer_table.count() == 0) return;
        //startColumnIndex, lastColumIndex
        let result = grid.classHeader.getDisplayedHeaderColumn();
        let startColumnIndex= result.startColumnIndex;
        let lastColumnIndex = result.lastColumnIndex;

        /* table thead */
        grid.classRow.setTableHead(grid, panelName);

        /* table tbody */
        let tableRows = document.querySelectorAll(selector + ' .wa-grid-' + panelName + ' .wa-grid-table tbody tr');
        let tableRow = tableRows[0];
        for (let x = 0, len = grid.column_table.count(); x < len; x++) {
            let column = grid.column_table.data[x];
            let columnName = column[WaColumnProperty.name];
            let tableCell = tableRow.childNodes[x];

            if (grid.fixedColumnIndex != -1) {
                if (x > grid.fixedColumnIndex && x < startColumnIndex) continue;
            }
            else { if (x < startColumnIndex) continue; }

            let tbsGridRender = new WaRenderPanel40(grid);
            tbsGridRender.start(panelName, tableCell, grid.column_table.data[x], 0, x);
            tbsGridRender = null;
            //grid.classRender.start(panelName, tableCell, grid.column_table.data[x], 0, x);

            grid.classCell.showSelectedCells(grid, panelName, tableCell, 0, x);
        }
        // on fixed columns
        grid.classCell.hideTableCells(grid, panelName, tableRow, lastColumnIndex);
    }

}



