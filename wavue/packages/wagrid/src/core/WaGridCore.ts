import {WaScrollBase} from "./WaScrollBase";
import {WaScroll} from "./WaScroll";
import {WaHeader} from "@/core/header/WaHeader";
import {WaGridColumnCore} from "@/core/columns/WaColumnCore";
import {WaGridControl} from "./WaControl";
import {WaGridRange} from "./WaRange";
import {WaGridRangePanel} from "./WaRangePanel";
import {WaGridFilter} from "./WaFilter";
import {WaGridGroup} from "./WaGroup";
import {WaPage} from "@/core/page/WaPage";
import {WaGridSort} from "./WaSort";
import {WaGridTree} from "./WaTree";
import {WaPanelBase} from "@/core/panels/WaPanelBase";
import {WaPanel10} from "@/core/panels/WaPanel10";
import {WaPanel20} from "@/core/panels/Panel20";
import {WaPanel30} from "@/core/panels/WaPanel30";
import {WaPanel40} from "@/core/panels/WaPanel40";
import {WaPanel50} from "@/core/panels/Panel50";
import {WaPanel70} from "@/core/panels/Panel70";
import {WaPanel80} from "@/core/panels/Panel80";
import {WaPanel90} from "@/core/panels/Panel90";
import {WaPanel99 } from "@/core/panels/WaPanel99";
import {WaTop} from "@/core/summary/WaTop";
import {WaFooter} from "@/core/summary/WaFooter";
import {WaDate} from "@/core/layer/WaDate";
import {WaCombo} from "@/core/layer/WaCombo";
import {WaGridRow} from "@/core/WaRow";
import {WaGridCell} from "@/core/WaCell";
import {WaGridBase} from "@/core/base/WaBase";
import {WaGridBaseIs} from "@/core/base/WaBaseIs";
import {WaGridBaseEvent} from "@/core/base/WaBaseEvent";
import {WaGridBaseUserEvent} from "@/core/base/WaBaseUserEvent";
import {WaGridBaseLine} from "@/core/base/WaBaseLine";
import {WaGridBaseColumns} from "@/core/base/WaBaseColumns";
import {WaGridBaseRows} from "@/core/base/WaBaseRows";
import {WaGridBaseData} from "@/core/base/WaBaseData";
import {WaGridBaseMain} from "@/core/base/WaBaseMain";
import {WaGridOption} from "@/core/WaGrid.types"
import {WaPagination} from "@/core/page/WaPagination";

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

    classScroll: WaScrollBase;
    verticalScroll: WaScroll;
    horizontalScroll: WaScroll;

    classHeader: WaHeader;
    classColumn: WaGridColumnCore;
    classControl: WaGridControl;
    classRange: WaGridRange;
    classRange40: WaGridRangePanel;
    classRange50: WaGridRangePanel;
    classFilter: WaGridFilter;
    classGroup: WaGridGroup;
    classSort: WaGridSort
    classTree: WaGridTree;

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

    tbsGridDate: WaDate;
    tbsGridCombo: WaCombo;

    classRow: WaGridRow;
    classCell: WaGridCell;

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
        this.classColumn    = new WaGridColumnCore(this);
        this.classControl   = new WaGridControl(this); 
        this.classRange     = new WaGridRange(this);
        this.classRange40   = new WaGridRangePanel(this, 'panel40');
        this.classRange50   = new WaGridRangePanel(this, 'panel50');
        this.classFilter    = new WaGridFilter(this);
        this.classGroup     = new WaGridGroup(this);
        this.classPage      = new WaPage(this);
        this.classSort      = new WaGridSort(this);
        this.classTree      = new WaGridTree(this);

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