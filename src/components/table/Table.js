import { ExelComponent } from "../../core/ExcelComponent";
import {createTable} from './table.template';
import {$} from '../../core/dom';
import {resizing} from './table.resizing';
import { DOMListener } from "../../core/DOMListener";
import { shouldResize } from "./table.functions";

export class Table extends ExelComponent{
    static className = 'excel__table';
    
    constructor($root){
        super($root, {
            listeners: ['mousedown']
        });
    }

    toHTML(){
        return createTable(18);
    }

    onMousedown(event){
        if(shouldResize()){
            resizing(event, this.$root);
        }
        
    }
}