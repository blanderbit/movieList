import {retry} from "rxjs/operators";

export abstract class AppComponentHelper<T> {
    PIPE(...items: any[]): any {
        let state:any[] = []
        if(Array.isArray(items)){
            for(let item of items){
                state = typeof item === 'function' ? item(state) : item;
            }
        }
        return state;
    }

    CONCAT_ALL (data) {
        return Array.isArray(data) ? data.reduce( (flat, toFlatten) => {
            return flat.concat(Array.isArray(toFlatten) ? this.CONCAT_ALL(toFlatten) : toFlatten);
        }, []) :[]
    };

}
