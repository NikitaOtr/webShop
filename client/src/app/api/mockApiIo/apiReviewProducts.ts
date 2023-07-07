import { apiV3 } from './api';

import { IReviewProduct } from './../../types/productTypes';
import { IDefaultObject } from './../../types/commonTypes';

export const apiReviewProducts = {
    getReviewProducts() {
        return apiV3.get<IDefaultObject<IReviewProduct>>('reviewProducts/1')
            .then(data => data.data);
    },

    setReviewProducts(objectReviewProducts: IDefaultObject<IReviewProduct>) {
        apiV3.put('reviewProducts/1', objectReviewProducts);
    },
}