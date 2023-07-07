import { FormEvent, useLayoutEffect, useState, useEffect } from 'react';
import s from './RegistrationPage.module.scss';

import { InputPassword } from './../../../components/InputPassword/InputPassword';
import { LoaderLine } from './../../../components/LoaderLine/LoaderLine';
import { ButtonApp } from './../../../components/ButtonApp/ButtonApp';
import { InputText } from './../../../components/InputText/InputText';

import { useAppSelector } from './../../../hooks/useAppSelector';
import { useAppActions } from './../../../hooks/useAppAction';
import { useInput } from './../../../hooks/useInput';
import { useNavigate } from 'react-router-dom';

import { checkIsValidLength } from './../../../utils/checkIsValidLength';
import { checkIsValidEmail } from './../../../utils/checkIsValidEmail';
import { EnumOfStatus } from './../../../types/commonTypes';

export const RegistrationPage = () => {
    const user = useAppSelector(state => state.ReducerUser.user);
    const status = useAppSelector(state => state.ReducerUser.statusRegistration);
    const error = useAppSelector(state => state.ReducerUser.errorRegistration);

    const [nickname, bindNickname] = useInput();
    const [email, bindEmail] = useInput();
    const [password, bindPassword] = useInput();
    const [passwordRepeat, bindPasswordRepeat] = useInput();

    const [isValidNickname, setIsValidNickname] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidPasswordRepeat, setIsValidPasswordRepeat] = useState(true);

    const navigate = useNavigate();

    const { registration, setStatusRegistration } = useAppActions();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        return () => {
            setStatusRegistration({ status: EnumOfStatus.Success });
        };
    }, []);

    useEffect(() => {
        user && navigate(-1);
    }, [user])

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatusRegistration({ status: EnumOfStatus.Success });
        const validNickname = checkIsValidLength(nickname, 2);
        const validEmail = checkIsValidEmail(email);
        const validPassword = checkIsValidLength(password, 6);
        const validPasswordRepeat = password === passwordRepeat;

        if (validNickname && validEmail && validPassword && validPasswordRepeat) {
            setIsValidEmail(true);
            registration({ email, password, nickname });
        } else {
            setIsValidNickname(validNickname);
            setIsValidEmail(validEmail);
            setIsValidPassword(validPassword);
            setIsValidPasswordRepeat(validPasswordRepeat);
        }
    };

    return (
        <div className={s.container}>
            <ButtonApp className={s.buttonBack} onClick={() => navigate(-1)}>назад</ButtonApp>
            <div className={s.formBox}>
                <h2 className={s.title}>Регистрация</h2>
                <form className={s.form} onSubmit={onSubmit}>
                    <InputText title='Псевдоним' {...bindNickname} placeholder='Псевдоним' isValid={isValidNickname}
                        messageError='Псевдоним должен быть более 1 символов' setIsValid={setIsValidNickname} 
                        fnValidation={(s: string) => checkIsValidLength(s, 2)}/>
                    <InputText title='Почта' {...bindEmail} placeholder='Почта' isValid={isValidEmail}
                        messageError='Почтовый адрес не корректный' setIsValid={setIsValidEmail}
                        fnValidation={checkIsValidEmail}/>
                    <InputPassword title='Придумайте пароль' {...bindPassword} placeholder='Пароль' isValid={isValidPassword}
                        messageError='Пароль должен быть более 5 символов' setIsValid={setIsValidPassword} 
                        fnValidation={(s: string) => checkIsValidLength(s, 6)}/>
                    <InputPassword title='Повторите пароль' {...bindPasswordRepeat} placeholder='Пароль' isValid={isValidPasswordRepeat}
                        messageError='Пароли не совпадают' setIsValid={setIsValidPasswordRepeat}
                        fnValidation={(s: string) => password === s}/>
                    <span className={`${s.error} ${status === EnumOfStatus.Error ? s.active : s.inactive}`}>
                        {error}
                    </span>
                    <ButtonApp className={s.button}>Зарегистрироваться</ButtonApp>
                    <LoaderLine className={`${status === EnumOfStatus.Loading ? s.active : s.inactive}`} />
                </form>
            </div>
        </div>
    );
};