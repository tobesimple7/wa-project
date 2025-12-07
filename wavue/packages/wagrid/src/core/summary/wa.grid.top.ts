import {WaGridCore} from "@/core/WaGridCore"
import {WaColumnProperty} from "@/core/columns/WaColumnEnum"

export class WaGridTop {
    grid: WaGridCore;
    selector: string;

    constructor(grid) {
        this.grid = grid;
        this.selector = '#' + grid.gridId;
    }

    setTopColumns(columns) {
        const grid = this.grid;
        columns.map(column => {
            if (grid.null(column[WaColumnProperty.align])) column[WaColumnProperty.align] = 'center';
            grid.top_column_table.insert(column);
        });
    }

    setTopData() {
        const grid = this.grid;

        if (grid.top_column_table.count() == 0) return;

        let topColumns = grid.top_column_table.data;

        let dataRow = {};
        let columns = grid.column_table.data;
        for (let x = 0, len = columns.length; x < len; x++) {
            let column = columns[x];
            let columnName = column[WaColumnProperty.name];
            dataRow[columnName] = null;
        }
        grid.top_table.insert(dataRow);

        /* get sum, avg */
        for (let x = 0, len2 = grid.top_column_table.count(); x < len2; x++) {
            let footerColumn = grid.top_column_table.data[x];
            let columnName = footerColumn[WaColumnProperty.name];

            let summaryType = footerColumn[WaColumnProperty.summaryType];
            let result = null;

            if (summaryType == 'avg') {
                result = grid.view_table.getAvg(columnName);
                grid.top_table.updateByRowIndex(0, columnName, result);
            }
            else if (summaryType == 'sum') {
                result = grid.view_table.getSum(columnName);
                grid.top_table.updateByRowIndex(0, columnName, result);
            }
            else if (summaryType == 'max') {
                result = grid.view_table.getMax(columnName);
                grid.top_table.updateByRowIndex(0, columnName, result);
            }
            else if (summaryType == 'min') {
                result = grid.view_table.getMin(columnName);
                grid.top_table.updateByRowIndex(0, columnName, result);
            }
            else grid.top_table.updateByRowIndex(0, columnName, footerColumn[WaColumnProperty.text]);
        }
    }

    setTopValue(rowIndex, columnName, value) {
        const grid = this.grid;
        let column = grid.column_table.selectRow(WaColumnProperty.name, columnName);
        const result: any = grid.getFormat(column, value);
        grid.top_table.updateByRowIndex(rowIndex, columnName, result.value);
    }
}

