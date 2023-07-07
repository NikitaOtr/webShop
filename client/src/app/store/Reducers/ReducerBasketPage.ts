import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { apiCountProducts } from './../../api/mockApiIo/apiCountProducts';
import { apiBaskets } from './../../api/mockApiIo/apiBaskets';
import { apiOrder } from './../../api/mockApiIo/apiOrders';

import { EnumMethodGet, EnumMethodPayment, IPlaceMarker, IPointOfIssue, IUser } from './../../types/userTypes';
import { checkIsValidPromoCode } from './../../utils/checkIsValidPromoCode';
import { EnumOfStatus, IDefaultObject } from './../../types/commonTypes';
import { keysLocalStorage } from './../../utils/keysLocalStorage';
import { getDateFormat } from './../../utils/getDateFormat';
import { IProduct,  } from './.././../types/productTypes';
import { IBasket } from './../../types/basketTypes';
import { RootStateType } from './../store';

import { actionsUser } from './ReducerUserPage';

/**
 * Сохраняет в local storage данные о заказе.
 * @param {initialState} state - текущее состояние.
 */
const setDataOrderInLocalStorage = (state) => {
    const dataOrder = {
        methodGet: state.methodGet,
        addressCourier: state.addressCourier,
        houseNumberCourier: state.houseNumberCourier,
        apartmentNumberCourier: state.apartmentNumberCourier,
        pointOfIssue: state.pointOfIssue,
        methodPayment: state.methodPayment,
        userEmail: state.userEmail
    };

    localStorage.setItem(keysLocalStorage.dataOrder, JSON.stringify(dataOrder));
};

/**
 * Возвращает параметры скидки.
 * @param {number} totalSum - общая сумма без скидки.
 * @param {promoCode} promoCode - промокод.
 * @return {[number, number, string]} [discountSum, discount, promoCode].
 * discountSum - сумма со скидкой.
 * discount - скидка.
 * promoCode - правильны промокод иначе пустая строка.
 */
const getDiscountParams = (totalSum: number, promoCode: string): [number, number, string] => {
    if (checkIsValidPromoCode(promoCode)) {
        return [Math.round(totalSum / 100 * 85), 15, promoCode];
    } else if (totalSum > 1_000_000) {
        return [Math.round(totalSum / 100 * 90), 10, ''];
    } else if (totalSum > 500_000) {
        return [Math.round(totalSum / 100 * 95), 5, ''];
    } else {
        return [totalSum, 0, ''];
    }
};

const dataOrderLocalStorage = JSON.parse(localStorage.getItem(keysLocalStorage.dataOrder));

/**
 * Начальное состояние слайса корзины.
 */
const initialState = {
    allBaskets: {} as IDefaultObject<IBasket>, 
    statusBaskets: EnumOfStatus.Loading,
    basket: {
        products: {},
        totalSum: 0,
        size: 0,
    } as IBasket,
    countAddInBasket: 0,

    discountSum: 0,
    discount: 0,
    promoCode: '',

    countProductsInServer: null as IDefaultObject<number>,
    statusCountProduct: EnumOfStatus.Loading,
    isShowWarningCountProduct: false,

    methodGet: dataOrderLocalStorage?.methodGet as EnumMethodGet || EnumMethodGet.pickup,
    dateOfReceiving: getDateFormat(new Date(Date.now() + 7 * 86_400_000)),
    addressCourier: dataOrderLocalStorage?.addressCourier as IPlaceMarker || null as IPlaceMarker,
    houseNumberCourier: dataOrderLocalStorage?.houseNumberCourier as string || '',
    apartmentNumberCourier: dataOrderLocalStorage?.apartmentNumberCourier as string || '',
    pointOfIssue: dataOrderLocalStorage?.pointOfIssue as IPointOfIssue || null as IPointOfIssue,

    methodPayment: dataOrderLocalStorage?.methodPayment as EnumMethodPayment || '' as EnumMethodPayment,

    user: localStorage.getItem(keysLocalStorage.user) 
            ? JSON.parse(localStorage.getItem(keysLocalStorage.user)) as IUser | null
            : null as IUser | null,
    userEmail: dataOrderLocalStorage?.userEmail as string || '',
};

export const ReducerBasketPage = createSlice({
    name: 'ReducerBasketPage',
    initialState,
    reducers: {
        /**
         * Инициализация состояния после асинхронные запросов.
         * @param {IBasket} Basket - корзина.
         * @param {IDefaultObject<number>} countProductsInServer - количество всех товаров в наличии.
         */
        setInitBasketPage(state, { payload }: PayloadAction<{allBaskets: IDefaultObject<IBasket>, countProductsInServer: IDefaultObject<number>}>) {
            state.allBaskets = payload.allBaskets;
            state.countProductsInServer = payload.countProductsInServer;

            const basketLocalStorage = JSON.parse(localStorage.getItem(keysLocalStorage.basket) || null) as IBasket;

            if (state.user && state.allBaskets[state.user.email]) {
                state.basket = state.allBaskets[state.user.email]
            } else if (basketLocalStorage) {
                state.basket = basketLocalStorage;
            }

            for (const productId in state.basket.products) {
                const product = state.basket.products[productId];
                if (product.count > state.countProductsInServer[productId]) {
                    state.basket.size -= product.count;
                    state.basket.totalSum -= product.totalSum;
                    delete state.basket[product.id];
                }
            }

            [state.discountSum, state.discount] = getDiscountParams(state.basket.totalSum, state.promoCode);
            
            state.statusCountProduct = EnumOfStatus.Success;
            state.statusBaskets = EnumOfStatus.Success;
        },

        afterLoginWorkBasketPage(state, { payload } : PayloadAction<{ user: IUser}>) {
            state.user = payload.user;
            state.userEmail = payload.user.email;

            const userBasket = state.allBaskets[state.user.email];

            if (userBasket) {
                state.basket = userBasket;
            } else {
                state.allBaskets[state.user.email] = state.basket;
                apiBaskets.setBaskets(state.allBaskets);
            }

            [state.discountSum, state.discount] = getDiscountParams(state.basket.totalSum, state.promoCode);

            setDataOrderInLocalStorage(state);
        },

        afterLogoutWorkBasketPage(state) {
            state.user = null;
            state.userEmail = '';

            const basketLocalStorage = JSON.parse(localStorage.getItem(keysLocalStorage.basket) || null) as IBasket

            if (basketLocalStorage) {
                state.basket = basketLocalStorage;
            }

            [state.discountSum, state.discount] = getDiscountParams(state.basket.totalSum, state.promoCode);

            setDataOrderInLocalStorage(state);
        },

        /**
         * Добавляет товар в корзину.
         * @param {IProduct} product - товар.
         * @param {number} count - количество товара.
         * @param {number} totalSum - стоимость товара.
         */
        addToBasket(state, { payload }: PayloadAction<{product: IProduct, count?: number, totalSum?: number}>) {
            const newBasketProduct = {
                ...payload.product,
                count: payload.count || 1,
                totalSum: payload.totalSum || payload.product.price,
            };

            const hasProduct = state.basket.products[newBasketProduct.id];
            const countInServer = state.countProductsInServer[newBasketProduct.id];

            const notNeedAdd = (hasProduct?.count || 0) + newBasketProduct.count > countInServer;
            
            if (notNeedAdd) {
                state.isShowWarningCountProduct = true;                    
                return;
            }

            if (hasProduct) {
                hasProduct.count += newBasketProduct.count;
                hasProduct.totalSum += newBasketProduct.totalSum;
            } else {
                state.basket.products[newBasketProduct.id] = newBasketProduct;
            }

            state.basket.totalSum += newBasketProduct.totalSum;
            state.basket.size += newBasketProduct.count;
            [state.discountSum, state.discount] = getDiscountParams(state.basket.totalSum, state.promoCode);
            state.countAddInBasket += 1;

            if (state.user) {
                state.allBaskets[state.user.email] = state.basket;
                apiBaskets.setBaskets(state.allBaskets);
            } else {
                localStorage.setItem(keysLocalStorage.basket, JSON.stringify(state.basket));           
            }
        },

        /**
         * Удаляет из корзины товар.
         * @param {number} id - идентификатор товара.
         */
        removeFromBasket(state, { payload }: PayloadAction<{id: string}>) {
            const deletedProduct = state.basket.products[payload.id];
            delete state.basket.products[payload.id];

            state.basket.size -= deletedProduct.count;
            state.basket.totalSum -= deletedProduct.totalSum;

            [state.discountSum, state.discount] = getDiscountParams(state.basket.totalSum, state.promoCode);

            if (state.user) {
                state.allBaskets[state.user.email] = state.basket;
                apiBaskets.setBaskets(state.allBaskets);
            } else {
                localStorage.setItem(keysLocalStorage.basket, JSON.stringify(state.basket)); 
            }
        },

        /**
         * Изменяет количество товара, который находиться в корзине.
         * @param {string} id - идентификатор товара.
         * @param {number} count - количество товара.
         */
        setCountProductInBasket(state, { payload }: PayloadAction<{id: string, count: number}>) {
            const desiredProduct = state.basket.products[payload.id];

            if (desiredProduct) {
                state.basket.size += payload.count - desiredProduct.count;
                state.basket.totalSum += (payload.count * desiredProduct.price) - desiredProduct.totalSum;

                desiredProduct.count = payload.count;
                desiredProduct.totalSum = desiredProduct.price * desiredProduct.count;
            }
            [state.discountSum, state.discount] = getDiscountParams(state.basket.totalSum, state.promoCode);

            if (state.user) {
                state.allBaskets[state.user.email] = state.basket;
                apiBaskets.setBaskets(state.allBaskets);
            } else {
                localStorage.setItem(keysLocalStorage.basket, JSON.stringify(state.basket));  
            }
        },

        /**
         * Очищает корзину.
         */
        clearBasket(state, { payload }: PayloadAction<{countProductsInServer: IDefaultObject<number>}>) {
            state.countProductsInServer = payload.countProductsInServer;

            state.basket = {
                products: {},
                size : 0,
                totalSum: 0,
            };

            if (state.user) {
                delete state.allBaskets[state.user.email];
                apiBaskets.setBaskets(state.allBaskets);
            } else {
                localStorage.removeItem(keysLocalStorage.basket);
            }
        },

        /**
         * Применяет промокод.
         * @param {string} promoCode - промокод.
         */
        applyPromoCode(state, { payload }: PayloadAction<{promoCode: string}>) {
            state.promoCode = payload.promoCode;
            [state.discountSum, state.discount] = getDiscountParams(state.basket.totalSum, payload.promoCode);
        },

        /**
         * Устанавливает способ доставки.
         * @param {EnumMethodGet} methodGet - способ доставки.
         */
        setMethodGet(state, { payload }: PayloadAction<{methodGet: EnumMethodGet}>) {
            state.methodGet = payload.methodGet;
            setDataOrderInLocalStorage(state);
        },

        /**
         * Устанавливает адрес для доставки курьером.
         * @param {IPlaceMarker} addressCourier - адрес.
         */
        setAddressCourier(state, { payload }: PayloadAction<{addressCourier: IPlaceMarker}>) {
            state.addressCourier = payload.addressCourier;
            setDataOrderInLocalStorage(state);
        },

        /**
         * Устанавливает номер дома для доставки курьером.
         * @param {string} houseNumberCourier - номер дома.
         */
        setHouseNumberCourier(state, { payload }: PayloadAction<{houseNumberCourier: string}>) {
            state.houseNumberCourier = payload.houseNumberCourier;
            setDataOrderInLocalStorage(state);
        },

        /**
         * Устанавливает номер квартиры для доставки курьером.
         * @param {string} apartmentNumberCourier - номер квартиры.
         */
        setApartmentNumberCourier(state, { payload }: PayloadAction<{apartmentNumberCourier: string}>) {
            state.apartmentNumberCourier = payload.apartmentNumberCourier;
            setDataOrderInLocalStorage(state);
        },

        /**
         * Устанавливает пункт выдачи для самовывоза.
         * @param {IPointOfIssue} pointOfIssue - пункт выдачи.
         */
        setPointOfIssue(state, { payload }: PayloadAction<{pointOfIssue: IPointOfIssue}>) {
            state.pointOfIssue = payload.pointOfIssue;
            setDataOrderInLocalStorage(state);
        },

        setIsShowWarningCountProduct(state, { payload }: PayloadAction<{isShowWarningCountProduct: boolean}>) {
            state.isShowWarningCountProduct = payload.isShowWarningCountProduct;
        },

        /**
         * Устанавливает способ оплаты.
         * @param {EnumMethodPayment} methodPayment - способ оплаты.
         */
        setMethodPayment(state, { payload }: PayloadAction<{methodPayment: EnumMethodPayment}>) {
            state.methodPayment = payload.methodPayment;
            setDataOrderInLocalStorage(state);
        },

        /**
         * Устанавливает почту покупателя.
         * @param {string} userEmail - почта покупателя.
         */
        setUserEmail(state, { payload }: PayloadAction<{userEmail: string}>) {
            state.userEmail = payload.userEmail;
            setDataOrderInLocalStorage(state);
        },
    },
});

const { clearBasket, setInitBasketPage } = ReducerBasketPage.actions;

/**
 * Асинхронная функция создания заказа.
 */
const createOrder = createAsyncThunk(
    'ReducerBasketPage/createOrder',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootStateType;

        const userEmail = state.ReducerBasketPage.userEmail;
        const products = Object.values(state.ReducerBasketPage.basket.products);
        const totalSum = state.ReducerBasketPage.discountSum;
        const discount = state.ReducerBasketPage.discount;
        const orderDate = Date.now();

        const dateOfReceiving = state.ReducerBasketPage.dateOfReceiving;
        const methodGet = state.ReducerBasketPage.methodGet;
        const addressCourier = state.ReducerBasketPage.addressCourier?.name;
        const houseNumberCourier = state.ReducerBasketPage.houseNumberCourier;
        const apartmentNumberCourier = state.ReducerBasketPage.apartmentNumberCourier;
        const pointOfIssue = state.ReducerBasketPage.pointOfIssue?.name;
        const methodPayment = state.ReducerBasketPage.methodPayment;

        const newCountProductsInServer = { ...state.ReducerBasketPage.countProductsInServer };
        products.forEach(product => {
            newCountProductsInServer[product.id] = newCountProductsInServer[product.id] - product.count; 
        });

        const order = { 
            userEmail, 
            totalSum, 
            dateOfReceiving,
            methodGet,
            addressCourier,
            houseNumberCourier,
            apartmentNumberCourier,
            pointOfIssue,
            methodPayment,
            orderDate,
            discount,
            products,
        };

        dispatch(clearBasket({ countProductsInServer: newCountProductsInServer }));
        dispatch(actionsUser.addOrders({ order }));

        try {
            await apiOrder.createOrder(order);
            await apiCountProducts.setCountProducts(newCountProductsInServer);
        } catch(e) {
            console.error(e);
        }
    },
);

/**
 * Асинхронная функция инициализация корзины.
 */
const initBasketPage = createAsyncThunk(
    'ReducerBasketPage/initBasketPage',
    async (_, { dispatch }) => {
        try {
            const [allBaskets, countProductsInServer] = await Promise.all([apiBaskets.getBaskets(), apiCountProducts.getCountProducts()]);
            dispatch(setInitBasketPage({allBaskets, countProductsInServer }));
        } catch(e) {
            console.error(e);
        }
    }
);

export const actionsBasketPage = {
    ...ReducerBasketPage.actions,

    createOrder,

    initBasketPage,
};