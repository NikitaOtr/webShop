import { FC, useState, useEffect } from 'react';

import { getBeautifulPrise } from './../../utils/getBeautifulPrise';

interface IProps {
    className?: string,
    value: number,
}

export const NumberRunning: FC<IProps> = ({ className, value }) => {
    const [currentValue, setCurrentValue] = useState(value);
 
    useEffect(() => {
        const countStep = 13;
        const way = value - currentValue;
        const step = Math.floor(way / countStep);
        let stepNow = 0;
        const callback = () => {
            if (stepNow >= countStep) { 
                return setCurrentValue(value);
            }
            stepNow++;
            setCurrentValue(prev => prev + step);
            requestAnimationFrame(callback);
        };
        callback();
    }, [value]);

    return (
        <span className={className}>{getBeautifulPrise(currentValue)}</span>
    );
};