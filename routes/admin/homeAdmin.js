var express = require ('express');
var router = express.Router();
var faqsModel = require('../../models/faqsModel');
var promosModels = require ('../../models/promocionesModels');
var novedadesModels = require('../../models/novedadesModel');

router.get('/', async function(req, res, next){

    var totalFaqs = await faqsModel.getTotalFaqs();
    var totalPromos = await promosModels.getTotalPromociones();
    var totalNovedades = await novedadesModels.getTotalNovedades();


    console.log(Object.values(totalFaqs));
    console.log(Object.values(totalNovedades));
    console.log(Object.values(totalPromos));

    res.render('admin/homeAdmin', {
        layout: 'admin/layout',
        persona: req.session.nombre,
        cantFaqs: Object.values(totalFaqs),
        cantPromos: Object.values(totalPromos),
        cantNovedades: Object.values(totalNovedades)
    });
});

module.exports = router;