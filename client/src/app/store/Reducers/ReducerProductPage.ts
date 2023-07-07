import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { apiReviewProducts } from './../../api/mockApiIo/apiReviewProducts';

import { IComment, IProduct, IReviewProduct } from './../../types/productTypes';
import { EnumOfStatus, IDefaultObject } from './../../types/commonTypes';
import { bikes, recommendation } from './../../assets/bikes';
import { getDateFormat } from './../../utils/getDateFormat';
import { EnumOfColors } from './../../types/productTypes';
import { IUser } from './../../types/userTypes';

const initialState = {
    id: '',
    product: null as IProduct,
    count: 1,
    totalSum: 0,
    status: EnumOfStatus.Loading,
    recommendationBikes: [] as Array<IProduct>,
    countCopyUrlOnProduct: 0,
    optionsImgProduct: {
        options: [] as Array<EnumOfColors>,
        value: '' as EnumOfColors,
    },
    
    statusInitProductPage: EnumOfStatus.Loading,
    reviewProduct: {} as IReviewProduct,
    allReviewProducts: {} as IDefaultObject<IReviewProduct>,
};

export const ReducerProductPage = createSlice({
    name: 'ReducerProductPage',
    initialState,
    reducers: {
        setProduct(state, { payload }: PayloadAction<{id: string, product: IProduct, recommendationBikes: Array<IProduct> }>) {
            const product = payload.product
            state.id = payload.id;
            state.product = product;
            state.totalSum = product.price;
            state.count = 1;
            state.optionsImgProduct.options = product.mayBeColors;
            state.optionsImgProduct.value = product.color;
            state.recommendationBikes = payload.recommendationBikes;
            state.reviewProduct = state.allReviewProducts[state.id];
            state.status = EnumOfStatus.Success;
        },

        setCountProductInProductPage(state, { payload }: PayloadAction<{count: number}>) {
            state.count = payload.count;
            state.totalSum = state.product.price * state.count;
        },

        setProductByColorInProductPage(state, { payload, }: PayloadAction<{color: EnumOfColors}>) {
            const prevProduct = state.product;

            const nextProduct = bikes.find(bike => {
                return bike.uuid === prevProduct.uuid && bike.color === payload.color;
            });

            const recommendationBikes = recommendation[nextProduct.type].filter(recommendationBike => {
                return recommendationBike.id !== nextProduct.id;
            });

            state.id = nextProduct.id;
            state.product = nextProduct;
            state.totalSum = nextProduct.price;
            state.count = 1;
            state.optionsImgProduct.value = payload.color;
            state.reviewProduct = state.allReviewProducts[nextProduct.id];
            state.recommendationBikes = recommendationBikes;
        },

        setReviewProducts(state, { payload }: PayloadAction<{allReviewProducts: IDefaultObject<IReviewProduct>}>) {
            state.allReviewProducts = payload.allReviewProducts;
            state.reviewProduct = state.allReviewProducts[state.id];
            state.statusInitProductPage = EnumOfStatus.Success;
        },

        addReviewProduct(state, { payload }: PayloadAction<{rating: number, comment: string, user: IUser}>) {
            state.reviewProduct.rating.count += 1;
            state.reviewProduct.rating.sumRating += payload.rating;
            state.reviewProduct.comments.unshift({
                date: getDateFormat(new Date()),
                comment: payload.comment,
                user: {
                    email: payload.user.email,
                    displayName: payload.user.displayName,
                },
                rating: payload.rating
            });
            state.allReviewProducts[state.id] = state.reviewProduct;
            apiReviewProducts.setReviewProducts(state.allReviewProducts);
            
        },

        changeReviewProduct(state, { payload }: PayloadAction<{index: number, rating: number, comment: string}>) {
            const changeReview = state.reviewProduct.comments[payload.index];

            state.reviewProduct.rating.sumRating += payload.rating - changeReview.rating;
            changeReview.rating = payload.rating;
            changeReview.comment = payload.comment
            state.allReviewProducts[state.id] = state.reviewProduct;
            apiReviewProducts.setReviewProducts(state.allReviewProducts);            
        },

        deleteReviewProduct(state, { payload }: PayloadAction<{comment: IComment, index: number}>) {
            state.reviewProduct.rating.count -= 1;
            state.reviewProduct.rating.sumRating -= payload.comment.rating;

            state.reviewProduct.comments.splice(payload.index, 1);
            state.allReviewProducts[state.id] = state.reviewProduct;
            apiReviewProducts.setReviewProducts(state.allReviewProducts);
        },

        setStatusProductPage(state, { payload }: PayloadAction<{status: EnumOfStatus }>) {
            state.status = payload.status;
        },

        addCountCopyUrlOnProduct(state) {
            state.countCopyUrlOnProduct += 1;
        },
    },
});

const { setProduct, setStatusProductPage, setReviewProducts } = ReducerProductPage.actions;

const setProductToProductPage = createAsyncThunk(
    'ReducerProductPage/setProduct',
    async ({ id }: { id: string }, { dispatch }) => {
        dispatch(setStatusProductPage({ status: EnumOfStatus.Loading }));
        const product = bikes.find(product => product.id === id);

        if (product) {
            const recommendationBikes = recommendation[product.type].filter(recommendationBike => {
                return recommendationBike.id !== product.id;
            });

            setTimeout(() => {
                dispatch(setProduct({ id, product, recommendationBikes }));
            }, 200);
        } else {
            dispatch(setStatusProductPage({ status: EnumOfStatus.Error }));
        }
    }
);

const initProductsPage = createAsyncThunk(
    'ReducerProductPage/initProductsPage',
    async (_, { dispatch }) => {
        try {
            const allReviewProducts = await apiReviewProducts.getReviewProducts();
            dispatch(setReviewProducts({ allReviewProducts }));
        } catch(e) {
            console.log(e);
        }
    }
);

export const actionsProductPage = {
    initProductsPage,
    setProductToProductPage,

    addReviewProduct: ReducerProductPage.actions.addReviewProduct,
    changeReviewProduct: ReducerProductPage.actions.changeReviewProduct,
    deleteReviewProduct: ReducerProductPage.actions.deleteReviewProduct,
    addCountCopyUrlOnProduct: ReducerProductPage.actions.addCountCopyUrlOnProduct,
    setCountProductInProductPage: ReducerProductPage.actions.setCountProductInProductPage,
    setProductByColorInProductPage: ReducerProductPage.actions.setProductByColorInProductPage,
};