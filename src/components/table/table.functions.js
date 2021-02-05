export const shouldResize = (event) =>{
    return event.target.dataset.resize;
}

export const isCell = (event) =>{
    return event.target.dataset.type === 'cell';
}

export const groupAllocation = (event) =>{
    return event.shiftKey === true;
}

export function nextSelector(key, {col, row}){
    const MIN_VALUE = 0;
    const MAX_ROW_VALUE = 17;
    const MAX_COLUMN_VALUE = 25;

    switch(key){
        case 'Enter':
        case 'ArrowDown':
            row = row + 1 > MAX_ROW_VALUE ? MAX_ROW_VALUE : row + 1;
            break
        case 'Tab':
        case 'ArrowRight':
            col = col + 1 > MAX_COLUMN_VALUE ? MAX_COLUMN_VALUE : col + 1;
            break
        case 'ArrowLeft':
            col = col - 1 < 0 ? MIN_VALUE : col - 1;
            break
        case 'ArrowUp':
            row = row -1 < 0 ? MIN_VALUE : row - 1;
            break
    }
    return `[data-id="${row}:${col}"]`;
}