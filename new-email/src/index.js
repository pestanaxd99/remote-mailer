const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs");

function enviarHtml(){
  return new Promise((resolve,rejects)=>{

    invoice = "../invoices/ejemplos/example1/index.html";

    fs.readFile(invoice, 'utf8', (error, datos) => {
      
        if (error) rejects(error);
        resolve(datos);
    });  
  })
};

app.listen(3000, () => {
  console.log('Server on port 3000');
});

"use strict";
const nodemailer = require("nodemailer");
const { rejects } = require('assert');
const { resolve } = require('path');

// async..await is not allowed in global scope, must use a wrapper
async function  main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'thomastalk.me@gmail.com', // generated ethereal user
      pass: '', // generated ethereal password
    },
  });

  enviarHtml().then( async datos => {
    // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"TuFactura" <thomastalk.me@gmail.com>', // sender address
    to: "pestanaxd99@gmail.com", // list of receivers
    subject: "TuFactura digital", // Subject line
    html: datos, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  });

  
  
}

main().catch(console.error);
