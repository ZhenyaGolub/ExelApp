const CODES = {
    A: 65,
    Z: 90
}

function createCell(rowIndex) {
    return function (_, col) {
        return (
            `<div class="cell" contenteditable data-col="${col}" data-id="${rowIndex}:${col}" data-type="cell"></div>`
        )
    }
}

function createCol(letter, index) {
    return (
        `<div class="column" data-type="resizable" data-col="${index}">
            ${letter}
            <div class="col-resize" data-resize="col"></div>
        </div>`
    );
}

function createRow(index, content) {
    const resizer = index ? `<div class="row-resize" data-resize="row"></div>` : '';
    return (
        `<div class="row" data-type="resizable">
            <div class="row__info">
            ${index ? index : ''}
            ${resizer}
            </div>
            <div class="row__data">${content}</div>
        </div>`
    );
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;

    const rows = [];

    const cols = new Array(colsCount).fill('').map((el, index) => { return String.fromCharCode(CODES.A + index) })
        .map((el, index) => createCol(el, index)).join('')



    rows.push(createRow(null, cols));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount).fill('').map(createCell(row)).join('');
        rows.push(createRow(row + 1, cells));
    }

    return rows.join('');

}