export interface IDefaultObject<T = any> {
    [key: string]: T
}

export enum EnumOfStatus {
    Loading,
    Success,
    Error,
}