import { FC } from 'react';
import s from './LoaderLine.module.scss';

interface IProps {
    className?: string
}

export const LoaderLine: FC<IProps> = ({ className }) => {
    return (
        <div className={`${s.skWave} ${className}`}>
            <i className={`${s.skRect} ${s.skRect1}`}></i>
            <i className={`${s.skRect} ${s.skRect2}`}></i>
            <i className={`${s.skRect} ${s.skRect3}`}></i>
            <i className={`${s.skRect} ${s.skRect4}`}></i>
            <i className={`${s.skRect} ${s.skRect5}`}></i>
        </div>
    );
};