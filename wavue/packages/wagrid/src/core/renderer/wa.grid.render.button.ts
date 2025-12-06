import {WaGridDom} from "../wa.grid.dom";

export class WaGridRenderButton {

    addElement(param) {
        const element = WaGridDom.createElement('button');
        const tableCell = param.tableCell;

        const count: number = tableCell.querySelectorAll('.wa-grid-html-button').length;
        const rootChildCount: number = tableCell.childNodes[0].childNodes.length;

        if (rootChildCount > 1 || (rootChildCount == 1 && count == 0)) {
            tableCell.childNodes[0].innerHTML = '';
            tableCell.childNodes[0].append(element);
        }
        else if (count == 0) tableCell.childNodes[0].append(element);
    }

    setBounding(param) {
        const element = param.tableCell.querySelector('.wa-grid-html-button');
        if (!element) return;

        WaGridDom.setStyle(param.tableCell, param); // editable, align, className,
        WaGridDom.setCell(element, 'disabled', (param.editable ? '' : 'disabled'));

        WaGridDom.setCellStyle(param.tableCell.childNodes[0], 'paddingLeft', '0px');

        // set value
        element.innerHTML = param.cellText;
    }
}