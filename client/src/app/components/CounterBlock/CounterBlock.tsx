import { ChangeEvent, FC } from 'react';
import s from './CounterBlock.module.scss';

interface IProps {
    className?: string,
    value: number,
    maxValue?: number,
    setValue: (n: number) => void,
}

export const CounterBlock: FC<IProps> = ({ className, value, maxValue=100, setValue }) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') {
            return setValue(0);
        }
        const number = +e.target.value;
        if (number && number <= maxValue) {
            setValue(number);
        }
    };

    const onClickAdd = () => {
        setValue(value + 1);
    };

    const onClickSubtract = () => {
        setValue(value - 1);
    };
    
    const onBlurHandler = () => {
        value === 0 && setValue(1);
    };

    const inputValue = value === 0 ? '' : value;

    return (
        <div className={s.box}>
            <button className={`${s.button} ${className}`} disabled={+value <= 1} onClick={onClickSubtract}>-</button>
            <input className={`${className} ${s.count}`} value={inputValue} onChange={onChangeHandler} onBlur={onBlurHandler}/>
            <button className={`${s.button} ${className}`} disabled={+value >= maxValue} onClick={onClickAdd}>+</button>
        </div>
    );
};