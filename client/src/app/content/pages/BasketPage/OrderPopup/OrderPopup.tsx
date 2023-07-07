import { FC, useEffect, useState, FormEvent } from 'react';
import s from './OrderPopup.module.scss';

import { ButtonApp } from './../../../../components/ButtonApp/ButtonApp';
import { InputText } from './../../../../components/InputText/InputText';
import { NumberRunning } from './../../../../components/NumberRunning/NumberRunning';
import { WrapperPopup } from './../../../../components/WrapperPopup/WrapperPopup';

import { useAppActions } from './../../../../hooks/useAppAction';
import { useAppSelector } from './../../../../hooks/useAppSelector';
import { useInput } from './../../../../hooks/useInput';

import { EnumStatusInput } from './../../../../components/InputText/InputText';
import { ReactComponent as ImgCross } from './../../../../assets/staticImages/cross.svg';
import { checkIsValidPromoCode } from './../../../../utils/checkIsValidPromoCode';
import { EnumMethodGet } from './../../../../types/userTypes';

interface IProps {
    closePopup: () => void,
    openThanksForOrderPopup: () => void,
}

export const OrderPopup: FC<IProps> = ({ closePopup, openThanksForOrderPopup }) => {
    const emailUser = useAppSelector(store => store.ReducerBasketPage.userEmail);
    const discountSum = useAppSelector(state => state.ReducerBasketPage.discountSum);
    const discount = useAppSelector(state => state.ReducerBasketPage.discount);
    const methodGet = useAppSelector(store => store.ReducerBasketPage.methodGet);
    const dateOfReceiving = useAppSelector(store => store.ReducerBasketPage.dateOfReceiving);
    const addressCourier = useAppSelector(store => store.ReducerBasketPage.addressCourier);
    const houseNumberCourier = useAppSelector(store => store.ReducerBasketPage.houseNumberCourier);
    const apartmentNumberCourier = useAppSelector(store => store.ReducerBasketPage.apartmentNumberCourier);
    const pointOfIssue = useAppSelector(store => store.ReducerBasketPage.pointOfIssue);
    const methodPayment = useAppSelector(store => store.ReducerBasketPage.methodPayment);
    const promoCodeStore = useAppSelector(state => state.ReducerBasketPage.promoCode);

    const [promoCode, bindPromoCode] = useInput(promoCodeStore);
    const [isValidPromoCode, setIsValidPromoCode] = useState(EnumStatusInput.normal);

    const { createOrder, applyPromoCode } = useAppActions();

    useEffect(() => {
        if (checkIsValidPromoCode(promoCodeStore)) {
            setIsValidPromoCode(EnumStatusInput.success);
        }
    }, []);

    const onClickCreateOrder = () => {
        createOrder();
        closePopup();
        openThanksForOrderPopup();
    };

    const onSubmitApplyPromoCode = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();

        if (checkIsValidPromoCode(promoCode)) {
            setIsValidPromoCode(EnumStatusInput.success);
        } else {
            setIsValidPromoCode(EnumStatusInput.error);  
        }
        applyPromoCode({ promoCode });
    };

    return (
        <WrapperPopup classContent={s.order} closePopup={closePopup}>
            <>
                <div className={s.boxCross} onClick={closePopup}>
                    <ImgCross className={s.boxCross__cross} />
                </div>
                <h2 className={s.order__title}>Информация о заказе</h2>
                <div className={s.order__detailOrder}>
                    <div className={s.infoItem}>
                        <div className={s.infoItem__title}>Почта покупателя:</div>
                        <div className={s.infoItem__text}>{emailUser}</div>
                    </div>
                    <div className={s.infoItem}>
                        <div className={s.infoItem__title}>Способ получения:</div>
                        <div className={s.infoItem__text}>{methodGet}</div>
                    </div>
                    <div className={s.infoItem}>
                        <div className={s.infoItem__title}>Адрес получения:</div>
                        {methodGet === EnumMethodGet.courier
                            ? <div className={s.infoItem__text}>{`${addressCourier.name}, Дом: ${houseNumberCourier}, Квартира: ${apartmentNumberCourier}`}</div>
                            : <div className={s.infoItem__text}>{pointOfIssue.name}</div>
                        }
                    </div>
                    <div className={s.infoItem}>
                        <div className={s.infoItem__title}>Дата получения:</div>
                        <div className={s.infoItem__text}>{dateOfReceiving}</div>
                    </div>
                    <div className={s.infoItem}>
                        <div className={s.infoItem__title}>Способ оплаты:</div>
                        <div className={s.infoItem__text}>{methodPayment}</div>
                    </div>
                    <form className={s.boxPromoCode} 
                          onSubmit={onSubmitApplyPromoCode} 
                          onBlur={() => !checkIsValidPromoCode(promoCode) && setIsValidPromoCode(EnumStatusInput.normal)}>
                        <InputText title='Промокод' {...bindPromoCode} placeholder='Промокод' isValid={isValidPromoCode}
                                   messageSuccess='Промокод верный' messageError='Промокод неверный' isSuccess={true}/>
                        <ButtonApp>Применить промокод</ButtonApp>
                    </form>
                    {Boolean(discount) && <div className={s.totalPice}>{`Скидка: ${discount} %`}</div>}
                    <div className={s.totalPice}>Общая Сумма: <NumberRunning value={discountSum}/></div>
                    <ButtonApp className={s.button} onClick={onClickCreateOrder}>Заказать</ButtonApp>
                </div>
            </>
        </WrapperPopup>
    );
};