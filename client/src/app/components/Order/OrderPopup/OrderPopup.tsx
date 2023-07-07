import { FC } from 'react';
import s from './OrderPopup.module.scss';

import { BasketProduct } from './../../BasketProduct/BasketProduct';
import { WrapperPopup } from './../../WrapperPopup/WrapperPopup';

import { ReactComponent as ImgCross } from './../../../assets/staticImages/cross.svg';
import { getBeautifulPrise } from './../../../utils/getBeautifulPrise';
import { getStatusOrder } from './../../../utils/getStatusOrder';
import { getDateFormat } from './../../../utils/getDateFormat';
import { EnumMethodGet } from './../../../types/userTypes';
import { IOrder } from './../../../types/orderTypes';

interface IProps {
    order: IOrder,
    closePopup: () => void,
}

export const OrderPopup: FC<IProps> = ({ order, closePopup }) => {

    return (
        <WrapperPopup closePopup={closePopup} classContent={s.detailOrder}>
            <>
                <div className={s.boxCross} onClick={closePopup}>
                    <ImgCross className={s.boxCross__cross}/>
                </div>
                <div className={s.detailOrder__title}>Информация о заказе</div>
                <div className={s.detailOrder__content}>
                    <div className={s.info}>
                        <div className={s.info__item}>
                            <div className={s.info__title}>Заказ от:</div>
                            <div className={s.info__text}>{getDateFormat(new Date(order.orderDate))}</div>
                        </div>
                        <div className={s.info__item}>
                            <div className={s.info__title}>Статус:</div>
                            <div className={s.info__text}>{getStatusOrder(order)}</div>
                        </div>
                        <div className={s.info__item}>
                            <div className={s.info__title}>Способ получения:</div>
                            <div className={s.info__text}>{order.methodGet}</div>
                        </div>
                        <div className={s.info__item}>
                            <div className={s.info__title}>Адрес получения:</div>
                            {order.methodGet === EnumMethodGet.courier
                                ? <div className={s.info__text}>{`${order.addressCourier}, Дом: ${order.houseNumberCourier}, Квартира: ${order.apartmentNumberCourier}`}</div>
                                : <div className={s.info__text}>{order.pointOfIssue}</div>
                            }
                        </div>
                        <div className={s.info__item}>
                            <div className={s.info__title}>Дата получения:</div>
                            <div className={s.info__text}>{order.dateOfReceiving}</div>
                        </div>
                        <div className={s.info__item}>
                            <div className={s.info__title}>Способ оплаты:</div>
                            <div className={s.info__text}>{order.methodPayment}</div>
                        </div>
                        {Boolean(order.discount) &&
                            <div className={s.info__item}>
                                <div className={s.info__title}>Скидка:</div>
                                <div className={s.info__text}>{`${order.discount} %`}</div>
                            </div>
                        }
                        <div className={s.info__item}>
                            <div className={s.info__title}>Итоговая сумма:</div>
                            <div className={s.info__text}>{getBeautifulPrise(order.totalSum)}</div>
                        </div>
                    </div>
                    <div className={s.products}>
                        {order.products.map(product => (
                            <BasketProduct key={product.id} product={product} isReadyOrder={true}/>
                        ))}
                    </div>
                </div>
            </>
        </WrapperPopup>
    );
};