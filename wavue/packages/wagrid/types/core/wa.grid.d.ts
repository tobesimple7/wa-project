import { WaScrollBase } from './wa.grid.scroll.base';
import { WaScroll } from './wa.grid.scroll';
import { WaGridHeaders } from './columns/wa.grid.headers';
import { WaGridColumns } from './columns/columns';
import { WaGridControl } from './wa.grid.control';
import { WaGridRange } from './wa.grid.range';
import { WaGridRangePanel } from './wa.grid.range.panel';
import { WaGridFilter } from './wa.grid.filter';
import { WaGridGroup } from './wa.grid.group';
import { WaGridPage } from './page/wa.grid.page';
import { WaGridSort } from './wa.grid.sort';
import { WaGridTree } from './wa.grid.tree';
import { WaPanelBase } from './panels/wa.grid.panel.base';
import { WaPanel10 } from './panels/wa.grid.panel10';
import { WaPanel20 } from './panels/panel20/wa.grid.panel20';
import { WaPanel30 } from './panels/wa.grid.panel30';
import { WaPanel40 } from './panels/wa.grid.panel40';
import { WaPanel50 } from './panels/wa.grid.panel50';
import { WaPanel70 } from './panels/wa.grid.panel70';
import { WaPanel80 } from './panels/wa.grid.panel80';
import { WaPanel90 } from './panels/wa.grid.panel90';
import { WaPanel99 } from './panels/wa.grid.panel99';
import { WaGridTop } from './summary/wa.grid.top';
import { WaGridFooter } from './summary/wa.grid.footer';
import { WaGridDate } from './layer/wa.grid.date';
import { WaGridCombo } from './layer/wa.grid.combo';
import { WaGridRow } from './wa.grid.row';
import { WaGridCell } from './wa.grid.cell';
import { WaGridBase } from './base/wa.grid.base';
import { WaGridBaseIs } from './base/wa.grid.base.is';
import { WaGridBaseEvent } from './base/wa.grid.base.event';
import { WaGridBaseUserEvent } from './base/wa.grid.base.user.event';
import { WaGridBaseLine } from './base/wa.grid.base.line';
import { WaGridBaseColumns } from './base/wa.grid.base.columns';
import { WaGridBaseRows } from './base/wa.grid.base.rows';
import { WaGridBaseData } from './base/wa.grid.base.data';
import { WaGridBaseMain } from './base/wa.grid.base.main';
import { WaGridOption } from './wa.grid.types';
import { WaGridPagination } from './page/wa.grid.pagination';
/**
 *
 * Class Mixins
 *
 */
export interface WaGrid extends WaGridBaseMain, WaGridBaseIs, WaGridBaseEvent, WaGridBaseUserEvent, WaGridBaseLine, WaGridBaseData, WaGridBaseColumns, WaGridBaseRows {
}
export declare class WaGrid extends WaGridBase {
    /**
     * Class
     */
    classScroll: WaScrollBase;
    verticalScroll: WaScroll;
    horizontalScroll: WaScroll;
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
export { WaGrid as default };
