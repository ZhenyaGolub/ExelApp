import { defaultStyles } from "../../constants";
import { parse } from "../../core/parse";
import { toInlineStyles } from "../../core/utils";

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 30;

function createCell(rowIndex, state) {
    return function (_, col) {
        const id = `${rowIndex}:${col}`;
        const width = getWidth(state.colState, col);
        const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]});
        return (
            `<div class="cell" contenteditable 
            data-col="${col}" 
            data-id="${id}" 
            data-type="cell"
            data-value="${state.cellState[id] || ''}"
             style="${styles};width:${width}">${parse(state.cellState[id]) || ''}</div>`
        )
    }
}

function createCol(letter, index, width) {
    return (
        `<div class="column" data-type="resizable" data-col="${index}" style="width:${width}">
            ${letter}
            <div class="col-resize" data-resize="col"></div>
        </div>`
    );
}

function createRow(index, content, state) {
    const resizer = index ? `<div class="row-resize" data-resize="row"></div>` : '';
    return (
        `<div class="row" data-type="resizable" ${index ? `data-row=${index}` : ''} style="height:${getHeight(state, index)}">
            <div class="row__info">
            ${index ? index : ''}
            ${resizer}
            </div>
            <div class="row__data">${content}</div>
        </div>`
    );
}

function getWidth(state, index){
    if(state === undefined){
        return DEFAULT_WIDTH + 'px';
    } else {
        return state[index] + 'px';
    }
}

function getHeight(state, row){
    if(state === undefined){
        return DEFAULT_HEIGHT + 'px';
    } else {
        return state[row] + 'px';
    }
}

function getText(row, col, state){
    const id = `${row}:${col}`;
    if(state[id] === undefined){
        return '';
    } else {
        return state[id];
    }
}


export function createTable(rowsCount = 15, state) {
    const colsCount = CODES.Z - CODES.A + 1;

    const rows = [];

    const cols = new Array(colsCount).fill('').map((el, index) => { return String.fromCharCode(CODES.A + index) })
        .map((el, index) => {
            const width = getWidth(state.colState, index)
            return createCol(el, index, width)}).join('')



    rows.push(createRow(null, cols));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount).fill('').map(createCell(row, state)).join('');
        rows.push(createRow(row + 1, cells, state.rowState));
    }

    return rows.join('');

}