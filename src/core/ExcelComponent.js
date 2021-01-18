import {DOMListener} from './DOMListener';

export class ExelComponent extends DOMListener {

    constructor($root, options = {}){
        super($root, options.listeners);
        this.name = options.name || '';
    }

    toHTML(){
        return '';
    }

    init(){
        this.initDOMListeners();
    }

    removeListeners(){
        this.removeDOMListeners();
    }
}