const { transporter } = require('./config');
const { getTextCreateOrder, getTextEndOrder  } = require('./getText');
const { getHTMLCreateOrder, getHTMLEndOrder } = require('./getHTML');

function sendMailCreateOrder(order) {
    const mailOptions = {
        to: order.userEmail,
        subject: 'Новый заказ на onWheels76',
        text: getTextCreateOrder(order),
        html: getHTMLCreateOrder(order),
    };
    transporter.sendMail(mailOptions);
    
    mailOptions.subject = order.userEmail;
    mailOptions.to = 'onwheels76@mail.ru';
    transporter.sendMail(mailOptions);
}

function sendMailEndOrder(order) {
  const mailOptions = {
      to: order.userEmail,
      subject: 'Заказ готов на onWheels76',
      text: getTextEndOrder(order),
      html: getHTMLEndOrder(order),
  };
  transporter.sendMail(mailOptions);
  
  mailOptions.subject = order.userEmail;
  mailOptions.to = 'onwheels76@mail.ru';
  transporter.sendMail(mailOptions);
}
  
module.exports = {
  sendMailCreateOrder,
  sendMailEndOrder,
};