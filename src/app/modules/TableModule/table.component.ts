import {Component, ContentChildren, EventEmitter, Input, Output, TemplateRef} from "@angular/core";
import {Observable} from "rxjs";
import {TColumnComponent} from "./components/t-column/t-column.component";
import { staticTCollDate} from "./interface-type/type";
import {ACTIVE_SIZE_DEF, WIDTH_TABLE_DEF} from "./consts/consts";
import {ChildRowTemplateInterface, TableChildConfig} from "./interface-type/interface";
import {Helper} from "../../component-helper/helper";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent extends Helper<any>{
    disableTColumn: boolean = true;
    @Input('dataSource') dataSource: Observable<unknown>;
    @Input('limit') limit: number = ACTIVE_SIZE_DEF;
    @Input('orderBy') orderBy?: object;
    @Input('childRowTemplate') childRowTemplate: ChildRowTemplateInterface[];
    @Input('infiniteScroll') infiniteScroll = false;
    @Input('infiniteScrollCount') infiniteScrollCount: number;
    @Output('onLoadInfinite') loadInfinite: EventEmitter<number> = new EventEmitter<number>();

    @Output('orderBy') order: EventEmitter<TColumnComponent> = new EventEmitter<TColumnComponent>();
    @ContentChildren( TColumnComponent) contentChild?;
    get propsTHead(): string[]{
        return this.contentChild.map((data: TableChildConfig): TableChildConfig => new TableChildConfig(data));
    }

    get propsTProp(): string[]{
        return this.getProps('cellProp');
    }

    get propsDate(): string[]{
        return this.getProps('date');
    }

    get propsTemplate(): string[]{
        return this.getProps('template');
    }

    getProps(name: string): string[]{
        return this.contentChild.map((i: TableChildConfig): staticTCollDate => i[name]);
    }

    get widthCol(): number {
        return WIDTH_TABLE_DEF / this.propsTHead.length;
    }

    /**
     *  widthCol()
     *
     *  get really width column, use length props
     */

    onLoadInfinite(count: number){
        this.loadInfinite.emit(count + 10);
    }

    /**
     *  onLoadInfinite()
     *
     *  if the scroll has reached the bottom, then we load the data
     */
}
