import { FC } from 'react';
import s from './MethodGetPopup.module.scss';

import { WrapperPopup } from './../../../../components/WrapperPopup/WrapperPopup';
import { ButtonApp } from './../../../../components/ButtonApp/ButtonApp';
import { Courier } from './Courier/Courier';
import { Pickup } from './Pickup/Pickup';

import { useAppSelector } from './../../../../hooks/useAppSelector';
import { useAppActions } from './../../../../hooks/useAppAction';

import { ReactComponent as ImgCross } from './../../../../assets/staticImages/cross.svg';
import { EnumMethodGet } from './../../../../types/userTypes';

interface IProps {
    closePopup: () => void;
}

export const MethodGetPopup: FC<IProps> = ({ closePopup }) => {
    const methodGet = useAppSelector(state => state.ReducerBasketPage.methodGet);

    const { setMethodGet } = useAppActions();

    return (
        <WrapperPopup closePopup={closePopup} classContent={s.popupMethodGet}>
            <>
                <div className={s.boxCross} onClick={closePopup}>
                    <ImgCross className={`${s.boxCross} ${s.boxCross__cross}`}/>
                </div>
                <div className={s.title}>Способ доставки</div>
                <div className={s.boxButton}>
                    <ButtonApp className={s.boxButton__button}
                               mayBeSelected={true}
                               isSelected={methodGet === EnumMethodGet.pickup}
                               onClick={() => setMethodGet({methodGet: EnumMethodGet.pickup})}>
                        Самовывоз
                    </ButtonApp>
                    <ButtonApp className={s.boxButton__button}
                               mayBeSelected={true}
                               isSelected={methodGet === EnumMethodGet.courier}
                               onClick={() => setMethodGet({methodGet: EnumMethodGet.courier})}>
                        Курьером
                    </ButtonApp>
                </div>
                {methodGet === EnumMethodGet.pickup 
                    ? <Pickup closePopup={closePopup}/> 
                    : <Courier closePopup={closePopup}/>
                } 
            </>
        </WrapperPopup>
    );
};