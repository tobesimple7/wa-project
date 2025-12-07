import {CellType, GridRenderer, OptionAlias} from "@/core/Grid.types"
import {WaColumnProperty} from "@/core/columns/ColumnEnum"
import {WaGridCore} from "@/core/WaGridCore";

export class WaBaseData {

    constructor() {
    }

    /**
     * Data Value, Text
     */

    getValue(this: WaGridCore,rowIndex: number, columnName: string, table?: any): any { return this.isNull(table, this.view_table).selectValue(rowIndex, columnName); }

    getValueByColumnIndex(this: WaGridCore,rowIndex: number, columnIndex: number, table?: any): any {
        let columnName = this.getColumnName(columnIndex, table);
        return this.getValue(rowIndex, columnName, table);
    }

    getText(this: WaGridCore,rowIndex: number, columnName: string, table?: any): any {
        const column = this.getColumn(columnName); // column_table
        let val = this.getValue(rowIndex, columnName, table);
        return this.getFormatText(column, val);
    }

    getTextByIndex(this: WaGridCore,rowIndex: number, columnIndex: number, table?: any): any {
        let columnName = this.getColumnName(columnIndex); // column_table
        return this.getText(rowIndex, columnName, table);
    }

    setValue(this: WaGridCore,rowIndex: number, columnName: string, value: any): void {
        const grid = this;

        let cellIndex = this.getColumnIndex(columnName);
        let oldValue = this.view_table.data[rowIndex][columnName];
        let mode = this.view_table.data[rowIndex][WaColumnProperty.rowMode];

        let result = this.getFormat(this.column_table.selectRowByRowIndex(cellIndex), value);
        if (mode == 'I') {
            if (oldValue != result.value) {
                grid.view_table.updateByRowIndex(rowIndex, columnName, result.value);
                grid.view_table.updateByRowIndex(rowIndex, WaColumnProperty.rowMode, 'I');

                let rowId: number = grid.view_table.selectValue(rowIndex, WaColumnProperty.rowId);

                grid.source_table.updateByRowId(rowId, columnName, result.value);
                grid.source_table.updateByRowId(rowId, WaColumnProperty.rowMode, 'I');
            }
        }
        else {
            if (oldValue != result.value) {
                grid.view_table.updateByRowIndex(rowIndex, columnName, result.value);
                grid.view_table.updateByRowIndex(rowIndex, WaColumnProperty.rowMode, 'U');

                let rowId: number = grid.view_table.selectValue(rowIndex, WaColumnProperty.rowId);

                grid.source_table.updateByRowId(rowId, columnName, result.value);
                grid.source_table.updateByRowId(rowId, WaColumnProperty.rowMode, 'U');
            }
        }
    }

    setValueByColumnIndex(this: WaGridCore,rowIndex: number, cellIndex: number, value: any): void {
        let columnName = this.getColumnName(cellIndex);
        this.setValue(rowIndex, columnName, value);
    }

    /** info_column_table */

    getInfoValue(this: WaGridCore, columnName: string, property: string): any {
        const dataRow = this.info_column_table.selectRow(WaColumnProperty.name, columnName);
        return dataRow[property];
    }

    setInfoValue(this: WaGridCore, columName: string, property: string, value: any): void { this.info_column_table.update(columName, property, value); }

    /**
     * Check Box Options
     */

    getTrueValue(this: WaGridCore, columnName: string): any { return this.getBooleanValue(columnName, 'trueValue' ); }

    getFalseValue(this: WaGridCore, columnName: string): any { return this.getBooleanValue(columnName, 'falseValue'); }

    getElseValue(this: WaGridCore, columnName: string): any { return this.getBooleanValue(columnName, 'elseValue'); }

    getBooleanValue(this: WaGridCore, columnName: string, valueType: string) {
        let result = this.options[valueType];
        if (this.notNull(this.renderer) && this.notNull(this.renderer[columnName])) {
            const renderer: GridRenderer = this.renderer[columnName];
            if (renderer[valueType]) result = renderer[valueType];
        }
        return result;
    }

    reverseBoolean(this: WaGridCore, columnName: string, value: any) {
        if (value == this.getTrueValue(columnName)) return this.getFalseValue(columnName);
        else return this.getTrueValue(columnName);
    }

    /**
     * Format Functions
     *
     */

    getFormatValue(this: WaGridCore, column: any, value: any){
        let result: any = this.getFormat(column, value);
        return result.value;
    }

    getFormatText(this: WaGridCore, column: any, value: any){
        let result: any = this.getFormat(column, value);
        return result.text;
    }

    getFormat(this: WaGridCore, column: any, value: any) {
        const grid = this;

        let result: any = {};
        result.value = value;
        result.text = value;

        let colType = column[WaColumnProperty.type];
        let format  = column[WaColumnProperty.format];

        if (colType == CellType.number) {
            result = this.getFormatNumber(column, value);
            if (column[WaColumnProperty.visible] == false
                || (column[WaColumnProperty.showZero] == false && Number(result.value) == 0 )) {
                result.text = this.options[OptionAlias.zeroChar];
            }
            return result;
        }
        else {
            if (this.null(value)) {
                result.value = '';
                result.text = '';
                return result;
            }
            if (colType == CellType.combo) {
                const data = grid.renderer[column[WaColumnProperty.name]].data;

                let key = data.valueName;
                let val = data.textName;

                for (let i = 0, len = data.rows.length; i < len; i++) {
                    const row = data.rows[i];
                    if (row[key] == value) {
                        result.text = row[val];
                        break;
                    }
                }
                return result;
            }
            else if (colType == 'date') {
                return this.getFormatDate(column, value);
            }
            else {
                result.text = value;
                return result;
            }
        }
    }

    getFormatNumber(this: WaGridCore, column: any, value: any) {
        const grid = this;
        const formatWon = function (n) {
            //return val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); safari error
            //return val.toString().replace(/\B(?=(?=\d*\.)(\d{3})+(?!\d))/g, ','); int type error
            let parts = n.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        };

        // result = { value: , text: }
        let result: any = {};
        if      (grid.null(value))        result.value = null;
        else if (grid.trim(value) == '')  result.value = null;
        else if (grid.substr2(value.toString(), 0, 1) == '.') result.value = '0'; //php 0.1 => .1
        else {
            if (column[WaColumnProperty.currencyChar])  value = value.toString().replace(column[WaColumnProperty.currencyChar], '');
            result.value = value.toString().replace(/,/gi, '')
        }

        if (grid.null(result.value)) {
            result.text = grid.options[OptionAlias.zeroChar];
            return result;
        }
        result.text = result.value;

        let type = column[WaColumnProperty.type];
        let scale = column[WaColumnProperty.scale];

        let arr = scale.split(',');
        let decimalPoint = (arr.length > 1) ? this.trim(arr[1]) : '0';
        if (decimalPoint == '') decimalPoint = '0';

        let roundType = column[WaColumnProperty.roundType];
        let n = (result.value == undefined || result.value == '') ? '0' : result.value.toString(); //전체값
        let dpLen = 0; //decimal length

        if (decimalPoint == '0') {
            dpLen = 0;
            if      (roundType == 'round') { // @ts-ignore
                n = parseFloat(this.round(n, dpLen));
            }
            else if (roundType == 'ceil' ) { // @ts-ignore
                n = parseFloat(this.ceil(n, dpLen));
            }
            else if (roundType == 'floor') { // @ts-ignore
                n = parseFloat(this.floor(n, dpLen));
            }
            else { // @ts-ignore
                parseFloat(this.round(n, dpLen));
            }
            result.text = column[WaColumnProperty.commaUnit] == '0' ? n : formatWon(n);
        }
        else if (decimalPoint != '0') {
            result.text = formatWon(parseFloat(n));
            if (column[WaColumnProperty.fixedScale]) {
                dpLen = parseInt(decimalPoint);
                n =   (roundType == 'ceil')  ? this.ceil(n, dpLen).toFixed(dpLen)
                    : (roundType == 'floor') ? this.floor(n, dpLen).toFixed(dpLen)
                        : this.round(n, dpLen).toFixed(dpLen);
                result.text = column[WaColumnProperty.commaUnit] == '0' ? n : formatWon(n);
            }
            else {
                dpLen = parseInt(decimalPoint);
                if (roundType == 'ceil') { // @ts-ignore
                    n = parseFloat(this.ceil(n, dpLen));
                }
                else if (roundType == 'floor') { // @ts-ignore
                    n = parseFloat(this.floor(n, dpLen))
                }
                else { // @ts-ignore
                    n = parseFloat(this.round(n, dpLen));
                }
                // n =   (roundType == 'ceil')  ? parseFloat(this.ceil(n, dpLen))
                //     : (roundType == 'floor') ? parseFloat(this.floor(n, dpLen))
                //         : parseFloat(this.round(n, dpLen));
                result.text = column[WaColumnProperty.commaUnit] == '0' ? n : formatWon(n);
            }
        }
        if (result.text == '0') {
            if (grid.options[OptionAlias.zeroChar] != '') result.text = OptionAlias.zeroChar;
        }
        let regExp = new RegExp('', 'gi');
        result.text = result.text.replaceAll(',',  column[WaColumnProperty.thousandChar]);
        result.text = result.text.replaceAll('.',  column[WaColumnProperty.decimalChar]);
        if (column[WaColumnProperty.currencyChar]) result.text = column[WaColumnProperty.currencyChar] + result.text
        return result;
    }

    getFormatDate(this: WaGridCore, column: any, value: any) {
        const grid = this;
        let result: any = {};
        value = value.replace(/\./gi, '');
        value = value.replace(/\-/gi, '');
        value = value.replace(/\//gi, '');

        result.value = this.trim(value);
        result.text = result.value;

        //date : 8 char
        if (result.value == '' || result.value.length != 8) {
            result.value = '';
            result.text = '';
            return result;
        }
        let format = column[WaColumnProperty.format];

        // date char : . - /
        let formatText = format.replace(/\./gi, '');
        formatText = formatText.replace(/\-/gi, '');
        formatText = formatText.replace(/\//gi, '');

        let dateText = result.text;
        let yyyy = '';
        let MM = '';
        let dd = '';

        if (formatText == 'yyyyMMdd') {
            yyyy = grid.substr2(result.text,0, 4);
            MM = grid.substr2(result.text,4, 2);
            dd = grid.substr2(result.text,6, 2);
        }
        else if (formatText == 'ddMMyyyy') {
            yyyy = grid.substr2(result.text, 4, 4);
            MM = grid.substr2(result.text, 2, 2);
            dd = grid.substr2(result.text, 0, 2);
        }
        else if (formatText == 'MMddyyyy') {
            yyyy = grid.substr2(result.text, 4, 4);
            MM = grid.substr2(result.text, 0, 2);
            dd = grid.substr2(result.text, 2, 2);
        }

        if (new Date(yyyy + '-' + MM + '-' + dd).toString() == "Invalid Date") {
            result.value = '';
            result.text = '';
            return result;
        }

        format = format.replace('yyyy', yyyy);
        format = format.replace('MM', MM);
        format = format.replace('dd', dd);

        result.value = format;
        result.text = format;
        return result;
    }


}