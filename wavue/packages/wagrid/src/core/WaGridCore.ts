import {WaScrollBase} from "./ScrollBase";
import {WaScroll} from "./Scroll";
import {WaHeader} from "@/core/header/Header";
import {WaColumnCore} from "@/core/columns/ColumnCore";
import {WaControl} from "./Control";
import {WaRange} from "./Range";
import {WaRangePanel} from "./RangePanel";
import {WaFilter} from "./Filter";
import {WaGridGroup} from "./Group";
import {WaPage} from "@/core/page/Page";
import {WaSort} from "./Sort";
import {WaTree} from "./Tree";
import {WaPanelBase} from "@/core/panels/PanelBase";
import {WaPanel10} from "@/core/panels/Panel10";
import {WaPanel20} from "@/core/panels/Panel20";
import {WaPanel30} from "@/core/panels/Panel30";
import {WaPanel40} from "@/core/panels/Panel40";
import {WaPanel50} from "@/core/panels/Panel50";
import {WaPanel70} from "@/core/panels/Panel70";
import {WaPanel80} from "@/core/panels/Panel80";
import {WaPanel90} from "@/core/panels/Panel90";
import {WaPanel99 } from "@/core/panels/Panel99";
import {WaTop} from "@/core/summary/Top";
import {WaFooter} from "@/core/summary/Footer";
import {WaDate} from "@/core/layer/Date";
import {WaCombo} from "@/core/layer/Combo";
import {WaGridRow} from "@/core/Row";
import {WaCell} from "@/core/Cell";
import {WaBase} from "@/core/base/Base";
import {WaBaseIs} from "@/core/base/BaseIs";
import {WaBaseEvent} from "@/core/base/BaseEvent";
import {WaBaseUserEvent} from "@/core/base/BaseUserEvent";
import {WaBaseLine} from "@/core/base/BaseLine";
import {WaBaseColumns} from "@/core/base/BaseColumns";
import {WaBaseRows} from "@/core/base/BaseRows";
import {WaBaseData} from "@/core/base/BaseData";
import {WaBaseMain} from "@/core/base/BaseMain";
import {WaGridOption} from "@/core/Grid.types"
import {WaPagination} from "@/core/page/Pagination";
import {WaGridBase} from "@/core/GridBase";
/**
 *
 * Class Mixins
 *
 */

export interface WaGridCore
    extends WaBaseMain
        , WaBaseIs
        , WaBaseEvent
        , WaBaseUserEvent
        , WaBaseLine
        , WaBaseData
        , WaBaseColumns
        , WaBaseRows {}

export class WaGridCore extends WaGridBase {

    /**
     * Class
     */

    classScroll: WaScrollBase;
    verticalScroll: WaScroll;
    horizontalScroll: WaScroll;

    classHeader: WaHeader;
    classColumn: WaColumnCore;
    classControl: WaControl;
    classRange: WaRange;
    classRange40: WaRangePanel;
    classRange50: WaRangePanel;
    classFilter: WaFilter;
    classGroup: WaGridGroup;
    classSort: WaSort
    classTree: WaTree;

    waPanelBase: WaPanelBase;
    waPanel10: WaPanel10;
    waPanel20: WaPanel20;
    waPanel30: WaPanel30;
    waPanel40: WaPanel40;
    waPanel50: WaPanel50;
    waPanel70: WaPanel70;
    waPanel80: WaPanel80;
    waPanel90: WaPanel90;
    waPanel99: WaPanel99;
    classPage: WaPage;
    classPagination: WaPagination;

    classTop: WaTop;
    classFooter: WaFooter;

    waDate: WaDate;
    waCombo: WaCombo;

    classRow: WaGridRow;
    classCell: WaCell;

    topLineDiv    : any;
    bottomLineDiv : any;
    leftLineDiv   : any;
    rightLineDiv  : any;

    options: WaGridOption;

    constructor(gridId: string, gridConfigs: object) {
        super(gridId, gridConfigs);

        this.classScroll    = new WaScrollBase(this);
        this.verticalScroll = new WaScroll(this, 'verticalScroll');
        this.horizontalScroll = new WaScroll(this, 'horizontalScroll');

        this.classHeader    = new WaHeader(this);
        this.classColumn    = new WaColumnCore(this);
        this.classControl   = new WaControl(this); 
        this.classRange     = new WaRange(this);
        this.classRange40   = new WaRangePanel(this, 'panel40');
        this.classRange50   = new WaRangePanel(this, 'panel50');
        this.classFilter    = new WaFilter(this);
        this.classGroup     = new WaGridGroup(this);
        this.classPage      = new WaPage(this);
        this.classSort      = new WaSort(this);
        this.classTree      = new WaTree(this);

        this.waPanelBase = new WaPanelBase(this);
        this.waPanel10 = new WaPanel10(this);
        this.waPanel20 = new WaPanel20(this);
        this.waPanel30 = new WaPanel30(this);
        this.waPanel40 = new WaPanel40(this);
        this.waPanel50 = new WaPanel50(this);
        this.waPanel70 = new WaPanel70(this);
        this.waPanel80 = new WaPanel80(this);
        this.waPanel90 = new WaPanel90(this);
        this.waPanel99 = new WaPanel99(this);

        this.classPagination = new WaPagination(this);

        this.classTop    = new WaTop(this);
        this.classFooter = new WaFooter(this);

        this.waDate;
        this.waCombo;

        this.classRow = new WaGridRow(this);
        this.classCell = new WaCell(this, null);

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

    showToolbarPanel() { this.waPanel10.showToolbarPanel(); }

    hideToolbarPanel() { this.waPanel10.hideToolbarPanel(); }

    showToolbarButtons(buttonType: string) { this.waPanel10.showToolbarButtons(buttonType); }

    hideToolbarButtons(buttonType: string) { this.waPanel10.hideToolbarButtons(buttonType); }

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
    [WaBaseMain
        , WaBaseIs
        , WaBaseEvent
        , WaBaseUserEvent
        , WaBaseLine
        , WaBaseData
        , WaBaseColumns
        , WaBaseRows]);
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