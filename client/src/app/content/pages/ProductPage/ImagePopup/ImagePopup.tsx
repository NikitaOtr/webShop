import { FC } from 'react';
import s from './ImagePopup.module.scss';

import { ReactComponent as ImgCross } from './../../../../assets/staticImages/cross.svg';
import { WrapperPopup } from './../../../../components/WrapperPopup/WrapperPopup';

interface IProps {
    closePopup: () => void;
    src: string;
}

export const ImagePopup: FC<IProps> = ({ closePopup, src }) => {
    return (
        <WrapperPopup classContent={s.imagePopup__img} closePopup={closePopup}>
            <>
                <div className={s.imagePopup__boxCross}>
                    <ImgCross onClick={closePopup} className={s.imagePopup__boxCross__cross}/>
                </div>
                <div className={s.boxImg}>
                    <img className={s.boxImg__img} src={src} alt='img'/>
                </div>
            </>
        </WrapperPopup>
    );
};