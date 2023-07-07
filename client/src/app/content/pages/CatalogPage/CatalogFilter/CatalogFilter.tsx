import { useEffect, useLayoutEffect, useRef } from 'react';
import s from './CatalogFilter.module.scss';

import { FiltersBox } from './FiltersBox/FiltersBox';
import { FormSearch } from './FormSearch/FormSearch';
import { SortBox } from './SortBox/SortBox';

import { useAppSelector } from './../../../../hooks/useAppSelector';
import { useAppActions } from './../../../../hooks/useAppAction';
import { useSearchParams } from 'react-router-dom';

import { createStringForSearchParams } from './../../../../utils/createStringForSearchParams';
import { EnumOfFilters } from './../../../../store/Reducers/ReducerCatalogPage';
import { IDefaultObject } from './../../../../types/commonTypes';

export const CatalogFilter = () => {
    const searchString = useAppSelector(state => state.ReducerCatalog.searchText);
    const sortBy = useAppSelector(state => state.ReducerCatalog.sort.sortBy.value);
    const sortOrder = useAppSelector(state => state.ReducerCatalog.sort.sortOrder.value);
    const color = useAppSelector(state => state.ReducerCatalog.filters[EnumOfFilters.color]);
    const type = useAppSelector(state => state.ReducerCatalog.filters[EnumOfFilters.type]);
    const company = useAppSelector(state=> state.ReducerCatalog.filters[EnumOfFilters.company]);
    const minPriseBike = useAppSelector(state => state.ReducerCatalog.minPriseBike);
    const maxPriseBike = useAppSelector(state => state.ReducerCatalog.maxPriseBike)
    const minPriseFilter = useAppSelector(state => state.ReducerCatalog.minPriseFilter);
    const maxPriseFilter = useAppSelector(state => state.ReducerCatalog.maxPriseFilter);

    const [ searchParams, setSearchParams ] = useSearchParams();

    const { setOptionInCatalog, resetOptionInCatalog } = useAppActions();

    const notNeedFilterInUrl = useRef(true);

    useLayoutEffect(() => {
        const searchString = searchParams.get('searchString');
        const sortBy = searchParams.get('sortBy');
        const sortOrder = searchParams.get('sortOrder');
        const color = searchParams.get('color');
        const type = searchParams.get('type');
        const company = searchParams.get('company');
        const minPrise = searchParams.get('minPrise');
        const maxPrise = searchParams.get('maxPrise');
        setOptionInCatalog({ searchString, sortBy, sortOrder, color, type, company, minPrise, maxPrise });
        return () => {
            resetOptionInCatalog();
        };
    }, []);

    useEffect(() => {
        if (notNeedFilterInUrl.current) {
            notNeedFilterInUrl.current = false;
            return;
        }

        const objParams: IDefaultObject<string> = {};

        if (searchString) {
            objParams.searchString = searchString;
        }

        if (sortBy !== 'rating') {
            objParams.sortBy = sortBy;
        }

        if (sortOrder !== 'desc') {
           objParams.sortOrder = sortOrder;
        }

        const stringType = createStringForSearchParams(type);
        if (stringType) {
            objParams.type = stringType;
        }

        const stringColor = createStringForSearchParams(color);
        if (stringColor) {
            objParams.color = stringColor;
        }

        const stringCompany = createStringForSearchParams(company);
        if (stringCompany) {
            objParams.company = stringCompany;
        }

        if (minPriseBike !== minPriseFilter) {
            objParams.minPrise = minPriseFilter.toString();
        }

        if (maxPriseBike !== maxPriseFilter) {
            objParams.maxPrise = maxPriseFilter.toString();
        }

        setSearchParams(objParams);
    }, [searchString, sortBy, sortOrder, type, color, company, minPriseFilter, maxPriseFilter]);

    return (
        <div className={s.catalogFilter}>
            <FormSearch/>
            <FiltersBox/>
            <SortBox/>
        </div>
    );
};