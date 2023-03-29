import nodemailer from "nodemailer";

type mailOptions = {
  mailto: string;
  subject: string;
  text: string;
};

const SendMail = async ({ mailto, subject, text }: mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "meta.ua",
    auth: {
      user: "getmovie@meta.ua", // Ваш email адрес
      pass: "getMovieqwerty12gh", // Ваш пароль
    },
  });

  // Настраиваем опции сообщения
  const mailOptions = {
    from: "getmovie@meta.ua", // Адрес отправителя
    to: mailto, // Адрес получателя
    subject: subject,
    text: text, // Текст сообщения
  };

  // Отправляем сообщение
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sended: " + info.response);
    }
  });
};

export default SendMail;
