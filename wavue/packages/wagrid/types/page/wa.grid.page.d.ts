import { WaGrid } from '../wa.grid';
export declare class WaGridPage {
    grid: WaGrid;
    selector: string;
    pageIndex: number;
    pageCount: number;
    pageTotalRowCount: number;
    constructor(grid: WaGrid);
    setPageData2(): void;
    setPageData(data: any[], isFirst?: boolean): void;
}
