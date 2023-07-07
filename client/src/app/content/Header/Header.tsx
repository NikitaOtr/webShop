import { FC, useState } from 'react';
import s from './Header.module.scss';

import { BurgerForMenu } from './../../components/BurgerForMenu/BurgerForMenu';
import { Link } from 'react-router-dom';
import { Menu } from './../Menu/Menu';

import { useAppSelector } from './../../hooks/useAppSelector';

import { ReactComponent as ImgBasket } from './../../assets/staticImages/basket.svg';
import { ReactComponent as ImgUser } from './../../assets/staticImages/user.svg';

export const Header: FC = () => {
    const [isMenu, setIsMenu] = useState(false);
    const basketSize = useAppSelector(state => state.ReducerBasketPage.basket.size);
    const user = useAppSelector(state => state.ReducerUser.user);

    const onClickHeader = () => {
        isMenu && setIsMenu(false);
    };

    const onClickBurger = () => {
        setIsMenu((prev) => !prev);
    };

    return (
        <>
            <Menu isMenu={isMenu} setIsMenu={setIsMenu} />
            <header className={s.header} onClick={onClickHeader}>
                <div className={s.boxTitle}>
                    <BurgerForMenu className={s.burger} boldness='7px' isOpen={isMenu} onClick={onClickBurger}/>
                    <Link to='/'>
                        <h1 className={s.title}>onWheels</h1>
                    </Link>
                </div>

                <div className={s.boxContent}>
                    <Link to={user ? '/user': '/login'} className={s.basketLink}>
                        <ImgUser className={s.basketLink__basket}/>
                        <span className={s.basketLink__text}>{user ? 'Профиль' : 'Авторизация' }</span>
                    </Link>
                    <Link to='/basket' className={s.basketLink}>
                        <div className={s.basketLink__countProduct}>
                            {basketSize > 0 && 
                                <span className={s.basketLink__countProduct__count}>{basketSize}</span>
                            }
                        </div>
                        <ImgBasket className={s.basketLink__basket}/>
                        <span className={s.basketLink__text}>Корзина</span>
                    </Link>
                </div>
            </header>
        </>
    );
};