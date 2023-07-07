export const getBeautifulPrise = (prise: number): string => {
    const arrayString = [];
    const stringNumber = prise.toString();
    const n = stringNumber.length % 3; 
    if (n) {
        arrayString.push(stringNumber.slice(0, n));
    }
    for (let i = n; i < stringNumber.length; i += 3) {
        arrayString.push(stringNumber.slice(i, i + 3));
    }
    return arrayString.join(' ') + ' руб.';
};