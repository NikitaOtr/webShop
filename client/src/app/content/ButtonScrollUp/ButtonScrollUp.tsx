import { FC, useState, useEffect } from 'react';
import s from './ButtonScrollUp.module.scss';

import { ButtonApp } from './../../components/ButtonApp/ButtonApp';

import imgArrowUp from './../../assets/staticImages/arrowUp.svg';

export const ButtonScrollUp: FC = () => {
    const [isShowButton, setIsShowButton] = useState(false);

    useEffect(() => {
        const callback = () => {
            if (window.scrollY > 1400) {
                setIsShowButton(true);
           } else {
                setIsShowButton(false);
           }
        };
        window.addEventListener('scroll', callback)
        return () => window.removeEventListener('scroll', callback);
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
    };

    return (
        <ButtonApp className={`${s.buttonScrollUp} ${isShowButton ? s.buttonScrollUp__active : s.buttonScrollUp__inactive}`}
                   onClick={scrollUp}>
            <img src={imgArrowUp} alt='img'/>
        </ButtonApp>
    );
};