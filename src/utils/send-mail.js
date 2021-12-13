const transporter = require("../configs/mail.js")

module.exports = (from, to , subject,text, html, attachments = null) => {


const message = {
    from,
    to,
    subject,
    text,
    html,
    attachments,
  };

  transporter.sendMail(message)

}