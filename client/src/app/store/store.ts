import { configureStore } from '@reduxjs/toolkit';

import { ReducerBasketPage } from './Reducers/ReducerBasketPage';
import { ReducerCatalog } from './Reducers/ReducerCatalogPage';
import { ReducerMainPage } from './Reducers/ReducerMainPage';
import { ReducerProductPage } from './Reducers/ReducerProductPage';
import { ReducerUser } from './Reducers/ReducerUserPage';

export const store = configureStore({
    reducer: {
        [ReducerMainPage.name]: ReducerMainPage.reducer,
        [ReducerProductPage.name]: ReducerProductPage.reducer,
        [ReducerBasketPage.name]: ReducerBasketPage.reducer,
        [ReducerCatalog.name]: ReducerCatalog.reducer,
        [ReducerUser.name]: ReducerUser.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }),
});

export type RootStateType = ReturnType<typeof store.getState>;