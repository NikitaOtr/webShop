import { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import s from './Courier.module.scss';

import { createMapCourier } from './../../../../../components/YandexMap/YandexMap';
import { InputText } from './../../../../../components/InputText/InputText';
import { ButtonApp } from './../../../../../components/ButtonApp/ButtonApp';

import { useAppSelector } from './../../../../../hooks/useAppSelector';
import { useAppActions } from './../../../../../hooks/useAppAction';

import { IPlaceMarker } from './../../../../../types/userTypes';
import { fakeValid } from './../../../../../utils/fakeValid';

interface IProps {
    closePopup: Function;
}

export const Courier: FC<IProps> = ({ closePopup }) => {

    const addressCourier = useAppSelector(state => state.ReducerBasketPage.addressCourier);
    const houseNumberCourier = useAppSelector(state => state.ReducerBasketPage.houseNumberCourier);
    const apartmentNumberCourier = useAppSelector(state => state.ReducerBasketPage.apartmentNumberCourier);

    const { setAddressCourier, setHouseNumberCourier, setApartmentNumberCourier } = useAppActions();

    const [isValidAddressCourier, setIsValidAddressCourier] = useState(true);
    const [isValidHouseNumberCourier, setIsValidHouseNumberCourier] = useState(true);
    const [isValidApartmentNumberCourier, setIsValidApartmentNumberCourier] = useState(true);

    const onChangeAddressCourier = (addressCourier: IPlaceMarker) => {
        setAddressCourier({ addressCourier });
    };

    useEffect(() => {
        createMapCourier('mapCourier', onChangeAddressCourier, addressCourier);
    }, []);

    const onChangeHouseNumberCourier = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numberValue = +value;
        if (value === '' || (numberValue && numberValue < 1000)) {
            setHouseNumberCourier({ houseNumberCourier: value })
        }
    };

    const onChangeApartmentNumberCourier = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numberValue = +value;
        if (value === '' || (numberValue && numberValue < 1000)) {
            setApartmentNumberCourier({ apartmentNumberCourier: value })
        }
    };

    const onClickButtonSave = () => {
        if (addressCourier &&  houseNumberCourier && apartmentNumberCourier) {
            closePopup();
        } else {
            setIsValidAddressCourier(!!addressCourier);
            setIsValidHouseNumberCourier(!!houseNumberCourier);
            setIsValidApartmentNumberCourier(!!apartmentNumberCourier);
        }
    };

    const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className={s.courier}>
            <form className={s.courier__info} onSubmit={onSubmitForm}>
                <InputText messageError='Выберете адрес доставки на карте'
                        title='Выберете адрес доставки на карте' 
                        isValid={isValidAddressCourier}
                        value={addressCourier ? `Адрес: ${addressCourier.name}` : ''}
                        disabled={true}/>
                <InputText messageError='Необходимо указать номер дома'
                           title='Укажите номер дома' 
                           isValid={isValidHouseNumberCourier}
                           value={houseNumberCourier}
                           onChange={onChangeHouseNumberCourier}
                           fnValidation={fakeValid}
                           setIsValid={setIsValidHouseNumberCourier}/>
                <InputText messageError='Необходимо указать номер квартиры' 
                           title='Укажите номер квартиры' 
                           isValid={isValidApartmentNumberCourier}
                           value={apartmentNumberCourier}
                           onChange={onChangeApartmentNumberCourier}
                           fnValidation={fakeValid}
                           setIsValid={setIsValidApartmentNumberCourier}/>                      
                <ButtonApp className={s.courier__button}
                           onClick={onClickButtonSave}>
                    Сохранить
                </ButtonApp>
            </form>
            <div id='mapCourier' className={s.courier__map}></div>
        </div>
    );
};