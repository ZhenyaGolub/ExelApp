import { $ } from "../../core/dom";
import { ExelComponent } from "../../core/ExcelComponent";
import { ActiveRoute } from "../../core/router/ActiveRoute";
import { debounce } from "../../core/utils";
import { changeTitle } from "../../redux/actions";

export class Header extends ExelComponent{
    static className = 'excel__header';

    constructor($root, options){
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        });
    }

    prepare(){
        this.onInput = debounce(this.onInput, 300);
    }

    toHTML(){
        const title = this.store.getState().title;
        return (
            `<input class="input" type="text" value="${title}">
            <div>
                <div class="button" data-type="main">
                    <span class="material-icons" data-type="main">
                        exit_to_app
                        </span>
                </div>
                <div class="button" data-type="delete">
                    <span class="material-icons" data-type="delete">
                        delete
                        </span>
                </div>
            </div>`
        );
    }

    onInput(event){
        const $target = $(event.target);
        this.$dispatch(changeTitle($target.text()));
    }

    onClick(event){
        const $target = $(event.target);
        if($target.data.type === 'main'){
            ActiveRoute.navigate('');
        } else if($target.data.type === 'delete'){
            const decision = confirm('Ты действительно хочешь удалить данную таблицу?');
            if(decision){
                localStorage.removeItem('excel:' + ActiveRoute.param);
                ActiveRoute.navigate('');
            }
        }
    }
}