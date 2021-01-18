import { ExelComponent } from "../../core/ExcelComponent";

export class Formula extends ExelComponent{
    static className = 'excel__formula';

    constructor($root){
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click']
        });
    }

    toHTML(){
        return (
            `<div class="icon">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>`
        );
    }

    onInput(event){
        console.log(event.target.textContent.trim());
    }

    onClick(event){
        console.log(event.target);
    }
}