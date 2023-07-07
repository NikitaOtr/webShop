import { FC } from 'react';
import s from './Footer.module.scss';

export const Footer: FC = () => { 
    return (
        <footer className={s.footer}>
            <div className={s.boxList}>
                <div className={s.list}>
                    <span className={s.list__title}>Связь с разработчиками</span>
                    <span className={s.list__text}>nikita137174@list.ru</span>
                    <span className={s.list__text}>onwheels76@mail.ru</span>
                </div>
                <div className={s.list}>
                    <span className={s.list__title}>Промокод на скидку в 15 %</span>
                    <span className={s.list__text}>discont15</span>
                </div>
            </div>

            <div className={s.copyRights}>
                <span className={s.copyRights__text}>2023 onWheels — интернет-магазин велосипедов.</span>
                <span className={s.copyRights__text}>Все права защищены.</span>
            </div>
        </footer>
    );
};