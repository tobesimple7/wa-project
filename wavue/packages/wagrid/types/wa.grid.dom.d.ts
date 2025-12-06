import { WaBase } from './wa.base';
export declare class WaGridDom extends WaBase {
    static createElement(type: any): any;
    static createHtml(tag: any, tagType: any, className: any): any;
    static addElement(): void;
    static setBounding(): void;
    static setStyle(tableCell: any, param: any): void;
    static setCell(element: any, property: any, value: any): void;
    static setCellStyle(tableCell: any, property: any, value: any): void;
    static addUserClass(tableCell: any, className: any): void;
    static removeUserClass(tableCell: any): void;
    /**
     * Dom Functions
     *
     */
    static createElementCellDiv(): HTMLDivElement;
    static createElementCellText(): HTMLSpanElement;
    static createTable(): HTMLTableElement;
}
