import { FC } from 'react';
import s from './MethodPaymentPopup.module.scss';

import { WrapperPopup } from './../../../../components/WrapperPopup/WrapperPopup';
import { ButtonApp } from './../../../../components/ButtonApp/ButtonApp';

import { useAppSelector } from './../../../../hooks/useAppSelector';
import { useAppActions } from './../../../../hooks/useAppAction';

import { ReactComponent as ImgCross } from './../../../../assets/staticImages/cross.svg';
import { EnumMethodPayment } from './../../../../types/userTypes';

interface IProps {
    closePopup: () => void;
}

export const MethodPaymentPopup: FC<IProps> = ({ closePopup }) => {
    const methodPayment = useAppSelector(state => state.ReducerBasketPage.methodPayment);

    const { setMethodPayment } = useAppActions();

    return (
        <WrapperPopup closePopup={closePopup} classContent={s.methodPayment}>
            <>
                <div className={s.boxCross} onClick={closePopup}>
                    <ImgCross className={s.boxCross__cross}/>
                </div>
                <div className={s.title}>Способ оплаты</div>
                <div className={s.content}>
                    <ButtonApp className={s.button}
                               mayBeSelected={true}
                               onClick={() => setMethodPayment({methodPayment: EnumMethodPayment.cash})}
                               isSelected={methodPayment === EnumMethodPayment.cash}>
                        Наличными при получении
                    </ButtonApp>
                    <ButtonApp className={s.button}
                               mayBeSelected={true}
                               onClick={() => setMethodPayment({methodPayment: EnumMethodPayment.cart})}
                               isSelected={methodPayment === EnumMethodPayment.cart}>
                        Картой при получении
                    </ButtonApp>
                    <ButtonApp className={s.button}
                               mayBeSelected={true}
                               onClick={() => setMethodPayment({methodPayment: EnumMethodPayment.qrCode})}
                               isSelected={methodPayment === EnumMethodPayment.qrCode}>
                        QR-кодом при получении
                    </ButtonApp>
                    <ButtonApp className={`${s.button} ${s.button_save}`}
                               onClick={closePopup}>
                        Сохранить
                    </ButtonApp>
                </div>
            </>
        </WrapperPopup>
    );
};