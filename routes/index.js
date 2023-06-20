var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require ('../models/novedadesModel');
var promocionesModel = require('../models/promocionesModels');
var faqsModel = require ('../models/faqsModel');


/* GET home page. */
router.get('/', async function (req, res, next) {

  var novedades = await novedadesModel.getNovedades();
  var promociones = await promocionesModel.getPromociones();
  var faqs = await faqsModel.getFaqs();
  res.render('index', {
    novedades, promociones, faqs
   });
});


router.post('/', async (req, res, next) => {

  console.log(req.body); // estoy capturando datos?

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var comentario = req.body.comentario;

  var obj = {
    to: 'chocolateriaAAA@yopmail.com',
    subject: 'Comentario',
    html: "Cliente: " + nombre + " " + apellido + "<br>Email: " + email + "<br>Dejó el siguiente comentario: " + comentario + "."
  } //cierra var obj

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }) // cierra var transporter

  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: '¡Comentario enviado con éxito!',
  })

})//cierra petición del POST

module.exports = router;