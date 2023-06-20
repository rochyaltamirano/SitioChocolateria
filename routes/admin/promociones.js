var express = require ('express');
var router = express.Router();
var promocionesModel = require ('../../models/promocionesModels');



/*GET promociones page*/
router.get('/', async function(req, res, next){

    var promociones = await promocionesModel.getPromociones();

    res.render('admin/promociones', {
        layout: 'admin/layout',
        persona: req.session.nombre, 
        promociones
    });
});

/*para eliminar una promo*/
router.get ('/eliminar/:id', async (req, res, next) => {
    const id = req.params.id;
    await promocionesModel.deletePromocionById (id);
    res.redirect('/admin/promociones');
});


/*para que aparezca el form de agregar*/
router.get('/agregarpromocion', (req, res, next) => {
    res.render ('admin/agregarpromocion', {
        layout: 'admin/layout'
    }) //cierra render
}); //cierra GET

/*Agregar > post > insert en la tabla*/
router.post('/agregarpromocion', async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.descripcion != "" && req.body.precio){
            console.log(req.body);
            await promocionesModel.insertPromocion(req.body);
            res.redirect('/admin/promociones');
        } else {
            res.render ('admin/agregarpromocion', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log (error);
        res.render('admin/agregarpromocion', {
            layout: 'admin/layout',
                error: true,
                message: 'No se cargó la promoción'
        })
    }
})

/*me muestre el diseño del modificar con los datos de una sola promo*/
router.get('/modificarpromocion/:id', async (req, res, next) => {
    var id = req.params.id;
    var promocion = await promocionesModel.getPromocionesById(id);
    res.render('admin/modificarpromocion', {
        layout: 'admin/layout',
        promocion
    });
});

/*modificar la promo*/
router.post('/modificarpromocion', async (req, res, next) => {
    try {
        console.log(req.body.id);
        var obj = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            precio: req.body.precio
        }

        console.log(obj); //para ver si trae los datos
        await promocionesModel.modificarPromocionById(obj, req.body.id);
        res.redirect('/admin/promociones');
    } catch (error) {
        console.log(error);
        res.render('admin/modificarpromocion', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modificó la promoción'
        })
    }
});

module.exports = router;