import { FC } from 'react';
import s from './Recommendation.module.scss';

import { Product } from './../Product/Product';
import { Link } from 'react-router-dom';

import { IProduct } from './../../types/productTypes';

interface IProps {
    className?: string,
    title: string,
    products: Array<IProduct>,
    to: string,
}

export const Recommendation: FC<IProps> = ({ title, products, to, className }) => {
    return (
        <article className={`${s.recommendation} ${className ? className : ''}`}>
            <div className={s.headline}>
                <Link className={s.headline__header} to={to}>{title}</Link>
                <Link className={s.headline__all} to={to}>все</Link>
            </div>

            <div className={s.containerNoWrap}>
                {products.map(product => <Product key={product.id} product={product}/>)}
            </div>
        </article>
    );
};