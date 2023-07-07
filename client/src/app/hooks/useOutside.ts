import { useRef, useEffect, useState } from 'react';

export const useOutside = (initialIsVisible: boolean) => {
    const [isShow, setIsShow] = useState(initialIsVisible);
    const ref = useRef<any>(null);

    const handlerClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handlerClickOutside, true);
        return () => document.removeEventListener('click', handlerClickOutside, true);
    }, []);

    return { ref, isShow, setIsShow };
};