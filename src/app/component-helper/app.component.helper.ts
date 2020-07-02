import {BehaviorSubject} from "rxjs";
import {Helper} from "./helper";



export abstract class AppComponentHelper<T> extends Helper<T> {

    abstract dataSource: BehaviorSubject<any>;

    /**
     * implementation expected in child class
     */

    getDataSource(name: string): Set<T> {
        return new Set(
            super.getDataSourceArray(this.dataSource.value, name)
        );
    }

    /**
     *  getDataSource()
     *
     * call getDataSourceArray(), please check  helper.ts
     */
}
