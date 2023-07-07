import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EnumOfColors, EnumOfCompanies, EnumOfTypes } from './../../types/productTypes';
import { IProduct } from './../../types/productTypes';
import { IFilter } from './../../types/filterTypes';

import { bikes } from './../../assets/bikes';

export enum EnumOfFilters {
    type = 'type',
    color = 'color',
    company = 'company',
}

/**
 * Сортировка каталога по параметрам.
 * @param {typeof initialState} state - состояние cлайса.
 * @param {Array<IProduct>} bikes - список всех велосипедов.
 * @return {Array<IProduct>}
 */
const sort = (state: typeof initialState, bikes: Array<IProduct>) => {
    const sortBy = state.sort.sortBy.value;
    const order = state.sort.sortOrder.value;

    if (sortBy === 'rating') {
        if (order === 'asc') {
            return bikes.sort((a, b) => {
                return a.id > b.id ? 1 : -1;
            });
        } else {
            return bikes.sort((a, b) => {
                return a.id > b.id ? -1 : 1;
            });
        }
    } else {
        if (order === 'asc') {
            return bikes.sort((a, b) => {
                return a.price - b.price;
            });
        } else {
            return bikes.sort((a, b) => {
                return b.price - a.price;
            });
        }
    }
};

/**
 * Фильтрация каталога по параметрам.
 * @param {typeof initialState} state - состояние cлайса.
 * @return {Array<IProduct>}
 */
const filtration = (state: typeof initialState) => {
    let newBikes =  [...bikes];

    if (state.searchText) {
        const searchText = state.searchText.toLowerCase();
        newBikes = bikes.filter(bike => bike.searchString.includes(searchText));
    }

    const minPriseFilter = state.minPriseFilter;
    const maxPriseFilter = state.maxPriseFilter;

    newBikes = newBikes.filter(bike => minPriseFilter <= bike.price && bike.price <= maxPriseFilter);

    state.filtersId.forEach(filterId => {
        const options = state.filters[filterId].options;
        const values = state.filters[filterId].values;

        const needFilter = options.some(option => values[options[0]] !== values[option]);

        if (needFilter) {
            newBikes = newBikes.filter(bike =>
                options.some(option => {
                    return (values[option] && bike[filterId] === option)
                })
            );
        };
    });

    return newBikes;
};

/**
 * Начальное состояние слайса каталога.
 */
const initialState = {
    bikes,
    searchText: '',
    minPriseBike: 0,
    maxPriseBike: 200000,
    minPriseFilter: 0,
    maxPriseFilter: 200000,
    filtersId: [EnumOfFilters.type, EnumOfFilters.color, EnumOfFilters.company],
    filters: {
        [EnumOfFilters.type]: {
            name: 'Категория',
            options: [EnumOfTypes.mountain, EnumOfTypes.doubleSuspended, EnumOfTypes.kids, EnumOfTypes.electrical] as Array<string>,
            values: {
                [EnumOfTypes.mountain]: false,
                [EnumOfTypes.doubleSuspended]: false,
                [EnumOfTypes.kids]: false,
                [EnumOfTypes.electrical]: false,
            },
        } as IFilter,

        [EnumOfFilters.color]: {
            name: 'Цвет',
            options: [EnumOfColors.blue, EnumOfColors.green, EnumOfColors.grey, 
                EnumOfColors.orange, EnumOfColors.red, EnumOfColors.black] as Array<string>,
            values: {
                [EnumOfColors.blue]: false,
                [EnumOfColors.green]: false,
                [EnumOfColors.grey]: false,
                [EnumOfColors.orange]: false,
                [EnumOfColors.red]: false,
                [EnumOfColors.black]: false,
            },
        } as IFilter,

        [EnumOfFilters.company]: {
            name: 'Производитель',
            options: [EnumOfCompanies.bulls, EnumOfCompanies.merida, EnumOfCompanies.stinger, EnumOfCompanies.trek],
            values: {
                [EnumOfCompanies.bulls]: false,
                [EnumOfCompanies.merida]: false,
                [EnumOfCompanies.stinger]: false,
                [EnumOfCompanies.trek]: false,
            },
        } as IFilter,
    },
    sort: {
        sortBy: {
            name: 'Сортировать по',
            options: ['rating', 'price'],
            value: 'rating',
        },
        sortOrder: {
            name: 'Порядок сортировки',
            options: ['desc', 'asc'],
            value: 'desc',
        },
    },
};

export const ReducerCatalog = createSlice({
    name: 'ReducerCatalog',
    initialState,
    reducers: {
        /**
         * Установка строки поиска.
         * @param {string} searchText - строка поиска.
         */
        setSearchTextInCatalog(state, { payload }: PayloadAction<{ searchText: string }>) {
            state.searchText = payload.searchText;
            const newBikes = filtration(state);
            state.bikes = sort(state, newBikes);
        },

        /**
         * Установка конкретного фильтра.
         * @param {EnumOfFilters} filterId - идентификатор фильтра.
         * @param {string} option - опция фильтра.
         * @param {boolean} value - значение опции.
         */
        setFilterByIdInCatalog(state, { payload }: PayloadAction<{ filterId: EnumOfFilters, option: string, value: boolean }>) {
            const values = state.filters[payload.filterId].values;
            values[payload.option] = payload.value;
            const newBikes = filtration(state);
            state.bikes = sort(state, newBikes);
        },

        /**
         * Сброс конкретного фильтра.
         * @param {EnumOfFilters} filterId - идентификатор фильтра.
         */
        resetFilterByIdInCatalog(state, { payload }: PayloadAction<{ filterId: EnumOfFilters }> ) {
            const options = state.filters[payload.filterId].options;
            const values = state.filters[payload.filterId].values;

            options.forEach(option => values[option] = false);

            const newBikes = filtration(state);
            state.bikes = sort(state, newBikes);
        },

        /**
         * Установка типа сортировки.
         * @param {boolean} value - тип сортировки.
         */
        setSortByInCatalog(state, { payload }: PayloadAction<{ option: string }>) { 
            state.sort.sortBy.value = payload.option;

            const newBikes = filtration(state);
            state.bikes = sort(state, newBikes);
        },

        /**
         * Установка порядка сортировки конкретного фильтра.
         * @param {boolean} value - порядок сортировки.
         */
        setSortOrderInCatalog(state, { payload }: PayloadAction<{ option: string }>) {
            state.sort.sortOrder.value = payload.option;

            const newBikes = filtration(state);
            state.bikes = sort(state, newBikes);
        },

        /**
         * Установка опций фильтрации и сортировки при инициализации. 
         * @param {string | null} searchString - строка поиска.
         * @param {string | null} sortBy - значение типа сортировки.
         * @param {string | null} sortOrder - значение порядка сортировки.
         * @param {string | null} color - значение фильтра по цвету.
         * @param {string | null} type - значение фильтра по категории.
         * @param {string | null} company - значение фильтра по компании.
         * @param {string | null} minPrise - значение фильтра минимальной цены.
         * @param {string | null} maxPrise - значение фильтра максимальной цены.
         */
        setOptionInCatalog(state, { payload }: PayloadAction<{ 
            searchString: string | null,
            sortBy: string | null, 
            sortOrder: string | null,
            color: string | null,
            type: string | null,
            company: string | null,
            minPrise: string | null,
            maxPrise: string | null,
        }>) {
            let isNeedUpdate = false;

            if (payload.searchString) {
                state.searchText = payload.searchString;
                isNeedUpdate = true;
            }

            if (payload.sortBy) {
                state.sort.sortBy.value = payload.sortBy
                isNeedUpdate = true;
            }

            if (payload.sortOrder) {
                state.sort.sortOrder.value = payload.sortOrder;
                isNeedUpdate = true;
            }

            if (payload.color) {
                const colors = payload.color.split(',');
                colors.forEach(color => {
                    state.filters[EnumOfFilters.color].values[color] = true;
                });
                isNeedUpdate = true;
            }

            if (payload.type) {
                const types = payload.type.split(',');
                types.forEach(type => {
                    state.filters[EnumOfFilters.type].values[type] = true;
                });
                isNeedUpdate = true;
            }

            if (payload.company) {
                const companies = payload.company.split(',');
                companies.forEach(company => {
                    state.filters[EnumOfFilters.company].values[company] = true;
                });
                isNeedUpdate = true;
            }

            const minPriseBike = parseInt(payload.minPrise);
            if (minPriseBike) {
                state.minPriseFilter = minPriseBike;
                isNeedUpdate = true;
            }

            const maxPriseBike = parseInt(payload.maxPrise);
            if (maxPriseBike) {
                state.maxPriseFilter = maxPriseBike;
                isNeedUpdate = true;
            }

            if (isNeedUpdate) {
                const newBikes = filtration(state);
                state.bikes = sort(state, newBikes);
            }
        },

        /**
         * Установка параметров для сортировки по цене.
         * @param {number} minPriseFilter - значение фильтра минимальной цены.
         * @param {number} maxPriseFilter - значение фильтра максимальной цены.
         * @return {Array<IProduct>}
         */
        setPrisesInCatalog(state, { payload }: PayloadAction<{minPriseFilter?: number, maxPriseFilter?: number}>) {
            if (payload.minPriseFilter || payload.minPriseFilter === 0) {
                state.minPriseFilter = payload.minPriseFilter;
            }

            if (payload.maxPriseFilter) {
                state.maxPriseFilter = payload.maxPriseFilter;
            }

            const newBikes = filtration(state);
            state.bikes = sort(state, newBikes);
        },

        /**
         * Сброс параметров для сортировки по цене.
         */
        resetPrisesInCatalog(state) {
            state.minPriseFilter = state.minPriseBike;
            state.maxPriseFilter = state.maxPriseBike;

            const newBikes = filtration(state);
            state.bikes = sort(state, newBikes);
        },

        /**
         * Сброс всех параметров фильтрации.
         */
        resetFilterInCatalog(state) {
            state.searchText = '';

            state.minPriseFilter = state.minPriseBike;
            state.maxPriseFilter = state.maxPriseBike;
            
            state.filtersId.forEach(filterId => {
                const options = state.filters[filterId].options;
                const values = state.filters[filterId].values;
                options.forEach(option => {
                    values[option] = false;
                });
            });
            state.bikes = bikes;
        },

        /**
         * Сброс всех параметров фильтрации и сортировки.
         */
        resetOptionInCatalog(state) {
            state.searchText = '';

            state.sort.sortBy.value = 'rating';
            state.sort.sortOrder.value = 'desc';

            state.minPriseFilter = state.minPriseBike;
            state.maxPriseFilter = state.maxPriseBike;
            
            state.filtersId.forEach(filterId => {
                const options = state.filters[filterId].options;
                const values = state.filters[filterId].values;
                options.forEach(option => {
                    values[option] = false;
                });
            });

            state.bikes = bikes;
        },
    },
});


export const actionsCatalog = ReducerCatalog.actions;