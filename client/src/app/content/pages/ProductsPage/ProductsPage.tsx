import { FC } from 'react';
import s from './ProductsPage.module.scss';

import { WarningPopup } from './../../../components/WarningPopup/WarningPopup';
import { LoaderCircle } from './../../../components/LoaderCircle/LoaderCircle';
import { EmptyStub } from './../../../components/EmptyStub/EmptyStub';
import { ButtonApp } from './../../../components/ButtonApp/ButtonApp';
import { Product } from './../../../components/Product/Product';
import { ErrorPage } from './../ErrorPage/ErrorPage';

import { useAppSelector } from './../../../hooks/useAppSelector';
import { useAppActions } from './../../../hooks/useAppAction';
import { useParams, useNavigate } from 'react-router-dom';

import imgCatalogEmpty from './../../../assets/staticImagesHint/catalogEmpty.avif';
import { EnumOfStatus } from './../../../types/commonTypes';

export const ProductsPage: FC = () => {
    const user = useAppSelector(state => state.ReducerUser.user);
    const statusOrders = useAppSelector(state => state.ReducerUser.statusOrders);
    const purchasedProducts = useAppSelector(state => state.ReducerUser.purchasedProducts);
    const favoritesProducts = useAppSelector(state => state.ReducerUser.favoritesProducts);
    const isShowWarningCountProduct =  useAppSelector(state => state.ReducerBasketPage.isShowWarningCountProduct);

    const { setIsShowWarningCountProduct } = useAppActions();

    const history = useParams<{status: string}>();
    const navigate = useNavigate();

    if (statusOrders !== EnumOfStatus.Success) {
        return (
            <LoaderCircle/>
        );
    }

    let res;
    let text;

    if (history.status === 'purchased') {
        res = Object.values(purchasedProducts);
        text = 'выкупленных моделей';
    } else if (history.status === 'favorites') {
        res = Object.values(favoritesProducts);;
        text = 'избранных';
    }

    return (
        <div className={s.productsPage}>
            {isShowWarningCountProduct && 
                <WarningPopup text='Невозможно добавить в корзину. В наличии нет необходимого количества товара.' 
                              closePopup={() => setIsShowWarningCountProduct({isShowWarningCountProduct: false})}/>
            }
            {user && text ? 
                <>
                    {res.length > 0 
                        ?   
                            <>
                                <ButtonApp className={s.buttonBack} onClick={() => navigate(-1)}>Назад</ButtonApp>
                                <h2 className={s.productsPage__title}>Список {text}</h2>
                                <div className={s.productsPage__products}>
                                    {res.map(product => (
                                        <Product key={product.id} product={product}/>
                                    ))}
                                </div>
                            </>
                        :
                            <EmptyStub titleText={`Список ${text} пуст`} 
                                       buttonText='Перейти в каталог'
                                       to='/catalog'
                                       srcImage={imgCatalogEmpty}/>
                    }
                </>
                : <ErrorPage/>
            }
        </div>
    );
};