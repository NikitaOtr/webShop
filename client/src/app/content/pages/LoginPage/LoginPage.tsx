import { FormEvent, useLayoutEffect, useState, useEffect } from 'react';
import s from './LoginPage.module.scss';

import { InputPassword } from './../../../components/InputPassword/InputPassword';
import { LoaderLine } from './../../../components/LoaderLine/LoaderLine';
import { ButtonApp } from './../../../components/ButtonApp/ButtonApp';
import { InputText } from './../../../components/InputText/InputText';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector } from './../../../hooks/useAppSelector';
import { useAppActions } from './../../../hooks/useAppAction';
import { useInput } from './../../../hooks/useInput';

import { checkIsValidLength } from './../../../utils/checkIsValidLength';
import { checkIsValidEmail } from './../../../utils/checkIsValidEmail';
import { EnumOfStatus } from './../../../types/commonTypes';

export const LoginPage = () => {
    const user = useAppSelector(state => state.ReducerUser.user);
    const status = useAppSelector(state => state.ReducerUser.statusLogin);
    const error = useAppSelector(state => state.ReducerUser.errorLogin);

    const [email, bindEmail] = useInput();
    const [password, bindPassword] = useInput();

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);

    const navigate = useNavigate();

    const { login, setStatusLogin } = useAppActions();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        return () => {
            setStatusLogin({ status: EnumOfStatus.Success });
        };
    }, []);

    useEffect(() => {
        user && navigate(-1);
    }, [user])

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatusLogin({ status: EnumOfStatus.Success });
        const validEmail = checkIsValidEmail(email);
        const validPassword = checkIsValidLength(password, 1);
        if (validEmail && validPassword) {
            login({ email, password });            
        } else {
            setIsValidEmail(validEmail);
            setIsValidPassword(validPassword);
        }
    };

    return (
        <div className={s.container}>
            <ButtonApp className={s.buttonBack} onClick={() => navigate(-1)}>назад</ButtonApp>
            <div className={s.formBox}>
                <h2 className={s.title}>Войти</h2>
                <form className={s.form} onSubmit={onSubmit}>
                    <InputText title='Почта' {...bindEmail} placeholder='Почта' isValid={isValidEmail}
                        messageError='Почтовый адрес не корректный' setIsValid={setIsValidEmail} fnValidation={checkIsValidEmail}/>
                    <InputPassword title='Пароль' {...bindPassword} placeholder='Пароль' isValid={isValidPassword}
                        messageError='Пароль обязателен для заполнения' setIsValid={setIsValidPassword} 
                        fnValidation={(s: string) => checkIsValidLength(s, 1)}/>
                    <span className={`${s.error} ${status === EnumOfStatus.Error ? s.active : s.inactive}`}>
                        {error}
                    </span>
                    <ButtonApp className={s.button}>Войти</ButtonApp>
                    <LoaderLine className={`${status === EnumOfStatus.Loading ? s.active : s.inactive}`} />
                </form>
                <Link className={s.link} to='/registration'>Зарегистрироваться</Link>
                <Link className={s.link} to='/forgotPassword'>Забыл пароль</Link>
            </div>
        </div>
    );
};