import { $ } from "../core/dom";
import { Page } from "../core/Page";
import { getAllRecords } from "./dashboard.functions";

export class DashboardPage extends Page{
    getRoot(){
        const now = Date.now().toString();
        return $.create('div', 'db').html(`
        <div class="db__header">Exel Dashboard</div>
        <div class="db__new">
            <div class="db__view">
              <a href="#excel/${now}" class="db__create">
                  Новая <br/> Таблица
              </a>
            </div>
        </div>
        <div class="db__table">
          <div class="db__view">
              ${getAllRecords()}
          </div>
        </div>
        `)
    }
}