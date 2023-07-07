import { useLayoutEffect, useState, useRef } from 'react';
import s from './BasketPage.module.scss';

import { Recommendation } from './../../../components/Recommendation/Recommendation';
import { BasketProduct } from './../../../components/BasketProduct/BasketProduct';
import { NumberRunning } from './../../../components/NumberRunning/NumberRunning';
import { ThanksForOrderPopup } from './ThanksForOrderPopup/ThanksForOrderPopup';
import { WarningPopup } from './../../../components/WarningPopup/WarningPopup';
import { LoaderCircle } from './../../../components/LoaderCircle/LoaderCircle';
import { MethodPaymentPopup } from './MethodPaymentPopup/MethodPaymentPopup';
import { ButtonApp } from './../../../components/ButtonApp/ButtonApp';
import { EmptyStub } from './../../../components/EmptyStub/EmptyStub';
import { MethodGetPopup } from './MethodGetPopup/MethodGetPopup';
import { UserDataPopup } from './UserDataPopup/UserDataPopup';
import { OrderPopup } from './OrderPopup/OrderPopup';

import { useAppSelector } from './../../../hooks/useAppSelector';
import { useAppActions } from './../../../hooks/useAppAction';
import { useNavigationType } from 'react-router-dom';

import { ReactComponent as ImgPencil} from './../../../assets/staticImages/pencil.svg';
import { ReactComponent as ImgReset} from './../../../assets/staticImages/reset.svg';
import imgBasketEmpty from './../../../assets/staticImagesHint/catalogEmpty.avif';
import { EnumOfStatus } from './../../../types/commonTypes';
import { EnumMethodGet } from './../../../types/userTypes';

export const BasketPage = () => {
    const user = useAppSelector(state => state.ReducerUser.user);
    const basket = useAppSelector(state => state.ReducerBasketPage.basket);
    const discountSum = useAppSelector(state => state.ReducerBasketPage.discountSum);
    const discount = useAppSelector(state => state.ReducerBasketPage.discount);
    const mountainBikes = useAppSelector(state => state.ReducerMainPage.mountainBikes);
    const methodGet = useAppSelector(state => state.ReducerBasketPage.methodGet);
    const dateOfReceiving = useAppSelector(state => state.ReducerBasketPage.dateOfReceiving);
    const addressCourier = useAppSelector(state => state.ReducerBasketPage.addressCourier);
    const houseNumberCourier = useAppSelector(state => state.ReducerBasketPage.houseNumberCourier);
    const apartmentNumberCourier = useAppSelector(state => state.ReducerBasketPage.apartmentNumberCourier);
    const pointOfIssue = useAppSelector(state => state.ReducerBasketPage.pointOfIssue);
    const methodPayment = useAppSelector(state => state.ReducerBasketPage.methodPayment);
    const userEmail = useAppSelector(state => state.ReducerBasketPage.userEmail);
    const statusBaskets = useAppSelector(state => state.ReducerBasketPage.statusBaskets);
    const statusCountProduct = useAppSelector(state => state.ReducerBasketPage.statusCountProduct);

    const [isShowMethodGetPopup, setIsShowMethodGetPopup] = useState(false);
    const [isShowOrderPopup, setIsShowOrderPopup] = useState(false);
    const [isShowMethodPaymentPopup, setIsShowMethodPaymentPopup] = useState(false);
    const [isShowThanksForOrderPopup, setIsShowThanksForOrderPopup] = useState(false);
    const [isShowUserDataPopup, setIsShowUserDataPopup] = useState(false);
    const [isShowWarningPopup, setIsShowWarningPopup] = useState(false);

    const {setMethodGet, setAddressCourier, setApartmentNumberCourier, setHouseNumberCourier, setPointOfIssue,
            setMethodPayment, setUserEmail} = useAppActions();

    const refOrder = useRef(null);

    const navigationType = useNavigationType();

    useLayoutEffect(() => {
        if (navigationType === 'PUSH') { 
            window.scrollTo(0, 0);
        }
    }, []);

    const getTypeMethodGet = (): EnumMethodGet => {
        if (methodGet === EnumMethodGet.courier && addressCourier && houseNumberCourier && apartmentNumberCourier) {
            return methodGet;
        } else if (methodGet === EnumMethodGet.pickup && pointOfIssue) {
            return methodGet;
        } else {
            return null;
        }
    };

    const typeMethodGet = getTypeMethodGet();

    const notCanCreateOrder = !(typeMethodGet && methodPayment && userEmail); 

    const onClickScrollToCreateOrder = () => {
        refOrder.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    };

    const onClickCreateOrder = () => {
        if (discount >= 3_000_000) {
            setIsShowWarningPopup(true);
        } else {
            setIsShowOrderPopup(true);
        }
    };

    const onClickOpenMethodGetPopup = () => {
        setIsShowMethodGetPopup(true);
    };

    const onClickOpenMethodPaymentPopup = () => {
        setIsShowMethodPaymentPopup(true);
    };

    const onClickOpenUserDatePopup = () => {
        !user && setIsShowUserDataPopup(true);
    };

    const onClickResetMethodGet = () => {
        setMethodGet({methodGet: EnumMethodGet.pickup});
        setAddressCourier({addressCourier: null});
        setHouseNumberCourier({houseNumberCourier: ''});
        setApartmentNumberCourier({apartmentNumberCourier: ''});
        setPointOfIssue({pointOfIssue: null});
    };

    const onClickResetMethodPayment = () => {
        setMethodPayment({methodPayment: null});
    };

    const onClickResetUserDate = () => {
        setUserEmail({userEmail: ''});
    };

    const onClickOpenThanksForOrderPopup = () => {
        window.scrollTo({top: 0});
        setIsShowThanksForOrderPopup(true)
    };

    if (statusCountProduct !== EnumOfStatus.Success || statusBaskets !== EnumOfStatus.Success) {
        return (
            <LoaderCircle/>
        );
    }

    const products = Object.values(basket.products);

    return (
        <>
            {isShowMethodGetPopup && <MethodGetPopup closePopup={() => setIsShowMethodGetPopup(false)}/>}
            {isShowOrderPopup && <OrderPopup openThanksForOrderPopup={onClickOpenThanksForOrderPopup} 
                                             closePopup={() => setIsShowOrderPopup(false)}/>}
            {isShowMethodPaymentPopup && <MethodPaymentPopup closePopup={() => setIsShowMethodPaymentPopup(false)}/>}
            {isShowThanksForOrderPopup && <ThanksForOrderPopup closePopup={() => setIsShowThanksForOrderPopup(false)}/>}
            {isShowUserDataPopup && <UserDataPopup closePopup={() => setIsShowUserDataPopup(false)}/>}
            {isShowWarningPopup && <WarningPopup closePopup={() => setIsShowWarningPopup(false)} 
                                                 text='Невозможно сделать заказ на сумму более 3 000 000 руб.'/>}
            <div className={s.basketPage}>
                {products.length > 0   
                    ?
                        <>
                            <h2 className={s.title}>Корзина: {basket.size}</h2>
                            <div className={s.content}>
                                <div className={s.leftBlock}>
                                    <div className={s.boxProducts}>
                                        {products.map((product) => (
                                            <BasketProduct key={product.id} product={product}/>)
                                        )}
                                    </div>
                                    <div ref={refOrder} className={s.orderDetails}>
                                        <div className={s.orderDetails__item}>
                                            <div className={s.orderDetails__item__titleBox}>
                                                <div onClick={onClickOpenMethodGetPopup} className={`${s.orderDetails__item__title} ${s.orderDetails__item__title_hover}`}>Способ доставки</div>
                                                {typeMethodGet && 
                                                    <div className={s.actionsBox}>
                                                        <div className={s.boxIcon} title='Редактировать' onClick={onClickOpenMethodGetPopup}>
                                                            <ImgPencil className={s.boxIcon__icon}/>
                                                        </div>
                                                        <div className={s.boxIcon} title='Сбросить' onClick={onClickResetMethodGet}>
                                                            <ImgReset className={s.boxIcon__icon}/>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <div className={s.orderDetails__item__content}>
                                                {typeMethodGet === EnumMethodGet.courier 
                                                    ?
                                                        <>
                                                            <div className={s.orderDetails__item__content__info}>
                                                                <div className={s.orderDetails__item__content__info_title}>Способ получения:</div>
                                                                <div className={s.orderDetails__item__content__info_text}>{methodGet}</div>
                                                            </div>
                                                            <div className={s.orderDetails__item__content__info}>
                                                                <div className={s.orderDetails__item__content__info_title}>Адрес:</div>
                                                                <div className={s.orderDetails__item__content__info_text}>
                                                                    {`${addressCourier.name}, Дом: ${houseNumberCourier}, Квартира: ${apartmentNumberCourier}`}
                                                                </div>
                                                            </div>
                                                            <div className={s.orderDetails__item__content__info}>
                                                                <div className={s.orderDetails__item__content__info_title}>Дата получения:</div>
                                                                <div className={s.orderDetails__item__content__info_text}>{dateOfReceiving}</div>
                                                            </div>
                                                        </>
                                                    : typeMethodGet === EnumMethodGet.pickup ? 
                                                        <>
                                                            <div className={s.orderDetails__item__content__info}>
                                                                <div className={s.orderDetails__item__content__info_title}>Способ получения:</div>
                                                                <div className={s.orderDetails__item__content__info_text}>{methodGet}</div>
                                                            </div>
                                                            <div className={s.orderDetails__item__content__info}>
                                                                <div className={s.orderDetails__item__content__info_title}>Адрес:</div>
                                                                <div className={s.orderDetails__item__content__info_text}>{pointOfIssue.name}</div>
                                                            </div>
                                                            <div className={s.orderDetails__item__content__info}>
                                                                <div className={s.orderDetails__item__content__info_title}>Дата получения:</div>
                                                                <div className={s.orderDetails__item__content__info_text}>{dateOfReceiving}</div>
                                                            </div>
                                                        </>
                                                    : <span onClick={onClickOpenMethodGetPopup} className={s.orderDetails__item__content__change}>Выбрать способ доставки</span>
                                                }
                                            </div>
                                        </div>
                                        <div className={s.orderDetails__block}>
                                            <div className={s.orderDetails__item}>
                                                <div className={s.orderDetails__item__titleBox}>
                                                    <div onClick={onClickOpenMethodPaymentPopup} className={`${s.orderDetails__item__title} ${s.orderDetails__item__title_hover}`}>Способ оплаты</div>
                                                    {methodPayment && 
                                                        <div className={s.actionsBox}>
                                                            <div className={s.boxIcon} title='Редактировать' onClick={onClickOpenMethodPaymentPopup}>
                                                                <ImgPencil className={s.boxIcon__icon}/>
                                                            </div>
                                                            <div className={s.boxIcon} title='Сбросить' onClick={onClickResetMethodPayment}>
                                                                <ImgReset className={s.boxIcon__icon} />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                                <div className={s.orderDetails__item__content}>
                                                    {methodPayment 
                                                        ?
                                                            <div className={s.orderDetails__item__content__info}>
                                                                <div className={s.orderDetails__item__content__info_title}>Способ оплаты:</div>
                                                                <div className={s.orderDetails__item__content__info_text}>{methodPayment}</div>
                                                            </div>
                                                        :   <span onClick={onClickOpenMethodPaymentPopup} className={s.orderDetails__item__content__change}>Выбрать способ оплаты</span>
                                                    }
                                                </div>
                                            </div>
                                            <div className={s.orderDetails__item}>
                                                <div className={s.orderDetails__item__titleBox}>
                                                    <div onClick={onClickOpenUserDatePopup} className={`${s.orderDetails__item__title} ${!user ? s.orderDetails__item__title_hover : ''}`}>Данные покупателя</div>
                                                    {!user && userEmail && 
                                                        <div className={s.actionsBox}>
                                                            <div className={s.boxIcon} title='Редактировать' onClick={onClickOpenUserDatePopup} >
                                                                <ImgPencil className={s.boxIcon__icon}/>
                                                            </div>
                                                            <div className={s.boxIcon} title='Сбросить' onClick={onClickResetUserDate}>
                                                                <ImgReset className={s.boxIcon__icon}/>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                                <div className={s.orderDetails__item__content}>
                                                    {userEmail
                                                        ? 
                                                            <div className={s.orderDetails__item__content__info}>
                                                                <div className={s.orderDetails__item__content__info_title}>Почта покупателя:</div>
                                                                <div className={s.orderDetails__item__content__info_text}>{userEmail}</div>
                                                            </div>
                                                        :   <span onClick={onClickOpenUserDatePopup} className={s.orderDetails__item__content__change}>Укажите почту получателя</span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {notCanCreateOrder && 
                                            <div className={s.informationOrder}>Необходимо заполнить дополнительные данный</div>
                                        }
                                        <ButtonApp className={s.boxResult__button}
                                                   onClick={onClickCreateOrder}
                                                   title={notCanCreateOrder ? 'Необходимо заполнить дополнительные данный' : 'Заказать'}
                                                   disabled={notCanCreateOrder}>Заказать</ButtonApp>
                                    </div>
                                </div>
                                <div className={s.boxResult}>
                                    <div className={s.boxResult__text}>Товары: {basket.size} шт.</div>
                                    {discount !== 0 && <div className={s.boxResult__text}>{`Скидка: ${discount} %`}</div>}
                                    <div className={s.boxResult__text}>Итог: <NumberRunning value={discountSum}/></div>
                                    {discount !== 0 &&
                                        <div><NumberRunning className={s.boxResult__textDiscount} value={basket.totalSum}/></div>
                                    }
                                    <ButtonApp className={s.boxResult__button} onClick={onClickScrollToCreateOrder}>
                                        Оформить заказа
                                    </ButtonApp>
                                </div>
                            </div>
                            <Recommendation products={mountainBikes} 
                                            className={s.recommendation}
                                            title='Может, что-то ещё?'
                                            to={'/catalog'}/>
                        </>
                    :
                        <EmptyStub titleText='Корзина пуста' 
                                   buttonText='Перейти в каталог' 
                                   srcImage={imgBasketEmpty}  
                                   to='/catalog'/>
                }
            </div>
        </>
    );
};