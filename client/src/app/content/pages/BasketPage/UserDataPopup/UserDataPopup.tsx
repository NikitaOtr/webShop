import { FC, useState, FormEvent } from 'react';
import s from './UserDataPopup.module.scss';

import { WrapperPopup } from './../../../../components/WrapperPopup/WrapperPopup';
import { InputText } from './../../../../components/InputText/InputText';
import { ButtonApp } from './../../../../components/ButtonApp/ButtonApp';

import { useAppSelector } from './../../../../hooks/useAppSelector';
import { useAppActions } from './../../../../hooks/useAppAction';
import { useInput } from './../../../../hooks/useInput';

import { ReactComponent as ImgCross } from './../../../../assets/staticImages/cross.svg';
import { checkIsValidEmail } from './../../../../utils/checkIsValidEmail';

interface IProps {
    closePopup: () => void;
}

export const UserDataPopup: FC<IProps> = ({ closePopup }) => {
    const storUserEmail = useAppSelector(state => state.ReducerBasketPage.userEmail);

    const [userEmail, bindUserEmail] = useInput(storUserEmail);
    const [isValidEmail, setIsValidEmail] = useState(true);

    const { setUserEmail } = useAppActions();

    const onClickSave = () => {
        const localIsValidEmail = checkIsValidEmail(userEmail);

        if (localIsValidEmail) {
            setUserEmail({ userEmail });
            closePopup();
        } else {
            setIsValidEmail(false);
        }
    };

    const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <WrapperPopup closePopup={closePopup} classContent={s.userData}>
            <>
                <div className={s.boxCross} onClick={closePopup}>
                    <ImgCross className={s.boxCross__cross}/>
                </div>
                <div className={s.title}>Данные покупателя</div>
                <form className={s.content} onSubmit={onSubmitForm}>
                    <InputText title='Почта получателя' {...bindUserEmail} placeholder='Почта:' isValid={isValidEmail}
                            messageError='Почтовый адрес не корректный' setIsValid={setIsValidEmail} fnValidation={checkIsValidEmail}/>
                    <ButtonApp onClick={onClickSave} className={s.button}>Сохранить</ButtonApp>
                </form>
            </>
        </WrapperPopup>
    );
};