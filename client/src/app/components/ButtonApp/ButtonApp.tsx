import { ReactNode, FC, MouseEvent } from 'react';
import s from './ButtonApp.module.scss';

interface IProps {
    children?: string | ReactNode,
    className?: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean,
    mayBeSelected?: boolean
    isSelected?: boolean,
    title?: string,
}

export const ButtonApp: FC<IProps> = ({ children, className, onClick, disabled, title,
                                        mayBeSelected=false, isSelected=false }) => {
    const getClasses = () => {
        let classes = s.button;
        if (!mayBeSelected) {
            classes += ' ' + s.notMayBeSelected
        }
        if (isSelected) {
            classes += ' ' + s.selectedButton;
        }
        if (className) {
            classes += ' ' + className;
        }
        return classes;
    };

    return (
        <button className={getClasses()} 
                onClick={e => onClick && onClick(e)}
                disabled={disabled}
                title={title}>
            {children}
        </button>
    );
};
