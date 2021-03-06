export function capitalize(string){
    if(typeof string !== 'string'){
        return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end){
    if(start > end){
        [end, start] = [start, end];
    }
    return new Array(end - start + 1).fill('').map((_, index) => start + index);
}

export function matrix(current, target){
    const cols = range(current.col, target.col);
    const rows = range(current.row, target.row);
    return cols.reduce((acc, col) => {
        rows.forEach((row) =>{
            acc.push(`${row}:${col}`)
        });
        return acc;
    }, []);
}

export function storage(key, data = null){
    if(!data){
        return JSON.parse(localStorage.getItem(key));
    }
    localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(previousState, currentState){
    if(typeof previousState === 'object' && typeof currentState === 'object'){
        return JSON.stringify(previousState) === JSON.stringify(currentState);
    };
    return previousState === currentState;
}

export function camelToDashCase(str){
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}){
    return Object.keys(styles).map(key => {
        return `${camelToDashCase(key)}:${styles[key]}`
    }).join(';');
}

export function debounce(fn, wait){
    let timeout;
    return function(...args){
        const later = () => {
            clearTimeout(timeout);
            fn.apply(this, args);
        }
        clearTimeout(later)
        timeout = setTimeout(later, wait);
    }
}