import {CellType} from "@/core/Grid.types"
import {COLUMN_KEYS} from "@/core/columns/ColumnEnum"
import {WaGridCore} from "@/core/WaGridCore";

export class WaBaseIs {

    constructor() {
    }

    /**
     * Is Functions
     *
     */

    isEditableColumn(this:WaGridCore, columnName: string): boolean {
        let result: any = this.column_table.selectRow(COLUMN_KEYS.name, columnName);
        return result.editable ? result.editable : false;
    }

    isSortableColumn(this:WaGridCore, columnName?: string): boolean {
        const grid = this;

        let result = false;
        //let column = grid.getColumn(columnName);

        // if (column[COLUMN_KEYS.sortable] == true)  result = true;
        // else if (column[COLUMN_KEYS.sortable] == false) result = false;
        // else {
        result = grid.options[COLUMN_KEYS.sortable];
        //}
        return result;
    }

    isResizableColumn(this:WaGridCore, columnName: string): boolean {
        let selector = '#' + this.gridId;
        const grid = this;

        let result = false;
        //let column = grid.getColumn(columnName);

        // if (column[COLUMN_KEYS.resizable] == true)  result = true;
        // else if (column[COLUMN_KEYS.resizable] == false) result = false;
        // else {
        result = grid.options[COLUMN_KEYS.resizable];
        // }
        return result;
    }

    isMovableColumn(this:WaGridCore, columnName?: string): boolean {
        let selector = '#' + this.gridId;
        const grid = this;

        let result = false;
        //let column = grid.getColumn(columnName);

        // if (column[COLUMN_KEYS.movable] == true)  result = true;
        // else if (column[COLUMN_KEYS.movable] == false) result = false;
        // else {
        result = grid.options[COLUMN_KEYS.movable];
        // }
        return result;
    }

    isAutoResizableColumn(this:WaGridCore, columnName: boolean) {
        let selector = '#' + this.gridId;
        const grid = this;

        let result = false;
        //let column = grid.getColumn(columnName);

        // if (column[COLUMN_KEYS.autoResizable] == true)  result = true;
        // else if (column[COLUMN_KEYS.autoResizable] == false) result = false;
        // else {
        result = grid.options[COLUMN_KEYS.autoResizable];
        //}
        return result;
    }

    isAutoWidthColumn(this:WaGridCore, columnName): boolean {
        let selector = '#' + this.gridId;
        const grid = this;

        let result = false;
        //let column = grid.getColumn(columnName);

        // if (column[COLUMN_KEYS.autoResizable] == true)  result = true;
        // else if (column[COLUMN_KEYS.autoResizable] == false) result = false;
        // else {
        result = grid.options[COLUMN_KEYS.autoWidth];
        //}
        return result;
    }

    isClassName(this:WaGridCore, element, className): boolean {
        let selector = '#' + this.gridId;
        const grid = this;

        let result = element.classList.contains(className);
        return result;
    }

    isNotValidColumnType(this:WaGridCore, columnType: string): boolean {
        let arr = ['string', 'number', 'combo', 'date'];
        return arr.indexOf(columnType) == -1 ? true : false;
    }

    isInPanel(this: WaGridCore, e: MouseEvent, panelName: string): boolean {
        let selector = '#' + this.gridId;
        const grid = this;

        // Mouse point
        const x = e.pageX ?? this.lastX;
        const y = e.pageY ?? this.lastY;

        let panel = document.querySelector(selector + ' .wa-grid-' + panelName);
        let absRect = grid.getOffset(panel);

        let rect= panel.getBoundingClientRect();
        const left = absRect.left;
        const right = absRect.left + rect.width;
        const top = absRect.top;
        const bottom = absRect.top + rect.height;

        return x >= left && x <= right && y >= top && y <= bottom;
    }

    isSelectedCell(this:WaGridCore, panelName: string, rowIndex: number, cellIndex: number): number {
        //selected 1, 0
        let result = 0;
        let rows = [];
        if      (panelName == 'panel31') rows = this.data_select_panel31;
        else if (panelName == 'panel32') rows = this.data_select_panel30;
        else if (panelName == 'panel30') rows = this.data_select_panel30;

        else if (panelName == 'panel41') rows = this.classRange40.data_select_panel31;
        else if (panelName == 'panel42') rows = this.classRange40.data_select_panel30;
        else if (panelName == 'panel40') rows = this.classRange40.data_select_panel30;

        else if (panelName == 'panel51') rows = this.classRange50.data_select_panel31;
        else if (panelName == 'panel52') rows = this.classRange50.data_select_panel30;
        else if (panelName == 'panel50') rows = this.classRange50.data_select_panel30;

        else rows = this.data_select_panel30;

        for (let i = 0, len= rows.length; i < len; i++) {
            let row = rows[i];
            if (rowIndex == row[0][0]) {
                result = row[1][cellIndex];
                break;
            }
        }
        return result;
    }

    isSelectedHeaderCell(this:WaGridCore, panelName: string, cellIndex: number): number {
        //selected 1, 0
        let result = 0;
        let rows = this.data_select_panel30;

        for (let i = 0, len= rows.length; i < len; i++) {
            let row = rows[i];
            if (row[1][cellIndex] == 1) {
                result = row[1][cellIndex];
                break;
            }
        }
        return result;
    }

    isSelectedCell31(this:WaGridCore, rowIndex: number, cellIndex: number): number {
        //selected 1, 0
        let result = 0;
        let rows = this.data_select_panel31;
        for (let i = 0, len= rows.length; i < len; i++) {
            let row = rows[i];
            if (rowIndex == row[0][0]) {
                result = row[1][cellIndex];
                break;
            }
        }
        return result;
    }

    isSelectedCell30(this:WaGridCore, rowIndex: number, cellIndex: number): number {
        //selected 1, 0
        let result = 0;
        let rows = this.data_select_panel30;
        for (let i = 0, len= rows.length; i < len; i++) {
            let row = rows[i];
            if (rowIndex == row[0][0]) {
                result = row[1][cellIndex];
                break;
            }
        }
        return result;
    }

    isColumnName(this:WaGridCore, columnName: string): boolean {
        const grid = this;

        let result = false;
        for (let i = 0, len = this.column_table.count(); i < len; i++) {
            let column = this.column_table.data[i];
            if (columnName == column[COLUMN_KEYS.name]) {
                result = true;
                break;
            }
        }
        return result;
    }

    isColumnTypeNumber(this:WaGridCore, columnName: string): boolean {
        const grid = this;

        let result = false;
        let column = grid.getColumn(columnName)
        if (column[COLUMN_KEYS.type] == CellType.number) result = true;
        return result;
    }

    isFilterColumnName(this:WaGridCore, columnName: string): boolean {
        const grid = this;
        return grid.filter_column_table.isRow(COLUMN_KEYS.name, columnName);
    }

    isLastTopRowIndex(this:WaGridCore, rowIndex: number): boolean {
        const grid = this;

        let result = false;
        let rowCount = grid.getRowCount() - 1;
        if (grid.pageIntRowCount >= rowCount - rowIndex + 1) {
            return true;
        }
        return result;
    }
}