import { FC, useState } from 'react';
import s from './Filter.module.scss';

import { DropDownList } from './../../../../../components/DropDownList/DropDownList';
import { ButtonApp } from './../../../../../components/ButtonApp/ButtonApp';
import { CheckBox } from './../../../../../components/CheckBox/CheckBox';

import { translateToRussian } from './../../../../../utils/translateToRussian';
import { EnumOfTypes } from './../../../../../types/productTypes';
import { ISelectData } from './../../../../../types/filterTypes';

interface IProps {
    selectData: ISelectData;
    setValueByOption: (option: string, value: boolean) => void;
    reset?: () => void;
}

export const Filter: FC<IProps> = ({selectData, setValueByOption, reset}) => {
    const [isShowList, setIsShowList] = useState(false);

    const getTitle = () => {
        let result = ''; 
        if (selectData.name) {
            result = `${selectData.name}: `;
        }
        if (selectData.value) {
            return result + translateToRussian[selectData.value as EnumOfTypes];
        } else if (selectData.values) {
            const values = selectData.values;
            const arrValues = selectData.options.filter(option => values[option])
                                                .map(option => translateToRussian[option as EnumOfTypes]);
            return result + (arrValues.join(', ') || 'Не выбрано');
        }
        return '';
    };

    const getValue = (option : string) => {
        if (selectData.value) {
            return option === selectData.value;
        } else if (selectData.values) {
            return selectData.values[option];
        }
        return false;
    };

    const onClickButtonReset = () => {
        setIsShowList((prev) => !prev);
        reset && reset();
    };

    return (
        <DropDownList title={getTitle()} 
                      classNameSize={s.filter}
                      classNameText={s.filter__text}
                      needClose={isShowList}>
            <>
                <div>
                    {selectData.options.map(option => (
                            <CheckBox key={option} 
                                      option={option} 
                                      value={getValue(option)}
                                      classNameText={s.filter__text} 
                                      setValue={(value: boolean) => setValueByOption(option, value)}/>
                        ))}
                </div>
                {reset && <ButtonApp className={s.filter__resetButton} onClick={onClickButtonReset}>Сбросить</ButtonApp>}
            </>
        </DropDownList>
    );
};