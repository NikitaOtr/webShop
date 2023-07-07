import { FC, useLayoutEffect, useState } from 'react';
import s from './ProductPage.module.scss';

import { Recommendation } from './../../../components/Recommendation/Recommendation';
import { NumberRunning } from './../../../components/NumberRunning/NumberRunning';
import { LoaderCircle } from './../../../components/LoaderCircle/LoaderCircle';
import { CounterBlock } from './../../../components/CounterBlock/CounterBlock';
import { DropDownList } from './../../../components/DropDownList/DropDownList';
import { WarningPopup } from './../../../components/WarningPopup/WarningPopup';
import { ButtonApp } from './../../../components/ButtonApp/ButtonApp';
import { CheckBox } from './../../../components/CheckBox/CheckBox';
import { LinkApp } from './../../../components/LinkApp/LinkApp';
import { CommentPopup } from './CommentPopup/CommentPopup';
import { ErrorPage } from './../ErrorPage/ErrorPage';
import { ImagePopup } from './ImagePopup/ImagePopup';
import { Carousel } from './Carousel/Carousel';

import { useAppSelector } from './../../../hooks/useAppSelector';
import { useAppActions } from './../../../hooks/useAppAction';
import { useParams, useNavigate } from 'react-router-dom';

import { ReactComponent as ImgEmptyHeart } from './../../../assets/staticImages/emptyHeart.svg';
import { ReactComponent as ImgFullHeart } from './../../../assets/staticImages/fullHeart.svg';
import { ReactComponent as ImgFullStar } from './../../../assets/staticImages/fullStar.svg';
import { ReactComponent as ImgLink } from './../../../assets/staticImages/link.svg';
import { translateToRussian } from './../../../utils/translateToRussian';
import { getBeautifulPrise } from './../../../utils/getBeautifulPrise';
import { EnumOfColors, IComment } from './../../../types/productTypes';
import { EnumOfStatus } from './../../../types/commonTypes';

export enum EnumModOpenComment {
    close,
    create,
    change,
    view,
}

export const ProductPage: FC = () => {
    const product = useAppSelector(state => state.ReducerProductPage.product);
    const count = useAppSelector(state => state.ReducerProductPage.count);
    const totalSum = useAppSelector(state => state.ReducerProductPage.totalSum);
    const optionsImg = useAppSelector(state => state.ReducerProductPage.optionsImgProduct);
    const recommendationBikes = useAppSelector(state => state.ReducerProductPage.recommendationBikes);
    const reviewProduct = useAppSelector(state => state.ReducerProductPage.reviewProduct);
    const isShowWarningCountProduct = useAppSelector(state => state.ReducerBasketPage.isShowWarningCountProduct);
    const user = useAppSelector(state => state.ReducerUser.user);
    const favoritesProducts = useAppSelector(state => state.ReducerUser.favoritesProducts);
    const countProductsInServer = useAppSelector(state => state.ReducerBasketPage.countProductsInServer);
    const purchasedProducts = useAppSelector(state => state.ReducerUser.purchasedProducts);
    const statusInitProductPage = useAppSelector(state => state.ReducerProductPage.statusInitProductPage);
    const statusCountProduct = useAppSelector(state => state.ReducerBasketPage.statusCountProduct);
    const status = useAppSelector(state => state.ReducerProductPage.status);

    const { setProductToProductPage, setCountProductInProductPage, addToBasket, setProductByColorInProductPage,
            setIsShowWarningCountProduct, addToFavoritesProducts, removeFromFavoritesProducts, 
            addCountCopyUrlOnProduct } = useAppActions();

    const history = useParams<{id: string}>();
    const navigate = useNavigate();

    const [isShowPopup, setIsShowPopup] = useState(false);
    const [configPopupComment, setConfigPopupComment] = 
            useState<{mod: EnumModOpenComment, comment?: IComment, index?: number}>({mod: EnumModOpenComment.close});

    useLayoutEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 1);
        if (history.id) {
            setProductToProductPage({ id: history.id });
        }
    }, [history]);

    if (statusCountProduct !== EnumOfStatus.Success || status !== EnumOfStatus.Success
        || statusInitProductPage !== EnumOfStatus.Success) {
        return (
            <LoaderCircle/>
        );
    }

    if (!product) {
        return <ErrorPage/>;
    }

    const onClickAddToBasket = () => {
        addToBasket({ product, count, totalSum });
        setCountProductInProductPage({ count: 1 });
    };

    const setCountHandler = (count: number) => {
        setCountProductInProductPage({ count });
    };

    const setColorHandler = (color: EnumOfColors) => {
        setProductByColorInProductPage({ color });
    };

    const onClickCopyUrlOnProduct = () => {
        addCountCopyUrlOnProduct();
        const copyText = document.createElement('input');
        copyText.value = window.location.href;
        document.body.appendChild(copyText);
        copyText.select();
        document.execCommand('copy');
        document.body.removeChild(copyText);
    };

    const onClickAddToFavoritesProducts = () => {
        addToFavoritesProducts({ product });
    };

    const onClickRemoveFromFavoritesProducts = () => {
        removeFromFavoritesProducts({ product });
    };

    const openComment = (mod: EnumModOpenComment, comment: IComment, index?: number) => {
        setConfigPopupComment({mod, comment, index});
    };

    const countInServer = countProductsInServer[product.id];
    const isFavorite = favoritesProducts[product.id];
    const rating = (reviewProduct.rating.sumRating / reviewProduct.rating.count).toFixed(1);
    const isReview = reviewProduct.rating.count !== 0;
    const isPurchasedProducts = purchasedProducts[product.id];
    const commentUser = reviewProduct.comments.find(comment => comment.user.email === user.email);

    return (
        <>  
            {isShowPopup && <ImagePopup closePopup={() => setIsShowPopup(false)} src={product.img}/>}
            {isShowWarningCountProduct && <WarningPopup text='Невозможно добавить в корзину. В наличии нет необходимого количества товара.'
                                                        closePopup={() => setIsShowWarningCountProduct({isShowWarningCountProduct: false})}/>}
            {configPopupComment.mod !== EnumModOpenComment.close && 
                <CommentPopup comment={configPopupComment.comment}
                              productName={product.name}
                              mod={configPopupComment.mod}
                              index={configPopupComment.index}
                              closePopup={() => setConfigPopupComment({mod: EnumModOpenComment.close})}/>}
            <div className={s.productPage}>
                <ButtonApp className={s.buttonBack} onClick={() => navigate(-1)}>Назад</ButtonApp>
                <h2 className={s.header}>{product.name}</h2>

                <div className={s.content}>
                    <div className={s.leftContent}>
                        <div className={s.leftContent__mainImg}>
                            <div className={s.boxImg}>
                                <img className={s.boxImg__img} 
                                    src={product.img}
                                    onClick={() => setIsShowPopup(true)}
                                    alt='img'/>
                            </div>
                        </div>
                        <div className={s.leftContent__boxActions}>
                            <div className={s.leftContent__boxActions__actions}>
                            {user &&
                                <>
                                    {isFavorite
                                        ? <ImgFullHeart className={s.leftContent__boxActions__actionItem}
                                                     title='Удалить из избранных'
                                                     onClick={onClickRemoveFromFavoritesProducts}/> 
                                        : <ImgEmptyHeart className={s.leftContent__boxActions__actionItem}
                                                      title='Добавить в избранные'
                                                      onClick={onClickAddToFavoritesProducts}/> 
                                    }
                                </>
                            }
                            <ImgLink className={s.leftContent__boxActions__actionItem}
                                     title='Скопировать ссылку на товар'
                                     onClick={onClickCopyUrlOnProduct}/>
                            </div>
                            {isReview &&
                                <div className={s.leftContent__boxActions__rating} 
                                    title={`Рейтинг ${rating}`}>
                                    <div className={s.leftContent__boxActions__rating__box}>
                                        <ImgFullStar className={s.leftContent__boxActions__ratingItem}/> 
                                        <div className={s.data__title}>{rating}</div>
                                    </div>
                                    <div className={s.leftContent__boxActions__text}>{`количество отзывов: ${reviewProduct.rating.count}`}</div>
                                </div>
                            }
                        </div>
                    </div>

                    <div className={s.boxData}>
                        <div className={s.data}>
                            <span className={s.data__title}>Название: </span>
                            <span className={s.data__text}>{product.name}</span>
                        </div>
                        <div className={s.data}>
                            <span className={s.data__title}>Производитель: </span>
                            <span className={s.data__text}>{translateToRussian[product.company]}</span>
                        </div>
                        <div className={s.data}>
                            <span className={s.data__title}>Цена: </span>
                            <span className={s.data__text}>{getBeautifulPrise(product.price)}</span>
                        </div>
                        <div className={s.data}>
                            <span className={s.data__title}>Категория: </span>
                            <span className={s.data__text}>{translateToRussian[product.type]}</span>
                        </div>
                        <div className={s.data}>
                            <span className={s.data__title}>Цвет: </span>
                            <DropDownList title={translateToRussian[optionsImg.value]}
                                            className={s.data__prise}
                                            classNameSize={s.data__prise_size}
                                            classNameText={s.data__text}>
                                <>
                                    {optionsImg.options.map(color => (
                                            <CheckBox key={color} 
                                                        option={color} 
                                                        value={optionsImg.value === color}
                                                        classNameText={s.data__text} 
                                                        setValue={() => setColorHandler(color)}/>
                                        ))}
                                </>  
                            </DropDownList>
                        </div>

                        <CounterBlock className={s.counterBlock} 
                                      maxValue={countInServer}
                                      setValue={setCountHandler}
                                      value={count}/>

                        <div>
                            <span className={s.data__title}>Стоимость: </span>
                            <NumberRunning className={s.data__title} value={totalSum}/>
                        </div>
                        
                        <ButtonApp className={s.button} onClick={onClickAddToBasket}>Добавить в корзину</ButtonApp>
                        <LinkApp className={s.button} to='/basket'>Перейти в корзину</LinkApp>

                        <div className={s.boxServerCount}>
                            <span className={s.data__text}>в наличии {countInServer} ед. товара</span> 
                        </div>
                    </div>
                </div>

                <div className={s.boxDescription}>
                    <h3 className={s.boxDescription__title}>Описание</h3>
                    <span className={s.boxDescription__description}>{product.description}</span>
                </div>

                {isReview &&
                    <div className={s.comments}>
                        <div className={s.comments__title}>Отзывы</div>
                        <Carousel comments={reviewProduct.comments} openComment={openComment}/>
                    </div>
                }

                {isPurchasedProducts && 
                    <ButtonApp className={s.reviewButton} 
                               onClick={() => setConfigPopupComment(
                                {mod: commentUser ? EnumModOpenComment.change :  EnumModOpenComment.create, comment: commentUser})}>
                        {commentUser? 'Изменить отзыв' : 'Оставить отзыв'}
                    </ButtonApp>
                }

                <Recommendation products={recommendationBikes} title='Похожие модели' to={`/catalog?type=${product.type}`}/>
            </div>
        </>
    );
}; 