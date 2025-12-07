import {WaGridCore} from "@/core/WaGridCore"

export class WaControl {
    grid: WaGridCore;
    selector: string;

    constructor(grid: WaGridCore) {
        this.grid       = grid;
        this.selector   = '#' + grid.gridId;
    }

    after_changeColumnOrder() {
        const grid = this.grid;

        grid.classColumn.createColumnTable();
        grid.classHeader.createHeaderColumns();
        grid.classHeader.createHeaderColumnTable();
        grid.updateGrid();

        grid.classRange.removeRange(0, -1);
        let _topRowIndex = grid.classRange.selectRange(0, 0, 0, 0);
        grid.waPanel30.setDataPanel(_topRowIndex);
        grid.waPanel20.setDataPanel();
        grid.waPanel40.setDataPanel();
        grid.waPanel50.setDataPanel();
        grid.waPanel70.setDataPanel();
    }

    after_addColumn() {
        const grid = this.grid;

        grid.classColumn.createColumnTable();
        grid.classHeader.createHeaderColumns();
        grid.classHeader.createHeaderColumnTable();
        grid.updateGrid();

        grid.classRange.removeRange(0, -1);
        let _topRowIndex = grid.classRange.selectRange(0, 0, 0, 0);
        grid.waPanel30.setDataPanel(_topRowIndex);
        grid.waPanel20.setDataPanel();
    }

    after_removeColumn(headerColumns, columns) {
        let selector = this.selector;
        const grid = this.grid;
        let classControl = this;


        grid.classColumn.createColumnTable();
        grid.classHeader.createHeaderColumns();
        grid.classHeader.createHeaderColumnTable();
        grid.updateGrid();

        grid.classRange.removeRange(0, -1);
        let _topRowIndex = grid.classRange.selectRange(0, 0, 0, 0);
        grid.waPanel30.setDataPanel(_topRowIndex);
        grid.waPanel20.setDataPanel();
    }

    after_showFilterPanel() {
        let selector = this.selector;
        const grid = this.grid;
        let classControl = this;

        grid.classRange.removeRange(0, -1);
        grid.classScroll.setPanelSize();
        grid.waPanel70.setDataPanel();
        grid.waPanel30.setDataPanel(0);
    }

    after_hideFilterPanel() {
        let selector = this.selector;
        const grid = this.grid;
        let classControl = this;

        grid.classRange.removeRange(0, -1);
        grid.classScroll.setPanelSize();
        grid.waPanel70.setDataPanel();
        grid.waPanel30.setDataPanel(0);
    }

    after_showSortrPanel() {
        let selector = this.selector;
        const grid = this.grid;
        let classControl = this;

        grid.classRange.removeRange(0, -1);
        grid.classScroll.setPanelSize();
        grid.waPanel30.setDataPanel(0);
    }

    after_hideSortPanel() {
        let selector = this.selector;
        const grid = this.grid;
        let classControl = this;

        grid.classRange.removeRange(0, -1);
        grid.classScroll.setPanelSize();
        grid.waPanel30.setDataPanel(0);
    }

    after_setColumnVisible() {
        let selector = this.selector;
        const grid = this.grid;
        let classControl = this;

        grid.classRange.removeRange(0, -1);
        grid.apply();
    }
}



