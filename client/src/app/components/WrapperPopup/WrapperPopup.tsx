import { FC, ReactChild, useEffect, MouseEvent } from 'react';
import s from './WrapperPopup.module.scss';

interface IProps {
    children: ReactChild,
    classContent: string,
    closePopup: () => void,
    isWarning?: boolean,
}

export const WrapperPopup: FC<IProps> = ({ children, classContent, closePopup, isWarning=false }) => {

    useEffect(() => {
        const keyDownClosePopup = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closePopup();
            }
        };
        document.body.classList.add(s.bodyOverflowHidden);
        document.body.addEventListener('keydown', keyDownClosePopup);
        return () => {
            document.body.classList.remove(s.bodyOverflowHidden);
            document.body.removeEventListener('keydown', keyDownClosePopup);
        }
    }, []);

    const onClickChildren = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div className={`${s.wrapperPopup} ${isWarning ? s.wrapperPopup_warning : s.wrapperPopup_common}`}
             onClick={closePopup}>
            <div className={classContent} onClick={onClickChildren}>
                {children}
            </div>
        </div>
    );
}