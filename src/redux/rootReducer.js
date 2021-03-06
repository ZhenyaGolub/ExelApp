import { APPLY_STYLE, CHANGE_TEXT, CHANGE_TITLE, CURRENT_STYLES, TABLE_RESIZE } from "./types";

export const rootReducer = (state, action) => {
    let prevState;
    let key;
    let val;
    switch(action.type){
        case TABLE_RESIZE:
            key = action.payload.type === 'col' ? 'colState' : 'rowState';
            prevState = state[key] || {};
            prevState[action.payload.id] = action.payload.value;
            return {...state, [key]: prevState};
        case CHANGE_TEXT:
            prevState = state['cellState'] || {};
            prevState[action.payload.id] = action.payload.value;
            return {...state, currentText: action.payload.value, cellState: prevState};
        case CURRENT_STYLES:
            return {...state, currentStyles: action.payload};
        case APPLY_STYLE:
            key = 'stylesState';
            val = state[key] || {};
            action.payload.ids.forEach(id => {
                val[id] = {...val[id], ...action.payload.value}
            });
            return {
                ...state,
                [key]: val,
                currentStyles: {...state.currentStyles, ...action.payload.value}
            }
        case CHANGE_TITLE:
            return {...state, title: action.payload}
        default: return state;
    }
}