import {WaGridCore} from "@/core/WaGridCore";
import {COLUMN_KEYS} from "@/core/columns/ColumnEnum"
import {COLUMN_KIND} from "@/core/columns/ColumnEnum"
import { HeaderColumnDef } from "./HeaderDef";
export class WaHeader {
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
                if (userColumn[COLUMN_KEYS.children]) {
                    for (let i = 0, len = userColumn[COLUMN_KEYS.children].length; i < len; i++) {
                        getCount(userColumn[COLUMN_KEYS.children][i]);
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
                if (userColumn[COLUMN_KEYS.children]) {
                    for (let i = 0, len = userColumn[COLUMN_KEYS.children].length; i < len; i++) {
                        getDepth(userColumn[COLUMN_KEYS.children][i], depth + 1);
                    }
                }
            }
            for (let i = 0, len = userColumns.length; i < len; i++) getDepth(userColumns[i]);
            return maxDepth;
        }

        const setNumber = function(userColumns, rowIndex, parentNum = 0) {
            userColumns.map(userColumn => {
                num = num + 1;
                userColumn[COLUMN_KEYS.num] = num;
                userColumn[COLUMN_KEYS.parentNum] = parentNum;

                userColumn[COLUMN_KEYS.rowIndex] = rowIndex;
                userColumn[COLUMN_KEYS.rowSpan] = userColumn[COLUMN_KEYS.children] ? 1 : headerRowCount - rowIndex;
                userColumn[COLUMN_KEYS.colSpan] = getChildrenColumnCount(userColumn);
                if (userColumn[COLUMN_KEYS.children]) {
                    setNumber(userColumn[COLUMN_KEYS.children], rowIndex + 1, num);
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

                let kind     = userColumn[COLUMN_KEYS.children] ? 'header' : 'column';
                let name     = null;
                let text     = null;
                let align    = null;
                let className= null;
                let rowSpan  = userColumn[COLUMN_KEYS.rowSpan ];
                let colSpan  = userColumn[COLUMN_KEYS.colSpan ];
                let rowIndex = userColumn[COLUMN_KEYS.rowIndex];
                let colIndex = userColumn[COLUMN_KEYS.colIndex];
                let visible  = null;

                let children = grid.isNull(userColumn[COLUMN_KEYS.children], null);
                let num      = userColumn[COLUMN_KEYS.num];
                let parentNum= userColumn[COLUMN_KEYS.parentNum];

                let type = 'string';

                if (kind == 'column') {
                    let columnName = userColumn[COLUMN_KEYS.name];
                    let column = grid.getColumn(columnName);

                    name       = column[COLUMN_KEYS.name];
                    text       = grid.isNull(column.header[COLUMN_KEYS.text]   , null);
                    align      = grid.isNull(column.header[COLUMN_KEYS.align]  , 'center');
                    className  = grid.isNull(column[COLUMN_KEYS.className]     , null);
                    visible    = grid.isNull(column[COLUMN_KEYS.visible]       , true);
                }
                else {
                    name      = grid.isNull(userColumn[COLUMN_KEYS.name]     , null);
                    align     = grid.isNull(userColumn[COLUMN_KEYS.align]    , 'center');
                    text      = grid.isNull(userColumn[COLUMN_KEYS.text]     , null);
                    className = grid.isNull(userColumn[COLUMN_KEYS.className], null);
                    visible   = grid.isNull(userColumn[COLUMN_KEYS.visible]  , true);
                }

                headerColumn[COLUMN_KEYS.kind     ] = kind;
                headerColumn[COLUMN_KEYS.name     ] = name;
                headerColumn[COLUMN_KEYS.align    ] = align;
                headerColumn[COLUMN_KEYS.text     ] = text;
                headerColumn[COLUMN_KEYS.className] = className;
                headerColumn[COLUMN_KEYS.visible  ] = visible;

                headerColumn[COLUMN_KEYS.rowSpan  ] = rowSpan;
                headerColumn[COLUMN_KEYS.colSpan  ] = colSpan;
                headerColumn[COLUMN_KEYS.rowIndex ] = rowIndex;
                headerColumn[COLUMN_KEYS.colIndex ] = colIndex;

                headerColumn[COLUMN_KEYS.children ] = children

                headerColumn[COLUMN_KEYS.num      ] = num;
                headerColumn[COLUMN_KEYS.parentNum] = parentNum;

                headerColumn[COLUMN_KEYS.type     ] = type;

                let childrenCount = headerColumn[COLUMN_KEYS.children] ? headerColumn[COLUMN_KEYS.children].length : 0;
                let columnCount   = headerColumn[COLUMN_KEYS.colSpan];

                headerColumnRows[rowIndex].push(headerColumn);

                let blankColumn = {};
                blankColumn[COLUMN_KEYS.kind      ] = 'empty';
                blankColumn[COLUMN_KEYS.name      ] = name;
                blankColumn[COLUMN_KEYS.align     ] = align;
                blankColumn[COLUMN_KEYS.text      ] = text;
                blankColumn[COLUMN_KEYS.className ] = className
                blankColumn[COLUMN_KEYS.visible   ] = false;

                blankColumn[COLUMN_KEYS.rowSpan   ] = rowSpan;
                blankColumn[COLUMN_KEYS.colSpan   ] = colSpan;
                blankColumn[COLUMN_KEYS.rowIndex  ] = rowIndex;
                blankColumn[COLUMN_KEYS.colIndex  ] = colIndex;

                blankColumn[COLUMN_KEYS.children  ] = children

                blankColumn[COLUMN_KEYS.num       ] = num;
                blankColumn[COLUMN_KEYS.parentNum ] = parentNum;

                headerColumn[COLUMN_KEYS.type     ] = type;

                //make blank column(row)
                if (childrenCount == 0) {
                    for (let i = rowIndex + 1; i < headerRowCount; i++) headerColumnRows[i].push(blankColumn);
                }

                //make blank column(colums)
                if (columnCount > 1) {
                    for (let i =  1; i < columnCount; i++) headerColumnRows[rowIndex].push(blankColumn);
                }

                if (userColumn[COLUMN_KEYS.children]) {
                    createHeaderColumns(userColumn[COLUMN_KEYS.children]);
                }
            });
        }

        let headerColumnRows = [];
        let headerRowCount = grid.headerRowCount;
        for (let i = 0; i < headerRowCount; i++) headerColumnRows[i] = [];

        createHeaderColumns(grid.columns);

        headerColumnRows.map((columns, rowIndex) => {
            columns.map((column, colIndex) => {
                column[COLUMN_KEYS.rowIndex] = rowIndex;
                column[COLUMN_KEYS.colIndex] = colIndex;
                delete column[COLUMN_KEYS.children];
            })
        })

        /* insert headerColumnTable */
        grid.header_column_table.remove();
        headerColumnRows.map((headerColumns, rowIndex) => {
            for (let i = 0, len = headerColumns.length; i < len; i++) {
                const headerColumn = headerColumns[i];
                const item: HeaderColumnDef = {};
                item.kind      = headerColumn['kind'] ?? null
                item.name      = headerColumn['name'] ?? null
                item.align     = headerColumn['align'] ?? null
                item.text      = headerColumn['text'] ?? null
                item.className = headerColumn['className'] ?? null
                item.visible   = headerColumn['visible'] ?? false
                item.rowSpan   = headerColumn['rowSpan'] ?? null
                item.colSpan   = headerColumn['colSpan'] ?? null
                item.rowIndex  = rowIndex
                item.colIndex  = headerColumn['colIndex'] ?? null
                item.type      = headerColumn['type'] ?? 'string'
                item.children  = headerColumn['children'] ?? null

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
                if (column[COLUMN_KEYS.kind] != 'empty') {
                    rootColumnIndex = x;
                    rootColumnColSpan = column[COLUMN_KEYS.colSpan];
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
            if (headerColumn[COLUMN_KEYS.num] == num) { result = headerColumn; return; }
            if (headerColumn[COLUMN_KEYS.children]) {
                for (let i = 0, len = headerColumn[COLUMN_KEYS.children].length; i < len; i++) {
                    getParentColumn(headerColumn[COLUMN_KEYS.children][i]);
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
        let kind = column[COLUMN_KEYS.kind];
        column[property] = value;

        if (kind == COLUMN_KIND.column) {
            let name = column[COLUMN_KEYS.name];
            let dataRow: any = grid.column_table.selectRow(COLUMN_KEYS.name, name);
            if (property == COLUMN_KEYS.text) {
                dataRow.header[COLUMN_KEYS.text] = value;
            }
            else if (property == COLUMN_KEYS.className) {
                dataRow.header[COLUMN_KEYS.className] = value;
            }
            else {
                dataRow.header[property] = value;
            }
        }
    }
 }


