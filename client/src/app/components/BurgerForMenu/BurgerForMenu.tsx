import { FC, MouseEvent } from 'react';
import s from './BurgerForMenu.module.scss';

interface IProps {
    onClick: (e?: MouseEvent<HTMLElement>) => void,
    isOpen: boolean,
    className: string,
    boldness: string,
}

export const BurgerForMenu: FC<IProps> = ({ onClick, isOpen , className, boldness}) => {
    return (
        <div className={`${s.burger} ${className}`} onClick={onClick}>
            <span className={`${isOpen ? s.span1Open : s.span1Close}`} style={{ height: boldness }}></span>
            <span className={`${isOpen ? s.span2Open : s.span2Close}`} style={{ height: boldness }}></span>
            <span className={`${isOpen ? s.span3Open : s.span3Close}`} style={{ height: boldness }}></span>
            <span className={`${isOpen ? s.span4Open : s.span4Close}`} style={{ height: boldness }}></span>
        </div>
    );
};
