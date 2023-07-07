import { FC, useLayoutEffect } from 'react';
import s from './CatalogPage.module.scss';

import { WarningPopup } from './../../../components/WarningPopup/WarningPopup';
import { CatalogFilter } from './CatalogFilter/CatalogFilter';
import { CatalogResult } from './CatalogResult/CatalogResult';

import { useAppSelector } from './../../../hooks/useAppSelector';
import { useAppActions } from './../../../hooks/useAppAction';
import { useNavigationType } from 'react-router-dom';

export const CatalogPage: FC = () => {
    const navigationType = useNavigationType();
    const isShowWarningCountProduct = useAppSelector(state => state.ReducerBasketPage.isShowWarningCountProduct);
    const { setIsShowWarningCountProduct } = useAppActions();

    useLayoutEffect(() => {
        navigationType === 'PUSH' && window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {isShowWarningCountProduct && 
                    <WarningPopup text='Невозможно добавить в корзину. В наличии нет необходимого количества товара.' 
                                  closePopup={() => setIsShowWarningCountProduct({isShowWarningCountProduct: false})}/>
            }
            <div className={s.catalogPage}>
                <CatalogFilter/>
                <CatalogResult/>
            </div>
        </>
    );
};
