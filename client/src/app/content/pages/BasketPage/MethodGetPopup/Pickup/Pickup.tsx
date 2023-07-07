import { useEffect, FC, useRef } from 'react';
import s from './Pickup.module.scss';

import { ButtonApp } from './../../../../../components/ButtonApp/ButtonApp';
import { createMapPickup } from './../../../../../components/YandexMap/YandexMap';

import { useAppSelector } from './../../../../../hooks/useAppSelector';
import { useAppActions } from './../../../../../hooks/useAppAction';

import { StaticPointOfIssue, IPointOfIssue } from './../../../../../types/userTypes';

interface IProps {
    closePopup: Function;
}

export const Pickup: FC<IProps> = ({closePopup}) => {
    const refFunction = useRef<Function>(null);
    const { setPointOfIssue } = useAppActions(); 

    const onChangePointOfIssue = (pointOfIssue: IPointOfIssue) => {
        setPointOfIssue({pointOfIssue: pointOfIssue});
    };

    const pointOfIssue = useAppSelector(state => state.ReducerBasketPage.pointOfIssue);

    useEffect(() => {
        refFunction.current = createMapPickup('mapPickup', onChangePointOfIssue, pointOfIssue);
    }, []);

    const onClickButtonSave = () => {
        closePopup();
    };

    const onClickChangePointOfIssue = (index: number) => {
        refFunction.current(StaticPointOfIssue[index].id);
        setPointOfIssue({ pointOfIssue: StaticPointOfIssue[index]});
    };

    return (
        <div className={s.pickup}>
            <div className={s.pickup__info}>
                <div className={s.pickup__title}>Выберете пункт выдачи</div>
                <div className={s.pickup__info__buttonsBlock}>
                    <ButtonApp className={s.pickup__button}
                            mayBeSelected={true}
                            isSelected={pointOfIssue && pointOfIssue.id === StaticPointOfIssue[0].id}
                            onClick={() => onClickChangePointOfIssue(0)}>
                        {StaticPointOfIssue[0].name}
                    </ButtonApp>
                    <ButtonApp className={s.pickup__button}
                            mayBeSelected={true}
                            isSelected={pointOfIssue && pointOfIssue.id === StaticPointOfIssue[1].id}
                            onClick={() => onClickChangePointOfIssue(1)}>
                        {StaticPointOfIssue[1].name}
                    </ButtonApp>
                    <ButtonApp className={`${s.pickup__button} ${s.pickup__button_save}`}
                               onClick={onClickButtonSave}>
                        Сохранить
                    </ButtonApp>
                </div>
            </div>
            <div id='mapPickup' className={s.pickup__map}></div>
        </div>
    );
};
