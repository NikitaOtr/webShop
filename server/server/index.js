const { sendMailCreateOrder, sendMailEndOrder } = require('./mailer/mailer');

const orders = [
    {
      "userEmail": "nikita137174@list.ru",
      "totalSum": 27000,
      "dateOfReceiving": "18 мая 2023 г.",
      "methodGet": "Самовывоз",
      "addressCourier": "addressCourier 1",
      "houseNumberCourier": "",
      "apartmentNumberCourier": "",
      "pointOfIssue": "г. Ярославль, ул. Союзная 144",
      "methodPayment": "QR-кодом при получении",
      "orderDate": 1683798332950,
      "discount": 0,
      "products": [
        {
          "uuid": "101",
          "id": "50101",
          "name": "Sporting",
          "price": 27000,
          "company": "merida",
          "type": "mountain",
          "img": "/static/media/6.f49279b145bc9bad6ccb.jpg",
          "foreignImg": "https://static.velosite.ru/upload/c1/e6/src_c1e6f9b208141740712d4aba8af363eb.jpg",
          "color": "black",
          "mayBeColors": [
            "black",
            "green",
            "grey"
          ],
          "imgsByColor": {
            "black": "/static/media/6.f49279b145bc9bad6ccb.jpg",
            "grey": "/static/media/4.80cb3006c58e9193789b.jpg",
            "green": "/static/media/5.3536c25adf5757d90b95.jpg"
          },
          "searchString": "sporting merida горный чёрный",
          "description": "Горный велосипед для катания в стиле кросс кантри с колесами диаметром 27.5 дюйма. Как и все модели этого ведущего немецкого бренда, рама выполнена из высокопрочного алюминиевого сплава 7005, что гарантирует не только долговечность, но и отличный накат.",
          "count": 1,
          "totalSum": 27000
        }
      ],
      "id": "1"
    },
    {
      "userEmail": "nikita137174@list.ru",
      "totalSum": 15000,
      "dateOfReceiving": "18 мая 2023 г.",
      "methodGet": "Доставка курьером",
      "addressCourier": "Ярославль,посёлок Тверицы",
      "houseNumberCourier": "12",
      "apartmentNumberCourier": "2",
      "pointOfIssue": "г. Ярославль, ул. Союзная 144",
      "methodPayment": "QR-кодом при получении",
      "orderDate": 1683798475127,
      "discount": 0,
      "products": [
        {
          "uuid": "118",
          "id": "82118",
          "name": "Novatrack Titanium",
          "img": "/static/media/51.20b3bbeb2c5f8278df04.jpg",
          "foreignImg": "https://static.velosite.ru/upload/f5/67/src_f567064164ffbab5bbfcf7e2af4b983f.jpg",
          "price": 15000,
          "company": "stinger",
          "type": "kids",
          "color": "red",
          "mayBeColors": [
            "red",
            "green"
          ],
          "imgsByColor": {
            "red": "/static/media/51.20b3bbeb2c5f8278df04.jpg",
            "green": "/static/media/50.c79e1435b742f9004b93.jpg"
          },
          "searchString": "novatrack titanium stinger детский красный",
          "description": "Детский велосипед настоящая находка для ребёнка от 5 до 9 лет. Навесное оборудование также включает в себя шатуны. Колёса оснащены фирменными покрышками, удобными для катания по городскому асфальту и дачным тропам. Мощная алюминиевая рама отлично выдерживает нагрузки при активном катании. Удобное седло с противоскользящей поверхностью. Жёсткая вилка даёт максимальный контроль над велосипедом.",
          "count": 1,
          "totalSum": 15000
        }
      ],
      "id": "2"
    }
  ]

orders.forEach(order => {
    sendMailCreateOrder(order);
    sendMailEndOrder(order);
});