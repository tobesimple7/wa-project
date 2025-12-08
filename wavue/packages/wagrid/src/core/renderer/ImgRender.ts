import {WaDom} from "../Dom";
import {COLUMN_KEYS} from "@/core/columns/ColumnEnum"

export class WaImgRender {

    addElement(param) {
        const element = WaDom.createElement('img');
        const tableCell = param.tableCell;

        let count = tableCell.querySelectorAll('.wa-grid-html-img').length;
        let rootChildCount = tableCell.childNodes[0].childNodes.length;

        if (rootChildCount > 1 || (rootChildCount == 1 && count == 0)) {
            tableCell.childNodes[0].innerHTML = '';
            tableCell.childNodes[0].append(element);
        }
        else if (count == 0) tableCell.childNodes[0].append(element);
    }

    setBounding(param) {
        const element = param.tableCell.querySelector('.wa-grid-html-img');

        WaDom.setStyle(param.tableCell, param); // editable, align, className,
        //WaDom.setCell(element, 'disabled', (param.editable ? '' : 'disabled'));
        WaDom.setCellStyle(param.tableCell.childNodes[0], 'paddingLeft', '0px');

        // set value
        element.src = param.grid.getUserImageRoot(param.columnName) + param.cellValue;
        element.width = param.grid.getRenderer(param.columnName, 'width') ?
                        param.grid.getRenderer(param.columnName, 'width') : param.column[COLUMN_KEYS.width];
        element.height = param.grid.getRenderer(param.columnName, 'height') ?
                        param.grid.getRenderer(param.columnName, 'height') : param.grid.rowHeight;
    }
}