
import {WaGridDom} from "../wa.grid.dom";

export class WaGridRenderGroup {

    addElement(param) {
        const row = param.grid.view_table.selectRowByRowIndex(param.rowIndex);;

        if (param.columnIndex == 0 && param.depth <= param.grid.group_column_table.count()) {
            const icon = WaGridDom.createElement('icon');
            const element = WaGridDom.createElement('string');
            if (param.tableCell.childNodes[0].innerHTML != '') param.tableCell.childNodes[0].innerHTML = '';
            param.tableCell.childNodes[0].append(icon);
            param.tableCell.childNodes[0].append(element);
        }
        else if (param.columnIndex == 0 && param.depth > param.grid.group_column_table.count()) {
            const element = WaGridDom.createElement('string');
            if (param.tableCell.childNodes[0].innerHTML != '') param.tableCell.childNodes[0].innerHTML = '';
            param.tableCell.childNodes[0].append(element);
        }
        else {
            const element = WaGridDom.createElement('string');
            if (param.tableCell.childNodes[0].innerHTML != '') param.tableCell.childNodes[0].innerHTML = '';
            param.tableCell.childNodes[0].append(element);
        }
    }

    setBounding(param) {
        const row = param.grid.view_table.selectRowByRowIndex(param.rowIndex);;
        if (param.columnIndex == 0 && param.depth <= param.grid.group_column_table.count()) {
            WaGridDom.setStyle(param.tableCell, param);
            WaGridDom.setCellStyle(param.tableCell.childNodes[0], 'paddingLeft', (param.depth * 15) + 'px');
            param.grid.classGroup.setGroupIcon(param.tableCell, param.rowIndex);

            const element = param.tableCell.querySelector('.wa-grid-html-string');
            WaGridDom.setCell(element, 'textContent', param.cellText);
        }
        else if (param.columnIndex == 0 && param.depth > param.grid.group_column_table.count()) {
            WaGridDom.setStyle(param.tableCell, param);
            WaGridDom.setCellStyle(param.tableCell.childNodes[0], 'paddingLeft', (param.depth * 15) + 'px');

            const element = param.tableCell.querySelector('.wa-grid-html-string');
            WaGridDom.setCell(element, 'textContent', param.cellText);

        }
        else {
            WaGridDom.setStyle(param.tableCell, param);
            WaGridDom.setCellStyle(param.tableCell.childNodes[0], 'paddingLeft', '0px');

            const element = param.tableCell.querySelector('.wa-grid-html-string');
            WaGridDom.setCell(element, 'textContent', param.cellText);

        }
    }
}