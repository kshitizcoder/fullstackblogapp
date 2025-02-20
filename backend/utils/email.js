// import nodemailer from "nodemailer";

// const sendEmail = async (option) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });
//   const mailOptions = {
//     from: "Kshitiz Bhattarai <hello@kshitiz.io>",
//     to: option.email,
//     subject: option.subject,
//     text: option.message,
//   };
//   await transporter.sendMail(mailOptions);
// };

// export default sendEmail;
import nodemailer from "nodemailer";

const sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: "asvl ddfb wxyi rbkb",
    },
  });

  const mailOptions = {
    from: "Kshitiz Bhattarai <hello@kshitiz.io>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
