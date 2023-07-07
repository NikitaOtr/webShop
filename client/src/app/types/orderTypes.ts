import { IProductBasket } from './productTypes';
import { EnumMethodGet } from './userTypes';

export enum EnumStatusOrder {
    inProcessing='В обработке',
    assembly= 'На этапе сборки',
    readyForDelivery='Готов к выдаче',
    completed='Завершён',
}

export interface IOrder {
    userEmail: string,
    totalSum: number,
    dateOfReceiving: string
    methodGet: EnumMethodGet,
    addressCourier: string,
    houseNumberCourier: string,
    apartmentNumberCourier: string,
    pointOfIssue: string,
    methodPayment: string,
    orderDate: number,
    discount: number,
    products: Array<IProductBasket>,
}