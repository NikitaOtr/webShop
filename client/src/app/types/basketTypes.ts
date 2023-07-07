import { IProductBasket } from './productTypes';
import { IDefaultObject } from './commonTypes';

export interface IBasket {
    size: number,
    totalSum: number,
    products: IDefaultObject<IProductBasket>
}