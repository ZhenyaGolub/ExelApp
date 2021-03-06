export const createStore = (rootReducer, initialState = {}) => {
    let state = rootReducer({...initialState}, {type: 'INIT'});
    let listeners = [];

    return {
        subscribe(fn){
            listeners.push(fn);
            return {
                unsubscribe(){
                    listeners = listeners.filter(listener => listener !== fn);
                }
            }
        },
        dispatch(action){
            state = rootReducer(state, action);
            listeners.forEach(listener => listener(state));
        },
        getState(){
            return JSON.parse(JSON.stringify(state));
        }
    }
}