import { defaultStyles, defaultTitle } from "../constants";
import { storage } from "../core/utils";

const defaultState = {
    title: defaultTitle,
    rowState: {},
    colState: {},
    cellState: {},
    stylesState:{},
    currentText: '',
    currentStyles: defaultStyles
};

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState;