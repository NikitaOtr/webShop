import { FC } from 'react';
import s from './OrdersPage.module.scss';

import { LoaderCircle } from './../../../components/LoaderCircle/LoaderCircle';
import { EmptyStub } from './../../../components/EmptyStub/EmptyStub';
import { ButtonApp } from './../../../components/ButtonApp/ButtonApp';
import { Order } from './../../../components/Order/Order';
import { ErrorPage } from './../ErrorPage/ErrorPage';

import { useAppSelector } from './../../../hooks/useAppSelector';
import { useParams, useNavigate } from 'react-router-dom';

import imgCatalogEmpty from './../../../assets/staticImagesHint/catalogEmpty.avif';
import { EnumOfStatus } from './../../../types/commonTypes';

export const OrdersPage: FC = () => {
    const user = useAppSelector(state => state.ReducerUser.user);
    const statusOrders = useAppSelector(state => state.ReducerUser.statusOrders)
    const readyOrders = useAppSelector(state => state.ReducerUser.readyOrders);
    const notReadyOrders = useAppSelector(state => state.ReducerUser.notReadyOrders);

    const history = useParams<{status: string}>();
    const navigate = useNavigate();

    if (statusOrders !== EnumOfStatus.Success) {
        return (
            <LoaderCircle/>
        );
    }

    let res;
    let text;

    if (history.status === 'ready') {
        res = readyOrders;
        text = 'завершённых заказов';
    } else if (history.status === 'notReady') {
        res = notReadyOrders;
        text = 'заказов в обработке';
    }

    return (
        <div className={s.ordersPage}>
            {user && text ? 
                <>
                    {res.length > 0 
                        ?   
                            <>
                                <ButtonApp className={s.buttonBack} onClick={() => navigate(-1)}>Назад</ButtonApp>
                                <h2 className={s.ordersPage__title}>Список {text}</h2>
                                <div className={s.ordersPage__products}>
                                    {res.map(order => (
                                        <Order key={order.id} order={order}/>
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