
import { WaPanelBase } from './PanelBase';
import { WaRenderPanel30 } from './RenderPanel30';
import { WaRenderPanelInfo } from './RenderPanelInfo';
import {WaColumnProperty} from "@/core/columns/ColumnEnum"
export class WaPanel80 extends WaPanelBase {

    constructor(grid) {
        super(grid);
        this.panelName  = 'panel80';
    }

    createHtml(parentElement) {
        const grid = this.grid;

        let className = grid.options.showGroupPanel ? 'wa-grid-show' : 'wa-grid-hide';
        let s ='<div class="wa-grid-panel80 ' + className + '"></div>';
        parentElement.insertAdjacentHTML('beforeend', s);

        grid.waPanel80.panel80_select();
    }

    createTable() {
        let selector = '#' + this.grid.gridId;
        const grid = this.grid;

        const div = document.createElement('div');
        div.className = 'wa-grid-panel-bar';

        const span = document.createElement('span');
        span.className = 'wa-grid-panel-bar-span';
        span.textContent = grid.getConfigLabel('group_placeholder');
        div.appendChild(span);

        document.querySelector(selector + ' .wa-grid-panel80').appendChild(div);
    }

    panel80_select() { //type : header, content, left, top
        let selector = this.selector;
        const grid = this.grid;

        let startRowIndex, startCellIndex, startX, startY;
        let lastRowIndex , lastCellIndex , lastX , lastY;

        let targetName;

        let mouseButton = 0;

        let flagUp      = false;
        let flagDown    = false;
        let flagLeft    = false;
        let flagRight   = false;

        let moveCell;
        let moveCellLeft;
        let moveCellTop;
        let moveCellIndex;
        let moveCellRowIndex;

        let panel80= document.querySelector(selector + ' .wa-grid-panel80');
        const mouseDownEvent = function(e) {
            let element;

            if      (e.target.classList.contains('wa-grid-html-icon-remove')) { targetName = 'icon'   ; element = e.target; }
            else if (e.target.classList.contains('wa-grid-panel-button-text')) { targetName = 'text'   ; element = e.target; }
            else if (e.target.classList.contains('wa-grid-panel-button'))      { targetName = 'button' ; element = e.target; }
            else if (e.target.classList.contains('wa-grid-panel-bar'))         { targetName = 'bar'    ; element = e.target; }
            else return;

            grid.startX = startX = window.scrollX + e.clientX;
            grid.startY = startY = window.scrollY + e.clientY;

            grid.lastX = lastX = window.scrollX + e.clientX;
            grid.lastY = lastY = window.scrollY + e.clientY;

            // @ts-ignore
            if (window.event.button === 0) {
                // @ts-ignore
                if (!window.event.ctrlKey && !window.event.shiftKey) {
                    selectCell(e, panel80);
                }
                // @ts-ignore
                else if (window.event.shiftKey) {
                    selectCellShift(e, panel80);
                }
            }
            document.addEventListener('mousemove', mouseMoveEvent);
            document.addEventListener('mouseup', mouseUpEvent);
        };

        const mouseMoveEvent = function(e) {
            e.preventDefault();
            e.stopPropagation();
            // @ts-ignore
            if (window.event.button === 0) {
                // @ts-ignore
                if (!window.event.ctrlKey && !window.event.shiftKey) {
                    selectCellMove(e, panel80);
                }
            }
        };

        const mouseUpEvent = function(e) {
            let element;
            if      (e.target.classList.contains('wa-grid-html-icon-remove')) { targetName = 'icon'   ; element = e.target; }
            else if (e.target.classList.contains('wa-grid-panel-button-text')) { targetName = 'text'   ; element = e.target; }
            else if (e.target.classList.contains('wa-grid-panel-button'))      { targetName = 'button' ; element = e.target; }
            else if (e.target.classList.contains('wa-grid-panel-bar'))         { targetName = 'bar'    ; element = e.target; }

            grid.lastX = lastX = window.pageXOffset + e.clientX;
            grid.lastY = lastY = window.pageYOffset + e.clientY;

            let isInPanel80 = grid.isInPanel(e, 'panel80');
            if (isInPanel80) {
                if (mouseButton == 0
                    && startX > lastX - grid.mousePointRange
                    && startX < lastX + grid.mousePointRange
                    && startY > lastY - grid.mousePointRange
                    && startY < lastY + grid.mousePointRange) {
                    let element = e.target;
                    let name = element.dataset.name;
                    if (e.detail == 1 && targetName == 'icon') {
                        grid.classGroup.removeGroupButton(element);
                    }
                }
                else {
                    if (document.querySelectorAll(' .wa-grid-move').length > 0) {
                        let moveElement: any = document.querySelector('.wa-grid-move');
                        let rectPanel80: any = document.querySelector(selector + ' .wa-grid-panel80').getBoundingClientRect();
                        let rectMoveCell: any= moveElement.getBoundingClientRect();

                        let name  = moveElement.dataset.name;
                        let column = grid.getColumn(name);
                        let text  = column[WaColumnProperty.text];
                        let order = 'asc';

                        // Find the one that is smaller to the button left than then move element left
                        let buttons = document.querySelectorAll(selector + ' .wa-grid-panel-bar .wa-grid-panel-button');
                        let targetButton;
                        let targetIndex;

                        for (let i = 0, len = buttons.length; i < len; i++) {
                            let button = buttons[i];
                            let buttonLeft = button.getBoundingClientRect().left;
                            if (e.clientX < buttonLeft) {
                                targetButton = button;
                                targetIndex = i;
                                break;
                            }
                        }

                        // Add 1th postion
                        if (grid.null(targetIndex)) {
                            targetButton = null;
                            targetIndex = null;
                        }
                        grid.classGroup.changeGroupButtonOrder(name, text, order, targetIndex);

                        flagLeft = false;
                        flagRight = false;
                        flagUp = false;
                        flagDown = false;
                        document.removeEventListener('mousemove', mouseMoveEvent);
                        document.removeEventListener('mouseup', mouseUpEvent);
                        if (document.querySelectorAll('.wa-grid-move').length > 0) document.querySelector('.wa-grid-move').remove();
                    }
                }
                flagLeft = false;
                flagRight = false;
                document.removeEventListener('mousemove', mouseMoveEvent);
                document.removeEventListener('mouseup', mouseUpEvent);
            }
            else {
                if (document.querySelectorAll('.wa-grid-move').length > 0) document.querySelector('.wa-grid-move').remove();
                flagLeft = false;
                flagRight = false;
                document.removeEventListener('mousemove', mouseMoveEvent);
                document.removeEventListener('mouseup', mouseUpEvent);
            }
        };

        const selectCell = function(e, table) {
            let element;

            if      (e.target.classList.contains('wa-grid-html-icon-remove')) { targetName = 'icon'   ; element = e.target; }
            else if (e.target.classList.contains('wa-grid-panel-button-text')) { targetName = 'text'   ; element = e.target; }
            else if (e.target.classList.contains('wa-grid-panel-button'))      { targetName = 'button' ; element = e.target; }
            else if (e.target.classList.contains('wa-grid-panel-bar'))         { targetName = 'bar'    ; element = e.target; }
            else return;

            if (targetName == 'button' || targetName == 'text') {

                let col = null;

                if (targetName == 'text') col = element.parentNode;
                else col = element;

                let columnName = col.dataset.name;

                let moveDiv;
                if (document.querySelectorAll('.wa-grid-move').length == 0) {
                    moveDiv = document.createElement('div');
                    moveDiv.classList.add('wa-grid-move');

                    let table = document.createElement('table');
                    table.classList.add('wa-grid-table');

                    let tr = document.createElement('tr');
                    let td = document.createElement('td');
                    td.classList.add('wa-grid-cell');

                    let div = document.createElement('div');
                    div.classList.add('wa-grid-cell-div');

                    let span = document.createElement('span');
                    span.classList.add('wa-grid-html-string');

                    div.appendChild(span);
                    td.appendChild(div);
                    tr.appendChild(td);
                    table.appendChild(tr);
                    moveDiv.appendChild(table);
                    document.body.appendChild(moveDiv);
                }
                moveDiv = document.querySelector('.wa-grid-move');
                moveDiv.style.display = 'none';

                moveDiv.querySelector('.wa-grid-html-string').textContent = col.querySelector('.wa-grid-panel-button-text').textContent;
                moveDiv = document.querySelector('.wa-grid-move');

                let colRect = col.getBoundingClientRect();

                moveCell = col;
                moveCellLeft = window.pageXOffset + e.clientX - colRect.left;
                moveCellTop  = window.pageYOffset + e.clientY - colRect.top;

                moveCellIndex = col.cellIndex;
                moveCellRowIndex = col.parentNode.rowIndex;

                let nWidth = (colRect.width + 2) + 'px';
                let nHeight = colRect.height + 'px';

                moveDiv.style.width = nWidth;
                moveDiv.style.height = nHeight;
                moveDiv.childNodes[0].style.width = nWidth;
                moveDiv.childNodes[0].style.height = nHeight;
                moveDiv.style.left = '70000px';
                moveDiv.style.top = '0px';

                moveDiv.dataset.columnIndex = null;
                moveDiv.dataset.rowIndex = null;
                moveDiv.dataset.name = columnName;
                grid.classRange.removeRange(0, -1);
            }
            flagLeft = false;
            flagRight = false;
            document.removeEventListener('mousemove', mouseMoveEvent);
            document.removeEventListener('mouseup', mouseUpEvent);
        }

        const selectCellMove = function(e, table) {
            let col: any = e.target.closest('.wa-grid-cell');

            flagLeft    = false;
            flagRight   = false;

            startX = grid.startX;
            startY = grid.startY;

            grid.lastX = lastX = window.scrollX + e.clientX;
            grid.lastY = lastY = window.scrollY + e.clientY;

            let moveY = lastY - startY;
            let moveX = lastX - startX;

            let moveDiv: any = document.querySelector('.wa-grid-move');
            if (moveDiv){
                moveDiv.style.left = (lastX - moveCellLeft) + 'px';
                moveDiv.style.top  = (lastY - moveCellTop)  + 'px';
                if (Math.abs(moveX) > 20 || Math.abs(moveY) > 20) moveDiv.style.display = '';
            }

            let rect = document.querySelector(selector + ' .wa-grid-panel80').getBoundingClientRect();
            let rectLeft = window.pageXOffset + rect.left;
            let rectRight = window.pageXOffset + rect.right;
            let rect30 = document.querySelector(selector + ' .wa-grid-panel30').getBoundingClientRect();
            rectRight = window.pageXOffset + rect30.right;

            let type = '';
            if (lastX < rectLeft) {
                flagLeft = true
                type = 'left';
                doInterval(type, lastX, lastY);
            }
            if (lastX > rectRight) {
                flagRight = true
                type = 'right';
                doInterval(type, lastX, lastY);
            }
        }

        const selectCellShift = function(e, table) {}

        const select = function(startCellIndex, moveX, moveY, lastX, lastY) {
            let tableRect = document.querySelector(selector + ' .wa-grid-panel20 .wa-grid-table').getBoundingClientRect();
            let top    = window.pageYOffset + tableRect.top;
            let bottom = window.pageYOffset + tableRect.bottom;

            let sumRect = document.querySelector(selector + ' .wa-grid-panel20').getBoundingClientRect();
            let right = window.pageXOffset + sumRect.right;
            let left  = window.pageXOffset + sumRect.left;

            //if (lastX > right) grid.classScroll.setBarPositionByDirection('right');
            //if (lastX < left) grid.classScroll.setBarPositionByDirection('left');
            //==================================================================
            let arr = document.querySelectorAll(selector + ' .wa-grid-panel20 .wa-grid-table td:not([data-name=""])');
            let tdList = Array.from(arr).sort(function(a: any, b: any) {
                a = a.cellIndex;
                b = b.cellIndex;
                if (a > b) return 1;
                if (a < b) return -1;
                return 0;
            });
            if (moveX > 0) {
                let maxCellIndex;
                for (let x = 0, len = tdList.length; x < len; x++) {
                    let cell: any =  tdList[x];
                    if (grid.column_table.data[x][WaColumnProperty.visible] == false) continue;
                    let left = window.scrollX + cell.getBoundingClientRect().left;
                    if (lastX > left) maxCellIndex = cell.cellIndex;
                }
                grid.classRange.removeRange(0, -1);
                let _topRowIndex = grid.classRange.selectRange(0, -1, startCellIndex, maxCellIndex);
                grid.waPanel30.setDataPanel(_topRowIndex);
            }
            //==================================================================
            if (moveX < 0) {
                let minCellIndex;
                for (let x = tdList.length - 1; x >= 0; x--) {
                    let cell: any =  tdList[x];
                    if (grid.column_table.data[x][WaColumnProperty.visible] == false) continue;
                    let right = window.pageXOffset + cell.getBoundingClientRect().right;
                    if (lastX < right) minCellIndex = cell.cellIndex;
                }
                grid.classRange.removeRange(0, -1);
                let _topRowIndex = grid.classRange.selectRange(0, -1, startCellIndex, minCellIndex);
                grid.waPanel30.setDataPanel(_topRowIndex);
            }
            //==================================================================
        }

        const selectRefresh = function(type, lastX, lastY) {
            let content = document.querySelector(selector + ' .wa-grid-panel30');
            let table: any = document.querySelector(selector + ' .wa-grid-panel30 .wa-grid-table');
            const trContent: any = document.querySelectorAll(selector + ' .wa-grid-panel30 .wa-grid-table tbody tr:not([style*="display:"])');

            let startRowIndex  = grid.startRowIndex;
            let lastRowIndex   = grid.lastRowIndex;
            let startCellIndex = grid.startCellIndex;
            let lastCellIndex  = grid.lastCellIndex;

            let trCount = trContent.length;
            let tdCount = (trContent.length > 0) ? trContent[0].childNodes.length : 0;
            let minRowIndex, maxRowIndex, maxCellIndex, minCellIndex;
            if (type == 'right') {
                if (table.style.left == (-1 * grid.horizontalScroll.hiddenSize) + 'px') {
                    flagRight = false;
                    grid.classRange.removeRange(0, -1);
                    let _topRowIndex = grid.classRange.selectRange(startRowIndex, lastRowIndex, startCellIndex, tdCount - 1);
                    grid.waPanel30.setDataPanel(_topRowIndex);
                }
                else {
                    grid.classScroll.setBarPositionByDirection('right');
                    for (let trRowIndex = 0; trRowIndex < trCount; trRowIndex++) {
                        for (let cellIndex = 0; cellIndex < tdCount; cellIndex++) {
                            if (grid.column_table.data[cellIndex][WaColumnProperty.visible] == false) continue;
                            let left = window.scrollX + trContent[trRowIndex].childNodes[cellIndex].getBoundingClientRect().left;
                            if (lastX > left) maxCellIndex = trContent[trRowIndex].childNodes[cellIndex].cellIndex;
                        }
                    }
                    grid.classRange.removeRange(0, -1);
                    let _topRowIndex = grid.classRange.selectRange(startRowIndex, lastRowIndex, startCellIndex, maxCellIndex);
                    grid.waPanel30.setDataPanel(_topRowIndex);
                }
            }
            //==================================================================
            else if (type == 'left') {
                if (table.style.left == '0px') {
                    flagLeft = false;
                    grid.classRange.removeRange(0, -1);
                    let _topRowIndex = grid.classRange.selectRange(startRowIndex, lastRowIndex, startCellIndex, 0);
                    grid.waPanel30.setDataPanel(_topRowIndex);
                }
                else {
                    grid.classScroll.setBarPositionByDirection('left');
                    for (let rowIndex = 0; rowIndex < trCount; rowIndex++) {
                        for (let cellIndex = tdCount - 1; cellIndex >= 0; cellIndex--) {
                            if (grid.column_table.data[cellIndex][WaColumnProperty.visible] == false) continue;
                            let right = window.pageXOffset + trContent[rowIndex].childNodes[cellIndex].getBoundingClientRect().right;
                            if (lastX < right) minCellIndex = trContent[rowIndex].childNodes[cellIndex].cellIndex;
                        }
                    }
                    grid.classRange.removeRange(0, -1);
                    let _topRowIndex = grid.classRange.selectRange(startRowIndex, lastRowIndex, startCellIndex, minCellIndex);
                    grid.waPanel30.setDataPanel(_topRowIndex);
                }
            }
        }

        const doInterval = function(type, lastX, lastY) {
            if (flagLeft) {
                //flagLeft  = false;
                flagRight   = false;
                setTimeout(function() {doInterval('left', lastX, lastY);}, 5);
                selectRefresh('left', lastX, lastY);
            }
            else if (flagRight) {
                flagLeft    = false;
                //flagRight = false;
                setTimeout(function() {doInterval('right', lastX, lastY);}, 5);
                selectRefresh('right', lastX, lastY);
            }
        }
        panel80.addEventListener('mousedown', mouseDownEvent);
    }
}



