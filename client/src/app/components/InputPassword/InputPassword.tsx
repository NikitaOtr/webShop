import { FC, ChangeEvent, useState, useMemo, MouseEvent, Dispatch, SetStateAction } from 'react';
import s from './InputPassword.module.scss';

import imgEyeCross from './../../assets/staticImages/eyeCross.svg';
import imgEye from './../../assets/staticImages/eye.svg';

interface IProps {
    title: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    setIsValid?: Dispatch<SetStateAction<boolean>>
    fnValidation?: (value: string) => boolean,
    isValid: boolean,
    messageError?: string,
}

export const InputPassword: FC<IProps> = ({ title, value, onChange, placeholder, isValid, messageError,
    setIsValid, fnValidation }) => {
    const [ isShow, setIsShow] = useState(false);

    const onBlur = () => {
        if (setIsValid) {
            setIsValid(true);
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (fnValidation && setIsValid) {
            fnValidation(e.target.value) && setIsValid(true);
        }
        onChange(e);
    };

    const img = useMemo(() => {
        return isShow ? imgEye : imgEyeCross;
    }, [isShow]);

    const onClickButtonShow = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsShow(prev => !prev);
    };

    return (
        <div className={s.boxLabel}>
            <label className={s.label}>
                <span className={s.title}>{title}</span>
                <input className={`${s.input} ${isValid ? s.normal : s.error}`} value={value} placeholder={placeholder} type={isShow ? 'text' : 'password'}
                    onChange={onChangeHandler} onBlur={onBlur}/>
                <div className={s.buttonShow} onClick={onClickButtonShow}>
                    <img className={s.buttonShow__img} src={img} alt='img' />
                </div>
            </label>
            <span className={`${s.errorMessage} ${messageError && !isValid ? s.active : s.inactive}`}>
                {messageError}
            </span>
        </div>
    );
};