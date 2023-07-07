export const debounce =(fn: Function, time: number): Function => {
    let flagTimeout: NodeJS.Timeout;
    return function(...args: any[]) {
        clearTimeout(flagTimeout);
        flagTimeout = setTimeout(() => fn(...args), time);
    };
};