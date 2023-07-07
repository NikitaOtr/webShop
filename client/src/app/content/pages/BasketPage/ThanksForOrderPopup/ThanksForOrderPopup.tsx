import { FC, useEffect } from 'react';
import s from './ThanksForOrderPopup.module.scss';

import { WrapperPopup } from './../../../../components/WrapperPopup/WrapperPopup';

import { ReactComponent as ImgCross } from './../../../../assets/staticImages/cross.svg';
import imgBasketThanks from './../../../../assets/staticImagesHint/basketThanks.avif';

interface IProps {
    closePopup: () => void,
}

export const ThanksForOrderPopup: FC<IProps> = ({ closePopup }) => {

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout> = setTimeout(closePopup, 10000);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <WrapperPopup closePopup={closePopup} classContent={s.thanksForOrder}>
            <>
                <div className={s.boxCross} onClick={closePopup}>
                    <ImgCross className={s.boxCross__cross} />
                </div>
                <h2 className={s.thanksForOrder__title}>Спасибо за покупку</h2>
                <span>Мы ждем вас на на месте получения!!!</span>
                <img className={s.thanksForOrder__thanks} src={imgBasketThanks} alt='img'/>
            </>
        </WrapperPopup>
    );
};