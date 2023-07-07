export interface IUser {
    email: string,
    displayName: string,
}

export enum EnumMethodGet {
    pickup = 'Самовывоз',
    courier = 'Доставка курьером',
}

export enum EnumMethodPayment {
    cash = 'Наличными при получении',
    cart = 'Картой при получении',
    qrCode = 'QR-кодом при получении',
}

export interface IPlaceMarker {
    name: string,
    coords: [number, number], 
}

export interface IPointOfIssue extends IPlaceMarker {
    id: number,
    shortName: string
}

export const StaticPointOfIssue: Array<IPointOfIssue> = [
    {
        id: 0,
        name: 'г. Ярославль, ул. Советская 12',
        shortName:'ул. Советская 12',
        coords: [57.63264439588925,39.88749182508473],
    },
    {
        id: 1,
        name: 'г. Ярославль, ул. Союзная 144',
        shortName:'ул. Союзная 144',
        coords: [57.633145463953156,39.90860231659776],
    },
];