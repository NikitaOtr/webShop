import { FC } from 'react';
import s from './FiltersBox.module.scss';

import { FilterPrise } from './../Filter/FilterPrise';
import { Filter } from './../Filter/Filter';

import { useAppSelector } from './../../../../../hooks/useAppSelector';
import { useAppActions } from './../../../../../hooks/useAppAction';

import { EnumOfFilters } from './../../../../../store/Reducers/ReducerCatalogPage';

export const FiltersBox: FC = () => {
    const filterType = useAppSelector(store => store.ReducerCatalog.filters[EnumOfFilters.type]);
    const filterColor = useAppSelector(store => store.ReducerCatalog.filters[EnumOfFilters.color]);
    const filterCompany = useAppSelector(stor => stor.ReducerCatalog.filters[EnumOfFilters.company]);

    const { setFilterByIdInCatalog, resetFilterByIdInCatalog } = useAppActions();


    const setOptionFilterType = (option: string, value: boolean) => {
        setFilterByIdInCatalog({ filterId: EnumOfFilters.type, option, value })
    };

    const setOptionFilterColor = (option: string, value: boolean) => {
        setFilterByIdInCatalog({ filterId: EnumOfFilters.color, option, value });
    };

    const setOptionFilterCompany = (option: string, value: boolean) => {
        setFilterByIdInCatalog({ filterId: EnumOfFilters.company, option, value });
    };

    return (
        <div className={s.filters}>
            <Filter selectData={filterType} setValueByOption={setOptionFilterType} 
                reset={() => resetFilterByIdInCatalog({ filterId: EnumOfFilters.type })}/>
            <Filter selectData={filterColor} setValueByOption={setOptionFilterColor}
                reset={() => resetFilterByIdInCatalog({ filterId: EnumOfFilters.color })}/>
            <Filter selectData={filterCompany} setValueByOption={setOptionFilterCompany}
                reset={() => resetFilterByIdInCatalog({ filterId: EnumOfFilters.company })}/>
            <FilterPrise/>
        </div>
    );
};