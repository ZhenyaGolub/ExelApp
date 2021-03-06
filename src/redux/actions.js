import { APPLY_STYLE, CHANGE_TEXT, CHANGE_TITLE, CURRENT_STYLES, TABLE_RESIZE } from "./types"

export const tableResize = (data) => {
    return {
        type: TABLE_RESIZE,
        payload: data
    };
}

export const changeText = (text) => {
    return {
        type: CHANGE_TEXT,
        payload: text
    };
}

export const changeCurrentStyles = (data) => {
    return {
        type: CURRENT_STYLES,
        payload: data
    }
}

export const applyStyle = (data) => {
    return {
        type: APPLY_STYLE,
        payload: data
    }
}

export const changeTitle = (title) => {
    return {
        type: CHANGE_TITLE,
        payload: title
    }
}