
import {WaDom} from "../Dom";

export class WaGroupRender {

    addElement(param) {
        const row = param.grid.view_table.selectRowByRowIndex(param.rowIndex);;

        if (param.columnIndex == 0 && param.depth <= param.grid.group_column_table.count()) {
            const icon = WaDom.createElement('icon');
            const element = WaDom.createElement('string');
            if (param.tableCell.childNodes[0].innerHTML != '') param.tableCell.childNodes[0].innerHTML = '';
            param.tableCell.childNodes[0].append(icon);
            param.tableCell.childNodes[0].append(element);
        }
        else if (param.columnIndex == 0 && param.depth > param.grid.group_column_table.count()) {
            const element = WaDom.createElement('string');
            if (param.tableCell.childNodes[0].innerHTML != '') param.tableCell.childNodes[0].innerHTML = '';
            param.tableCell.childNodes[0].append(element);
        }
        else {
            const element = WaDom.createElement('string');
            if (param.tableCell.childNodes[0].innerHTML != '') param.tableCell.childNodes[0].innerHTML = '';
            param.tableCell.childNodes[0].append(element);
        }
    }

    setBounding(param) {
        const row = param.grid.view_table.selectRowByRowIndex(param.rowIndex);;
        if (param.columnIndex == 0 && param.depth <= param.grid.group_column_table.count()) {
            WaDom.setStyle(param.tableCell, param);
            WaDom.setCellStyle(param.tableCell.childNodes[0], 'paddingLeft', (param.depth * 15) + 'px');
            param.grid.classGroup.setGroupIcon(param.tableCell, param.rowIndex);

            const element = param.tableCell.querySelector('.wa-grid-html-string');
            WaDom.setCell(element, 'textContent', param.cellText);
        }
        else if (param.columnIndex == 0 && param.depth > param.grid.group_column_table.count()) {
            WaDom.setStyle(param.tableCell, param);
            WaDom.setCellStyle(param.tableCell.childNodes[0], 'paddingLeft', (param.depth * 15) + 'px');

            const element = param.tableCell.querySelector('.wa-grid-html-string');
            WaDom.setCell(element, 'textContent', param.cellText);

        }
        else {
            WaDom.setStyle(param.tableCell, param);
            WaDom.setCellStyle(param.tableCell.childNodes[0], 'paddingLeft', '0px');

            const element = param.tableCell.querySelector('.wa-grid-html-string');
            WaDom.setCell(element, 'textContent', param.cellText);

        }
    }
}