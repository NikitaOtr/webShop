import { FC , useState } from 'react';
import s from './Order.module.scss';

import { OrderPopup } from './OrderPopup/OrderPopup';
import { ButtonApp } from './../ButtonApp/ButtonApp';

import { getBeautifulPrise } from './../../utils/getBeautifulPrise';
import { getStatusOrder } from './../../utils/getStatusOrder';
import { getDateFormat } from './../../utils/getDateFormat';
import { IOrder } from './../../types/orderTypes';

interface IProps {
    order: IOrder,
}

export const Order: FC<IProps> = ({ order }) => {
    const [isShow, setIsShow] = useState(false);

    return (
        <>
            {isShow && <OrderPopup order={order} closePopup={() => setIsShow(false)}/>}
            <div className={s.order} onClick={() => setIsShow(true)}>
                <div className={s.wrap}>
                    <ButtonApp className={s.wrap__message}>Подробнее</ButtonApp>
                </div>
                <div className={s.boxText}>
                    <div className={s.boxText__title}>Заказ от:</div>
                    <div className={s.boxText__text}>{getDateFormat(new Date(order.orderDate))}</div>
                </div>
                <div className={s.boxText}>
                    <div className={s.boxText__title}>Статус:</div>
                    <div className={s.boxText__text}>{getStatusOrder(order)}</div>
                </div>
                <div className={s.boxText}>
                    <div className={s.boxText__title}>Общая сумма:</div>
                    <div className={s.boxText__text}>{getBeautifulPrise(order.totalSum)}</div>
                </div>
                <div className={s.boxImg}>
                    {order.products.map(bike => (
                        <img key={bike.id} src={bike.img} className={s.boxImg__img} alt='img'/>
                    ))}
                </div>
            </div>
        </>
    );
};