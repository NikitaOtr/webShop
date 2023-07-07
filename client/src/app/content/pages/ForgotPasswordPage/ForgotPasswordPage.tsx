import { FormEvent, useState, useLayoutEffect, useEffect } from 'react';
import s from './ForgotPasswordPage.module.scss';

import { ButtonApp } from './../../../components/ButtonApp/ButtonApp';
import { InputText } from './../../../components/InputText/InputText';

import { LoaderLine } from './../../../components/LoaderLine/LoaderLine';
import { useAppSelector } from './../../../hooks/useAppSelector';
import { LinkApp } from './../../../components/LinkApp/LinkApp';
import { useAppActions } from './../../../hooks/useAppAction';
import { useInput } from './../../../hooks/useInput';
import { useNavigate } from 'react-router-dom';

import { checkIsValidEmail } from './../../../utils/checkIsValidEmail';
import { EnumOfStatus } from './../../../types/commonTypes';

export const ForgotPasswordPage = () => {
    const user = useAppSelector(state => state.ReducerUser.user);
    const isChangePassword = useAppSelector(state => state.ReducerUser.isChangePassword);
    const status = useAppSelector(state => state.ReducerUser.statusForgotPassword);
    const error = useAppSelector(state => state.ReducerUser.errorForgotPassword);

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [email, bindEmail] = useInput();

    const { changePassword, setStatusForgotPassword, setIsChangePassword } = useAppActions();

    const navigate = useNavigate();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        user && navigate(-1);
        return () => {
            setStatusForgotPassword({ status: EnumOfStatus.Success });
            setIsChangePassword({ value : false});
        };
    }, [user]);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatusForgotPassword({ status: EnumOfStatus.Success });
        if (checkIsValidEmail(email)) {
            setIsValidEmail(true);
            changePassword({ email });
        } else {
            setIsValidEmail(false);
        }
    };

    if (isChangePassword) {
        return (
            <div className={s.container}>
                <ButtonApp className={s.buttonBack} onClick={() => navigate(-1)}>назад</ButtonApp>
                <div className={s.formBox}>
                    <h2>Мы отправили вам сообщение на почту для смены пароля</h2>
                    <LinkApp className={s.link} to='/login'>Авторизоваться</LinkApp>
                </div>
            </div>
        );
    }

    return (
        <div className={s.container}>
            <ButtonApp className={s.buttonBack} onClick={() => navigate(-1)}>назад</ButtonApp>

            <div className={s.formBox}>
                <form className={s.form} onSubmit={onSubmit}>
                    <h2 className={s.title}>Смена пароля</h2>
                    <InputText {...bindEmail} placeholder='Почта' title='Почта' isValid={isValidEmail} fnValidation={checkIsValidEmail}
                        messageError='Почтовый адрес не корректный' setIsValid={setIsValidEmail}/>
                    <span className={`${s.error} ${status === EnumOfStatus.Error ? s.active : s.inactive}`}>
                        {error}
                    </span>
                    <ButtonApp className={s.button}>Сменить пароль</ButtonApp>
                    <LoaderLine className={`${status === EnumOfStatus.Loading ? s.active : s.inactive}`}/>
                </form>
            </div>
        </div>
    );
};
