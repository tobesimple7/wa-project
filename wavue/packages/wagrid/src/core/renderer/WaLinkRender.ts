import {WaGridDom} from "../WaDom";

export class WaLinkRender {

    addElement(param) {
        const element = WaGridDom.createElement('link');
        const tableCell = param.tableCell;

        let count = tableCell.querySelectorAll('.wa-grid-html-link').length;
        let rootChildCount = tableCell.childNodes[0].childNodes.length;

        if (rootChildCount > 1 || (rootChildCount == 1 && count == 0)) {
            tableCell.childNodes[0].innerHTML = '';
            tableCell.childNodes[0].append(element);
        }
        else if (count == 0) tableCell.childNodes[0].append(element);
    }

    setBounding(param) {
        const element = param.tableCell.querySelector('.wa-grid-html-link');

        WaGridDom.setStyle(param.tableCell, param); // editable, align, className,
        //WaGridDom.setCell(element, 'disabled', (param.editable ? '' : 'disabled'));
        WaGridDom.setCellStyle(param.tableCell.childNodes[0], 'paddingLeft', '0px');
        // set value
        element.href = param.cellValue;
        element.innerHTML = param.cellText;
        element.target = '_blank';
    }
}