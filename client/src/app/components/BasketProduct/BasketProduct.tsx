import { FC } from 'react';
import s from './BasketProduct.module.scss';

import { NumberRunning } from './../NumberRunning/NumberRunning';
import { CounterBlock } from './../CounterBlock/CounterBlock';
import { ButtonApp } from './../ButtonApp/ButtonApp';
import { Link } from 'react-router-dom';

import { useAppSelector } from './../../hooks/useAppSelector';
import { useAppActions } from './../../hooks/useAppAction';

import { ReactComponent as ImgBin } from './../../assets/staticImages/bin.svg';
import { translateToRussian } from './../../utils/translateToRussian';
import { getBeautifulPrise } from './../../utils/getBeautifulPrise';
import { IProductBasket } from './../../types/productTypes';

interface IProps {
    product: IProductBasket,
    isReadyOrder?: boolean, 
}

export const BasketProduct: FC<IProps> = ({ product, isReadyOrder=false }) => {
    const countProductsInServer = useAppSelector(state => state.ReducerBasketPage.countProductsInServer);

    const { setCountProductInBasket, removeFromBasket } = useAppActions();

    const setCount = (count: number) => {
        setCountProductInBasket({ id: product.id, count });
    };

    const remove = () => {
        removeFromBasket({ id: product.id });
    };

    return (
        <div className={s.basketItem}>
            <Link className={s.basketItem__link} to={`/product/${product.id}`}>
                <div className={s.boxImg}>
                    <div className={s.boxImg__wrap}>
                        <ButtonApp className={s.boxImg__wrap__message}>Подробнее</ButtonApp>
                    </div>
                    <img className={s.boxImg__img} src={product.img} alt='img'/>
                </div>
            </Link>

            <div className={s.infoBox}>
                <div className={s.infoBox__item}>
                    <Link to={`/product/${product.id}`} className={s.infoBox__link}>{product.name}</Link>
                </div>
                <div className={s.infoBox__item}>
                    <div className={s.infoBox__title}>Категория:</div>
                    <div className={s.infoBox__text}>{translateToRussian[product.type]}</div>
                </div>
                <div className={s.infoBox__item}>
                    <div className={s.infoBox__title}>Цвет:</div>
                    <div className={s.infoBox__text}>{translateToRussian[product.color]}</div>
                </div>
                <div className={s.infoBox__item}>
                    <div className={s.infoBox__title}>Цена:</div>
                    <div className={s.infoBox__text}>{getBeautifulPrise(product.price)}</div>
                </div>
            </div>

            <div className={s.counterBox}>
                {isReadyOrder 
                    ?
                        <div className={s.infoBox__item}>
                            <div className={s.infoBox__title}>Количество:</div>
                            <div className={s.infoBox__text}>{product.count}</div>
                        </div>
                    : 
                        <CounterBlock className={s.counterBlock}
                                    maxValue={countProductsInServer[product.id]}
                                    value={product.count} 
                                    setValue={setCount}/>
                }
            </div>

            <div className={s.last}>
                <div className={s.last__price}>
                    Итог: <NumberRunning value={product.totalSum}/>
                </div>
                {!isReadyOrder &&
                    <div className={s.last__btns}>
                        <div className={s.removeBtn}
                             title='Удалить'
                             onClick={remove}>
                            <ImgBin className={s.removeBtn__img}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};