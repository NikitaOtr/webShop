import { FC, MouseEvent } from 'react';
import s from './EmptyStub.module.scss';

import { ButtonApp } from './../ButtonApp/ButtonApp';
import { LinkApp } from './../LinkApp/LinkApp';

interface IProps {
    titleText: string;
    buttonText: string;
    srcImage: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    to?: string
}

export const EmptyStub: FC<IProps> = ({titleText, buttonText, srcImage, onClick, to}) => {
    return (
        <div className={s.emptyStub}>
            <div className={s.emptyStub__container}>
                <div className={s.infoBlock}>
                    <h3 className={s.infoBlock__text}>{titleText}</h3>
                    {to
                        ? <LinkApp className={s.infoBlock__button} to={to}>{buttonText}</LinkApp>
                        : <ButtonApp className={s.infoBlock__button} onClick={onClick}>{buttonText}</ButtonApp>
                    }
                </div>
                <img className={s.imageBlock} src={srcImage} alt='img'/>
            </div>
        </div>
    );
};