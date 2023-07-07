import { IDefaultObject } from './commonTypes';

export interface IFilter {
    name: string,
    options: Array<string>,
    values: IDefaultObject<boolean>,
}

export interface ISelectData {
    name?: string,
    options: Array<string>,
    value?: string,
    values?: IDefaultObject<boolean>,
}


