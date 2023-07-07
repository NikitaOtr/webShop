export const getDateFormat = (date: Date):string => {
    return `${date.toLocaleString('ru', {year: 'numeric', month: 'long', day: 'numeric'})}`;
}