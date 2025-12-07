
import {WaDom} from "../Dom";
import {WaColumnProperty} from "@/core/columns/ColumnEnum"

export class WaTreeRender {
    addElement(param) {
        const row = param.grid.view_table.selectRowByRowIndex(param.rowIndex);;
        const children = row[WaColumnProperty.children];
        for (let i = param.tableCell.childNodes[0].childNodes.length - 1; i >= 0; i--) {
            param.tableCell.childNodes[0].childNodes[i].remove();
        }

        if (children.length > 0) {
            const icon = WaDom.createElement('icon');
            const element = WaDom.createElement('string');
            param.tableCell.childNodes[0].appendChild(icon);
            param.tableCell.childNodes[0].appendChild(element);
        }
        else {
            const element = WaDom.createElement('string');
            param.tableCell.childNodes[0].appendChild(element);
        }
    }

    setBounding(param) {
        const row = param.grid.view_table.selectRowByRowIndex(param.rowIndex);
        const children = row[WaColumnProperty.children];
        let rowDepth = row[WaColumnProperty.depth];

        WaDom.setStyle(param.tableCell, param);

        if (children.length > 0) {
            WaDom.setCellStyle(param.tableCell.childNodes[0], 'paddingLeft', (rowDepth * 15) + 'px');
            param.grid.classTree.setTreeIcon(param.tableCell, param.rowIndex);
        }
        else {
            WaDom.setCellStyle(param.tableCell.childNodes[0], 'paddingLeft', ((rowDepth * 15) + 15) + 'px');
        }

        const element = param.tableCell.querySelector('.wa-grid-html-string');
        WaDom.setCell(element, 'textContent', param.cellText);
    }
}