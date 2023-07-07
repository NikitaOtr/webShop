import { IFilter } from './../types/filterTypes';

export const createStringForSearchParams = (filter: IFilter) => {
    const array = filter.options.reduce((res, option) => {
        filter.values[option] && res.push(option);
        return res;
    }, [] as Array<String>);
    return array.join(',');
};