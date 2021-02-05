import { $ } from "../../core/dom";
import { ExelComponent } from "../../core/ExcelComponent";

export class Formula extends ExelComponent{
    static className = 'excel__formula';

    constructor($root, options){
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        });
    }

    toHTML(){
        return (
            `<div class="icon">fx</div>
            <div id="formula" class="input" contenteditable spellcheck="false"></div>`
        );
    }

    init(){
        super.init();

        this.$formula = this.$root.find('#formula');
        
        this.$on('table:select', $next => {
            this.$formula.text($next.text());
        });
        this.$on('table:input', $cell => {
            this.$formula.text($cell.text());
        });
    }

    onInput(event){
        this.emitter.emit('formula:input', $(event.target).text());
    }

    onKeydown(event){
        const keys = ['Enter', 'Tab'];
        if(keys.includes(event.key)){
            event.preventDefault();
            this.emitter.emit('formula:keydown');
        }
        
    }
}