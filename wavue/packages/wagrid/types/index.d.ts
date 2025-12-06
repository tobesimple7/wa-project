declare enum AddRowDirection {
    top = "top",
    bottom = "bottom",
    before = "before",
    after = "after"
}

declare type DataTableType = WaDataTable | WaDataArrayTable;

declare enum FilterType {
    Select = 0,
    Equal = 1,
    NotEqual = 2,
    Greater = 3,
    GreaterEqual = 4,
    Less = 5,
    LessEqual = 6,
    Between = 7,
    Blank = 8,
    Include = 9,
    NotInclude = 10,
    StartCharacter = 11,
    EndCharacter = 12
}

declare enum GridMode {
    grid = "",
    tree = "tree",
    page = "page",
    pagination = "pagination"
}

declare class WaBase {
    debug_mode: any;
    constructor();
    null(p: any): boolean;
    notNull(p: any): boolean;
    empty(p: any): boolean;
    notEmpty(p: any): boolean;
    isNull(a: any, b: any): any;
    error(p: any): void;
    caution(p: any): void;
    copyJson(p: any): any;
    substr2(s: any, index: any, len: any): string;
    trim(s: any): any;
    round(num: number, dpLen: number): number;
    ceil(num: any, dpLen: any): number;
    floor(num: any, dpLen: any): number;
    getProperty(jsonObject: any, property: any): any;
    printMe(): void;
}

declare enum WaColumnProperty {
    rowId = "_rowId",
    rowMode = "_mode",
    isChecked = "_isChecked",
    num = "_number",
    mode = "_mode",
    checkbox = "_checkbox",
    parentNum = "_parentNumber",
    depth = "_depth",
    children = "children",
    childRowIds = "_childRowIds",
    childRows = "_childRows",
    childCount = "_childCount",
    isOpen = "_isOpen",
    isShow = "_isShow",
    open = "open",
    closed = "closed",
    rowCount = "_rowCount",
    /**
     * User Property
     */
    name = "name",
    text = "text",
    type = "type",
    dataType = "dataType",
    width = "width",
    editable = "editable",
    visible = "visible",
    align = "align",
    scale = "scale",
    roundType = "roundType",
    fixedScale = "fixedScale",
    scaleMax = "scaleMax",
    scaleMin = "scalemin",
    showZero = "showZero",
    commaUnit = "commaUnit",// to be deprecated, Fixed 3
    thousandChar = "thousandChar",
    decimalChar = "decimalChar",
    currencyChar = "currencyChar",
    className = "className",// className
    resizable = "resizable",
    sortable = "sortable",
    movable = "movable",
    autoResizable = "autoResizable",
    autoWidth = "autoWidth",
    summaryType = "summaryType",
    required = "required",
    combo = "combo",
    format = "format",
    kind = "kind",//header, column, empty
    rowSpan = "rowSpan",
    colSpan = "colSpan",
    rowIndex = "rowIndex",
    colIndex = "colIndex",
    subRowSpan = "subRowSpan",
    subColSpan = "subColSpan",
    order = "order",
    value = "value"
}

declare class WaDataArrayTable extends WaBase {
    tableName: string;
    data: object[][];
    currentRowId: number;
    type: string;
    constructor(tableName: string);
    /**
     * select functions
     */
    selectRows(arrayIndex: any, field: any, value: any, topIndex?: any): object[];
    selectRow(arrayIndex: any, field: any, value: any): object;
    selectRowByRowIndex(arrayIndex: any, rowIndex: any): object;
    selectRowByRowId(arrayIndex: any, rowId: any): object;
    selectRowIndexByRowId(arrayIndex: any, rowId: any): any;
    selectRowIndex(arrayIndex: any, field: any, value: any): any;
    selectRowIdByRowIndex(arrayIndex: any, rowIndex: any): any;
    selectRowRange(arrayIndex: any, startRowIndex: any, endRowIndex: any): any[];
    selectValue(arrayIndex: any, rowIndex: any, field: any): any;
    isRow(arrayIndex: any, field: any, value: any): boolean;
    /**
     * Insert
     */
    insertRows(arrayIndex: any, dataRows: any): void;
    insertRowsBefore(arrayIndex: any, dataRows: any, rowIndex: any): void;
    insertRowsAfter(arrayIndex: any, dataRows: any, rowIndex: any): void;
    insert(arrayIndex: any, dataRow: any): void;
    insertBefore(arrayIndex: any, dataRow: any, rowIndex: any): void;
    insertAfter(arrayIndex: any, dataRow: any, rowIndex: any): void;
    /**
     * Remove
     */
    remove(arrayIndex?: any, rowIndex?: any): void;
    removeByRowId(arryIndex: any, rowId: any): void;
    /**
     * Update
     */
    update(arrayIndex: any, columnName: any, field: any, value: any): void;
    updateRow(arrayIndex: any, columnName: any, field: any, value: any): void;
    updateByRowIndex(arrayIndex: any, rowIndex: any, name: any, value: any): void;
    updateByRowId(arrayIndex: any, rowId: any, name: any, value: any): void;
    count(arrayIndex?: any, field?: any, value?: any): number;
    makeColIndex(): void;
}

declare class WaDatabase extends WaBase {
    tables: DataTableType[];
    constructor();
    createTable(tableName: string): WaDataTable;
    createView(tableName: string): WaDataTable;
    createArrayTable(tableName: string): WaDataArrayTable;
    removeTable(tableName: string): void;
    getTable(tableName: string): DataTableType;
}

declare class WaDataTable extends WaBase {
    tableName: string;
    data: any[];
    currentRowId: number;
    type: string;
    constructor(tableName: string);
    /**
     * select functions
     */
    select(): void;
    selectRows(field?: string, value?: any, topIndex?: number): object[];
    selectRow(field: any, value: any): object;
    selectRowByRowIndex(rowIndex: number): object;
    selectRowByRowId(rowId: any): object;
    selectRowIndexByRowId(rowId: any): number;
    selectRowIndex(field: any, value: any): number;
    selectRowIdByRowIndex(rowIndex: any): any;
    selectRowRange(startRowIndex?: number, endRowIndex?: number): object[];
    selectValue(rowIndex: any, field: any): any;
    isRow(field: any, value: any): boolean;
    /**
     * Insert
     */
    insertRows(dataRows: any): void;
    insertRowsBefore(dataRows: object[], rowIndex: number): void;
    insertRowsAfter(dataRows: object[], rowIndex: number): void;
    insert(dataRow: object): void;
    insertBefore(dataRow: object, rowIndex: any): void;
    insertAfter(dataRow: any, rowIndex: number): void;
    /**
     * Remove
     */
    remove(rowIndex?: number): void;
    removeByRowId(rowId: any): void;
    /**
     * Update
     */
    update(columnName: string, field: string, value: any): void;
    updateRow(columnName: string, field: string, value: any): void;
    updateByRowIndex(rowIndex: number, name: string, value: any): void;
    updateByRowId(rowId: number, name: string, value: any): void;
    count(field?: any, value?: any): number;
    /**
     * orderBy
     * @param sortColumns : [{ name : , order :, dataType: string | number }, ...]
     */
    orderBy(column_table: WaDataTable, sort_column_table: WaDataTable): any[];
    getSum(columnName: string): number;
    getAvg(columnName: string): number;
    getMax(columnName: string): number;
    getMin(columnName: string): number;
}

/**
 *
 * Class Mixins
 *
 */
declare interface WaGrid extends WaGridBaseMain, WaGridBaseIs, WaGridBaseEvent, WaGridBaseUserEvent, WaGridBaseLine, WaGridBaseData, WaGridBaseColumns, WaGridBaseRows {
}

declare class WaGrid extends WaGridBase {
    /**
     * Class
     */
    classScroll: WaGridScrollBase;
    verticalScroll: WaGridScroll;
    horizontalScroll: WaGridScroll;
    classHeader: WaGridHeaders;
    classColumn: WaGridColumns;
    classControl: WaGridControl;
    classRange: WaGridRange;
    classRange40: WaGridRangePanel;
    classRange50: WaGridRangePanel;
    classFilter: WaGridFilter;
    classGroup: WaGridGroup;
    classSort: WaGridSort;
    classTree: WaGridTree;
    classPanelBase: WaGridPanelBase;
    classPanel10: WaGridPanel10;
    classPanel20: WaGridPanel20;
    classPanel30: WaGridPanel30;
    classPanel40: WaGridPanel40;
    classPanel50: WaGridPanel50;
    classPanel70: WaGridPanel70;
    classPanel80: WaGridPanel80;
    classPanel90: WaGridPanel90;
    classPanel99: WaGridPanel99;
    classPage: WaGridPage;
    classPagination: WaGridPagination;
    classTop: WaGridTop;
    classFooter: WaGridFooter;
    tbsGridDate: WaGridDate;
    tbsGridCombo: WaGridCombo;
    classRow: WaGridRow;
    classCell: WaGridCell;
    topLineDiv: any;
    bottomLineDiv: any;
    leftLineDiv: any;
    rightLineDiv: any;
    options: WaGridOption;
    constructor(gridId: string, gridConfigs: object);
    /**
     * get configs value
     */
    getConfigCulture(label: string): any;
    getConfigCalendar(label: string): any;
    getConfigFont(label: string): any;
    getConfigLabel(label: string): any;
    /**
     *  WaGrid Config
     */
    setGridConfig(tbsGridConfig: any): void;
    getUserImageRoot(columnName: string): string;
    /**
     *  Group Functions
     */
    showGroupPanel(): void;
    hideGroupPanel(): void;
    setGroupColumns(groupColumns: any[]): void;
    setSortColumns(sortColumns: any[]): void;
    /**
     * Tree Functions
     */
    setTreeSortColumn(sortColumn: any): void;
    /**
     *  Panel10 Functions
     */
    showToolbarPanel(): void;
    hideToolbarPanel(): void;
    showToolbarButtons(buttonType: string): void;
    hideToolbarButtons(buttonType: string): void;
    showFilterPanel(): void;
    hideFilterPanel(): void;
    showSortPanel(): void;
    hideSortPanel(): void;
    /**
     * Options
     */
    createOption(options: any): void;
    setOption(optionName: string, optionValue: any): void;
    setOptions(options: any): void;
}
export { WaGrid }
export default WaGrid;

declare class WaGridBase extends WaBase {
    gridId: string;
    gridConfig: object;
    grid_mode: string;
    mousePointRange: number;
    isMobile: boolean;
    userAgent: string;
    columns: any;
    headerColumnTable: any[];
    renderer: any;
    infoRenderer: any;
    db: WaDatabase;
    header_column_table: WaDataArrayTable;
    column_table: WaDataTable;
    top_column_table: WaDataTable;
    footer_column_table: WaDataTable;
    sort_column_table: WaDataTable;
    filter_column_table: WaDataTable;
    group_column_table: WaDataTable;
    source_table: WaDataTable;
    view_table: WaDataTable;
    group_table: WaDataTable;
    group_header_table: WaDataTable;
    tree_table: WaDataTable;
    page_table: WaDataTable;
    top_table: WaDataTable;
    footer_table: WaDataTable;
    temp_table: WaDataTable;
    data_update: any[];
    data_insert: any[];
    data_delete: any[];
    info_column_table: WaDataTable;
    panel21_table: WaDataTable;
    panel20_table: WaDataTable;
    panel31_table: WaDataTable;
    cell_template_table: WaDataTable;
    data_select_panel30: object[];
    data_select_panel31: object[];
    pageRowCount: number;
    pageIntRowCount: number;
    startRowIndex: number;
    startCellIndex: number;
    lastRowIndex: number;
    lastCellIndex: number;
    _startRowIndex: number;
    _startCellIndex: number;
    _lastRowIndex: number;
    _lastCellIndex: number;
    selectRangeArray: any[];
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    const_filterValue: string;
    const_filterType: string;
    const_filterReset: string;
    const_filterSave: string;
    headerRowCount: number;
    fixedColumnIndex: number;
    headerRowHeight: number;
    rowHeight: number;
    topRowHeight: number;
    footerRowHeight: number;
    code_horizontal: string;
    code_vertical: string;
    constructor(gridId: string, gridConfigs: object);
}

declare class WaGridBaseColumns {
    constructor();
    /**
     * Column Functions
     */
    setFixedColumn(this: WaGrid, fixedColumnIndex: number): void;
    removeFixedColumn(this: WaGrid): void;
    /**
     * Columns API.
     */
    getColumn(this: WaGrid, name: string, table?: any): any;
    getColumns(this: WaGrid, table?: any): any;
    getColumnByIndex(this: WaGrid, columnIndex: number, table?: any): any;
    getColumnName(this: WaGrid, columnIndex: number, table?: any): any;
    getColumnIndex(this: WaGrid, columnName: string, table?: any): any;
    setColumn(this: WaGrid, columnName: string, property: string, value: any, table?: any): void;
    /**
     * Filter Columns
     */
    getFilterColumn(this: WaGrid, columnName: string): any;
    getFilterColumnName(this: WaGrid, columnIndex: number): string;
    getFilterColumnIndex(this: WaGrid, columnName: string): number;
    /**
     * Columns API
     */
    setTopColumns(this: WaGrid, topColumns: any): void;
    setFooterColumns(this: WaGrid, footerColumns: any): void;
    /**
     * Header Columns API.
     */
    getHeaderColumn(this: WaGrid, rowIndex: number, columnIndex: number): object;
    getHeaderColumnByNumber(this: WaGrid, num: any): any;
    addColumn(this: WaGrid, addColumn: any, targetColumnIndex: number, orderType: string): void;
    removeColumn(this: WaGrid, targetColumnIndex: number): void;
    setHeaderProperty(this: WaGrid, rowIndex: number, colIndex: number, property: string, value: any): void;
}

declare class WaGridBaseData {
    constructor();
    /**
     * Data Value, Text
     */
    getValue(this: WaGrid, rowIndex: number, columnName: string, table?: any): any;
    getValueByColumnIndex(this: WaGrid, rowIndex: number, columnIndex: number, table?: any): any;
    getText(this: WaGrid, rowIndex: number, columnName: string, table?: any): any;
    getTextByIndex(this: WaGrid, rowIndex: number, columnIndex: number, table?: any): any;
    setValue(this: WaGrid, rowIndex: number, columnName: string, value: any): void;
    setValueByColumnIndex(this: WaGrid, rowIndex: number, cellIndex: number, value: any): void;
    /** info_column_table */
    getInfoValue(this: WaGrid, columnName: string, property: string): any;
    setInfoValue(this: WaGrid, columName: string, property: string, value: any): void;
    /**
     * Check Box Options
     */
    getTrueValue(this: WaGrid, columnName: string): any;
    getFalseValue(this: WaGrid, columnName: string): any;
    getElseValue(this: WaGrid, columnName: string): any;
    getBooleanValue(this: WaGrid, columnName: string, valueType: string): any;
    reverseBoolean(this: WaGrid, columnName: string, value: any): any;
    /**
     * Format Functions
     *
     */
    getFormatValue(this: WaGrid, column: any, value: any): any;
    getFormatText(this: WaGrid, column: any, value: any): any;
    getFormat(this: WaGrid, column: any, value: any): any;
    getFormatNumber(this: WaGrid, column: any, value: any): any;
    getFormatDate(this: WaGrid, column: any, value: any): any;
}

declare class WaGridBaseEvent {
    constructor();
    event_input(this: WaGrid): void;
    event_input_icon(this: WaGrid): void;
    input_show(this: WaGrid, e: any, mode: any): void;
    input_hide(this: WaGrid): void;
    input_focus(this: WaGrid): void;
    editStart(this: WaGrid, e: any, mode: any): void;
    editing(this: WaGrid, e: any, mode: any): void;
    editEnd(this: WaGrid, e?: any, mode?: any): void;
    /**
     * Event Functions
     *
     */
    tbs_addEventAll(this: WaGrid): void;
    event_columnSort(this: WaGrid, cell: any): boolean;
    event_mobileTouchDrag(this: WaGrid): void;
    event_columnResize(this: WaGrid, panelName: any): void;
    event_wheel(this: WaGrid): void;
    event_scrollButton(this: WaGrid): void;
    event_railClick(this: WaGrid): void;
    event_dragScrollBar(this: WaGrid): void;
    tbs_moveCellLine(this: WaGrid, cell: any, rowIndex: any, cellIndex: any): void;
    isMovedPositionInConstRange(this: WaGrid, startX: any, startY: any, lastX: any, lastY: any): boolean;
    executeEvent(this: WaGrid, eventType: string, param: any): void;
    tbs_getMaxRowIndexByMouseMove(this: WaGrid): any;
    tbs_getMinRowIndexByMouseMove(this: WaGrid): any;
    tbs_getMaxCellIndexByMouseMove(this: WaGrid): any;
    tbs_getMinCellIndexByMouseMove(this: WaGrid): any;
    tbs_getMaxRowIndexByMouseMove2(this: WaGrid, panelName: any): any;
    tbs_getMinRowIndexByMouseMove2(this: WaGrid, panelName: any): any;
    tbs_getMaxCellIndexByMouseMove2(this: WaGrid, panelName: any): any;
    tbs_getMinCellIndexByMouseMove2(this: WaGrid, panelName: any): any;
    getOffset(this: WaGrid, el: any): {
        top: number;
        left: number;
    };
    tbs_moveNextRowCell(this: WaGrid, type: any): void;
    tbs_moveCell(this: WaGrid, type: any): void;
}

declare class WaGridBaseIs {
    constructor();
    /**
     * Is Functions
     *
     */
    isEditableColumn(this: WaGrid, columnName: string): boolean;
    isSortableColumn(this: WaGrid, columnName?: string): boolean;
    isResizableColumn(this: WaGrid, columnName: string): boolean;
    isMovableColumn(this: WaGrid, columnName?: string): boolean;
    isAutoResizableColumn(this: WaGrid, columnName: boolean): boolean;
    isAutoWidthColumn(this: WaGrid, columnName: any): boolean;
    isClassName(this: WaGrid, element: any, className: any): boolean;
    isNotValidColumnType(this: WaGrid, columnType: string): boolean;
    isInPanel(this: WaGrid, e: MouseEvent, panelName: string): boolean;
    isSelectedCell(this: WaGrid, panelName: string, rowIndex: number, cellIndex: number): number;
    isSelectedHeaderCell(this: WaGrid, panelName: string, cellIndex: number): number;
    isSelectedCell31(this: WaGrid, rowIndex: number, cellIndex: number): number;
    isSelectedCell30(this: WaGrid, rowIndex: number, cellIndex: number): number;
    isColumnName(this: WaGrid, columnName: string): boolean;
    isColumnTypeNumber(this: WaGrid, columnName: string): boolean;
    isFilterColumnName(this: WaGrid, columnName: string): boolean;
    isLastTopRowIndex(this: WaGrid, rowIndex: number): boolean;
}

declare class WaGridBaseLine {
    constructor();
    /**
     * Select Line Functions
     *
     */
    getFirstSelectedTableCell(this: WaGrid, panelName: string): any;
    getLastSelectedTableCell(this: WaGrid, panelName: string): any;
    clearSelectedLine(this: WaGrid): void;
    setSelectedLine(this: WaGrid, lineWidth: number, lineHeight: number, rectTop: number, rectBottom: number, rectLeft: number, rectRight: number): void;
    displaySelectedLine(this: WaGrid): void;
    displayOneSelection(this: WaGrid, startRowIndex: number, startCellIndex: number): void;
    getFirstDisplayRowIndex(this: WaGrid, panelName?: string): number;
    getFirstRowIndex(this: WaGrid, panelName?: string): number;
    getLastRowIndex(this: WaGrid): number;
    getLastTableRowIndex(this: WaGrid): number;
}

declare class WaGridBaseMain {
    constructor();
    getRenderer(this: WaGrid, columnName: string, property: string): any;
    setRenderer(this: WaGrid, renderer: any): void;
    getInfoRenderer(this: WaGrid, columnName: string, property: string): any;
    setInfoRenderer(this: WaGrid, renderer: any): void;
    /**
     * Display grid
     */
    apply(this: WaGrid): void;
    /**
     * Main Functions
     */
    createHtml(this: WaGrid): void;
    setGrid(this: WaGrid, columns: any[], options?: any): void;
    createGrid(this: WaGrid): void;
    updateGrid(this: WaGrid): void;
    getTextWidth(this: WaGrid, canvas: any, text: any, fontSize: any, fontFamily: any): any;
    getTextWidth2(this: WaGrid, context: any, text: any): any;
    setColumnAutoWidth(this: WaGrid): void;
    setRowHeight(this: WaGrid, type: any, rowHeight: any): void;
    setData(this: WaGrid, data: any[], openDepth?: number, isFirst?: boolean): void;
    setGridMode(this: WaGrid, gridMode: GridMode): void;
    setGridData(this: WaGrid, data: any[], isFirst: boolean): void;
    refreshRefData(this: WaGrid): void;
    /**
     * Range Functiopns
     */
    setRange(this: WaGrid, rowIndex1: number, toRowIndex2: number, columnIndex1: number, columnIndex2: number): void;
    selectRange(this: WaGrid, rowIndex1: number, toRowIndex2: number, columnIndex1: number, columnIndex2: number): void;
    /**
     * Dom Lib
     */
    addUserClass(this: WaGrid, element: any, className: string): void;
    removeUserClass(this: WaGrid, element: any): void;
    /**
     * Export Excel
     */
    exportExcel(this: WaGrid, options: any): void;
    /**
     * Pagination
     */
    setTotalRowCount(this: WaGrid, totalRowCount: number): void;
}

declare class WaGridBaseRows {
    constructor();
    /**
     * view table rows
     */
    getRowCount(this: WaGrid, table?: any): any;
    getRow(this: WaGrid, rowIndex: number, table?: any): any;
    getRows(this: WaGrid, startRowIndex?: number, endRowIndex?: number, table?: any): any;
    getRowByRowId(this: WaGrid, rowId: number, table?: any): any;
    getRowIndexByRowId(this: WaGrid, rowId: number, table?: any): any;
    getCheckedRows(this: WaGrid): object[];
    getSelectedRows(this: WaGrid): any[];
    getSelectedRowsIndexArray(this: WaGrid): number[];
    getChangedRowsData(this: WaGrid): any[];
    getDeletedRowsData(this: WaGrid): any[];
    getUpdatedRowsData(this: WaGrid): any[];
    getInsertedRowsData(this: WaGrid): any[];
    createRow(this: WaGrid, row: any): any;
    addRow(this: WaGrid, row?: any, direction?: AddRowDirection): void;
    removeRows(this: WaGrid, rows: any[]): void;
    /**
     * source table rows
     */
    getSourceRowCount(this: WaGrid): number;
    getSourceRow(this: WaGrid, rowIndex: number): any;
    getSourceRows(this: WaGrid, startRowIndex: number, endRowIndex: number): any[];
    getSourceRowByRowId(this: WaGrid, rowId: number): any;
    getSourceRowIndexByRowId(this: WaGrid, rowId: number): number;
    /**
     * top table rows
     */
    getTopRowCount(this: WaGrid): number;
    getTopRow(this: WaGrid, rowIndex: number): any;
    getTopRows(this: WaGrid, startRowIndex: number, endRowIndex: number): any[];
    getTopRowByRowId(this: WaGrid, rowId: number): any;
    getTopRowIndexByRowId(this: WaGrid, rowId: number): number;
    /**
     * footer table rows
     */
    getFooterRowCount(this: WaGrid): number;
    getFooterRow(this: WaGrid, rowIndex: number): any;
    getFooterRows(this: WaGrid, startRowIndex: number, endRowIndex: number): any[];
    getFooterRowByRowId(this: WaGrid, rowId: number): any;
    getFooterRowIndexByRowId(this: WaGrid, rowId: number): number;
    /**
     * tree table rows
     */
    getTreeRowCount(this: WaGrid): number;
    getTreeRow(this: WaGrid, rowIndex: number): any;
    getTreeRows(this: WaGrid, startRowIndex: number, endRowIndex: number): any[];
    getTreeRowByRowId(this: WaGrid, rowId: number): any;
    getTreeRowIndexByRowId(this: WaGrid, rowId: number): number;
    /**
     * Row functions
     */
    getPageRowCount(this: WaGrid, panelName?: string): number;
    getTopRowIndex(this: WaGrid, panelName: string, topRowIndex: number): number;
    getBottomRowIndex(this: WaGrid, panelName: string, topRowIndex: number): number;
}

declare class WaGridBaseUserEvent {
    onClick: any;
    onDblclick: any;
    onEdit: any;
    onClickCheckbox: any;
    onClickInfoCheckBox: any;
    onClickButton: any;
    onClickLink: any;
    onRowBounding: any;
    onClickPage: any;
    onChangePageRowCount: any;
    onClickPageFirst: any;
    onClickPagePrev: any;
    onClickPageIndex: any;
    onClickPageNext: any;
    onClickPageLast: any;
    constructor();
}

declare class WaGridCell {
    grid: WaGrid;
    column: any;
    constructor(grid: WaGrid, column: any);
    createHtml(): void;
    createCell(): void;
    createTemplate(): void;
    hideTableCells(grid: any, panelName: any, tableRow: any, lastColumnIndex: any): void;
    showSelectedCells(grid: any, panelName: any, tableCell: any, rowIndex: any, cellIndex: any): void;
}

declare class WaGridColumns {
    grid: WaGrid;
    selector: string;
    constructor(grid: any);
    getUserColumns(): any[];
    setColumnDefaultValue(column: any): any;
    createColumns(columns: any): void;
    createColumnTable(): void;
    addColumn(addColumn: any, columnIndex: any, orderType: any): void;
    removeColumn(targetColumnIndex: any): void;
    getParentTableCell(column: any): any;
    changeColumnOrder(moveColumn: any, targetColumn: any, orderType: any): void;
    getSelectedTableCell(rowIndex?: any, cellIndex?: any): any;
    getRowIndexInTable(tableRowIndex: any, panelName?: any): number;
    getLeftTableCell(rowIndex: any, panel?: any): any;
    getJsonRow(jsonArray: any, name: any, value: any): any;
    setFixedColumn(fixedColumnIndex: any): void;
    removeFixedColumn(): void;
    getFirstVisibleColumnIndex(): any;
    getLastVisibleColumnIndex(): any;
}

declare class WaGridCombo {
    colType: any;
    grid: WaGrid;
    gridId: string;
    column: object;
    input: HTMLInputElement;
    input_code: HTMLInputElement;
    constructor(grid: WaGrid, column: any, input: any, input_code: any);
    create(): void;
    clear(): void;
    setData(): void;
    AddEvent(): void;
    destroy(): void;
}

declare class WaGridControl {
    grid: WaGrid;
    selector: string;
    constructor(grid: WaGrid);
    after_changeColumnOrder(): void;
    after_addColumn(): void;
    after_removeColumn(headerColumns: any, columns: any): void;
    after_showFilterPanel(): void;
    after_hideFilterPanel(): void;
    after_showSortrPanel(): void;
    after_hideSortPanel(): void;
    after_setColumnVisible(): void;
}

declare class WaGridDate {
    colType: any;
    grid: WaGrid;
    gridId: string;
    column: object;
    input: HTMLInputElement;
    constructor(grid: WaGrid, column: object, input: HTMLInputElement);
    create(): void;
    clear(): void;
    setData(data?: any): void;
    getToday(): string;
    today(): void;
    prev(): void;
    next(): void;
    selectMonth(value: any): void;
    addEvent(): void;
    addZero(value: any): any;
    destroy(): void;
}

declare class WaGridFilter {
    grid: WaGrid;
    selector: string;
    constructor(grid: WaGrid);
    showFilterPanel(): void;
    hideFilterPanel(): void;
    filters(): void;
    filter(data: any, filterColumn: any): any;
    filterNumberByType(filterType: FilterType, n: any, targetNumber: any): boolean;
    filterStringByType(filterType: FilterType, s: any, targetString: any): boolean;
    setFilterColumn(column: any, filterType: any, word: any): void;
    removeFilterColumn(column: any): void;
    createFilterCombo(column: any): HTMLSelectElement;
    addFilterComboOption(combo: any, value: any, text: any): void;
    initFilterData(): void;
}

declare class WaGridFooter {
    grid: WaGrid;
    selector: string;
    constructor(grid: WaGrid);
    setFooterColumns(columns: any): void;
    setFooterData(): void;
    setFooterValue(rowIndex: any, columnName: any, value: any): void;
}

declare class WaGridGroup {
    grid: WaGrid;
    selector: string;
    openDepth: number;
    splitChar: string;
    constructor(grid: any);
    setGroupData(data: any, openDepth?: number, isFirst?: boolean): void;
    createGroupData(): void;
    createGroupKeyData(dataRows: any, depth?: number): any[];
    getGroupKeyByDepth(row: any, depth: any): string;
    getGroupKeyRowByDepth(row: any, depth: any): {};
    /**
     * Group Sum, Avg
     */
    getGroupDepthSummary(rowIndex: any): void;
    getGroupSummary(): void;
    /**
     * spanIcon, spanImg, spanText
     */
    setGroupIcon(tableCell: any, rowIndex: number): void;
    toggleGroupIcon(element: any, type: any): void;
    setGroupFolding(tableCell: any): void;
    getGroupFoldingStatus(tableCell: any): WaColumnProperty.open | WaColumnProperty.closed;
    openChildRow(arrayRows: any, rootRow: any): void;
    openGroupRow(rowIndex?: number): void;
    closeChildRow(rowIndex: any): void;
    closeGroupRow(rowIndex: any): void;
    /**
     * Group Button
     */
    changeGroupButtonOrder(name: any, text: any, order: any, targetIndex: any): void;
    addGroupButton(name: any, text: any, order: any, targetIndex: any): void;
    removeGroupButton(element: any): void;
    removeGroupButtonList(): void;
    getGroupButtonList(): void;
    createGroupButton(columnName: any): HTMLDivElement;
    toggleGroupPlaceHolder(): void;
    destroy(): void;
    showGroupPanel(): void;
    hideGroupPanel(): void;
    initGroupData(): void;
    getGroupRow(columnName: any): object;
    expandGroup(): void;
    collapseGroup(): void;
}

declare class WaGridHeaders {
    grid: WaGrid;
    selector: string;
    constructor(grid: WaGrid);
    createHeaderColumns(): void;
    createHeaderColumnTable(): void;
    updateHeaderFixedColumns(): void;
    getDisplayedHeaderColumn(panelName?: string): {
        startColumnIndex: number;
        lastColumnIndex: number;
    };
    getHeaderColumn(rowIndex: number, columnIndex: number): object;
    getHeaderColumnByNumber(num: any): any;
    getHeaderPropertyByIndex(columnIndex: any, property: any): any;
    getHeaderProperty(columnName: any, property: any): any;
    setHeaderProperty(rowIndex: any, colIndex: any, property: any, value: any): void;
}

declare interface WaGridOption {
    showToolbarPanel?: boolean;
    showFilterPanel?: boolean;
    showSortPanel?: boolean;
    showGroupPanel?: boolean;
    sortable?: boolean;
    resizable?: boolean;
    movable?: boolean;
    autoResizable?: boolean;
    autoWidth?: boolean;
    selectMode?: string;
    addRow?: boolean;
    delRow?: boolean;
    insertRow?: boolean;
    updateRow?: boolean;
    deleteRow?: boolean;
    zeroChar?: string;
    useToolbar?: boolean;
    imageRoot?: string;
    treeItemName?: string;
    treeParentName?: string;
    treeRootValue?: string;
    pageRowCount?: number;
    pageRowCountList?: number[];
    trueValue?: any;
    falseValue?: any;
    elseValue?: any;
}

declare class WaGridPage {
    grid: WaGrid;
    selector: string;
    pageIndex: number;
    pageCount: number;
    pageTotalRowCount: number;
    constructor(grid: WaGrid);
    setPageData2(): void;
    setPageData(data: any[], isFirst?: boolean): void;
}

declare class WaGridPagination {
    grid: WaGrid;
    selector: string;
    pageIndex: number;
    pageCount: number;
    pageTotalRowCount: number;
    constructor(grid: WaGrid);
    setTotalRowCount(totalRowCount: number): void;
    setPaginationData(data: any[]): void;
}

declare class WaGridPanel10 extends WaGridPanelBase {
    constructor(grid: WaGrid);
    createHtml(parentElement: any): void;
    createTable(): void;
    panel10_select(): void;
    showToolbarPanel(): void;
    hideToolbarPanel(): void;
    showToolbarButtons(buttonType: any): void;
    hideToolbarButtons(buttonType: any): void;
}

declare class WaGridPanel20 extends WaGridPanelBase {
    isChecked: boolean;
    constructor(grid: WaGrid);
    createHtml(parentElement: any): void;
    createTable(): void;
    setDataPanel(topRowIndex?: number): void;
    setDataPanel1(param: any): void;
    setDataPanel2(param: any): void;
    setDataPanel0(param: any): void;
    setDataPanelSub(panelName: string, param: any): void;
    panel21_select(): void;
    panel20_select(panelName: any): void;
}

declare class WaGridPanel30 extends WaGridPanelBase {
    constructor(grid: any);
    createHtml(parentElement: any): void;
    createTable(): void;
    updateTableRows(): void;
    setDataPanel(topRowIndex: any): void;
    setDataPanel1(param: any): void;
    setDataPanel2(param: any): void;
    setDataPanel0(param: any): void;
    panel30_select(eventPanelName: any): void;
    panel31_select(eventPanelName: any): void;
}

declare class WaGridPanel40 extends WaGridPanelBase {
    constructor(grid: any);
    createHtml(parentElement: any): void;
    createTable(): void;
    setDataPanel(): void;
    setDataPanel1(): void;
    setDataPanel2(): void;
    setDataPanel0(): void;
    panel40_select(eventPanelName: any): void;
    panel41_select(eventPanelName: any): void;
}

declare class WaGridPanel50 extends WaGridPanelBase {
    constructor(grid: any);
    createHtml(parentElement: any): void;
    createTable(): void;
    setDataPanel(): void;
    setDataPanel1(): void;
    setDataPanel2(): void;
    setDataPanel0(): void;
}

declare class WaGridPanel70 extends WaGridPanelBase {
    constructor(grid: any);
    createHtml(parentElement: any): void;
    createTable(): void;
    setDataPanel(): void;
    setDataPanel2(param: any): void;
    setDataPanel0(param: any): void;
    panel70_select(panelName: any): void;
}

declare class WaGridPanel80 extends WaGridPanelBase {
    constructor(grid: any);
    createHtml(parentElement: any): void;
    createTable(): void;
    panel80_select(): void;
}

declare class WaGridPanel90 extends WaGridPanelBase {
    constructor(grid: any);
    createHtml(parentElement: any): void;
    createTable(): void;
    panel90_select(): void;
}

declare class WaGridPanel99 extends WaGridPanelBase {
    constructor(grid: WaGrid);
    createHtml(parentElement: any): void;
    createTable(): void;
    panel99_select(): void;
    setPageRowCountList(data?: any[]): void;
    showPagePanel(): void;
    hidePagePanel(): void;
}

declare class WaGridPanelBase extends WaBase {
    grid: WaGrid;
    selector: string;
    panelName: string;
    panelName1: string;
    panelName2: string;
    panelName0: string;
    constructor(grid: WaGrid);
    /**
     *  Panel Interface
     */
    createHtml(parentElement: any): void;
    createEtcHtml(parentElement: any): void;
}

declare class WaGridRange {
    grid: WaGrid;
    selector: string;
    constructor(grid: WaGrid);
    removePanelRange: (panelName?: string) => void;
    selectRange: (startRowIndex: any, lastRowIndex: any, startCellIndex?: any, lastCellIndex?: any, topRowIndex?: number) => any;
    setRange: (startRowIndex: any, lastRowIndex: any, startCellIndex: any, lastCellIndex: any, topRowIndex: any, type?: string) => any;
    setRangeValue: (startRowIndex: any, lastRowIndex: any, startCellIndex: any, lastCellIndex: any) => void;
    removeRange: (startRowIndex: any, lastRowIndex: any, startCellIndex?: any, lastCellIndex?: any) => void;
    addRange: (startRowIndex: number, lastRowIndex: number, startCellIndex: number, lastCellIndex: number, topRowIndex: number) => void;
}

declare class WaGridRangePanel {
    grid: WaGrid;
    selector: string;
    panelName: string;
    startRowIndex: number;
    startCellIndex: number;
    lastRowIndex: number;
    lastCellIndex: number;
    _startRowIndex: number;
    _startCellIndex: number;
    _lastRowIndex: number;
    _lastCellIndex: number;
    selectRangeArray: any[];
    data_select_panel31: any[];
    data_select_panel30: any[];
    data_summary: any[];
    constructor(grid: WaGrid, panelName: string);
    selectRange(startRowIndex: number, lastRowIndex: number, startCellIndex?: number, lastCellIndex?: number, topRowIndex?: number): void;
    setRange(startRowIndex: any, lastRowIndex: any, startCellIndex: any, lastCellIndex: any, topRowIndex: any, type?: string): void;
    setRangeValue(startRowIndex: any, lastRowIndex: any, startCellIndex: any, lastCellIndex: any): void;
    removeRange(startRowIndex: number, lastRowIndex: number, startCellIndex?: number, lastCellIndex?: number): void;
    addRange(startRowIndex: any, lastRowIndex: any, startCellIndex: any, lastCellIndex: any, topRowIndex: any): void;
    getMaxCellIndexByMouseMove(): any;
    getMinCellIndexByMouseMove(): any;
    getMaxCellIndexByMouseMove2(panelName: any): any;
    getMinCellIndexByMouseMove2(panelName: any): any;
}

declare class WaGridRow {
    grid: WaGrid;
    constructor(grid: WaGrid);
    setTableHead(grid: WaGrid, panelName: string): void;
    setTableRow(grid: any, tableRow: any, rowIndex: any, panelName?: string): void;
    showAlternativeRowColor(grid: any, panelName: any, tableRow: any, rowIndex: any): void;
    hideTableRows(grid: any, panelName: any, tableRows: any, fromRowIndex: any, toRowIndex: any): void;
}

declare class WaGridScroll {
    /**
     * ScrollName : verticalScroll, horizontalScroll, verticalScroll60, horizontalScroll32
     *
     */
    grid: WaGrid;
    selector: string;
    scrollName: string;
    barSize: number;
    railSize: number;
    moveCount: number;
    margin: string;
    hiddenSize: number;
    panelName: string;
    type: string;
    constructor(grid: WaGrid, scrollName: string);
    setScroll(type: any): void;
    setHorizontalScroll(): void;
    setVerticalScroll(): void;
    showScroll(type: any): void;
    hideScroll(type: any): void;
    setScrollSize(type: any): void;
    getBarSize(type: any): any;
    getHorizontalBarSize(): any;
    getVerticalBarSize(): number;
    getRailSize(type: any, barSize: any): number;
    getHorizontalRailSize(barSize: any): number;
    getVerticalRailSize(barSize: any): number;
    getMoveCount(type: any, railSize: any): number;
    getHiddenSize(type: any): any;
    getBarWidth(type: any, barSize: any): string;
}

declare class WaGridScrollBase {
    grid: WaGrid;
    selector: string;
    constructor(grid: any);
    setPanelSize(): void;
    setBarPosition(type: string, topRowIndex?: number): void;
    setBarPositionByDirection(type: string, rowIndex?: number): number;
    getContentPanelLeft(value: any): string;
    setContentPanelLeft(value: any): void;
    setContentPanelLeftMove(value: any): void;
    setColumnWidth(panelName: any, colIndex: any, value: any): void;
    setColumnWidth20(panelName: any, colIndex: any, value: any): void;
    setColumnWidth22(panelName: any, colIndex: any, value: any): void;
    getFixedColumnsWidth(): number;
    setAllColumnWidth(arr: any): void;
    setPageRowCount(panelName?: string): void;
}

declare class WaGridSort {
    grid: WaGrid;
    selector: string;
    sortColumns: any[];
    options: any;
    constructor(grid: WaGrid);
    orderBy(): void;
    getSortRow(columnName: string): object;
    changeSortButtonOrder(name: string, text: string, order: string, targetIndex: number): void;
    addSortButton(name: any, text: any, order: any, targetIndex: any): void;
    removeSortButton(element: any): void;
    removeSortButtonList(): void;
    getSortButtonList(): void;
    createSortButton(columnName: any): HTMLDivElement;
    toggleSortPlaceHolder(): void;
    showSortPanel(): void;
    hideSortPanel(): void;
    initSortData(): void;
}

declare class WaGridTop {
    grid: WaGrid;
    selector: string;
    constructor(grid: any);
    setTopColumns(columns: any): void;
    setTopData(): void;
    setTopValue(rowIndex: any, columnName: any, value: any): void;
}

declare class WaGridTree {
    grid: WaGrid;
    selector: string;
    openDepth: number;
    constructor(grid: any);
    createTreeData(): void;
    setTreeSortColumns(sortColumns: any): void;
    setTreeData(data: any, openDepth?: number, isFirst?: boolean): void;
    setTreeIcon(tableCell: any, rowIndex: any): void;
    toggleTreeIcon(element: any, type?: any): void;
    getTreeFoldingStatus(tableCell: any): WaColumnProperty.open | WaColumnProperty.closed;
    setTreeFolding(tableCell: any): void;
    getTreechildRows(folding: any, rowIndex: any, isAll?: boolean): any[];
    openTreeRow(rowIndex: any): void;
    closeTreeRow(rowIndex: any): void;
    addTreeRows(rowIndex: any): void;
    addTreeRow(startRowIndex: any, row: any): void;
    removeTreeRow(row: any): void;
}

export { }
