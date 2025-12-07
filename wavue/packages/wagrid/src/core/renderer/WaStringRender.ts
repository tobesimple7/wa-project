import {WaGridDom} from "../WaDom";


export class WaStringRender {
    /**
     * @param { panelName, columnName, tableCell, cellValue, className, visible, align, width }
     */
    addElement(param) {
        const element = WaGridDom.createElement('string');
        const tableCell = param.tableCell;

        let count = tableCell.querySelectorAll('.wa-grid-html-string').length;
        let rootChildCount = tableCell.childNodes[0].childNodes.length;

        if (rootChildCount > 1 || (rootChildCount == 1 && count == 0)) {
            tableCell.childNodes[0].innerHTML = '';
            tableCell.childNodes[0].append(element);
        }
        else if (count == 0) tableCell.childNodes[0].append(element);
    }
    /**
     * @param { panelName, columnName, tableCell, cellValue, className, visible, align, width }
     */
    setBounding(param) {
        WaGridDom.setStyle(param.tableCell, param);
        if (param.depth && param.columnIndex == 0) {
            WaGridDom.setCellStyle(param.tableCell.childNodes[0], 'paddingLeft', (param.depth * 15) + 'px');
        }
        else {
            WaGridDom.setCellStyle(param.tableCell.childNodes[0], 'paddingLeft', '0px');
        }
        const element = param.tableCell.querySelector('.wa-grid-html-string');
        if (param.cellValue) {
            WaGridDom.setCell(element, 'textContent', param.cellText);
        }
        else {
            WaGridDom.setCell(element, 'textContent', '');
        }
    }
}