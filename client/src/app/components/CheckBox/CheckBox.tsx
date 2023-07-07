import { ChangeEvent, FC } from 'react';
import s from './CheckBox.module.scss';

import { translateToRussian } from './../../utils/translateToRussian';
import { EnumOfTypes } from './../../types/productTypes';

interface IProps {
    option: string;
    value: boolean;
    classNameText: string;
    setValue: (value: boolean) => void;
}

export const CheckBox: FC<IProps> = ({ option, value, classNameText, setValue }) => {

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
       setValue(e.target.checked);
    };

    return (
        <div className={s.checkBox}>
            <label className={s.checkBox__label}>
                <input checked={value} className={s.checkBox__input} type='checkbox' onChange={onChangeInput}/>
                <span className={classNameText || ''}>{translateToRussian[option as EnumOfTypes]}</span>
            </label>
        </div>
    );
};
