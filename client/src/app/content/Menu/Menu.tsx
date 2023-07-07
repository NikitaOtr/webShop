import { FC, MouseEvent, useEffect } from 'react';
import s from './Menu.module.scss';

import { NavigationLink } from './NavigationLink/NavigationLink';

import { useLocation } from 'react-router-dom'; 
import { useAppSelector } from './../../hooks/useAppSelector';

import imgHome from './../../assets/staticImages/home.svg';
import imgBook from './../../assets/staticImages/book.svg';
import imgBasket from './../../assets/staticImages/basket.svg';
import imgFullHeart from './../../assets/staticImages/fullHeart.svg'
import imgUser from './../../assets/staticImages/user.svg';

enum EnumRouting {
    main = '/',
    catalog = '/catalog',
    basket = '/basket',
    user = '/user',
    login = '/login',
    favoritesProducts = '/products/favorites',

}

interface IProps {
    isMenu: boolean,
    setIsMenu: (isMenu: boolean) => void,
}

export const Menu: FC<IProps> = ({ isMenu, setIsMenu }) => {
    const user = useAppSelector(state => state.ReducerUser.user);
    const location = useLocation();

    useEffect(() => {
        if (isMenu) {
            document.body.classList.add(s.bodyOverflowHidden);
        } else {
            document.body.classList.remove(s.bodyOverflowHidden);
        }
    }, [isMenu]);

    const onClickMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const onClickLink = () => {
        setIsMenu(false);
    };

    return (
        <>
            {isMenu && <div className={s.wrapper} onClick={() => setIsMenu(false)}/>}
            <div className={`${s.menu}  ${isMenu ? s.active : s.inactive}`} onClick={onClickMenu}>
                <NavigationLink title='Главная' to={EnumRouting.main} img={imgHome} 
                                isSelected={EnumRouting.main === location.pathname} onClick={onClickLink}/>
                <NavigationLink title='Каталог' to={EnumRouting.catalog} img={imgBook} 
                                isSelected={EnumRouting.catalog === location.pathname} onClick={onClickLink}/>
                <NavigationLink title='Корзина' to='basket' img={imgBasket} onClick={onClickLink} 
                                isSelected={EnumRouting.basket === location.pathname}/>
                <NavigationLink title={user ? 'Профиль' : 'Авторизация'}
                                isSelected={(user ? EnumRouting.user : EnumRouting.login) === location.pathname}
                                to={user ? EnumRouting.user : EnumRouting.login} 
                                img={imgUser} 
                                onClick={onClickLink}/>
                {user && <NavigationLink title='Избранные' to={EnumRouting.favoritesProducts} img={imgFullHeart} 
                                         isSelected={EnumRouting.favoritesProducts === location.pathname} onClick={onClickLink}/>}
            </div>
        </>
    );
};