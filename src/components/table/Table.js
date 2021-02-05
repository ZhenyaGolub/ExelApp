import { ExelComponent } from "../../core/ExcelComponent";
import {createTable} from './table.template';
import {$} from '../../core/dom';
import {resizing} from './table.resizing';
import { DOMListener } from "../../core/DOMListener";
import { shouldResize, isCell, groupAllocation, nextSelector } from "./table.functions";
import { TableSelection } from "./TableSelection";
import {matrix} from '../../core/utils';

export class Table extends ExelComponent{
    static className = 'excel__table';
    
    constructor($root, options){
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    toHTML(){
        return createTable(18);
    }

    prepare(){
        this.selection = new TableSelection(this.$root);
    }

    init(){
        super.init();
        const $cell = this.$root.find('[data-id="0:0"]');
        this.selection.select($cell);
        this.$emit('table:select', $cell);
        this.$on('formula:input', (text) => this.selection.current.text(text));
        this.$on('formula:keydown', () => this.selection.current.focus());
    }

    onMousedown(event){
        if(shouldResize(event)){
            resizing(event, this.$root);
        } else if(isCell(event)){
            const $target = $(event.target);
            if(groupAllocation(event)){
                const target = $target.id(true);
                const current = this.selection.current.id(true);

                const $cells = matrix(current, target).map((id) => this.$root.find(`[data-id="${id}"]`));;
                
                this.selection.selectGroup($cells);
            } else {
                this.$emit('table:select', $target);
                this.selection.select($target);
            }
        }
    }

    onKeydown(event){
        const keys = ['Tab', 'Enter', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
        if(keys.includes(event.key) && !event.shiftKey){
            event.preventDefault();
            const id = this.selection.current.id(true);
            const $next = this.$root.find(nextSelector(event.key, id));
            this.selection.select($next);
            this.$emit('table:select', $next);
        }
    }

    onInput(event){
        this.$emit('table:input', $(event.target));
    }
}