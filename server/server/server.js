const { sendMail } = require('./mailer/mailer');

const express = require('express');

const app = express();

app.post('/order', (req, res) => {
    sendMail()
});

app.listen(3000, () => {
    console.log('start server')
});