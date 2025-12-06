import {WaBase } from "../wa.base";
import {WaGridCore} from "@/core/wa.grid.core"

export class WaGridPanelBase  extends WaBase {
    grid: WaGridCore;
    selector: string;
    panelName: string;
    panelName1: string;
    panelName2: string;
    panelName0: string;

    constructor(grid: WaGridCore) {
        super();
        this.grid = grid;
        this.selector = '#' + grid.gridId;
        this.panelName  = null;
        this.panelName1 = null;
        this.panelName2 = null;
        this.panelName0 = null;
    }

    /**
     *  Panel Interface
     */
    createHtml(parentElement)  {}

    createEtcHtml(parentElement: any)  {
        let s = '';
        //content vertical scroll
        s += '<div class="wa-grid-vertical-scroll" style="display:none;">';
            s += '<div class="wa-grid-vertical-scroll-wrap">';
                s += '<div class="wa-grid-vertical-scroll-bar"></div>';
            s += '</div>';
            s += '<div class="wa-grid-vertical-scroll-up"><div>▲</div></div>';
            s += '<div class="wa-grid-vertical-scroll-down"><div>▼</div></div>';
        s += '</div>';
        //content horizontal scroll
        s += '<div class="wa-grid-horizontal-scroll" style="display:none;">';
            s += '<div class="wa-grid-horizontal-scroll-wrap">';
                s += '<div class="wa-grid-horizontal-scroll-bar"></div>';
            s += '</div>';
            s += '<div class="wa-grid-horizontal-scroll-left"><div>◀</div></div>';
            s += '<div class="wa-grid-horizontal-scroll-right"><div>▶</div></div>';
        s += '</div>';
        //frozen vertical scroll
        // s += '<div class="wa-grid-vertical-scroll60" style="display:none;">';
        // s += '<div class="wa-grid-vertical-scroll60-wrap">';
        // s += '<div class="wa-grid-vertical-scroll6-bar"></div>';
        // s += '</div>';
        // s += '<div class="wa-grid-vertical-scroll60-up">▲</div>';
        // s += '<div class="wa-grid-vertical-scroll60-down">▼</div>';
        // s += '</div>';
        //frozen horizontal scroll
        // s += '<div class="wa-grid-horizontal-scroll32" style="display:none;">';
        // s += '<div class="wa-grid-horizontal-scroll32-wrap">';
        // s += '<div class="wa-grid-horizontal-scroll2-bar"></div>';
        // s += '</div>';
        // s += '<div class="wa-grid-horizontal-scroll32-left"><div>◀</div></div>';
        // s += '<div class="wa-grid-horizontal-scroll32-right"><div>▶</div></div>';
        // s += '</div>';
        /* ETC */
        s += '<div class="wa-grid-scroll-box" style="display:none;"></div>';
        s += '<div class="wa-grid-top-line" style="left:70000px;"></div>';
        s += '<div class="wa-grid-bottom-line"	style="left:70000px;"></div>';
        s += '<div class="wa-grid-left-line" style="left:70000px;"></div>';
        s += '<div class="wa-grid-right-line" style="left:70000px;"></div>';
        s += '<div class="wa-grid-input-layer-panel" style="left:70000px;"></div>';  // confuse
        s += '<div class="wa-grid-canvas"></div>';
        s += '<div class="wa-grid-input-panel">'; // confuse
        s += '<input type="text" class="wa-grid-input"  data-type="" data-click=""/>';
        //s += '<img class="wa-grid-input-panel-icon" data-type="" data-click="" />';
        s += '<div class="wa-grid-input-panel-icon" data-type="" data-click=""><span></span></div>';
        s += '</div>';
        s += '<input type="text" class="wa-grid-input-code" data-type="" data-click="" style="left:70000px;"/>';

        parentElement.insertAdjacentHTML('beforeend', s);
        parentElement.querySelector(' .wa-grid-canvas').appendChild(document.createElement('canvas'));
    }
}


