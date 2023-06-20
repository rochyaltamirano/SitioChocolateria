var express = require('express');
var router = express.Router();
var faqsModel = require('../../models/faqsModel');

/*GET FAQs page*/
router.get('/', async function (req, res, next) {

    var faqs = await faqsModel.getFaqs();

    res.render('admin/faqs', {
        layout: 'admin/layout',
        persona: req.session.nombre,
        faqs
    });
});

/*Eliminar una faq*/
router.get('/eliminar/:id', async (req, res, next) => {
    const id = req.params.id;
    await faqsModel.deleteFaqById(id);
    res.redirect('/admin/faqs');
});

/*para que aparezca el form de agregar*/
router.get('/agregarfaq', (req, res, next) => {
    res.render('admin/agregarfaq', {
        layout: 'admin/layout'
    }) 
});

/*Agregar una FAQ*/
router.post('/agregarfaq', async (req, res, next) => {
    try {
        if (req.body.pregunta != "" && req.body.respuesta != "") {
            console.log(req.body);
            await faqsModel.insertFaq(req.body);
            res.redirect('/admin/faqs');
        } else {
            res.render('admin/agregarfaq', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error);
        res.render('admin/agregarfaq', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargó la pregunta'
        })
    }
})

/*me muestre el diseño del modificar con los datos de una sola pregunta*/
router.get('/modificarfaq/:id', async (req, res, next) => {
    var id = req.params.id;
    var faq = await faqsModel.getFaqsById(id);
    res.render('admin/modificarfaq', {
        layout: 'admin/layout',
        faq
    });
});

/*modificar la pregunta*/
router.post('/modificarfaq', async (req, res, next) => {
    try {
        console.log(req.body.id);
        if (req.body.pregunta != "" && req.body.respuesta != "") {
            var obj = {
                pregunta: req.body.pregunta,
                respuesta: req.body.respuesta
            }
            console.log(obj); //para ver si trae los datos
            await faqsModel.modificarFaqById(obj, req.body.id);
            res.redirect('/admin/faqs');
        }
        else {
            res.render('admin/modificarfaq', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error);
        res.render('admin/modificarfaq', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modificó la pregunta'
        })
    }
});

module.exports = router;