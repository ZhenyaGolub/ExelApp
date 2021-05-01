import { storage } from "../core/utils";

const getDate = (tableDate) => {
    return `${new Date(tableDate).toLocaleDateString()} ${new Date(tableDate).toLocaleTimeString()}`
}

function toHTML(key) {
    const model = storage(key);
    const id = key.split(':')[1];
    const title = model.title;

    return `
    <li class="db__record">
        <a href="#excel/${id}">${title}</a>
        <strong>${getDate(model.openingDate)}</strong>
    </li>
    `
}

const getAllKeys = () => {
    const keys = [];
    for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        if(key.includes('excel')){
            const milliseconds = Date.parse(storage(localStorage.key(i)).openingDate);
            keys.push({
                key: key,
                milliseconds: milliseconds
            })
        }
        if(!key.includes('excel')){
            continue
        }
    }
    return keys;
}

export const getAllRecords = () => {
    const keys = getAllKeys().sort((a, b) => {
        if(a.milliseconds > b.milliseconds){
            return -1;
        }
    });
    if(!keys.length){
        return `<p>Таблицы не созданы</p>`;
    }
    return `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>
        <ul class="db__list">
            ${keys.map((key) => toHTML(key.key)).join('') || ''} 
        </ul>
    `
}


