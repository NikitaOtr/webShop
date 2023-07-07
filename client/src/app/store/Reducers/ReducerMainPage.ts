import { createSlice} from '@reduxjs/toolkit';

import { recommendation } from './../../assets/bikes';

const initialState = {
    mountainBikes: recommendation.mountain,
    doubleSuspendedBikes: recommendation.doubleSuspended,
    kidsBikes: recommendation.kids,
    electricalBikes: recommendation.electrical,
};

export const ReducerMainPage = createSlice({
    name: 'ReducerMainPage',
    initialState,
    reducers: {},
});