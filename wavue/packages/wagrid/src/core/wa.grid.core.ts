import {WaGridScrollBase} from "./wa.grid.scroll.base";
import {WaGridScroll} from "./wa.grid.scroll";
import {WaGridHeader} from "@/core/header/WaGridHeader";
import {WaGridColumnCore} from "@/core/columns/WaGridColumnCore";
import {WaGridControl} from "./wa.grid.control";
import {WaGridRange} from "./wa.grid.range";
import {WaGridRangePanel} from "./wa.grid.range.panel";
import {WaGridFilter} from "./wa.grid.filter";
import {WaGridGroup} from "./wa.grid.group";
import {WaGridPage} from "@/core/page/wa.grid.page";
import {WaGridSort} from "./wa.grid.sort";
import {WaGridTree} from "./wa.grid.tree";
import {WaGridPanelBase} from "@/core/panels/PanelBase";
import {WaGridPanel10} from "@/core/panels/Panel10";
import {WaGridPanel20} from "@/core/panels/Panel20";
import {WaGridPanel30} from "@/core/panels/Panel30";
import {WaGridPanel40} from "@/core/panels/Panel40";
import {WaGridPanel50} from "@/core/panels/Panel50";
import {WaGridPanel70} from "@/core/panels/Panel70";
import {WaGridPanel80} from "@/core/panels/Panel80";
import {WaGridPanel90} from "@/core/panels/Panel90";
import {WaGridPanel99 } from "@/core/panels/Panel99";
import {WaGridTop} from "@/core/summary/wa.grid.top";
import {WaGridFooter} from "@/core/summary/wa.grid.footer";
import {WaGridDate} from "@/core/layer/wa.grid.date";
import {WaGridCombo} from "@/core/layer/wa.grid.combo";
import {WaGridRow} from "@/core/wa.grid.row";
import {WaGridCell} from "@/core/wa.grid.cell";
import {WaGridBase} from "@/core/base/wa.grid.base";
import {WaGridBaseIs} from "@/core/base/wa.grid.base.is";
import {WaGridBaseEvent} from "@/core/base/wa.grid.base.event";
import {WaGridBaseUserEvent} from "@/core/base/wa.grid.base.user.event";
import {WaGridBaseLine} from "@/core/base/wa.grid.base.line";
import {WaGridBaseColumns} from "@/core/base/wa.grid.base.columns";
import {WaGridBaseRows} from "@/core/base/wa.grid.base.rows";
import {WaGridBaseData} from "@/core/base/wa.grid.base.data";
import {WaGridBaseMain} from "@/core/base/wa.grid.base.main";
import {WaGridOption} from "@/core/WaGrid.types"
import {WaGridPagination} from "@/core/page/wa.grid.pagination";

/**
 *
 * Class Mixins
 *
 */

export interface WaGridCore
    extends WaGridBaseMain
        , WaGridBaseIs
        , WaGridBaseEvent
        , WaGridBaseUserEvent
        , WaGridBaseLine
        , WaGridBaseData
        , WaGridBaseColumns
        , WaGridBaseRows {}

export class WaGridCore extends WaGridBase {

    /**
     * Class
     */

    classScroll: WaGridScrollBase;
    verticalScroll: WaGridScroll;
    horizontalScroll: WaGridScroll;

    classHeader: WaGridHeader;
    classColumn: WaGridColumnCore;
    classControl: WaGridControl;
    classRange: WaGridRange;
    classRange40: WaGridRangePanel;
    classRange50: WaGridRangePanel;
    classFilter: WaGridFilter;
    classGroup: WaGridGroup;
    classSort: WaGridSort
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

    topLineDiv    : any;
    bottomLineDiv : any;
    leftLineDiv   : any;
    rightLineDiv  : any;

    options: WaGridOption;

    constructor(gridId: string, gridConfigs: object) {
        super(gridId, gridConfigs);

        this.classScroll    = new WaGridScrollBase(this);
        this.verticalScroll = new WaGridScroll(this, 'verticalScroll');
        this.horizontalScroll = new WaGridScroll(this, 'horizontalScroll');

        this.classHeader    = new WaGridHeader(this);
        this.classColumn    = new WaGridColumnCore(this);
        this.classControl   = new WaGridControl(this); 
        this.classRange     = new WaGridRange(this);
        this.classRange40   = new WaGridRangePanel(this, 'panel40');
        this.classRange50   = new WaGridRangePanel(this, 'panel50');
        this.classFilter    = new WaGridFilter(this);
        this.classGroup     = new WaGridGroup(this);
        this.classPage = new WaGridPage(this);
        this.classSort      = new WaGridSort(this);
        this.classTree      = new WaGridTree(this);

        this.classPanelBase = new WaGridPanelBase(this);
        this.classPanel10 = new WaGridPanel10(this);
        this.classPanel20 = new WaGridPanel20(this);
        this.classPanel30 = new WaGridPanel30(this);
        this.classPanel40 = new WaGridPanel40(this);
        this.classPanel50 = new WaGridPanel50(this);
        this.classPanel70 = new WaGridPanel70(this);
        this.classPanel80 = new WaGridPanel80(this);
        this.classPanel90 = new WaGridPanel90(this);
        this.classPanel99 = new WaGridPanel99(this);

        this.classPagination = new WaGridPagination(this);

        this.classTop    = new WaGridTop(this);
        this.classFooter = new WaGridFooter(this);

        this.tbsGridDate;
        this.tbsGridCombo;

        this.classRow = new WaGridRow(this);
        this.classCell = new WaGridCell(this, null);

        this.topLineDiv    = null;
        this.bottomLineDiv = null;
        this.leftLineDiv   = null;
        this.rightLineDiv  = null;

        ////////////////////////////////////////////////////////////////////////

        /* WaGridOption */
        this.options = {}

        /* toolbar, filter, sort, group panel optons */
        this.options.showToolbarPanel = false;
        this.options.showFilterPanel = false;
        this.options.showSortPanel = false;
        this.options.showGroupPanel = false;

        /* Columns Options */
        this.options.sortable = true;
        this.options.resizable = true;
        this.options.movable = true;
        this.options.autoResizable = true;
        this.options.autoWidth = false;

        // Rows Options
        this.options.selectMode = 'cells';	//@value : cell, cells(default) // row, rows : @deprecated
        this.options.addRow = false; 	//== row option
        this.options.delRow = false;
        this.options.insertRow = false;
        this.options.updateRow = false;
        this.options.deleteRow = false;
        this.options.zeroChar = '-';
        this.options.useToolbar = true;
        this.options.imageRoot = 'https://cdn.jsdelivr.net/npm/wagrid@0.2.39/dist/userImg/',

        this.options.treeItemName = null;
        this.options.treeParentName = null;
        this.options.treeRootValue = null;

        this.options.pageRowCount = 10;
        this.options.pageRowCountList = [10, 20, 30, 50, 100];

        this.options.trueValue = 'Y';
        this.options.falseValue = 'N';
        this.options.elseValue = 'N';
    }

    /**
     * get configs value
     */

    getConfigCulture (label: string) { return this.null(this.gridConfig['culture'][label])  ? 'No Label' : this.gridConfig['culture'][label]; }

    getConfigCalendar(label: string) { return this.null(this.gridConfig['calendar'][label]) ? 'No Label' : this.gridConfig['calendar'][label]; }

    getConfigFont    (label: string) { return this.null(this.gridConfig['font'][label])     ? 'No Label' : this.gridConfig['font'][label]; }

    getConfigLabel   (label: string) { return this.null(this.gridConfig['labels'][label])   ? 'No Label' : this.gridConfig['labels'][label]; }

    /**
     *  WaGridCore Config
     */

    setGridConfig(tbsGridConfig: any) { this.gridConfig = tbsGridConfig; }

    getUserImageRoot(columnName: string) {
        let result = this.options.imageRoot;
        if (this.notNull(this.renderer) && this.notNull(this.renderer[columnName])) {
            const renderer = this.renderer[columnName];
            if (renderer.imageRoot) result = renderer.imageRoot;
        }
        return result;
    }

    /**
     *  Group Functions
     */

    showGroupPanel() { this.classGroup.showGroupPanel(); }

    hideGroupPanel() { this.classGroup.hideGroupPanel(); }

    setGroupColumns(groupColumns: any[]){
        this.group_column_table.remove();
        groupColumns.map(column => this.group_column_table.insert(this.copyJson(column)))
    }

    setSortColumns(sortColumns: any[]){
        this.sort_column_table.remove();
        sortColumns.map(column => this.sort_column_table.insert(this.copyJson(column)))
    }

    /**
     * Tree Functions
     */

    //setTreeOption(optionName, optionValue) { this.classTree.setTreeOption(optionName, optionValue); }

    setTreeSortColumn(sortColumn: any) { this.classTree.setTreeSortColumns(sortColumn); }

    /**
     *  Panel10 Functions
     */

    showToolbarPanel() { this.classPanel10.showToolbarPanel(); }

    hideToolbarPanel() { this.classPanel10.hideToolbarPanel(); }

    showToolbarButtons(buttonType: string) { this.classPanel10.showToolbarButtons(buttonType); }

    hideToolbarButtons(buttonType: string) { this.classPanel10.hideToolbarButtons(buttonType); }

    showFilterPanel() { this.classFilter.showFilterPanel(); }

    hideFilterPanel() { this.classFilter.hideFilterPanel(); }

    showSortPanel() { this.classSort.showSortPanel(); }

    hideSortPanel() { this.classSort.hideSortPanel(); }

    /**
     * Options
     */

    createOption(options: any) { this.setOptions(options); }

    setOption(optionName: string, optionValue: any) { this.options[optionName] = optionValue; }

    setOptions(options: any) { for (let key in options) this.setOption(key, options[key]); }
}

applyMixins(WaGridCore,
    [WaGridBaseMain
        , WaGridBaseIs
        , WaGridBaseEvent
        , WaGridBaseUserEvent
        , WaGridBaseLine
        , WaGridBaseData
        , WaGridBaseColumns
        , WaGridBaseRows]);
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    for (const baseCtor of baseCtors) {
        for (const name of Object.getOwnPropertyNames(baseCtor.prototype)) {
            if (name === 'constructor') continue; // ✅ 생성자 건너뛰기
            const desc = Object.getOwnPropertyDescriptor(baseCtor.prototype, name);
            if (desc) {
                Object.defineProperty(derivedCtor.prototype, name, desc);
            }
        }
    }
}
// function applyMixins(derivedCtor: any, constructors: any[]) {
//     constructors.forEach((baseCtor) => {
//         Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
//             Object.defineProperty(
//                 derivedCtor.prototype,
//                 name,
//                 Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
//                 Object.create(null)
//             );
//         });
//     });
// }

export { WaGridCore as default };