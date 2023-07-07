import { FC, useEffect } from 'react';
import s from './WarningPopup.module.scss';

import { WrapperPopup } from './../WrapperPopup/WrapperPopup';
import { ButtonApp } from './../ButtonApp/ButtonApp';

interface IProps {
    text: string,
    closePopup: () => void,
}

export const WarningPopup: FC<IProps> = ({text, closePopup}) => {
    useEffect(() => {
        const timeout = setTimeout(closePopup, 10000);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <WrapperPopup classContent={s.warningPopup} isWarning={true} closePopup={closePopup}>
            <>
                <div className={s.warningPopup__content}>{text}</div>
                <ButtonApp className={s.warningPopup__button} onClick={closePopup}>Ок</ButtonApp>
            </>
        </WrapperPopup>
    );
};