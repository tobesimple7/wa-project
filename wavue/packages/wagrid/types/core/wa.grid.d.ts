import { WaGridScrollBase } from './wa.grid.scroll.base';
import { WaGridScroll } from './wa.grid.scroll';
import { WaGridHeaders } from './columns/wa.grid.headers';
import { WaGridColumns } from './columns/wa.grid.columns';
import { WaGridControl } from './wa.grid.control';
import { WaGridRange } from './wa.grid.range';
import { WaGridRangePanel } from './wa.grid.range.panel';
import { WaGridFilter } from './wa.grid.filter';
import { WaGridGroup } from './wa.grid.group';
import { WaGridPage } from './page/wa.grid.page';
import { WaGridSort } from './wa.grid.sort';
import { WaGridTree } from './wa.grid.tree';
import { WaGridPanelBase } from './panels/wa.grid.panel.base';
import { WaGridPanel10 } from './panels/wa.grid.panel10';
import { WaGridPanel20 } from './panels/panel20/wa.grid.panel20';
import { WaGridPanel30 } from './panels/wa.grid.panel30';
import { WaGridPanel40 } from './panels/wa.grid.panel40';
import { WaGridPanel50 } from './panels/wa.grid.panel50';
import { WaGridPanel70 } from './panels/wa.grid.panel70';
import { WaGridPanel80 } from './panels/wa.grid.panel80';
import { WaGridPanel90 } from './panels/wa.grid.panel90';
import { WaGridPanel99 } from './panels/wa.grid.panel99';
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
export { WaGrid as default };
