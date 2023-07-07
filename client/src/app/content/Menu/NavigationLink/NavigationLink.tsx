import { FC, MouseEvent } from 'react';
import s from './NavigationLink.module.scss';

import { NavLink } from 'react-router-dom';

interface IProps {
    to: string,
    title: string,
    img: string,
    isSelected: boolean,
    onClick?: (e?: MouseEvent<HTMLDivElement>) => void,
}

export const NavigationLink: FC<IProps> = ({ to, title, img, onClick, isSelected }) => {
    return (
        <div className={`${s.containerLink} ${isSelected ? s.containerLink_selected : ''}`}
             onClick={(e) => onClick && onClick(e)}>
            <NavLink className={s.link} to={to}>
                <img className={s.img} src={img} alt='img'/>
                <span className={s.text}>{title}</span>
            </NavLink>
        </div>
    );
};