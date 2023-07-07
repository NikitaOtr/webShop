import { FC, useState, useCallback, ChangeEvent, useEffect } from 'react';
import s from './Filter.module.scss';

import { DropDownList } from './../../../../../components/DropDownList/DropDownList';
import { DoubleRange } from './../../../../../components/DoubleRange/DoubleRange';
import { ButtonApp } from './../../../../../components/ButtonApp/ButtonApp';

import { useAppSelector } from './../../../../../hooks/useAppSelector';
import { useAppActions } from './../../../../../hooks/useAppAction';

import { getBeautifulPrise } from './../../../../../utils/getBeautifulPrise';
import { debounce } from './../../../../../utils/debounce';

export const FilterPrise: FC = () => {
    const minPriseBike = useAppSelector(state => state.ReducerCatalog.minPriseBike);
    const maxPriseBike = useAppSelector(state => state.ReducerCatalog.maxPriseBike);

    const minPriseFilter = useAppSelector(state => state.ReducerCatalog.minPriseFilter);
    const maxPriseFilter = useAppSelector(state => state.ReducerCatalog.maxPriseFilter);

    const [isShowList, setIsShowList] = useState(false);
    const [minValueRangeInput, setMinValueRangeInput] = useState(minPriseFilter);
    const [maxValueRangeInput, setMaxValueRangeInput] = useState(maxPriseFilter);
    const [minValueInput, setMinValueInput] = useState(minPriseFilter);
    const [maxValueInput, setMaxValueInput] = useState(maxPriseFilter);

    const gap = maxPriseBike / 100 * 9;

    const { setPrisesInCatalog, resetPrisesInCatalog } = useAppActions();

    useEffect(() => {
        if (minValueInput !== minPriseFilter) {
            setMinValueInput(minPriseFilter);
            setMinValueRangeInput(minPriseFilter);
        }

        if (maxValueInput !== maxPriseFilter) {
            setMinValueInput(maxPriseFilter);
            setMinValueRangeInput(maxPriseFilter);
        }
    }, [minPriseFilter, maxPriseFilter]);

    let debounceSetPrisesInCatalog = useCallback(debounce(setPrisesInCatalog, 300) as typeof setPrisesInCatalog, []);

    const onChangeMinRangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const willMinValueInput = parseInt(e.target.value);

        if (willMinValueInput + gap >= maxPriseBike) {
            setMinValueRangeInput(maxPriseBike - gap);
            setMaxValueRangeInput(maxPriseBike);
            setMinValueInput(maxPriseBike - gap);
            setMaxValueInput(maxPriseBike);
            debounceSetPrisesInCatalog({minPriseFilter: maxPriseBike - gap, maxPriseFilter: maxPriseBike });
        } else if (maxValueRangeInput - willMinValueInput <= gap) {
            setMinValueRangeInput(willMinValueInput);
            setMaxValueRangeInput(willMinValueInput + gap);
            setMinValueInput(willMinValueInput);
            setMaxValueInput(willMinValueInput + gap);
            debounceSetPrisesInCatalog({minPriseFilter: willMinValueInput, maxPriseFilter: willMinValueInput + gap });
        } else {
            setMinValueRangeInput(willMinValueInput);
            setMinValueInput(willMinValueInput);
            debounceSetPrisesInCatalog({minPriseFilter: willMinValueInput });
        }
    };

    const onChangeMaxRangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        let willMaxValueInput = parseInt(e.target.value);

        if (willMaxValueInput - gap <= minPriseBike) {
            setMinValueRangeInput(minPriseBike);
            setMaxValueRangeInput(minPriseBike + gap);
            setMinValueInput(minPriseBike);
            setMaxValueInput(minPriseBike + gap);
            debounceSetPrisesInCatalog({minPriseFilter: minPriseBike, maxPriseFilter: minPriseBike + gap });
        } else if (willMaxValueInput - minValueRangeInput <= gap) {
            setMinValueRangeInput(willMaxValueInput - gap);
            setMaxValueRangeInput(willMaxValueInput);
            setMinValueInput(willMaxValueInput - gap);
            setMaxValueInput(willMaxValueInput);
            debounceSetPrisesInCatalog({minPriseFilter: willMaxValueInput - gap, maxPriseFilter: willMaxValueInput });
        } else {
            setMaxValueRangeInput(willMaxValueInput);
            setMaxValueInput(willMaxValueInput);
            debounceSetPrisesInCatalog({maxPriseFilter: willMaxValueInput });
        }
    };

    const onChangeMinInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') {
            debounceSetPrisesInCatalog({minPriseFilter: 0});
            setMinValueInput(0);
            setMinValueRangeInput(0);
            return;
        }
        const willMinValueInput = parseInt(value)
        if (willMinValueInput) {
            debounceSetPrisesInCatalog({minPriseFilter: willMinValueInput});
            setMinValueInput(willMinValueInput);
            
            if (willMinValueInput + gap >= maxPriseBike) {
                setMinValueRangeInput(maxPriseBike - gap);
                setMaxValueRangeInput(maxPriseBike);
            } else if (maxValueRangeInput - willMinValueInput <= gap) {
                setMinValueRangeInput(willMinValueInput);
                setMaxValueRangeInput(willMinValueInput + gap);
            } else {
                setMinValueRangeInput(willMinValueInput);
            }
        }
    };

    const onChangeMaxInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') {
            debounceSetPrisesInCatalog({maxPriseFilter: 0});
            setMaxValueInput(0);
            return;
        }
        let willMaxValueInput = parseInt(value)
        if (willMaxValueInput) {
            debounceSetPrisesInCatalog({maxPriseFilter: willMaxValueInput});
            setMaxValueInput(willMaxValueInput);

            if (willMaxValueInput > maxPriseBike) {
                willMaxValueInput = maxPriseBike;
            }

            if (willMaxValueInput - gap <= minPriseBike) {
                setMinValueRangeInput(minPriseBike);
                setMaxValueRangeInput(minPriseBike + gap);
            } else if (willMaxValueInput - minValueRangeInput <= gap) {
                setMinValueRangeInput(willMaxValueInput - gap);
                setMaxValueRangeInput(willMaxValueInput);
            } else {
                setMaxValueRangeInput(willMaxValueInput);
            }
        }
    };

    const onClickButtonReset = () => {
        setIsShowList((prev) => !prev);
        setMinValueRangeInput(minPriseBike);
        setMaxValueRangeInput(maxPriseBike);
        setMinValueInput(minPriseBike);
        setMaxValueInput(maxPriseBike);
        resetPrisesInCatalog();
    };

    const onButtonClickPrince = (prise: number) => {
        setPrisesInCatalog({minPriseFilter: minPriseBike, maxPriseFilter: prise});
        setMinValueRangeInput(0);
        setMinValueInput(0);
        setMaxValueRangeInput(prise);
        setMaxValueInput(prise);
    };

    return (
        <DropDownList title={`Цена: от ${getBeautifulPrise(minValueInput)} до ${getBeautifulPrise(maxValueInput)}`}
                      classNameSize={s.filter}
                      classNameText={s.filter__text}
                      needClose={isShowList}>
            <>
                <div className={s.filter__content}>
                    <DoubleRange minValue={minPriseBike} 
                                maxValue={maxPriseBike}
                                minValueCurrent={minValueRangeInput}
                                maxValueCurrent={maxValueRangeInput} 
                                onChangeMinInput={onChangeMinRangeInput}
                                onChangeMaxInput={onChangeMaxRangeInput}
                                step={1000}/>
                    <div className={s.filterInput}>
                        <span className={s.filterInput__front}>От:</span>
                        <input className={s.filterInput__input} 
                               value={minValueInput} 
                               onChange={onChangeMinInput}/>
                        <span className={s.filterInput__back}>руб.</span>
                    </div>
                    <div className={s.filterInput}>
                        <span className={s.filterInput__front}>До:</span>
                        <input className={s.filterInput__input}
                               value={maxValueInput}
                               onChange={onChangeMaxInput}/>
                        <span className={s.filterInput__back}>руб.</span>
                    </div>
                    <div className={s.filter__buttonsBox}>
                        <ButtonApp onClick={() => onButtonClickPrince(30_000)}>до 30000руб</ButtonApp>
                        <ButtonApp onClick={() => onButtonClickPrince(50_000)}>до 50000руб</ButtonApp>
                        <ButtonApp onClick={() => onButtonClickPrince(70_000)}>до 70000руб</ButtonApp>
                        <ButtonApp onClick={() => onButtonClickPrince(100_000)}>до 100000руб</ButtonApp>
                    </div>
                </div>
                <ButtonApp className={s.filter__resetButton} onClick={onClickButtonReset}>Сбросить</ButtonApp>
            </>
        </DropDownList>
    );
};