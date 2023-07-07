import { useState, useEffect, useRef } from 'react';
import s from './Alert.module.scss';

import { useAppSelector } from './../../hooks/useAppSelector';

export const Alert = () => {
    const countAddInBasket = useAppSelector(state => state.ReducerBasketPage.countAddInBasket);
    const countAddInFavorites = useAppSelector(state => state.ReducerUser.countAddInFavorites);
    const countRemoveFromFavorites = useAppSelector(state => state.ReducerUser.countRemoveFromFavorites); 
    const countCopyUrlOnProduct = useAppSelector(state => state.ReducerProductPage.countCopyUrlOnProduct);

    const refCountAddInBasket = useRef(0);
    const refCountAddInFavorites = useRef(0);
    const refCountRemoveFromFavorites = useRef(0);
    const refCountCopyUrlOnProduct = useRef(0);

    const [isText, setIsText] = useState('');

    const getText = () => {
        if (countAddInBasket !== refCountAddInBasket.current) {
            refCountAddInBasket.current = countAddInBasket;
            return 'Товар добавлен в корзину'; 
        } else if (countAddInFavorites !== refCountAddInFavorites.current) {
            refCountAddInFavorites.current = countAddInFavorites;
            return 'Товар добавлен в избранные';
        } else if (countRemoveFromFavorites !== refCountRemoveFromFavorites.current) {
            refCountRemoveFromFavorites.current = countRemoveFromFavorites;
            return 'Товар удалён из избранных';
        } else if (countCopyUrlOnProduct !== refCountCopyUrlOnProduct.current) {
            refCountCopyUrlOnProduct.current = countCopyUrlOnProduct;
            return 'Ссылка на товар скопирована';
        } else {
            return '';
        }
    };

    useEffect(() => {
        if (countAddInBasket || countAddInFavorites || countRemoveFromFavorites || countCopyUrlOnProduct) {
            setTimeout(() => setIsText(getText()), 50);
            const timeout = setTimeout(() => setIsText(''), 3050);
            return () => {
                setIsText('');
                clearTimeout(timeout);
            };
        }
    }, [countAddInBasket, countAddInFavorites, countRemoveFromFavorites, countCopyUrlOnProduct]);

    return (
        <div className={`${s.alert} ${isText ? s.active : s.inactive}`}onClick={() => setIsText('')}>{isText}</div>   
    );
};