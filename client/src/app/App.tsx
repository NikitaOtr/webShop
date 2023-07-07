import { FC, useEffect } from 'react';
import './App.scss';

import { ForgotPasswordPage } from './content/pages/ForgotPasswordPage/ForgotPasswordPage';
import { RegistrationPage } from './content/pages/RegistrationPage/RegistrationPage';
import { ButtonScrollUp } from './content/ButtonScrollUp/ButtonScrollUp';
import { ProductsPage } from './content/pages/ProductsPage/ProductsPage';
import { CatalogPage } from './content/pages/CatalogPage/CatalogPage';
import { ProductPage } from './content/pages/ProductPage/ProductPage';
import { BasketPage } from './content/pages/BasketPage/BasketPage';
import { OrdersPage} from './content/pages/OrdersPage/OrdersPage';
import { ErrorPage } from './content/pages/ErrorPage/ErrorPage';
import { LoginPage } from './content/pages/LoginPage/LoginPage';
import { MainPage } from './content/pages/MainPage/MainPage';
import { UserPage } from './content/pages/UserPage/UserPage';
import { Header } from './content/Header/Header';
import { Footer } from './content/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import { Alert } from './content/Alert/Alert';

import { useAppActions } from './hooks/useAppAction';

export const App: FC = () => {
    const {initOrders, initFavoritesProducts, initBasketPage, initProductsPage } = useAppActions();

    useEffect(() => {
        initFavoritesProducts();
        initOrders();
        initBasketPage();
        initProductsPage();
    }, []);

    return (
        <div className='rootDiv'>
            <Header/>
            <Alert/>
            <main className='main'>
                <Routes>
                    <Route path='/'>
                        <Route index element={<MainPage/>}/>
                        <Route path='catalog' element={<CatalogPage/>}/>
                        <Route path='basket' element={<BasketPage/>}/>
                        <Route path='products/:status' element={<ProductsPage/>}/>
                        <Route path='orders/:status' element={<OrdersPage/>}/>
                        <Route path='product/:id' element={<ProductPage/>}/>
                        <Route path='registration' element={<RegistrationPage/>}/>
                        <Route path='user' element={<UserPage/>}/>
                        <Route path='login' element={<LoginPage/>}/>
                        <Route path='forgotPassword' element={<ForgotPasswordPage/>}/>
                        <Route path='*' element={<ErrorPage/>}/>
                    </Route>
                </Routes> 
            </main>
            <ButtonScrollUp/>
            <Footer/>
        </div>
  );
}; 

