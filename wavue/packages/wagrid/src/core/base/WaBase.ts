import {WaGridOption} from "@/core/WaGrid.types"
import {WaBase} from '../WaBase';
import {WaDatabase, DataTableType} from '@/core/database/WaDatabase';
import {WaDataTable} from '@/core/database/WaDataTable';
import {waGridConfigs} from "../wa.grid.configs";
import {WaDataArrayTable} from "@/core/database/WaDataArrayTable";

export class WaGridBase extends WaBase {
    gridId: string;
    gridConfig: object;
    grid_mode: string;
    mousePointRange: number;

    isMobile: boolean;
    userAgent: string;

    columns: any;
    headerColumnTable: any[];

    renderer = null;
    infoRenderer = null;

    db: WaDatabase;

    // field_table: WaDataTable;
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
    const_filterType : string;
    const_filterReset: string;
    const_filterSave : string;

    headerRowCount: number;

    fixedColumnIndex: number;
    headerRowHeight: number;
    rowHeight: number;
    topRowHeight: number;
    footerRowHeight: number;

    //debug_mode: boolean;
    code_horizontal: string;
    code_vertical  : string;

    constructor(gridId: string, gridConfigs: object) {
        super();
        this.gridId = gridId;
        this.gridConfig = gridConfigs ?
            gridConfigs[Object.keys(gridConfigs)[0]] : waGridConfigs[Object.keys(waGridConfigs)[0]];
        this.grid_mode = '';
        this.mousePointRange = 15;

        /**
         * @description mobile, user agent
         *
         */
        this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        this.userAgent = navigator.userAgent; // 'safari' etc

        /**
         * columns, headerColumnTable
         */

        this.columns = [];
        this.headerColumnTable = [];

        this.renderer = null;
        this.infoRenderer = null;

        /**
         * create database
         */
        this.db = new WaDatabase();

        // this.field_table        = this.db.createTable('field');

        this.header_column_table= this.db.createArrayTable('header_column');

        this.column_table       = this.db.createTable('column');
        this.top_column_table   = this.db.createTable('top_column');
        this.footer_column_table= this.db.createTable('footer_column');
        this.sort_column_table  = this.db.createTable('sort_column');
        this.filter_column_table= this.db.createTable('filter_column');
        this.group_column_table = this.db.createTable('group_column');

        this.source_table       = this.db.createTable('source');
        this.view_table         = this.db.createView('view');

        this.group_table        = this.db.createView('group');
        this.group_header_table = this.db.createView('group_header');

        this.tree_table         = this.db.createView('tree');
        this.page_table         = this.db.createView('page');

        this.top_table          = this.db.createTable('top');
        this.footer_table       = this.db.createTable('footer');

        this.temp_table         = this.db.createTable('temp');

        this.data_update = [];
        this.data_insert = [];
        this.data_delete = [];

        /**
         * create info table
         */

        this.info_column_table =  this.db.createTable('info_column');

        this.info_column_table.insert({ name: 'num'     , type: 'number'  , align: 'center',  width: 50, visible: true  });
        this.info_column_table.insert({ name: 'mode'    , type: 'string'  , align: 'center',  width: 20, visible: false });
        this.info_column_table.insert({ name: 'checkbox', type: 'checkbox', align: 'center',  width: 25, visible: false, editable: true });

        this.panel21_table = this.db.createView('panel21');
        this.panel20_table = this.db.createView('panel20');
        this.panel31_table = this.db.createView('panel31');

        /**
         * cell template table
         */
        this.cell_template_table = this.db.createTable('cellTemplate');

        this.cell_template_table.insert({ type: 'checkbox', cellTemplate:  1, children: ['checkbox', 'string'] }); //default
        this.cell_template_table.insert({ type: 'checkbox', cellTemplate:  2, children: ['string', 'checkbox'] });

        this.cell_template_table.insert({ type: 'group', cellTemplate:  1, children: ['icon', 'string'] });
        this.cell_template_table.insert({ type: 'group', cellTemplate:  2, children: ['icon', 'img', 'string'] });

        this.cell_template_table.insert({ type: 'tree', cellTemplate:  1, children: ['icon', 'string'] });
        this.cell_template_table.insert({ type: 'tree', cellTemplate:  2, children: ['icon', 'img', 'string'] });

        /**
         * @description selection data
         *
         */

        this.data_select_panel30 = [];
        this.data_select_panel31 = [];

        /**
         * @description Row Count / Select Range
         *
         */
        this.pageRowCount = 0;
        this.pageIntRowCount = 0;

        this.startRowIndex = -1;
        this.startCellIndex = -1;
        this.lastRowIndex = -1;
        this.lastCellIndex = -1;

        this._startRowIndex = -1;
        this._startCellIndex = -1;
        this._lastRowIndex = -1;
        this._lastCellIndex = -1;

        this.selectRangeArray = [];

        this.startX = 0;
        this.startY = 0;
        this.lastX = 0;
        this.lastY = 0;

        this.const_filterValue = 'value';
        this.const_filterType = 'type';
        this.const_filterReset = 'Reset';
        this.const_filterSave = 'Save';

        this.headerRowCount = 0;

        /**
         * @description layout
         *
         */
        this.fixedColumnIndex = -1;

        /**
         * @description constant value
         *
         */
        this.headerRowHeight = 25;
        this.rowHeight = 25;
        this.topRowHeight = 25;
        this.footerRowHeight = 25;

        /**
         * @description code
         *
         */
        this.debug_mode = true;
        this.code_horizontal = 'horizontal';
        this.code_vertical   = 'vertical';
    }
}



