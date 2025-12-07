
import {WaGridCore} from "@/core/WaGridCore";
import {WaColumnProperty} from "@/core/columns/WaColumnEnum"
import {WaColumnKind} from "@/core/columns/WaColumnEnum"
export class WaGridHeader {
    grid: WaGridCore;
    selector: string;

    constructor(grid: WaGridCore) {
        this.grid = grid;
        this.selector = '#' + grid.gridId;
    }

    createHeaderColumns() {
        const grid = this.grid;

        const getChildrenColumnCount = function (userColumn) {
            let columnCount = 0;
            const getCount = function (userColumn) {
                if (userColumn[WaColumnProperty.children]) {
                    for (let i = 0, len = userColumn[WaColumnProperty.children].length; i < len; i++) {
                        getCount(userColumn[WaColumnProperty.children][i]);
                    }
                }
                else columnCount += 1;
            }
            getCount(userColumn);
            return columnCount;
        }

        const getTreeDepth = function(userColumns, depth = 0) {
            let maxDepth = 1;
            const getDepth = (userColumn, depth = 1) => {
                if (depth > maxDepth)
                    maxDepth = depth;
                if (userColumn[WaColumnProperty.children]) {
                    for (let i = 0, len = userColumn[WaColumnProperty.children].length; i < len; i++) {
                        getDepth(userColumn[WaColumnProperty.children][i], depth + 1);
                    }
                }
            }
            for (let i = 0, len = userColumns.length; i < len; i++) getDepth(userColumns[i]);
            return maxDepth;
        }

        const setNumber = function(userColumns, rowIndex, parentNum = 0) {
            userColumns.map(userColumn => {
                num = num + 1;
                userColumn[WaColumnProperty.num] = num;
                userColumn[WaColumnProperty.parentNum] = parentNum;

                userColumn[WaColumnProperty.rowIndex] = rowIndex;
                userColumn[WaColumnProperty.rowSpan] = userColumn[WaColumnProperty.children] ? 1 : headerRowCount - rowIndex;
                userColumn[WaColumnProperty.colSpan] = getChildrenColumnCount(userColumn);
                if (userColumn[WaColumnProperty.children]) {
                    setNumber(userColumn[WaColumnProperty.children], rowIndex + 1, num);
                }
            });
        }

        let num = 0;
        let parentNum = 0;

        let headerRowCount = getTreeDepth(grid.columns);
        grid.headerRowCount = headerRowCount;

        setNumber(grid.columns, 0);
    }

    createHeaderColumnTable() {
        const grid = this.grid;

        const createHeaderColumns = function (userColumns) {
            userColumns.map(userColumn => {
                let headerColumn = {};

                let kind     = userColumn[WaColumnProperty.children] ? 'header' : 'column';
                let name     = null;
                let text     = null;
                let align    = null;
                let className= null;
                let rowSpan  = userColumn[WaColumnProperty.rowSpan ];
                let colSpan  = userColumn[WaColumnProperty.colSpan ];
                let rowIndex = userColumn[WaColumnProperty.rowIndex];
                let colIndex = userColumn[WaColumnProperty.colIndex];
                let visible  = null;

                let children = grid.isNull(userColumn[WaColumnProperty.children], null);
                let num      = userColumn[WaColumnProperty.num];
                let parentNum= userColumn[WaColumnProperty.parentNum];

                let type = 'string';

                if (kind == 'column') {
                    let columnName = userColumn[WaColumnProperty.name];
                    let column = grid.getColumn(columnName);

                    name       = column[WaColumnProperty.name];
                    text       = grid.isNull(column.header[WaColumnProperty.text]   , null);
                    align      = grid.isNull(column.header[WaColumnProperty.align]  , 'center');
                    className  = grid.isNull(column[WaColumnProperty.className]     , null);
                    visible    = grid.isNull(column[WaColumnProperty.visible]       , true);
                }
                else {
                    name      = grid.isNull(userColumn[WaColumnProperty.name]     , null);
                    align     = grid.isNull(userColumn[WaColumnProperty.align]    , 'center');
                    text      = grid.isNull(userColumn[WaColumnProperty.text]     , null);
                    className = grid.isNull(userColumn[WaColumnProperty.className], null);
                    visible   = grid.isNull(userColumn[WaColumnProperty.visible]  , true);
                }

                headerColumn[WaColumnProperty.kind     ] = kind;
                headerColumn[WaColumnProperty.name     ] = name;
                headerColumn[WaColumnProperty.align    ] = align;
                headerColumn[WaColumnProperty.text     ] = text;
                headerColumn[WaColumnProperty.className] = className;
                headerColumn[WaColumnProperty.visible  ] = visible;

                headerColumn[WaColumnProperty.rowSpan  ] = rowSpan;
                headerColumn[WaColumnProperty.colSpan  ] = colSpan;
                headerColumn[WaColumnProperty.rowIndex ] = rowIndex;
                headerColumn[WaColumnProperty.colIndex ] = colIndex;

                headerColumn[WaColumnProperty.children ] = children

                headerColumn[WaColumnProperty.num      ] = num;
                headerColumn[WaColumnProperty.parentNum] = parentNum;

                headerColumn[WaColumnProperty.type     ] = type;

                let childrenCount = headerColumn[WaColumnProperty.children] ? headerColumn[WaColumnProperty.children].length : 0;
                let columnCount   = headerColumn[WaColumnProperty.colSpan];

                headerColumnRows[rowIndex].push(headerColumn);

                let blankColumn = {};
                blankColumn[WaColumnProperty.kind      ] = 'empty';
                blankColumn[WaColumnProperty.name      ] = name;
                blankColumn[WaColumnProperty.align     ] = align;
                blankColumn[WaColumnProperty.text      ] = text;
                blankColumn[WaColumnProperty.className ] = className
                blankColumn[WaColumnProperty.visible   ] = false;

                blankColumn[WaColumnProperty.rowSpan   ] = rowSpan;
                blankColumn[WaColumnProperty.colSpan   ] = colSpan;
                blankColumn[WaColumnProperty.rowIndex  ] = rowIndex;
                blankColumn[WaColumnProperty.colIndex  ] = colIndex;

                blankColumn[WaColumnProperty.children  ] = children

                blankColumn[WaColumnProperty.num       ] = num;
                blankColumn[WaColumnProperty.parentNum ] = parentNum;

                headerColumn[WaColumnProperty.type     ] = type;

                //make blank column(row)
                if (childrenCount == 0) {
                    for (let i = rowIndex + 1; i < headerRowCount; i++) headerColumnRows[i].push(blankColumn);
                }

                //make blank column(colums)
                if (columnCount > 1) {
                    for (let i =  1; i < columnCount; i++) headerColumnRows[rowIndex].push(blankColumn);
                }

                if (userColumn[WaColumnProperty.children]) {
                    createHeaderColumns(userColumn[WaColumnProperty.children]);
                }
            });
        }

        let headerColumnRows = [];
        let headerRowCount = grid.headerRowCount;
        for (let i = 0; i < headerRowCount; i++) headerColumnRows[i] = [];

        createHeaderColumns(grid.columns);

        headerColumnRows.map((columns, rowIndex) => {
            columns.map((column, colIndex) => {
                column[WaColumnProperty.rowIndex] = rowIndex;
                column[WaColumnProperty.colIndex] = colIndex;
                delete column[WaColumnProperty.children];
            })
        })

        /* insert headerColumnTable */
        grid.header_column_table.remove();
        headerColumnRows.map((headerColumns, rowIndex) => {
            for (let i = 0, len = headerColumns.length; i < len; i++) {
                const headerColumn = headerColumns[i];
                const item: any = {};
                item.kind	   = grid.isNull(headerColumn['kind'], null);
                item.name      = grid.isNull(headerColumn['name'], null);
                item.align	   = grid.isNull(headerColumn['align'], null);
                item.text	   = grid.isNull(headerColumn['text'], null);
                item.className = grid.isNull(headerColumn['className'], null);
                item.visible   = grid.isNull(headerColumn['visible'], false);
                item.rowSpan   = grid.isNull(headerColumn['rowSpan'], null);
                item.colSpan   = grid.isNull(headerColumn['colSpan'], null);
                item.rowIndex  = rowIndex;
                item.colIndex  = grid.isNull(headerColumn['colIndex'], null);
                item.type	   = grid.isNull(headerColumn['type'], 'string');

                item.children  = grid.isNull(headerColumn['children'], null);

                grid.header_column_table.insert(rowIndex, item);
            }
        });
    }

    updateHeaderFixedColumns() {
        const grid = this.grid;

        if (grid.header_column_table.count() > 1) {
            let rootColumn;
            let rootColumnIndex;
            let rootColumnColSpan;

            for (let x = grid.fixedColumnIndex; x >= 0; x--) {
                const column = grid.header_column_table.selectRowByRowIndex(0, x);
                if (column[WaColumnProperty.kind] != 'empty') {
                    rootColumnIndex = x;
                    rootColumnColSpan = column[WaColumnProperty.colSpan];
                    break;
                }
            }

            grid.fixedColumnIndex = rootColumnIndex + rootColumnColSpan - 1;
        }

        if (grid.fixedColumnIndex >= grid.column_table.count() - 1) {
            grid.fixedColumnIndex = -1 ;
            return;
        }
    }

    getDisplayedHeaderColumn(panelName = 'panel30') {
        let selector = this.selector;
        const grid = this.grid;

        // let rectPanel = document.querySelector(selector + ' .wa-grid-' + panelName).getBoundingClientRect();
        // let rectTable = document.querySelector(selector + ' .wa-grid-' + panelName + ' > table').getBoundingClientRect();
        // let styleLeft = document.querySelector(selector + ' .wa-grid-' + panelName + ' > table').style.left;
        // styleLeft = parseInt(styleLeft, 10);

        let columns = grid.column_table.data;
        if (panelName == 'panel32' || panelName == 'panel42' || panelName == 'panel52' || panelName == 'panel72') {
            let startColumnIndex = 0;
            let lastColumnIndex = grid.fixedColumnIndex;
            return { startColumnIndex: startColumnIndex, lastColumnIndex: lastColumnIndex };
        }
        else {
            let startColumnIndex = 0;
            let lastColumnIndex = columns.length - 1;
            if (grid.fixedColumnIndex != -1)  startColumnIndex = grid.fixedColumnIndex + 1;
            return { startColumnIndex: startColumnIndex, lastColumnIndex: lastColumnIndex };
        }
    }
    getHeaderColumn(rowIndex: number, columnIndex: number) {
        const grid = this.grid;
        return grid.header_column_table.data[rowIndex][columnIndex];
    }

    getHeaderColumnByNumber(num) {
        let selector = this.selector;
        const grid = this.grid;

        let result;
        const getParentColumn = function (headerColumn) {
            if (headerColumn[WaColumnProperty.num] == num) { result = headerColumn; return; }
            if (headerColumn[WaColumnProperty.children]) {
                for (let i = 0, len = headerColumn[WaColumnProperty.children].length; i < len; i++) {
                    getParentColumn(headerColumn[WaColumnProperty.children][i]);
                }
            }
        }
        for (let i = 0; i < grid.columns.length; i++) getParentColumn(grid.columns[i]);
        return result;
    }

    getHeaderPropertyByIndex(columnIndex, property) {
        let selector = this.selector;
        const grid = this.grid;

        let column = grid.column_table.data[columnIndex];
        let result = grid.null(column.header[property]) ? null : column.header[property];
        return result;
    }

    getHeaderProperty(columnName, property) {
        let selector = this.selector;
        const grid = this.grid;

        let columnIndex = grid.getColumnIndex(columnName);
        return grid.classHeader.getHeaderPropertyByIndex(columnIndex, property);
    }

    setHeaderProperty(rowIndex, colIndex, property, value) {
        const grid = this.grid;

        const column = grid.header_column_table.data[rowIndex][colIndex];
        let kind = column[WaColumnProperty.kind];
        column[property] = value;

        if (kind == WaColumnKind.column) {
            let name = column[WaColumnProperty.name];
            let dataRow: any = grid.column_table.selectRow(WaColumnProperty.name, name);
            if (property == WaColumnProperty.text) {
                dataRow.header[WaColumnProperty.text] = value;
            }
            else if (property == WaColumnProperty.className) {
                dataRow.header[WaColumnProperty.className] = value;
            }
            else {
                dataRow.header[property] = value;
            }
        }
    }
 }


