import { apiV1 } from './api';

import { IOrder } from './../../types/orderTypes';

export const apiOrder = {
    getOrders() {
        return apiV1.get<Array<IOrder>>('orders')
            .then(data => data.data);
    },

    createOrder(order: IOrder) {
        apiV1.post('orders', order).then(data => data.data);
    },
}