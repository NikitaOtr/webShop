import { apiV2 } from './api';

import { IDefaultObject } from './../../types/commonTypes';
import { IProduct } from './../../types/productTypes';

export const apiFavoritesProducts = {
    getFavoritesProducts() {
        return apiV2.get<IDefaultObject<IDefaultObject<IProduct>>>('favoritesProducts/1')
            .then(data => data.data);
    },

    setFavoritesProducts(objectFavoritesProducts: IDefaultObject<IDefaultObject<IProduct>>) {
        apiV2.put('favoritesProducts/1', objectFavoritesProducts);
    }
};