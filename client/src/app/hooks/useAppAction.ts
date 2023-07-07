import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { actionsBasketPage } from './../store/Reducers/ReducerBasketPage';
import { actionsCatalog } from './../store/Reducers/ReducerCatalogPage';
import { actionsProductPage } from './../store/Reducers/ReducerProductPage';
import { actionsUser } from './../store/Reducers/ReducerUserPage';

const allActions = {
    ...actionsProductPage,
    ...actionsBasketPage,
    ...actionsCatalog,
    ...actionsUser,
};

export const useAppActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActions, dispatch);
};