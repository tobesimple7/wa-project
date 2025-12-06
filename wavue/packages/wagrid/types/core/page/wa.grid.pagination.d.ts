import { WaGrid } from '../wa.grid';
export declare class WaGridPagination {
    grid: WaGrid;
    selector: string;
    pageIndex: number;
    pageCount: number;
    pageTotalRowCount: number;
    constructor(grid: WaGrid);
    setTotalRowCount(totalRowCount: number): void;
    setPaginationData(data: any[]): void;
}
