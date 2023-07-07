const nodemailer = require('nodemailer');

const key = 'NVNe4NkML0f6ZGkyrube'
const pass = 'collwelickinShop567';

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'onwheels76@mail.ru',
            pass: key
        }
    },
    {
        from: '<onwheels76@mail.ru>'
    }
);

module.exports.transporter = transporter;