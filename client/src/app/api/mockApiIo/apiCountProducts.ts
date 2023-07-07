import { apiV1 } from './api';

import { IDefaultObject } from './../../types/commonTypes'; 

export const apiCountProducts = {
    getCountProducts() {
        return apiV1.get<IDefaultObject<number>>('countProducts/1')
            .then(data => data.data);
    },

    setCountProducts(objectCount: IDefaultObject<number>) {
        apiV1.put('countProducts/1', objectCount);
    }
};