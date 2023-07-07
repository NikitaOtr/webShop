import { FC, ChangeEvent, Dispatch, SetStateAction } from 'react';
import s from './InputText.module.scss';

export enum EnumStatusInput {
    error,
    normal,
    success,
};

interface IProps {
    title: string,
    value: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
    isValid?: EnumStatusInput | boolean,
    setIsValid?: Dispatch<SetStateAction<boolean>>
    fnValidation?: (value: string) => boolean,
    messageError?: string,
    disabled?: boolean,
    isSuccess?: boolean,
    messageSuccess?: string,
}

export const InputText: FC<IProps> = ({ title, value, onChange, placeholder, 
    isValid=true, messageError, fnValidation, setIsValid, disabled, isSuccess=false, messageSuccess }) => {

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

    const getClassInput = () => {
        let classes = s.input + ' ';
        
        if (disabled) {
            classes += s.input_disabled + ' '; 
        }

        if (isSuccess) {
            if (isValid === EnumStatusInput.success) {
                classes += s.input_success;
            } else if (isValid === EnumStatusInput.error) {
                classes += s.input_error;
            }
        } else {
            if (!isValid) {
                classes += s.input_error; 
            }
        }

        return classes;
    };

    return (
        <div className={s.boxLabel}>
            <label className={s.label} title={value}>
                <span className={s.title}>{title}</span>
                <input className={getClassInput()} 
                       value={value} placeholder={placeholder} disabled={disabled}
                       onChange={onChangeHandler} onBlur={onBlur}/>
            </label>
            {isSuccess
                ?
                    <>
                        {isValid === EnumStatusInput.success &&
                            <span className={`${s.successMessage} ${messageSuccess ? s.active : s.inactive }`}>
                                {messageSuccess}
                            </span>
                        }
                        {isValid === EnumStatusInput.error && 
                            <span className={`${s.errorMessage} ${messageError ? s.active : s.inactive }`}>
                                {messageError}
                            </span>
                        }
                        {isValid === EnumStatusInput.normal && 
                            <span className={`${s.errorMessage} ${s.inactive}`}>
                                {messageSuccess}
                            </span>
                        }
                    </>
                : <span className={`${s.errorMessage} ${messageError && !isValid ? s.active : s.inactive }`}>
                      {messageError}
                  </span>
            }
        </div>
    );
};