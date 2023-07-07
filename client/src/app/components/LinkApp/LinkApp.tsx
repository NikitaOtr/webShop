import { FC } from 'react';
import s from './LinkApp.module.scss';

import { Link }  from 'react-router-dom';

interface IProps {
    children?: string,
    className?: string,
    to: string,
}

export const LinkApp: FC<IProps> = ({ children, className, to }) => {
    return (
        <Link className={`${s.link} ${className}`} to={to}>{children}</Link>
    );
};