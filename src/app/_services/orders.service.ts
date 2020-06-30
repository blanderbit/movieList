import { Injectable } from "@angular/core";
import { MovieModel } from "../models/main.models";
import { ASC, DESC } from "../consts/const";

@Injectable()
export class OrdersService {
    search(array: MovieModel[], text:string = '', byOneField:string = ''): MovieModel[] {
        if(!text) {
            return array;
        }

        if(byOneField) {
            return array.filter((i: MovieModel) => {
                return i[byOneField] && i[byOneField].includes && i[byOneField].includes(text);
            });
        }

        return array.filter((i: MovieModel): boolean =>{
            return !!Object.values(i as any)
                .find((i:any) => i.includes && i.includes(text));
        })
    }

    isDate = (d: number | string): boolean => new Date(parseInt(d as string)) as unknown === 'Invalid Date';

    orderByFunction = (
        array: MovieModel[],
        field: string,
        action: string
    ): MovieModel[] => {
        return array.sort((a: MovieModel, b: MovieModel): number | undefined => {
            const aVariable = a[field]
            const bVariable = b[field];
            switch (action) {
                case ASC: return this.forAsc(field, aVariable, bVariable);
                case DESC: return this.forDesc(field, aVariable, bVariable);
            }
        })
    }

    forAsc(field, aVariable, bVariable){
        if(field === 'date'){
            return Number(aVariable) - Number(bVariable);
        } else {
            return !this.isDate(aVariable) && aVariable.localeCompare && aVariable.localeCompare(bVariable);
        }
    }

    forDesc(field, aVariable, bVariable){
        if(field === 'date'){
            return Number(bVariable) - Number(aVariable);
        } else {
            return !this.isDate(bVariable) && bVariable.localeCompare && bVariable.localeCompare(aVariable);
        }
    }
}
