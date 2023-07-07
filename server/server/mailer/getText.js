const { getAddress } = require('./../utils/helpers');

function getTextCreateOrder(order) {
    return (
        `Добрый день. Вас приветствует onWheels76 
         Заказ будет готов: ${order.dateOfReceiving} 
         Способ получения: ${order.methodGet} 
         Адрес получения: ${getAddress(order)} 
         Способ оплаты: ${order.methodPayment} 
         Заказ: ${order.products.reduce((result, product) => {
             return `${result} ${product.name} x ${product.count}шт. = ${product.totalSum} руб., `;
         }, '')}
         Сумма заказа: ${order.totalSum} руб.` 
    );
}

function getTextEndOrder(order) {
    return (
        `Добрый день. Вас приветствует onWheels76 
         Ваш заказ готов  
         Способ получения: ${order.methodGet} 
         Адрес получения: ${getAddress(order)} 
         Способ оплаты: ${order.paymentMethod} 
         Заказ: ${order.products.reduce((result, product) => {
             return `${result} ${product.name} x ${product.count}шт. = ${product.totalSum} руб., `;
         }, '')}
         Сумма заказа: ${order.totalSum} руб.` 
    );
}

module.exports = {
    getTextCreateOrder,
    getTextEndOrder,
};