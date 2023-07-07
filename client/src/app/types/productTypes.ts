import { IDefaultObject } from './commonTypes';
import { IUser } from './userTypes';

export enum EnumOfColors {
    orange = 'orange',
    blue = 'blue',
    grey = 'grey',
    red = 'red',
    green = 'green',
    black = 'black',
}

export enum EnumOfTypes {
    mountain = 'mountain',
    doubleSuspended = 'doubleSuspended',
    electrical = 'electrical',
    kids = 'kids',
}

export enum EnumOfCompanies {
    stinger = 'stinger',
    bulls = 'bulls',
    merida = 'merida',
    trek = 'trek',
}

export interface IProduct {
    uuid: string,
    id: string,
    name: string,
    price: number,
    company: EnumOfCompanies,
    type: EnumOfTypes,
    img: string,
    foreignImg?: string,
    color: EnumOfColors,
    mayBeColors: Array<EnumOfColors>,
    imgsByColor: IDefaultObject,
    searchString: string,
    description: string,
}

export interface IProductBasket extends IProduct {
    count: number,
    totalSum: number,
}

export interface IReviewProduct {
    rating: {
        count: number,
        sumRating: number,
    }
    comments: Array<IComment>,
}

export interface IComment {
    user: IUser,
    date: string,
    rating: number,
    comment: string
}