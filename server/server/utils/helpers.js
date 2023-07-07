function getAddress(order) {
    if (order.methodGet === 'Доставка курьером') {
        return `${order.addressCourier}, Дом: ${order.houseNumberCourier}, Квартира: ${order.apartmentNumberCourier}`;
    } else {
        return `${order.pointOfIssue}`;
    }
}

module.exports = {
    getAddress,
};