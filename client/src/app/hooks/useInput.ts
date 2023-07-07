import { useState, ChangeEvent } from 'react';

export const useInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);

    const reset = () => { 
         setValue(initialValue);
    };

    const bind = {
        value,
        onChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
            setValue(e.target.value);
        },
    };

    return [value, bind, setValue, reset] as [string, typeof bind, (value: string) => void, () => void];
};