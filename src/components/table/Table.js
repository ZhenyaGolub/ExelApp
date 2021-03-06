import { ExelComponent } from "../../core/ExcelComponent";
import {createTable} from './table.template';
import {$} from '../../core/dom';
import {resizing} from './table.resizing';
import { DOMListener } from "../../core/DOMListener";
import { shouldResize, isCell, groupAllocation, nextSelector } from "./table.functions";
import { TableSelection } from "./TableSelection";
import {matrix} from '../../core/utils';
import { applyStyle, changeCurrentStyles, changeText, tableResize } from "../../redux/actions";
import { defaultStyles } from "../../constants";
import { parse } from "../../core/parse";

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
        return createTable(18, this.store.getState());
    }

    prepare(){
        this.selection = new TableSelection(this.$root);
    }

    init(){
        super.init();
        const $cell = this.$root.find('[data-id="0:0"]');
        this.selection.select($cell);
        this.$emit('table:select', $cell);
        this.$on('formula:input', (text) => {
            this.selection.current.attr('data-value', text).text(parse(text));
            this.updateTextInStore(text);
        });
        this.$on('formula:keydown', () => this.selection.current.focus());
        this.$on('toolbar:applyStyle', styles => {
            this.selection.applyStyle(styles);
            this.$dispatch(applyStyle({
                value: styles,
                ids: this.selection.selectedIds
            }))
        });
    }

    async resizeTable(event){
        try{
            const data = await resizing(event, this.$root);
            this.$dispatch(tableResize(data));
        } catch(e) {
            console.warn('Resize error', e.message);
        }
        
    }

    onMousedown(event){
        if(shouldResize(event)){
            this.resizeTable(event);
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
                const styles = $target.getStyles(Object.keys(defaultStyles));
                this.$dispatch(changeCurrentStyles(styles));
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

    updateTextInStore(value){
        this.$dispatch(changeText({
            id: this.selection.current.id(),
            value
        }));
    }

    onInput(event){
        this.updateTextInStore($(event.target).text());
    }
}