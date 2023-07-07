import { FC } from 'react';
import s from './UserPage.module.scss';

import { LoaderCircle } from './../../../components/LoaderCircle/LoaderCircle';
import { ErrorPage } from './../ErrorPage/ErrorPage';
import { Link } from 'react-router-dom';

import { useAppSelector } from './../../../hooks/useAppSelector';
import { useAppActions } from './../../../hooks/useAppAction';
import { useNavigate } from 'react-router-dom';

import { getBeautifulPrise } from './../../../utils/getBeautifulPrise';
import { EnumOfStatus } from './../../../types/commonTypes';

export const UserPage: FC = () => {
    const user = useAppSelector(state => state.ReducerUser.user);
    const statusOrders = useAppSelector(state => state.ReducerUser.statusOrders);
    const readyOrders = useAppSelector(state => state.ReducerUser.readyOrders);
    const readyOrdersProducts = useAppSelector(state => state.ReducerUser.readyOrdersProducts);
    const notReadyOrders = useAppSelector(state => state.ReducerUser.notReadyOrders);
    const notReadyOrdersProducts = useAppSelector(state => state.ReducerUser.notReadyOrdersProducts);
    const favoritesProducts = useAppSelector(state => state.ReducerUser.favoritesProducts);
    const purchasedProducts = useAppSelector(state => state.ReducerUser.purchasedProducts);
    const countOrders = useAppSelector(state => state.ReducerUser.countOrders);
    const totalSumOrders = useAppSelector(state => state.ReducerUser.totalSumOrders);

    const { logout } = useAppActions();

    const navigate = useNavigate();
    
    const arrayFavoritesProducts = Object.values(favoritesProducts);

    const onClickResetUser = () => {
        logout();
        navigate('/');
    };

    if (statusOrders !== EnumOfStatus.Success) {
        return (
            <LoaderCircle/>
        );
    }

    const arrayPurchasedProducts = Object.values(purchasedProducts);

    return (
        <>
            {user
                ? 
                    <div className={s.userPage}>
                        <div className={s.userPage__boxTitle}>
                            <h2 className={s.userPage__title}>Профиль</h2>
                            <div className={s.userPage__text} onClick={onClickResetUser}>выйти</div>
                        </div>
                        <div className={s.commonLine}>
                            <div className={s.box}>
                                <div className={s.box__boxTitle}>
                                    <div className={s.box__title}>Пользователь</div>
                                </div>
                                <div className={s.box__content}>
                                    <div className={s.box__content__title}>Псевдоним:</div>
                                    <div className={s.box__content__text}>{user.displayName}</div>
                                </div>
                                <div className={s.box__content}>
                                    <div className={s.box__content__title}>Почта:</div>
                                    <div className={s.box__content__text}>{user.email}</div>
                                </div>
                                <div className={s.box__content}>
                                    <div className={s.box__content__title}>Общее число заказов:</div>
                                    <div className={s.box__content__text}>{countOrders}</div>
                                </div>
                                <div className={s.box__content}>
                                    <div className={s.box__content__title}>Сумма всех заказов:</div>
                                    <div className={s.box__content__text}>{getBeautifulPrise(totalSumOrders)}</div>
                                </div>
                            </div>
                            <div className={s.box}>
                                <div className={s.box__boxTitle}>
                                    <Link to='/orders/notReady' className={`${s.box__title} ${s.box__title_hover}`}>Заказы в обработке</Link>
                                    <Link to='/orders/notReady' className={`${s.userPage__text} ${s.box__text}`}>Просмотреть</Link>
                                </div>
                                <div className={s.box__content}>
                                    <div className={s.box__content__title}>Количество:</div>
                                    <div className={s.box__content__text}>{notReadyOrders.length}</div>
                                </div>
                                <div className={s.boxImg}>
                                    {notReadyOrdersProducts.map((bike, i) => (
                                        <img key={i} src={bike.img} className={s.boxImg__img} alt='img'/>
                                    ))}
                                </div>
                            </div>
                            <div className={s.box}>
                                <div className={s.box__boxTitle}>
                                    <Link to='/orders/ready' className={`${s.box__title} ${s.box__title_hover}`}>Завершённые заказы</Link>
                                    <Link to='/orders/ready' className={`${s.userPage__text} ${s.box__text}`}>Просмотреть</Link>
                                </div>
                                <div className={s.box__content}>
                                    <div className={s.box__content__title}>Количество:</div>
                                    <div className={s.box__content__text}>{readyOrders.length}</div>
                                </div>
                                <div className={s.boxImg}>
                                    {readyOrdersProducts.map((bike, i) => (
                                        <img key={i} src={bike.img} className={s.boxImg__img} alt='img'/>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={s.commonLine}>
                            <div className={s.box}>
                                <div className={s.box__boxTitle}>
                                    <Link to='/products/favorites' className={`${s.box__title} ${s.box__title_hover}`}>Избранные</Link>
                                    <Link to='/products/favorites' className={s.userPage__text}>Просмотреть</Link>
                                </div>
                                <div className={s.box__content}>
                                    <div className={s.box__content__title}>Количество:</div>
                                    <div className={s.box__content__text}>{arrayFavoritesProducts.length}</div>
                                </div>
                                <div className={s.boxImg}>
                                    {arrayFavoritesProducts.map((bike, i) => (
                                        <img key={i} src={bike.img} className={s.boxImg__img} alt='img'/>
                                    ))}
                                </div>
                            </div>
                            <div className={s.box}>
                                <div className={s.box__boxTitle}>
                                    <Link to='/products/purchased' className={`${s.box__title} ${s.box__title_hover}`}>Выкупленные модели</Link>
                                    <Link  to='/products/purchased' className={s.userPage__text}>Просмотреть</Link>
                                </div>
                                <div className={s.box__content}>
                                    <div className={s.box__content__title}>Количество:</div>
                                    <div className={s.box__content__text}>{arrayPurchasedProducts.length}</div>
                                </div>
                                <div className={s.boxImg}>
                                    {arrayPurchasedProducts.map((bike, i) => (
                                        <img key={i} src={bike.img} className={s.boxImg__img} alt='img'/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                : 
                    <ErrorPage/>
            }
        </>
    );
};