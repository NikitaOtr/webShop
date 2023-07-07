import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { apiFavoritesProducts } from './../../api/mockApiIo/apiFavoritesProducts';
import { apiOrder } from './../../api/mockApiIo/apiOrders';
import { apiAuth } from './../../api/firebaseApi/apiAuth';

import { getDifferenceDateInDays } from './../../utils/getDifferenceDateInDays';
import { keysLocalStorage } from './../../utils/keysLocalStorage';
import { IDefaultObject } from './../../types/commonTypes';
import { EnumOfStatus } from './../../types/commonTypes';
import { actionsBasketPage } from './ReducerBasketPage';
import { IProduct } from './../../types/productTypes';
import { IOrder } from './../../types/orderTypes';
import { IUser } from './../../types/userTypes';

const getOrderDetails = (allOrders: Array<IOrder>, user: IUser) => {
    const userOrders = allOrders.filter(order => {
        return order.userEmail === user?.email;
    });

    const readyOrders = [];
    const notReadyOrders = [];
    userOrders.forEach(order => {
        const differenceDays = getDifferenceDateInDays(order.orderDate);
        if (differenceDays >= 7) {
            readyOrders.push(order);
        } else {
            notReadyOrders.push(order);
        }
    });

    const readyOrdersProducts = readyOrders.map(order => order.products[0]);
    const notReadyOrdersProducts = notReadyOrders.map(order => order.products[0]);

    const uniqueSet= new Set();
    const arrayPurchasedProducts = userOrders.flatMap(order => {
        const uniqueProducts = order.products.filter(product => {
            const notNeedAdd = uniqueSet.has(product.id);
            uniqueSet.add(product.id);
            return !notNeedAdd;
        });
        return uniqueProducts;
    });

    const purchasedProducts = {};

    arrayPurchasedProducts.forEach(product => {
        purchasedProducts[product.id] = product
    });


    const countOrders = userOrders.length;
    const totalSumOrders = userOrders.reduce((totalSum, order) => totalSum + order.totalSum, 0);

    return {
        readyOrders,
        readyOrdersProducts,
        notReadyOrders,
        notReadyOrdersProducts,
        purchasedProducts,
        countOrders,
        totalSumOrders,
    };
};

const initialState = {
    user: localStorage.getItem(keysLocalStorage.user) 
            ? JSON.parse(localStorage.getItem(keysLocalStorage.user)) as IUser | null
            : null as IUser | null,

    statusLogin: EnumOfStatus.Success,
    errorLogin: '',

    statusForgotPassword: EnumOfStatus.Success,
    errorForgotPassword: '',
    isChangePassword: false,

    statusRegistration: EnumOfStatus.Success,
    errorRegistration: '',

    allFavoritesProducts: {} as IDefaultObject<IDefaultObject<IProduct>>,
    favoritesProducts: {} as IDefaultObject<IProduct>,
    countAddInFavorites: 0,
    countRemoveFromFavorites: 0,

    statusOrders: EnumOfStatus.Loading,
    allOrders: [] as Array<IOrder>,
    purchasedProducts: {} as IDefaultObject<IProduct>,
    readyOrders: [] as Array<IOrder>,
    readyOrdersProducts: [] as Array<IProduct>,
    notReadyOrders: [] as Array<IOrder>,
    notReadyOrdersProducts: [] as Array<IProduct>,
    countOrders: 0,
    totalSumOrders: 0,
};

export const ReducerUser = createSlice({
    name: 'ReducerUser',
    initialState,
    reducers: {
        setUser(state, { payload }: PayloadAction<{ user: IUser }>) {
            state.user = payload.user;
            state.favoritesProducts = state.allFavoritesProducts[state.user.email] || {};

            const orderDetails = getOrderDetails(state.allOrders, state.user);
            state.readyOrders = orderDetails.readyOrders;
            state.readyOrdersProducts = orderDetails.readyOrdersProducts;
            state.notReadyOrders = orderDetails.notReadyOrders;
            state.notReadyOrdersProducts = orderDetails.notReadyOrdersProducts;
            state.purchasedProducts = orderDetails.purchasedProducts;
            state.countOrders = orderDetails.countOrders;
            state.totalSumOrders = orderDetails.totalSumOrders;
            localStorage.setItem(keysLocalStorage.user, JSON.stringify(payload.user));
        },

        resetUser(state) {
            state.user = null;
            state.purchasedProducts = {};
            state.readyOrders = [];
            state.readyOrdersProducts = [];
            state.notReadyOrders = [];
            state.notReadyOrdersProducts = [];
            state.countOrders = 0;
            state.totalSumOrders = 0;
            state.favoritesProducts = {};
            localStorage.removeItem(keysLocalStorage.user);
        },

        setStatusLogin(state, { payload }: PayloadAction<{ status: EnumOfStatus }>) {
            if (payload.status !== EnumOfStatus.Error) {
                state.errorLogin = '';
            }
            state.statusLogin = payload.status;
        },

        setStatusForgotPassword(state, { payload }: PayloadAction< {status: EnumOfStatus }>) {
            if (payload.status !== EnumOfStatus.Error) {
                state.errorForgotPassword = '';
            }
            state.statusForgotPassword = payload.status;
        },

        setStatusRegistration(state, { payload }: PayloadAction<{ status: EnumOfStatus }>) {
            if (payload.status !== EnumOfStatus.Error) {
                state.errorRegistration = '';
            }
            state.statusRegistration = payload.status;
        },

        setErrorLogin(state, { payload }: PayloadAction<{ error: string}>) {
            state.errorLogin = payload.error;
        },

        setErrorForgotPassword(state, { payload }: PayloadAction<{ error: string}>) {
            state.errorForgotPassword = payload.error;
        },

        setErrorRegistration(state, { payload }: PayloadAction<{ error: string }>) {
            state.errorRegistration = payload.error;
        },

        setIsChangePassword(state, { payload }: PayloadAction<{ value: boolean }>) {
            state.isChangePassword = payload.value;
        },

        setFavoritesProducts(state, { payload }: PayloadAction<{ allFavoritesProducts: IDefaultObject<IDefaultObject<IProduct>> }>) {
            state.allFavoritesProducts = payload.allFavoritesProducts;
            if (state.user) {
                state.favoritesProducts = payload.allFavoritesProducts[state.user.email] || {};  
            }
        },

        addToFavoritesProducts(state, { payload }: PayloadAction<{ product: IProduct }>) {
            const product = payload.product;
            state.favoritesProducts[product.id] = product;
            state.countAddInFavorites += 1;
            state.allFavoritesProducts[state.user.email] = state.favoritesProducts;
            apiFavoritesProducts.setFavoritesProducts(state.allFavoritesProducts);
        },

        removeFromFavoritesProducts(state, { payload }: PayloadAction<{ product: IProduct }>) {
            delete state.favoritesProducts[payload.product.id];
            state.countRemoveFromFavorites++;
            state.allFavoritesProducts[state.user.email] = state.favoritesProducts;
            apiFavoritesProducts.setFavoritesProducts(state.allFavoritesProducts);
        },

        setOrders(state, { payload }: PayloadAction<{ allOrders: Array<IOrder> }>) {
            state.allOrders = payload.allOrders;
           
            const orderDetails = getOrderDetails(state.allOrders, state.user);
            state.readyOrders = orderDetails.readyOrders;
            state.readyOrdersProducts = orderDetails.readyOrdersProducts;
            state.notReadyOrders = orderDetails.notReadyOrders;
            state.notReadyOrdersProducts = orderDetails.notReadyOrdersProducts;
            state.purchasedProducts = orderDetails.purchasedProducts;
            state.countOrders = orderDetails.countOrders;
            state.totalSumOrders = orderDetails.totalSumOrders;
            state.statusOrders = EnumOfStatus.Success;
        },

        addOrders(state, { payload }: PayloadAction<{ order: IOrder }>) {
            state.allOrders.unshift(payload.order);
            
            const orderDetails = getOrderDetails(state.allOrders, state.user);
            state.readyOrders = orderDetails.readyOrders;
            state.readyOrdersProducts = orderDetails.readyOrdersProducts;
            state.notReadyOrders = orderDetails.notReadyOrders;
            state.notReadyOrdersProducts = orderDetails.notReadyOrdersProducts;
            state.purchasedProducts = orderDetails.purchasedProducts;
            state.countOrders = orderDetails.countOrders;
            state.totalSumOrders = orderDetails.totalSumOrders;
        },
    },
});

const { setUser, resetUser, setStatusLogin, setErrorLogin,
    setStatusForgotPassword, setErrorForgotPassword, setIsChangePassword,
    setStatusRegistration, setErrorRegistration,
    setOrders, setFavoritesProducts  } = ReducerUser.actions;

const login = createAsyncThunk(
    'ReducerUser/login',
    async ({ email, password } : { email: string, password: string }, { dispatch, getState }) => {
        try {
            dispatch(setStatusLogin({ status: EnumOfStatus.Loading }));
            const user = await apiAuth.login(email, password);
            dispatch(setUser({ user }));
            dispatch(actionsBasketPage.afterLoginWorkBasketPage({ user: user }));
            dispatch(setStatusLogin({ status: EnumOfStatus.Success }));
        } catch (e) {
            dispatch(setStatusLogin({ status: EnumOfStatus.Error }));
            if(e instanceof Error) {
                if (e.message === 'Firebase: Error (auth/invalid-email).'){
                    dispatch(setErrorLogin({error: 'Вы указали не верный почтовый адрес'}))
                } else if (e.message === 'Firebase: Error (auth/internal-error).'
                    || e.message === 'Firebase: Error (auth/wrong-password).') {
                    dispatch(setErrorLogin({ error: 'Вы указали не верный пароль' }))
                } else if (e.message === 'Firebase: Error (auth/user-not-found).') {
                    dispatch(setErrorLogin({error: 'Данный почтовый адрес не зарегистрирован в нашем магазине'}))
                } else if (e.message === 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).') {
                    dispatch(setErrorLogin({ error: 'Доступ к этой учетной записи временно отключен из-за множества неудачных попыток входа в систему. Вы можете немедленно восстановить его, сбросив пароль, или вы можете повторить попытку позже.'}));
                } else if (e.message === 'Firebase: Error (auth/network-request-failed).') {
                    dispatch(setErrorLogin({ error: 'Отсутствует подключение к интернету'}));
                } else {
                    console.error(e.message);
                }
            } else {
                console.error(e);
            }
        }
    },
);

const logout = createAsyncThunk(
    'ReducerUser/logout',
    async (_, { dispatch }) => {
        dispatch(resetUser());
        dispatch(actionsBasketPage.afterLogoutWorkBasketPage());
    }
);

const registration = createAsyncThunk(
    'ReducerUser/registration',
    async ({ email, password, nickname }: { email: string, password: string, nickname: string }, { dispatch }) => {
        try {
            dispatch(setStatusRegistration({ status: EnumOfStatus.Loading }));
            const user = await apiAuth.registration(email, password, nickname);
            dispatch(setUser({ user: {...user, displayName: nickname} }))
            dispatch(actionsBasketPage.afterLoginWorkBasketPage({ user }));
            dispatch(setStatusRegistration({ status: EnumOfStatus.Success }));
        } catch (e) {
            dispatch(setStatusRegistration({ status: EnumOfStatus.Error }));
            if (e instanceof Error) {
                if (e.message === 'Firebase: Error (auth/invalid-email).') {
                    dispatch(setErrorRegistration({ error: 'Вы указали не верный почтовый адрес' }))
                } else if (e.message === 'Firebase: Error (auth/internal-error).') {
                    dispatch(setErrorRegistration({ error: 'Вы указали не верный пароль'}));
                } else if (e.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                    dispatch(setErrorRegistration({ error: 'Пароль должен содержать более 5 символов' }));
                } else if (e.message === 'Firebase: Error (auth/email-already-in-use).') {
                    dispatch(setErrorRegistration({error: 'Данный почтовый адрес уже зарегистрирован'}));
                } else if (e.message === 'Firebase: Error (auth/network-request-failed).') {
                    dispatch(setErrorLogin({ error: 'Отсутствует подключение к интернету' }));
                } else {
                    console.error(e.message);
                }
            } else {
                console.error(e);
            }
        }
    },
);

const changePassword = createAsyncThunk(
    'ReducerUser/changePassword',
    async ({ email }: { email: string }, { dispatch }) => {
        try {
            dispatch(setStatusForgotPassword({ status: EnumOfStatus.Loading }));
            await apiAuth.changePassword(email);
            dispatch(setStatusForgotPassword({ status: EnumOfStatus.Success }));
            dispatch(setIsChangePassword({ value: true }));
        } catch (e) {
            dispatch(setStatusForgotPassword({ status: EnumOfStatus.Error }))
            if (e instanceof Error) {
                if (e.message === 'Firebase: Error (auth/too-many-requests).') {
                    dispatch(setErrorForgotPassword({ error: 'Вы отправили слишком много запросов. Смена пароля для вашего аккаунта заблокирована на некоторое время'}))
                } else if (e.message === 'Firebase: Error (auth/user-not-found).') {
                    dispatch(setErrorForgotPassword({ error: 'Аккаунта с данной почтой на нашем сервисе не существует'}))
                } else if (e.message === 'Firebase: Error (auth/invalid-email).' 
                    || e.message === 'Firebase: Error (auth/missing-email).') {
                    dispatch(setErrorForgotPassword({ error: 'Вы указали не верный почтовый адрес' }))
                } else if (e.message === 'Firebase: Error (auth/network-request-failed).') {
                    dispatch(setErrorLogin({ error: 'Отсутствует подключение к интернету' }));
                } else {
                    console.error(e.message);
                }
            } else {
                console.error(e);
            }
        }
    },
);

const initOrders = createAsyncThunk(
    'ReducerUser/initOrders',
    async (_, { dispatch }) => {
        try {
            const allOrders = await apiOrder.getOrders();
            dispatch(setOrders({ allOrders }));
        } catch (e) {
            console.log(e);
        }
    }
);

const initFavoritesProducts = createAsyncThunk(
    'ReducerUser/initFavoritesProducts',
    async (_, { dispatch }) => {
        try {
            const allFavoritesProducts = await apiFavoritesProducts.getFavoritesProducts();
            dispatch(setFavoritesProducts({allFavoritesProducts}))
        } catch(e) {
            console.error(e);
        }
    }
);

export const actionsUser = {
    ...ReducerUser.actions,

    login,
    logout,
    registration,
    changePassword,

    initOrders,
    initFavoritesProducts,
};
