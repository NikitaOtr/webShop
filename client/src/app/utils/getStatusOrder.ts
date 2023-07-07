import { getDifferenceDateInDays } from './getDifferenceDateInDays';
import { EnumStatusOrder } from './../types/orderTypes';
import { IOrder } from './../types/orderTypes';

export const getStatusOrder = (order: IOrder) => {
    const differenceDays = getDifferenceDateInDays(order.orderDate);

    if (differenceDays < 2) {
        return EnumStatusOrder.inProcessing;
    } else if (differenceDays < 5) {
        return EnumStatusOrder.assembly;
    } else if (differenceDays < 7) {
        return EnumStatusOrder.readyForDelivery;
    } else {
        return EnumStatusOrder.completed;
    }
};
