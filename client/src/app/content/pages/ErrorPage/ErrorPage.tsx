import { FC } from 'react';

import { EmptyStub } from './../../../components/EmptyStub/EmptyStub';

import imgNotFound from './../../../assets/staticImagesHint/notFound.avif';

export const ErrorPage : FC = () => {
    return (
        <EmptyStub titleText='Страница не найдена' 
                   buttonText='Перейти на главную страницу' 
                   srcImage={imgNotFound}  
                   to='/'/>
    );
};