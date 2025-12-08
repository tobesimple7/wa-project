export interface FormatData {
    text: string,
    value: string | number
}


export interface GroupColumn {
    name: string
}

// export interface SortColumnDef {
//     name: string,
//     order: string,
//     orderNumber: number
// }




export interface WaGridOption {
    showToolbarPanel?: boolean,
    showFilterPanel?: boolean,
    showSortPanel?: boolean,
    showGroupPanel?: boolean,

    // Columns WaGridOption
    sortable?: boolean,
    resizable?: boolean,
    movable?: boolean,
    autoResizable?: boolean,
    autoWidth?: boolean,

    // Rows WaGridOption
    selectMode?: string,
    addRow?: boolean,
    delRow?: boolean,
    insertRow?: boolean,
    updateRow?: boolean,
    deleteRow?: boolean,
    zeroChar?: string,
    useToolbar?: boolean,
    imageRoot?: string,

    // Tree Options
    treeItemName?: string,
    treeParentName?: string,
    treeRootValue?: string,

    // Paging Options
    pageRowCount?: number;
    pageRowCountList?: number[];

    trueValue?: any;
    falseValue?: any;
    elseValue?: any;
}

export interface GridRenderer {
    trueValue?: any;
    falseValue?: any;
    elseValue?: any;
}

export enum ClickPageOrder {
    first = 'first',
    last = 'last',
    prev = 'prev',
    next = 'next'
}

export enum CellType {
    string = 'string',
    number = 'number',
    date = 'date',
    combo = 'combo',
    checkbox = 'checkbox',
    img = 'img',
    button = 'button',
    link = 'link',
    group = 'group',
    tree = 'tree'
}

export enum GridMode {
    grid = '',
    tree = 'tree',
    page = 'page',
    pagination = 'pagination',
}

export enum AddRowDirection {
    top = 'top',
    bottom = 'bottom',
    before = 'before',
    after = 'after'
}

export enum Direction {
    up = 'up',
    down = 'down',
    left = 'left',
    right = 'right',
}

export enum BeforeAfter {
    before = 'before',
    after = 'after'
}

/**
 * Alias
 */

export enum OptionAlias {
    rowMode = 'rowMode',
    checkbox = 'checkbox',
    numWidth = 'numWidth',
    rowModeWidth = 'rowModeWidth',
    checkBoxWidth = 'checkBoxWidth',
    insertRow = 'insertRow',
    updateRow = 'updateRow',
    deleteRow = 'deleteRow',
    zeroChar  = 'zeroChar',
    useToolbar = 'useToolbar',
    imageRoot = 'imageRoot',
}


export enum RowAlias {
    selectMode = 'selectMode',
    addRow = 'addRow',
    delRow = 'delRow'
}

export enum TreeAlias {
    itemName = 'itemName',
    parentName = 'parentName',
    rootValue = 'rootValue',
}




