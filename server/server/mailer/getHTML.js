
const { getAddress } = require('./../utils/helpers');
const { translate } = require('./../types/translate');

const imgThanks = 'https://img.freepik.com/free-vector/thank-you-placard-concept-illustration_114360-13406.jpg?w=740&t=st=1678015123~exp=1678015723~hmac=bb32dd5b0958012200f01209bb864a39f560a0276f7c9b138a9bbe6dce8d4694';

const imgWelcome = 'https://img.freepik.com/free-vector/welcome-concept-illustration_114360-380.jpg?w=740&t=st=1678624137~exp=1678624737~hmac=48c15756e4fe162c47a269a5c53725c31095a8b4b7129708f5bd2043f4060aff';

function htmlProduct(product, index) {
    return (`
        <h3 style="text-align: center; margin: 0;">${index + 1}.</h3>
        <h3 style="text-align: center; margin: 0;">${product.name}</h3>
        <img src="${product.foreignImg}"  style="height: 120px; width: 200px;">
        <div style="display: flex; flex-direction: column; gap: 5px;">
            <b>Производитель: ${translate[product.company]}</b>
            <b>Категория: ${translate[product.type]}</b>
            <b>Цвет: ${translate[product.color]}</b>
            <b>Цена: ${product.price} руб.</b>
        </div>
        <h3 style="text-align: center; margin: 0;">${product.count}</h3>
        <h3 style="text-align: center; margin: 0;">${product.totalSum} руб.</h3>`
    );
}

function getHTMLCreateOrder(order) {
    return (
        `<div style="width: 100%; display: flex; flex-direction: column;">
            <h1>Добрый день. Вас приветствует onWheels76</h1>
            <h1>Заказ будет готов: ${order.dateOfReceiving}</h1>
            <h1 style="text-align: center;">Информация о вашем заказе:</h1>
            <h2>Способ получения: ${order.methodGet}</h2>
            <h2>Адрес получения: ${getAddress(order)}</h2>
            <h2>Способ оплаты: ${order.methodPayment}</h2>
            <div style="width: 100%; display: grid; grid-template-columns: 1fr 5fr 10fr 10fr 1fr 10fr; gap:12px; align-items: center;">
                <h3 style="text-align: center; margin: 0;">№</h3>
                <h3 style="text-align: center; margin: 0;">Наименование</h3>
                <h3 style="text-align: center; margin: 0;">Изображение</h3>
                <h3 style="text-align: center; margin: 0;">Подробная информация</h3>
                <h3 style="text-align: center; margin: 0;">Количество</h3>
                <h3 style="text-align: center; margin: 0;">Итоговая цена</h3>
                ${order.products.map(htmlProduct).join('')}
            </div>
            <h2 style="text-align: center; margin-top: 20px;">Общая сумма заказа: ${order.totalSum} руб.</h2>
            <div style="display: flex; justify-content: center;">
                <img src="${imgThanks}" style="height: 250px; width: 250px;">
            </div>
         </div>`
    );
}

function getHTMLEndOrder(order) {
    return (
        `<div style="width: 100%; display: flex; flex-direction: column;">
            <h1>Добрый день. Вас приветствует onWheels76</h1>
            <h1>Заказ готов</h1>
            <h1 style="text-align: center;">Информация о вашем заказе:</h1>
            <h2>Способ получения: ${order.methodGet}</h2>
            <h2>Адрес получения: ${getAddress(order)}</h2>
            <h2>Способ оплаты: ${order.methodPayment}</h2>
            <div style="width: 100%; display: grid; grid-template-columns: 1fr 5fr 10fr 10fr 1fr 10fr; gap:12px; align-items: center;">
                <h3 style="text-align: center; margin: 0;">№</h3>
                <h3 style="text-align: center; margin: 0;">Наименование</h3>
                <h3 style="text-align: center; margin: 0;">Изображение</h3>
                <h3 style="text-align: center; margin: 0;">Подробная информация</h3>
                <h3 style="text-align: center; margin: 0;">Количество</h3>
                <h3 style="text-align: center; margin: 0;">Итоговая цена</h3>
                ${order.products.map(htmlProduct).join('')}
            </div>
            <h2 style="text-align: center; margin-top: 20px;">Общая сумма заказа: ${order.totalSum} руб.</h2>
            <div style="display: flex; justify-content: center;">
                <img src="${imgWelcome}" style="height: 250px; width: 250px;">
            </div>
         </div>`
    );
}

module.exports = {
    getHTMLCreateOrder,
    getHTMLEndOrder
} ;