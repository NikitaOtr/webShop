import { FC, useLayoutEffect } from 'react';
import s from './MainPage.module.scss';

import { Recommendation } from './../../../components/Recommendation/Recommendation';
import { WarningPopup } from './../../../components/WarningPopup/WarningPopup';
import { LinkApp } from './../../../components/LinkApp/LinkApp';

import { useAppSelector } from './../../../hooks/useAppSelector';
import { useAppActions } from './../../../hooks/useAppAction';
import { useNavigationType } from 'react-router-dom';

import { ReactComponent as ImgDoubleArrow} from './../../../assets/staticImages/doubleArrow.svg';

export const MainPage: FC = () => {  
    const mountainBikes = useAppSelector(state => state.ReducerMainPage.mountainBikes)
    const doubleSuspendedBikes = useAppSelector(state => state.ReducerMainPage.doubleSuspendedBikes);
    const kidsBikes = useAppSelector(state => state.ReducerMainPage.kidsBikes);
    const electricalBikes = useAppSelector(state => state.ReducerMainPage.electricalBikes);
    const isShowWarningCountProduct = useAppSelector(state => state.ReducerBasketPage.isShowWarningCountProduct);

    const { setIsShowWarningCountProduct } = useAppActions();

    const navigationType = useNavigationType();

    useLayoutEffect(() => {
        if (navigationType === 'PUSH') {
            window.scrollTo(0, 0);
        }  
    }, []);

    const onClickArrow = () => {
        window.scrollTo({
            top: (document.documentElement.clientHeight),
            behavior: 'smooth'
          });
    };

    return (
        <>
            {isShowWarningCountProduct && <WarningPopup text='Невозможно добавить в корзину. В наличии нет необходимого количества товара.' 
                                                        closePopup={() => setIsShowWarningCountProduct({isShowWarningCountProduct: false})}/>}
            <div className={s.backgroundImg}>
                <div className={s.salutation}>
                    <h2 className={s.salutation__headLine}>OnWheels</h2>
                    <p className={s.salutation__text}>Магазин велосипедов с большим ассортиментом и низкими ценами</p>
                    <LinkApp className={s.salutation__link} to='/catalog'>Каталог</LinkApp>
                </div>
                <div className={s.arrowBlock}>
                    <div className={s.arrowBlock__text}>перейти к категориям</div>
                    <button className={s.arrowBlock__button} onClick={onClickArrow}>
                        <ImgDoubleArrow className={s.arrowBlock__button__cross}/>
                    </button>
                </div>
            </div>
            
            <div className={s.content}>
                <Recommendation products={mountainBikes} title='Горные' to={'/catalog?type=mountain'}/>
                <Recommendation products={doubleSuspendedBikes} title='Двухподвесные' to={'/catalog?type=doubleSuspended'}/>
                <Recommendation products={kidsBikes} title='Детские' to={'/catalog?type=kids'}/>
                <Recommendation products={electricalBikes} title='Электро' to={'/catalog?type=electrical'}/>
            </div>
        </>   
    );
};