/*
panel20_select()
│
├─ ① mousedown
│     ├─ 셀 클릭 (selectCell / selectCellShift)
│     ├─ 드래그 시작 좌표 기억 (startX/Y)
│     └─ mousemove, mouseup 이벤트 등록
│
├─ ② mousemove
│     ├─ 셀 이동 중일 경우 (컬럼 드래그)
│     ├─ 이동 거리 20px 이상이면 moveDiv 표시
│     └─ 마우스 위치에 따라 자동 스크롤 플래그 설정 (flagLeft/right)
│
├─ ③ mouseup
│     ├─ panel80 위 → 그룹 버튼 추가
│     ├─ panel90 위 → 정렬 버튼 추가
│     ├─ 셀 클릭 → 정렬 이벤트 실행
│     ├─ 컬럼 이동 → changeColumnOrder 수행
│     └─ 이벤트 해제 및 cleanup
│
└─ ④ 내부 유틸
      ├─ selectCell()         : 클릭 시 moveDiv 생성
      ├─ selectCellMove()     : 이동 시 위치 갱신 / range 선택
      ├─ selectCellShift()    : Shift 다중 선택 (미구현)
      ├─ select()             : 좌우 이동 기준으로 선택 범위 설정
      ├─ selectRefresh()      : 자동 스크롤 갱신
      └─ doInterval()         : 반복 스크롤 타이머
*/
import {WaPanelBase} from './PanelBase'
import {WaRenderPanelInfo} from '@/core/panels/RenderPanelInfo'
import {WaGridTable} from "../wa.grid.table"
import {WaGridCore} from "@/core/wa.grid.core"
import {CellType} from "@/core/WaGrid.types"
import {WaColumnProperty} from "@/core/columns/WaGridColumn.enum"

export class WaPanel20 extends WaPanelBase {
    isChecked: boolean;

    constructor(grid: WaGridCore) {
        super(grid);
        this.isChecked = false;
        this.panelName  = 'panel20';
        this.panelName1 = 'panel21';
        this.panelName2 = 'panel22';
        this.panelName0 = 'panel20';
    }

    createHtml(parentElement: any) {
        parentElement.insertAdjacentHTML(
            'beforeend',
            `
            <div class="wa-grid-group21">
              <div class="wa-grid-panel">
                <div class="wa-grid-panel21"><table class="wa-grid-table"></table></div>
                <div class="wa-grid-panel22"><table class="wa-grid-table"></table></div>
              </div>
            </div>
            <div class="wa-grid-group20">
              <div class="wa-grid-panel">
                <div class="wa-grid-panel20"><table class="wa-grid-table"></table></div>
              </div>
            </div>
            `
        );
    }

    createTable()  {
        const grid = this.grid;
        const table = new WaGridTable(grid);
        ['panel21', 'panel22', 'panel20'].forEach(name => table.createTable(name, 0, grid.headerRowCount));
        this.setDataPanel();
    }

    setDataPanel(topRowIndex?: number) {
        const grid = this.grid;

        this.setDataPanel1({panelName: 'panel21'});
        this.setDataPanel2({panelName: 'panel22'});
        this.setDataPanel0({panelName: 'panel20'});

        grid.horizontalScroll.setScroll(grid.code_horizontal); // Necessary
    }

    setDataPanel1(param: any) {
        let selector = this.selector;
        const grid = this.grid;

        let panelName = this.panelName1;

        /* create table thead */
        //grid.classRow.setTableHead(grid, panelName);

        /**
         * create table tbody
         */
        let tableRows = document.querySelectorAll(selector + ' .wa-grid-' + panelName + ' .wa-grid-table tbody tr');
        let tableRowIndex = 0;
        for (let i = 0; i < grid.headerRowCount; i++) {
            let tableRow = tableRows[tableRowIndex];

            // create table tr
            grid.classRow.setTableRow(grid, tableRow, i, panelName);

            for (let x = 0; x < grid.info_column_table.count(); x++) {
                const tableCell: any = tableRow.childNodes[x];

                tableCell.dataset.rowIndex = i;
                tableCell.dataset.displayRowIndex = i;
                tableCell.dataset.cellType = grid.info_column_table.selectValue(x, WaColumnProperty.type);


                /**
                 * Render: Start
                 */
                let tbsGridRenderInfo = new WaRenderPanelInfo(grid);
                tbsGridRenderInfo.start(panelName, tableCell, grid.info_column_table.data[x], i, x);
                tbsGridRenderInfo = null;

                if (i == 0) tableCell.rowSpan = grid.headerRowCount;
                else tableCell.style.display = 'none';

                /**
                 * Render: Show Selected Cells
                 */
                grid.classCell.showSelectedCells(grid, panelName, tableCell, i, 0);
            }

            // on fixed columns
            grid.classCell.hideTableCells(grid, panelName, tableRow, grid.info_column_table.count() - 1);

            tableRowIndex += 1;
        }
        // hide Unnecessary tableRows
        let pageRowCount = grid.getPageRowCount(panelName);

        /* remove table tr */
        grid.classRow.hideTableRows(grid, panelName, tableRows, tableRowIndex, pageRowCount);
    }

    setDataPanel2(param) {
        this.setDataPanelSub(this.panelName2, param);
    }

    setDataPanel0(param) {
        this.setDataPanelSub(this.panelName0, param);
    }

    setDataPanelSub(panelName: string, param: any) {
        let selector = this.selector;
        const grid = this.grid;

        /* table thead */
        grid.classRow.setTableHead(grid, panelName);

        /* table tbody */
        let tablesRows = document.querySelectorAll(selector + ' .wa-grid-' + panelName + ' .wa-grid-table tbody tr');

        let startColumnIndex = 0;
        let lastColumnIndex = grid.column_table.count();

        if (panelName == 'panel22') {
            lastColumnIndex = grid.fixedColumnIndex + 1;
        }
        else {
            if (grid.fixedColumnIndex != -1) {
                startColumnIndex = grid.fixedColumnIndex + 1;
                for (let i = 0, rowLen = tablesRows.length; i < rowLen; i++) {
                    const tableRow: any = tablesRows[i];
                    tableRow.style.height = grid.headerRowHeight + 'px';
                    for (let x = 0; x <= grid.fixedColumnIndex; x++) {
                        let tableCell = tableRow.childNodes[x];
                        tableCell.style.display = 'none';
                    }
                }
            }
        }
        let orderNum = 1;
        grid.sort_column_table.data.map(dataRow => {
            if (grid.notEmpty(dataRow['order'])) {
                dataRow['orderNumber'] = orderNum;
                orderNum += 1;
            }
        })

        for (let i = 0, rowLen = grid.header_column_table.count(); i < rowLen; i++) {
            const tableRow: any = tablesRows[i];
            tableRow.style.height = grid.headerRowHeight + 'px';

            for (let x = startColumnIndex, colLen = lastColumnIndex; x < colLen; x++) {
                const column: any  = grid.column_table.data[x];
                const header: any  = grid.header_column_table.data[i][x];
                const tableCell: any = tableRow.childNodes[x];

                let selectedValue = grid.isSelectedHeaderCell(panelName, x);
                if (selectedValue == 1) tableCell.classList.add('wa-grid-cell-select');

                let columnName = header[WaColumnProperty.name];

                tableCell.style.display = (header[WaColumnProperty.visible] == true) ? '' : 'none';
                tableCell.style.textAlign = header[WaColumnProperty.align];

                tableCell.colSpan = header[WaColumnProperty.colSpan];
                tableCell.rowSpan = header[WaColumnProperty.rowSpan];

                tableCell.dataset.name = (header[WaColumnProperty.kind] == 'column') ? columnName : '';
                tableCell.dataset.kind = header[WaColumnProperty.kind];

                if (header[WaColumnProperty.kind] == 'column') {
                    let className = grid.classHeader.getHeaderProperty(columnName, WaColumnProperty.className);
                    if (grid.notNull(className)) tableCell.classList.add(className);
                    tableCell.style.display = (column[WaColumnProperty.visible] == true) ? '' : 'none';
                    let columnType = column[WaColumnProperty.type];
                    if (columnType == CellType.checkbox) {
                        const checkbox = tableCell.querySelector('.wa-grid-html-checkbox');
                        checkbox.style.display = '';
                    }
                    else {
                        const checkbox = tableCell.querySelector('.wa-grid-html-checkbox');
                        checkbox.style.display = 'none';
                    }
                }

                tableCell.querySelector('.wa-grid-html-sort').textContent = '';
                if (grid.sort_column_table.isRow(WaColumnProperty.name, columnName) && header[WaColumnProperty.kind] == 'column') {
                    let sortColumn = grid.classSort.getSortRow(columnName);
                    let sortSymbol = '';

                    let orderNumber = grid.isNull(sortColumn['orderNumber'], '');

                    if (sortColumn['order'] == 'desc') sortSymbol = `▼${orderNumber}`;
                    else if (sortColumn['order'] == 'asc') sortSymbol = `▲${orderNumber}`;

                    tableCell.querySelector('.wa-grid-html-sort').textContent = sortSymbol;
                }

                const textSpan = tableCell.querySelector('.wa-grid-html-string');
                textSpan.textContent = header[WaColumnProperty.text];
            }
        }
    }

    panel21_select() { //type : header, content, left, top
        let selector = this.selector;
        const grid = this.grid;
        let clsPanel = this;

        let table = document.querySelector(selector + ' .wa-grid-panel21 .wa-grid-table');

        const cickEvent = function (e) {
            if (e.target.classList.contains('wa-grid-html-checkbox')) { }
            else return;

            const tableCell = e.target.parentNode.parentNode;
            const column = grid.info_column_table.selectRowByRowIndex(tableCell.cellIndex);
            const columnName = column[WaColumnProperty.name];

            if (clsPanel.isChecked) clsPanel.isChecked = false;
            else clsPanel.isChecked = true;

            const callback = grid.getInfoRenderer(columnName, 'callback');

            for (let i = 0, len = grid.view_table.count(); i < len; i++) {
                const dataRow = grid.view_table.selectRowByRowIndex(i);
                if (callback) {
                    const eventRow: any = {}
                    eventRow.rowIndex    = i;
                    eventRow.columnIndex = tableCell.cellIndex;
                    eventRow.columnName  = columnName;
                    eventRow.value       = dataRow[WaColumnProperty.isChecked];
                    eventRow.text        = dataRow[WaColumnProperty.isChecked];
                    eventRow.data        = dataRow;
                    const result = callback(grid, eventRow);
                    if (result.editable == false) continue;
                    else grid.view_table.data[i][WaColumnProperty.isChecked] = clsPanel.isChecked;
                }
                else {
                    grid.view_table.data[i][WaColumnProperty.isChecked] = clsPanel.isChecked;
                }
            }
            setTimeout(function() {
                grid.classPanel20.setDataPanel();
                grid.classPanel30.setDataPanel(grid.getFirstRowIndex());
            }, 20);
        }

        const mouseDownEvent = function (e) {
            document.addEventListener('mouseup', mouseUpEvent);
        };
        const mouseUpEvent = function (e) {
            let targetName;
            if (e.target.classList.contains('wa-grid-cell')) { targetName = 'cell'; }
            else if (e.target.classList.contains('wa-grid-cell-div')) { targetName = 'cell'; }
            else return;
            if (targetName == 'cell') {
                let col = e.target.closest('.wa-grid-cell')
                if (col.cellIndex == 0) {
                    // let fromCellIndex = grid.classColumn.getFirstVisibleColumnIndex();
                    // let toCellIndex = grid.classColumn.getLastVisibleColumnIndex();
                    //
                    // grid.classRange.removeRange(0, -1);
                    // let _topRowIndex = grid.classRange.selectRange(0, -1, fromCellIndex, toCellIndex);
                    // grid.classPanel30.setDataPanel(_topRowIndex);
                    grid.classSort.initSortData()
                }
            }
            document.removeEventListener('mouseup', mouseUpEvent);
            grid.input_focus();
        };
        let eventPanel = document.querySelector(selector + ' .wa-grid-panel21');
        eventPanel.addEventListener('mousedown', mouseDownEvent);
        eventPanel.addEventListener('click', cickEvent);
    }

    panel20_select(panelName: any) { //type : header, content, left, top
        let selector = this.selector;
        const grid = this.grid;

        let startRowIndex, startCellIndex, startX, startY;
        let lastRowIndex , lastCellIndex , lastX , lastY;

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

        let table = document.querySelector(selector + ' .wa-grid-' + panelName + ' .wa-grid-table');
        let eventPanel = document.querySelector(selector + ' .wa-grid-' + panelName);

        const mouseDownEvent = function(e) {
            let col = e.target.closest('.wa-grid-cell');
            if (e.target.classList.contains('wa-grid-html-resize')) return;

            grid.startX = startX = window.pageXOffset + e.clientX;
            grid.startY = startY = window.pageYOffset + e.clientY;

            grid.lastX = lastX = window.pageXOffset + e.clientX;
            grid.lastY = lastY = window.pageYOffset + e.clientY;

            startCellIndex = col.cellIndex;
            lastCellIndex = col.cellIndex;

            // @ts-ignore
            if (window.event.button === 0) {
                // @ts-ignore
                if (!window.event.ctrlKey && !window.event.shiftKey) {
                    selectCell(e, table);
                }
                else {
                    // @ts-ignore
                    if (window.event.shiftKey) {
                        selectCellShift(e, table);
                    }
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
                    selectCellMove(e, table);
                }
            }
        };

        const mouseUpEvent = function(e) {
            grid.lastX = lastX = window.pageXOffset + e.clientX;
            grid.lastY = lastY = window.pageYOffset + e.clientY;

            let isInPanel80 = grid.isInPanel(e, 'panel80');
            let isInPanel90 = grid.isInPanel(e, 'panel90');

            if (isInPanel80) {
                // grouping panel
                if (grid.options.showGroupPanel == true && document.querySelectorAll(' .wa-grid-move').length > 0) {
                    let moveElement: any = document.querySelector('.wa-grid-move');
                    let rectPanel80: any = document.querySelector(selector + ' .wa-grid-panel80').getBoundingClientRect();
                    let rectMoveCell: any= moveElement.getBoundingClientRect();

                    let columnIndex = moveElement.dataset.columnIndex;
                    let rowIndex = moveElement.dataset.rowIndex;

                    let column = grid.getColumnByIndex(columnIndex);
                    let name  = column[WaColumnProperty.name];
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

                    //if (name != 'group_column') grid.classGroup.addGroupButton(name, text, order, targetIndex);
                    grid.classGroup.addGroupButton(name, text, order, targetIndex);

                    flagLeft = false;
                    flagRight = false;
                    flagUp = false;
                    flagDown = false;
                    document.removeEventListener('mousemove', mouseMoveEvent);
                    document.removeEventListener('mouseup', mouseUpEvent);
                    if (document.querySelectorAll('.wa-grid-move').length > 0) document.querySelector('.wa-grid-move').remove();
                }
                flagLeft = false;
                flagRight = false;
                flagUp = false;
                flagDown = false;
                document.removeEventListener('mousemove', mouseMoveEvent);
                document.removeEventListener('mouseup', mouseUpEvent);
            }
            else if (isInPanel90) {
                // sorting panel
                if (grid.options.showSortPanel == true && document.querySelectorAll(' .wa-grid-move').length > 0) {
                    let moveElement: any = document.querySelector('.wa-grid-move');
                    let rectPanel80: any = document.querySelector(selector + ' .wa-grid-panel80').getBoundingClientRect();
                    let rectMoveCell: any= moveElement.getBoundingClientRect();

                    let columnIndex = moveElement.dataset.columnIndex;
                    let rowIndex = moveElement.dataset.rowIndex;

                    let column = grid.getColumnByIndex(columnIndex);
                    let name  = column[WaColumnProperty.name];
                    let text  = column[WaColumnProperty.text];
                    let order = 'asc';

                    // Find the one that is smaller to the button left than then move element left
                    let buttons = document.querySelectorAll(selector + ' .wa-grid-panel-bar .wa-grid-panel-button');
                    let targetButton;
                    let targetIndex;
                    let moveLeft = grid.getOffset(moveElement).left;

                    for (let i = buttons.length + 1; i >= 0; i--) {
                        let button = buttons[i];
                        let buttonLeft= grid.getOffset(button).left
                        if (moveLeft < buttonLeft) {
                            targetButton = button;
                            targetIndex = i;
                        }
                    }
                    // Add 1th postion
                    if (grid.null(targetIndex)) {
                        targetButton = null;
                        targetIndex = null;
                    }
                    if (name != 'group_column') grid.classSort.addSortButton(name, text, order, targetIndex);

                    flagLeft = false;
                    flagRight = false;
                    flagUp = false;
                    flagDown = false;
                    document.removeEventListener('mousemove', mouseMoveEvent);
                    document.removeEventListener('mouseup', mouseUpEvent);
                    if (document.querySelectorAll('.wa-grid-move').length > 0) document.querySelector('.wa-grid-move').remove();
                }
                flagLeft = false;
                flagRight = false;
                flagUp = false;
                flagDown = false;
                document.removeEventListener('mousemove', mouseMoveEvent);
                document.removeEventListener('mouseup', mouseUpEvent);
            }
            else {
                let tableCell;
                if (e.target.classList.contains('wa-grid-html-checkbox')) {
                    tableCell = e.target.parentNode.parentNode;
                    const column = grid.column_table.selectRowByRowIndex(tableCell.cellIndex);
                    const columnName = column[WaColumnProperty.name];

                    // let isChecked = column[WaColumnProperty.isChecked] ? true : false;
                    // if (isChecked) grid.column_table.update(columnName, WaColumnProperty.isChecked, false);
                    // else grid.column_table.update(columnName, WaColumnProperty.isChecked, true);
                    let isChecked = false;
                    if (e.target.checked) isChecked = false;
                    else isChecked = true;

                    let newValue = isChecked ? grid.getTrueValue(columnName) : grid.getFalseValue(columnName);

                    // exclude : disabled checkbox
                    const callback = grid.getRenderer(columnName, 'callback');
                    for (let i = 0, len = grid.view_table.count(); i < len; i++) {
                        const dataRow = grid.view_table.selectRowByRowIndex(i);
                        if (callback) {
                            const eventRow: any = {}
                            eventRow.rowIndex    = i;
                            eventRow.columnIndex = tableCell.cellIndex;
                            eventRow.columnName  = columnName;
                            eventRow.value       = dataRow[WaColumnProperty.name];
                            eventRow.text        = dataRow[WaColumnProperty.name];
                            eventRow.data        = dataRow;
                            const result = callback(grid, eventRow);
                            if (result.editable == false) continue;
                            else grid.setValue(i, columnName, newValue);
                        }
                        else {
                            grid.setValue(i, columnName, newValue);
                        }
                    }
                    grid.classPanel30.setDataPanel(grid.getFirstRowIndex());
                }
                else if (mouseButton == 0
                    && startX > lastX - grid.mousePointRange
                    && startX < lastX + grid.mousePointRange
                    && startY > lastY - grid.mousePointRange
                    && startY < lastY + grid.mousePointRange) {
                    let element = e.target.closest('.wa-grid-cell');
                    let name = element.dataset.name;
                    if (e.detail == 1) {
                        if (grid.isColumnName(name)) grid.event_columnSort(e.target.closest('.wa-grid-cell'));
                        if (grid.options.showSortPanel) grid.classSort.getSortButtonList();
                    }
                }
                else {
                    if (grid.fixedColumnIndex != -1) {
                        if (document.querySelectorAll('.wa-grid-move').length == 0) return;

                        /* Find panel area */
                        let isInPanel21 = grid.isInPanel(e, 'panel21');
                        let isInPanel22 = grid.isInPanel(e, 'panel22');

                        /* Set panel */
                        let tdList20 = null;
                        if (isInPanel21 || isInPanel22) tdList20 = document.querySelectorAll(selector + ' .wa-grid-panel22 tbody td:not([style*="display :none"])');
                        else tdList20 = document.querySelectorAll(selector + ' .wa-grid-panel20 tbody td:not([style*="display :none"]');

                        let headerColumns = grid.header_column_table.data;
                        let movingColumn = headerColumns[moveCellRowIndex - 1][moveCellIndex];
                        let targetColumn;

                        let fixedWidth = 50;

                        for (let x = 0, len = tdList20.length; x < len; x++) {
                            let cell = tdList20[x];
                            targetColumn = grid.header_column_table.data[cell.parentNode.rowIndex - 1][cell.cellIndex];

                            if (lastX - startX > 0) { // right direction move.
                                if ((lastX - fixedWidth <= cell.getBoundingClientRect().right
                                        && lastX + fixedWidth >= cell.getBoundingClientRect().right)
                                    && movingColumn[WaColumnProperty.rowIndex] == targetColumn[WaColumnProperty.rowIndex]
                                    && movingColumn[WaColumnProperty.parentNum] == targetColumn[WaColumnProperty.parentNum]
                                    && moveCell.cellIndex != cell.cellIndex) {
                                    grid.classColumn.changeColumnOrder(movingColumn, targetColumn, 'after');
                                    break;
                                }
                            }
                            else {
                                if ((lastX - fixedWidth <= cell.getBoundingClientRect().left
                                        && lastX + fixedWidth >= cell.getBoundingClientRect().left)
                                    && movingColumn[WaColumnProperty.rowIndex] == targetColumn[WaColumnProperty.rowIndex]
                                    && movingColumn[WaColumnProperty.parentNum] == targetColumn[WaColumnProperty.parentNum]
                                    && moveCell.cellIndex != cell.cellIndex) {
                                    grid.classColumn.changeColumnOrder(movingColumn, targetColumn, 'before');
                                    break;
                                }
                            }
                        }
                        if (document.querySelectorAll('.wa-grid-move').length > 0) document.querySelector('.wa-grid-move').remove();
                        flagLeft = false;
                        flagRight = false;
                    }
                    else {
                        if (document.querySelector('.wa-grid-move')) {
                            const movingColumn = grid.header_column_table.data[moveCellRowIndex - 1][moveCellIndex];
                            let tdList20 = document.querySelectorAll(selector + ' .wa-grid-' + panelName + ' tbody td:not([style*="display :none"])');
                            const fixedWidth = 50;

                            let targetColumn;
                            for (let x = 0, len = tdList20.length; x < len; x++) {
                                let cell: any = tdList20[x];
                                targetColumn = grid.header_column_table.data[cell.parentNode.rowIndex - 1][cell.cellIndex];

                                if (lastX - startX > 0) { // right direction move.
                                    if ((lastX - fixedWidth <= cell.getBoundingClientRect().right
                                            && lastX + fixedWidth >= cell.getBoundingClientRect().right)
                                        && movingColumn[WaColumnProperty.rowIndex] == targetColumn[WaColumnProperty.rowIndex]
                                        && movingColumn[WaColumnProperty.parentNum] == targetColumn[WaColumnProperty.parentNum]
                                        && moveCell.cellIndex != cell.cellIndex) {
                                        grid.classColumn.changeColumnOrder(movingColumn, targetColumn, 'after');
                                        break;
                                    }
                                }
                                else {
                                    if ((lastX - fixedWidth <= cell.getBoundingClientRect().left
                                            && lastX + fixedWidth >= cell.getBoundingClientRect().left)
                                        && movingColumn[WaColumnProperty.rowIndex] == targetColumn[WaColumnProperty.rowIndex]
                                        && movingColumn[WaColumnProperty.parentNum] == targetColumn[WaColumnProperty.parentNum]  //column_parentNum
                                        && moveCell.cellIndex != cell.cellIndex) {
                                        grid.classColumn.changeColumnOrder(movingColumn, targetColumn, 'before');
                                        break;
                                    }
                                }
                            }
                        }
                        if (document.querySelectorAll('.wa-grid-move').length > 0) document.querySelector('.wa-grid-move').remove();
                        flagLeft = false;
                        flagRight = false;
                    }
                }
                if (document.querySelectorAll('.wa-grid-move').length > 0) document.querySelector('.wa-grid-move').remove();
                document.removeEventListener('mousemove', mouseMoveEvent);
                document.removeEventListener('mouseup', mouseUpEvent);
                grid.input_focus();
            }
        };

        const selectCell = function(e, table) {
            if (e.target.classList.contains('wa-grid-html-checkbox'))  return;
            let col = e.target.closest('.wa-grid-cell');

            let column = grid.getColumnByIndex(col.cellIndex);
            let columnName = column[WaColumnProperty.name];

            let isMovable = grid.isMovableColumn(columnName);
            if (isMovable) {
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

                moveDiv.querySelector('.wa-grid-html-string').textContent = col.querySelector('.wa-grid-html-string').innerText;
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

                moveDiv.dataset.columnIndex = col.cellIndex;
                moveDiv.dataset.rowIndex = col.parentNode.rowIndex;
                moveDiv.dataset.name = columnName;
            }
            grid.classRange.removeRange(0, -1);
        }

        const selectCellMove = function(e, table) {
            let col = e.target.closest('.wa-grid-cell');

            flagLeft    = false;
            flagRight   = false;

            startX = grid.startX;
            startY = grid.startY;

            grid.lastX = lastX = window.pageXOffset + e.clientX;
            grid.lastY = lastY = window.pageYOffset + e.clientY;

            //console.log(col);
            //console.log(`selectCellMove ${startX} == ${lastX} ${startY} == ${lastY}`);

            let moveY = lastY - startY;
            let moveX = lastX - startX;

            // let column = grid.getColumnByIndex(col.cellIndex);
            // let columnName = column[WaColumnProperty.name];
            let isMovable: any = grid.isMovableColumn();
            if (isMovable) {
                let moveDiv: any = document.querySelector('.wa-grid-move');
                if (moveDiv){
                    moveDiv.style.left = (lastX - moveCellLeft) + 'px';
                    moveDiv.style.top  = (lastY - moveCellTop)  + 'px';
                    if (Math.abs(moveX) > 20 || Math.abs(moveY) > 20) moveDiv.style.display = '';
                }
                //console.log(`111 ${startX} == ${lastX} ${startY} == ${lastY}`);
            }
            else {
                select(startCellIndex, moveX, moveY, lastX, lastY);
                //console.log(`222 ${startX} == ${lastX} ${startY} == ${lastY}`);
            }
            let rect = document.querySelector(selector + ' .wa-grid-' + panelName).getBoundingClientRect();
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
            let tableRect = document.querySelector(selector + ' .wa-grid-' + panelName + ' .wa-grid-table').getBoundingClientRect();
            let top    = window.pageYOffset + tableRect.top;
            let bottom = window.pageYOffset + tableRect.bottom;

            let sumRect = document.querySelector(selector + ' .wa-grid-' + panelName).getBoundingClientRect();
            let right = window.pageXOffset + sumRect.right;
            let left  = window.pageXOffset + sumRect.left;

            //if (lastX > right) grid.classScroll.setBarPositionByDirection('right');
            //if (lastX < left) grid.classScroll.setBarPositionByDirection('left');
            //==================================================================
            let arr = document.querySelectorAll(selector + ' .wa-grid-' + panelName + ' .wa-grid-table td:not([data-name=""])');
            let tdList: any = Array.from(arr).sort(function(a: any, b: any) {
                a = a.cellIndex;
                b = b.cellIndex;
                if (a > b) return 1;
                if (a < b) return -1;
                return 0;
            });
            if (moveX > 0) {
                let maxCellIndex;
                for (let x = 0, len = tdList.length; x < len; x++) {
                    let cell =  tdList[x];
                    if (grid.column_table.data[x][WaColumnProperty.visible] == false) continue;

                    let left = window.pageXOffset + cell.getBoundingClientRect().left;
                    if (lastX > left) maxCellIndex = cell.cellIndex;
                }
                grid.classRange.removeRange(0, -1);
                let _topRowIndex = grid.classRange.selectRange(0, -1, startCellIndex, maxCellIndex);
                grid.classPanel30.setDataPanel(_topRowIndex);
            }
            //==================================================================
            if (moveX < 0) {
                let minCellIndex;
                for (let x = tdList.length - 1; x >= 0; x--) {
                    let cell =  tdList[x];
                    if (grid.column_table.data[x][WaColumnProperty.visible] == false) continue;
                    let right = window.pageXOffset + cell.getBoundingClientRect().right;
                    if (lastX < right) minCellIndex = cell.cellIndex;
                }
                grid.classRange.removeRange(0, -1);
                let _topRowIndex = grid.classRange.selectRange(0, -1, startCellIndex, minCellIndex);
                grid.classPanel30.setDataPanel(_topRowIndex);
            }
            //==================================================================
        }

        const selectRefresh = function(type, lastX, lastY) {
            let content = document.querySelector(selector + ' .wa-grid-panel30');
            let table: any = document.querySelector(selector + ' .wa-grid-panel30 .wa-grid-table');
            const trContent = document.querySelectorAll(selector + ' .wa-grid-panel30 .wa-grid-table tbody tr:not([style*="display:"])');

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
                }
                else {
                    grid.classScroll.setBarPositionByDirection('right');
                }
            }
            /* left */
            else if (type == 'left') {
                if (table.style.left == '0px') {
                    flagLeft = false;
                }
                else {
                    grid.classScroll.setBarPositionByDirection('left');
                }
            }
            /* down */
            else if (type == 'down') {}
            /* up */
            else if (type == 'up') {}
        }

        const doInterval = function(type, lastX, lastY) {
            if (flagLeft) {
                //flagLeft  = false;
                flagRight   = false;
                setTimeout(function() {doInterval('left', lastX, lastY);}, 5);
                selectRefresh('left', lastX, lastY);
            }
            if (flagRight) {
                flagLeft    = false;
                //flagRight = false;
                setTimeout(function() {doInterval('right', lastX, lastY);}, 5);
                selectRefresh('right', lastX, lastY);
            }
        }

        eventPanel.addEventListener('mousedown', mouseDownEvent);
    }

}
//
// mouseUpEvent(this: WaGridCore, e: MouseEvent, panelName: string, startX: number, startY: number) {
//   const grid = this;
//   const selector = `#${grid.gridId}`;
//
//   // 좌표 업데이트
//   grid.lastX = window.pageXOffset + e.clientX;
//   grid.lastY = window.pageYOffset + e.clientY;
//
//   const lastX = grid.lastX;
//   const lastY = grid.lastY;
//
//   /** ───────────────────────────────
//    * 공통 정리 함수
//    * ─────────────────────────────── */
// function cleanup() {
//     document.removeEventListener('mousemove', grid.mouseMoveEvent);
//     document.removeEventListener('mouseup', grid.mouseUpEvent);
//     document.querySelector('.wa-grid-move')?.remove();
//     grid.input_focus();
//
//     grid.flagLeft = false;
//     grid.flagRight = false;
//     grid.flagUp = false;
//     grid.flagDown = false;
// }
//
// /** ───────────────────────────────
//  * ① 그룹 패널 드롭 (panel80)
//  * ─────────────────────────────── */
// function handleGroupDrop() {
//     if (!grid.options.showGroupPanel) return cleanup();
//
//     const moveEl = document.querySelector('.wa-grid-move') as HTMLElement;
//     if (!moveEl) return cleanup();
//
//     const columnIndex = Number(moveEl.dataset.columnIndex);
//     const column = grid.getColumnByIndex(columnIndex);
//     const name = column[WaColumnProperty.name];
//     const text = column[WaColumnProperty.text];
//     const order = 'asc';
//
//     const buttons = document.querySelectorAll(`${selector} .wa-grid-panel-bar .wa-grid-panel-button`);
//     let targetIndex: number | null = null;
//
//     for (let i = 0; i < buttons.length; i++) {
//         const button = buttons[i] as HTMLElement;
//         if (e.clientX < button.getBoundingClientRect().left) {
//             targetIndex = i;
//             break;
//         }
//     }
//
//     grid.classGroup.addGroupButton(name, text, order, targetIndex ?? null);
//     cleanup();
// }
//
// /** ───────────────────────────────
//  * ② 정렬 패널 드롭 (panel90)
//  * ─────────────────────────────── */
// function handleSortDrop() {
//     if (!grid.options.showSortPanel) return cleanup();
//
//     const moveEl = document.querySelector('.wa-grid-move') as HTMLElement;
//     if (!moveEl) return cleanup();
//
//     const columnIndex = Number(moveEl.dataset.columnIndex);
//     const column = grid.getColumnByIndex(columnIndex);
//     const name = column[WaColumnProperty.name];
//     const text = column[WaColumnProperty.text];
//     const order = 'asc';
//
//     const buttons = document.querySelectorAll(`${selector} .wa-grid-panel-bar .wa-grid-panel-button`);
//     const moveLeft = grid.getOffset(moveEl).left;
//     let targetIndex: number | null = null;
//
//     for (let i = buttons.length - 1; i >= 0; i--) {
//         const button = buttons[i] as HTMLElement;
//         if (moveLeft < grid.getOffset(button).left) targetIndex = i;
//     }
//
//     if (name !== 'group_column') grid.classSort.addSortButton(name, text, order, targetIndex ?? null);
//     cleanup();
// }
//
// /** ───────────────────────────────
//  * ③ 체크박스 클릭
//  * ─────────────────────────────── */
// function handleCheckboxClick() {
//     const tableCell = (e.target as HTMLElement).closest('td') as HTMLTableCellElement;
//     if (!tableCell) return cleanup();
//
//     const column = grid.column_table.selectRowByRowIndex(tableCell.cellIndex);
//     const columnName = column[WaColumnProperty.name];
//     const isChecked = !(e.target as HTMLInputElement).checked;
//     const newValue = isChecked ? grid.getTrueValue(columnName) : grid.getFalseValue(columnName);
//     const callback = grid.getRenderer(columnName, 'callback');
//
//     for (let i = 0; i < grid.view_table.count(); i++) {
//         const dataRow = grid.view_table.selectRowByRowIndex(i);
//         if (callback) {
//             const eventRow: any = {
//                 rowIndex: i,
//                 columnIndex: tableCell.cellIndex,
//                 columnName,
//                 value: dataRow[columnName],
//                 text: dataRow[columnName],
//                 data: dataRow,
//             };
//             const result = callback(grid, eventRow);
//             if (result?.editable === false) continue;
//         }
//         grid.setValue(i, columnName, newValue);
//     }
//
//     grid.classPanel30.setDataPanel(grid.getFirstRowIndex());
//     cleanup();
// }
//
// /** ───────────────────────────────
//  * ④ 단일 클릭 (정렬)
//  * ─────────────────────────────── */
// function handleSingleClick() {
//     const element = (e.target as HTMLElement).closest('.wa-grid-cell') as HTMLElement;
//     if (!element) return cleanup();
//
//     const name = element.dataset.name;
//     if (e.detail === 1 && grid.isColumnName(name)) {
//         grid.event_columnSort(element);
//         if (grid.options.showSortPanel) grid.classSort.getSortButtonList();
//     }
//     cleanup();
// }
//
// /** ───────────────────────────────
//  * ⑤ 컬럼 이동 처리 (panel20, 21, 22)
//  * ─────────────────────────────── */
// function handleColumnReorder() {
//     const moveEl = document.querySelector('.wa-grid-move');
//     if (!moveEl) return cleanup();
//
//     const fixedWidth = 50;
//     const headerColumns = grid.header_column_table.data;
//     const movingColumn = headerColumns[grid.moveCellRowIndex - 1][grid.moveCellIndex];
//
//     const isFixed = grid.fixedColumnIndex !== -1;
//     const isInPanel21 = grid.isInPanel(e, 'panel21');
//     const isInPanel22 = grid.isInPanel(e, 'panel22');
//
//     const panelSelector =
//         isFixed && (isInPanel21 || isInPanel22)
//             ? `${selector} .wa-grid-panel22`
//             : `${selector} .wa-grid-${panelName}`;
//
//     const tdList = document.querySelectorAll(`${panelSelector} tbody td:not([style*="display :none"])`);
//     const direction = lastX - startX > 0 ? 'after' : 'before';
//
//     for (let i = 0; i < tdList.length; i++) {
//         const cell = tdList[i] as HTMLTableCellElement;
//         const rect = cell.getBoundingClientRect();
//         const targetColumn = headerColumns[cell.parentElement!.rowIndex - 1][cell.cellIndex];
//
//         const sameGroup =
//             movingColumn[WaColumnProperty.rowIndex] === targetColumn[WaColumnProperty.rowIndex] &&
//             movingColumn[WaColumnProperty.parentNum] === targetColumn[WaColumnProperty.parentNum];
//
//         if (!sameGroup || grid.moveCell.cellIndex === cell.cellIndex) continue;
//
//         const edge = direction === 'after' ? rect.right : rect.left;
//         if (lastX - fixedWidth <= edge && lastX + fixedWidth >= edge) {
//             grid.classColumn.changeColumnOrder(movingColumn, targetColumn, direction);
//             break;
//         }
//     }
//
//     cleanup();
// }
//
// /** ───────────────────────────────
//  * 메인 분기
//  * ─────────────────────────────── */
// if (grid.isInPanel(e, 'panel80')) return handleGroupDrop();
// if (grid.isInPanel(e, 'panel90')) return handleSortDrop();
// if ((e.target as HTMLElement).classList.contains('wa-grid-html-checkbox')) return handleCheckboxClick();
//
// const isClick =
//     e.button === 0 &&
//     Math.abs(startX - lastX) < grid.mousePointRange &&
//     Math.abs(startY - lastY) < grid.mousePointRange;
//
// if (isClick) return handleSingleClick();
// else return handleColumnReorder();
// }
//
//