import { apiV2 } from './api';

import { IDefaultObject } from './../../types/commonTypes'; 
import { IBasket } from './../../types/basketTypes';

export const apiBaskets = {
    getBaskets() {
        return apiV2.get<IDefaultObject<IBasket>>('baskets/1')
            .then(data => data.data);
    },

    setBaskets(objectBaskets: IDefaultObject<IBasket>) {
        apiV2.put('baskets/1', objectBaskets);
    }
};