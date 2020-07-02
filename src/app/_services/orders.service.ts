import {Injectable} from "@angular/core";
import {MovieModel} from "../models/main.models";
import {ASC, DESC} from "../consts/const";

@Injectable()
export class OrdersService {
    search(
        array: MovieModel[],
        text: string = '',
        byOneField: string = ''
    ): MovieModel[] {
        if (!text) {
            return array;
        }

        if (byOneField) {
            return array.filter((i: MovieModel) => {
                return i[byOneField] && i[byOneField].includes && i[byOneField].includes(text);
            });
        }

        return array.filter((i: MovieModel): boolean => {
            return !!Object.values(i as any)
                .find((item: any) => item.includes && item.includes(text));
        });
    }

    /**
     *  search()
     *
     * we check whether there are inclusions of a given word in each element of the array
     */


    isDate = (d: number | string): boolean => new Date(
        parseInt(d as string)
    ) as unknown === 'Invalid Date';


    orderByFunction = (
        array: MovieModel[],
        field: string,
        action: string
    ): MovieModel[] => {
        return array.sort((a: MovieModel, b: MovieModel): any => {
            const aVariable = a[field];
            const bVariable = b[field];
            switch (action) {
                case ASC:
                    return this.forOrder(field, aVariable, bVariable);
                case DESC:
                    return this.forOrder(field, bVariable, aVariable);
            }
        });
    };

    forOrder(
        field: string,
        aVariable: any,
        bVariable: any
    ): number | string {
        if (field === 'date') {
            return Number(aVariable) - Number(bVariable);
        } else if (field === 'season') {
            const str1 = `${aVariable}`;
            const str2 = `${bVariable}`;
            return str1.localeCompare && str2.localeCompare(str1);
        } else {
            return !this.isDate(aVariable) && aVariable.localeCompare && aVariable.localeCompare(bVariable);
        }
    }
}
