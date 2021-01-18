import {capitalize} from './utils';

export class DOMListener {
    constructor($root, listeners = []){
        this.$root = $root;
        this.listeners = listeners;
    }

    initDOMListeners(){
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            if(!this[method]){
                throw new Error(`Method ${method} is not emplemented in ${this.name || ''} Component`);
            };
            this.$root.on(listener, this[method].bind(this));
        });
    }

    removeDOMListeners(){
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            this.$root.off(listener, this[method].bind(this));
        });
    }
}

const getMethodName = (eventName) =>{
    return 'on' + capitalize(eventName)
}