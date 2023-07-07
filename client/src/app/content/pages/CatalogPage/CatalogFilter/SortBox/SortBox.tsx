import { FC } from 'react';
import s from './SortBox.module.scss';

import { Filter } from './../Filter/Filter';

import { useAppSelector } from './../../../../../hooks/useAppSelector';
import { useAppActions } from './../../../../../hooks/useAppAction';

export const SortBox: FC = () => {
    const sortBy = useAppSelector(state => state.ReducerCatalog.sort.sortBy);
    const sortOrder = useAppSelector(state => state.ReducerCatalog.sort.sortOrder);

    const { setSortByInCatalog, setSortOrderInCatalog } = useAppActions();

    const setSortBy = (option: string) => {
        setSortByInCatalog({ option });
    };

    const setSortOrder = (option: string) => {
        setSortOrderInCatalog( {option});
    };

    return (
        <div className={s.sort}>
            <Filter selectData={sortBy} setValueByOption={setSortBy}/>
            <Filter selectData={sortOrder} setValueByOption={setSortOrder}/>
        </div>
    );
};