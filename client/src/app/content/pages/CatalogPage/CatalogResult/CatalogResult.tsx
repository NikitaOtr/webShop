import { FC } from 'react';
import s from './CatalogResult.module.scss';

import { EmptyStub } from './../../../../components/EmptyStub/EmptyStub';
import { Product } from './../../../../components/Product/Product';

import { useAppSelector } from './../../../../hooks/useAppSelector';
import { useAppActions } from './../../../../hooks/useAppAction';

import imgCatalogEmpty from './../../../../assets/staticImagesHint/catalogEmpty.avif';

export const CatalogResult: FC = () => {
    const products = useAppSelector(state => state.ReducerCatalog.bikes);

    const { resetFilterInCatalog } = useAppActions();
    
    return (
        <>
            {products.length > 0 
            ?   
                <div className={s.catalogResult}>
                    {products.map(product => (
                        <Product key={product.id} product={product}/>
                    ))}
                </div>
            :
                <EmptyStub titleText='Нет ни одного товара, подходящего под фильтрацию' 
                           buttonText='Сбросить фильтрацию' 
                           srcImage={imgCatalogEmpty}  
                           onClick={() => resetFilterInCatalog()}/>
            }
        </>
    );
};