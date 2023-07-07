import { FC, MouseEvent } from 'react';
import s from './Product.module.scss';

import { Link } from 'react-router-dom';
import { ButtonApp } from './../ButtonApp/ButtonApp';

import { useAppSelector } from './../../hooks/useAppSelector';
import { useAppActions } from './../../hooks/useAppAction';

import { ReactComponent as ImgFullHeart } from './../../assets/staticImages/fullHeart.svg';
import { ReactComponent as ImgEmptyHeart } from './../../assets/staticImages/emptyHeart.svg';
import { translateToRussian } from './../../utils/translateToRussian';
import { getBeautifulPrise } from './../../utils/getBeautifulPrise';
import { IProduct } from './../../types/productTypes';

interface IProps {
    product: IProduct,
}

export const Product: FC<IProps> = ({ product }) => {
    const user = useAppSelector(state => state.ReducerUser.user);
    const favoriteProducts = useAppSelector(state => state.ReducerUser.favoritesProducts);

    const { addToBasket, addToFavoritesProducts, removeFromFavoritesProducts } = useAppActions();

    const isFavoritesProducts = favoriteProducts[product.id]; 
    const href = `/product/${product.id}`;

    const onClickAddToBasket = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        addToBasket({ product });
    };

    const onClickAddToFavoritesProducts = () => {
        addToFavoritesProducts({ product });
    };

    const onClickRemoveFromFavoritesProducts = () => {
        removeFromFavoritesProducts({ product });
    };

    return (
        <div id={product.id} className={s.product}>
            {user &&   
                <div className={s.boxActions}>
                    {isFavoritesProducts 
                        ? <ImgFullHeart className={s.boxActions__item}
                                        title='Удалить из избранных'
                                        onClick={onClickRemoveFromFavoritesProducts}/> 
                        : <ImgEmptyHeart className={s.boxActions__item}
                                         title='Добавить в избранные'
                                         onClick={onClickAddToFavoritesProducts}/> 
                    }
                </div>
            }
            <Link to={href} className={s.product__link}>
                <div className={s.boxImg}>
                    <div className={s.wrap}>
                        <ButtonApp className={s.wrap__message}>Подробнее</ButtonApp>
                    </div>
                    <img className={s.boxImg__img} src={product.img} alt='img'/>
                </div>
                <div className={s.boxText}>
                    <div className={s.boxText__title}>{product.name}</div>
                </div>
                <div className={s.boxText}>
                    <div className={s.boxText__title}>Цена:</div>
                    <div className={s.boxText__text}>{getBeautifulPrise(product.price)}</div>
                </div>
                <div className={s.boxText}>
                    <div className={s.boxText__title}>Производитель:</div>
                    <span className={s.boxText__text}>{translateToRussian[product.company]}</span>
                </div>
            </Link>
            <div className={s.boxButton}>
                <ButtonApp className={s.boxButton__button} onClick={onClickAddToBasket}>Добавить в корзину</ButtonApp>
            </div>
        </div>
    );
};