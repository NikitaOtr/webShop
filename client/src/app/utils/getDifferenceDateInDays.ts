export const getDifferenceDateInDays = (dateMilliSeconds: number) => {
    const differenceMilliSeconds = Math.abs(Date.now() - dateMilliSeconds);
    return Math.ceil(differenceMilliSeconds / 86_400_000);
};