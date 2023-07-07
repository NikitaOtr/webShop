import { FC, ReactElement, useEffect, MouseEvent } from 'react';
import s from './DropDownList.module.scss';

import { useOutside } from './../../hooks/useOutside';

import imgArrowDown from './../../assets/staticImages/arrowDown.svg';

interface IProps {
    title: string;
    children: ReactElement;
    className?: string;
    classNameSize: string;
    classNameText: string;
    needClose?: boolean;
}

export const DropDownList: FC<IProps> = ({ title, children, classNameSize, classNameText, className, needClose=false }) => {
    const { ref, isShow, setIsShow } = useOutside(false);

    useEffect(() => {
        setIsShow(false);
    }, [needClose]);

    const onClickSetIsOpen = () => {
        setIsShow(prev => !prev);
    };

    const onClickStopPropagation = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div ref={ref} className={`${className || ''} ${s.dropDownList}`} onClick={onClickSetIsOpen}>
            <div className={`${s.dropDownList__content} ${classNameSize}`}>
                <div className={`${s.dropDownList__content__text} ${classNameText}`}>{title}</div>
                <img className={`${s.dropDownList__content__arrow} ${isShow ? s.dropDownList__content__arrow_active : s.dropDownList__content__arrow_inactive}`} 
                     src={imgArrowDown} alt='img'/>
            </div>
            <div className={`${s.dropDownList__list} ${isShow ? s.dropDownList__list_active : s.dropDownList__list_inactive}`} 
                 onClick={onClickStopPropagation}>
                {children}
            </div>
        </div>
    );
};