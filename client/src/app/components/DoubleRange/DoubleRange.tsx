import { FC, ChangeEvent } from 'react';
import s from './DoubleRange.module.scss';

interface IProps {
    minValue: number;
    maxValue: number;
    minValueCurrent: number;
    maxValueCurrent: number;
    step: number;
    onChangeMinInput: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeMaxInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const DoubleRange: FC<IProps> = ({minValue, maxValue, minValueCurrent, maxValueCurrent,
                                         step, onChangeMinInput, onChangeMaxInput}) => {

    const getStyleTrack = () => {
        const percent1 = (minValueCurrent / maxValue) * 100;
        const percent2 = (maxValueCurrent / maxValue) * 100;
        return {
            background: `linear-gradient(to right, rgba(210, 210, 210) ${percent1}% , rgb(30, 215, 96) ${percent1}% , rgb(30, 215, 96) ${percent2}%, rgba(210, 210, 210) ${percent2}%)`
        };
    };

    return (
        <div className={s.doubleRange}>
            <div className={s.doubleRange__track} style={getStyleTrack()}/>
            <input className={s.doubleRange__input} type='range' min={minValue} max={maxValue} 
                   step={step} value={minValueCurrent} onChange={onChangeMinInput}/>
            <input className={s.doubleRange__input} type='range' min={minValue} max={maxValue} 
                   step={step} value={maxValueCurrent} onChange={onChangeMaxInput}/>
        </div>
    );
};