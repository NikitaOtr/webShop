import { FormEvent, useEffect, useState, ChangeEvent, useCallback } from 'react';
import s from './FormSearch.module.scss';

import { useAppSelector } from './../../../../../hooks/useAppSelector';
import { useAppActions } from './../../../../../hooks/useAppAction';

import { ButtonApp } from './../../../../../components/ButtonApp/ButtonApp';

import { debounce } from './../../../../../utils/debounce';

export const FormSearch = () => {
    const searchText = useAppSelector(store => store.ReducerCatalog.searchText);
    const [valueInput , setValueInput] = useState('');

    const { setSearchTextInCatalog } = useAppActions();

    const debounceSetSearchTextInCatalog = useCallback(debounce(setSearchTextInCatalog, 300) as typeof setSearchTextInCatalog, []);

    useEffect(() => {
        setValueInput(searchText);
    }, [searchText])
     
    const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchTextInCatalog({ searchText: valueInput });
    };

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const willValueInput = e.target.value
        debounceSetSearchTextInCatalog({ searchText: willValueInput });
        setValueInput(willValueInput);
    }

    return (
        <form className={s.form} onSubmit={onSubmitForm}>
            <input className={s.catalogInput} type='text' value={valueInput} onChange={onChangeInput}/>
            <ButtonApp className={s.button}>Поиск</ButtonApp>
        </form>
    );
};