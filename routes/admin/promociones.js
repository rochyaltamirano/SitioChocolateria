var express = require ('express');
var router = express.Router();
var promocionesModel = require ('../../models/promocionesModels');

var util = require ('util');
var cloudinary = require ('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

/*GET promociones page*/
router.get('/', async function(req, res, next){

    var promociones = await promocionesModel.getPromociones();
    
    promociones = promociones.map (promocion => {
        if (promocion.img_id){
            const imagen = cloudinary.image(promocion.img_id, {
                width: 50,
                height: 50,
                crop: 'fill'
            });
            return {
                ...promocion,
                imagen
            }
        } else {
            return {
                ...promocion,
                imagen: ''
            }
        }
    });

    res.render('admin/promociones', {
        layout: 'admin/layout',
        persona: req.session.nombre, 
        promociones
    });
});

/*para eliminar una promo*/
router.get ('/eliminar/:id', async (req, res, next) => {
    const id = req.params.id;
    
    let promocion = await promocionesModel.getPromocionesById (id);
    if (promocion.img_id) {
        await (destroy(promocion.img_id));
    }

    await promocionesModel.deletePromocionById (id);
    res.redirect('/admin/promociones');
});


/*para que aparezca el form de agregar*/
router.get('/agregarpromocion', (req, res, next) => {
    res.render ('admin/agregarpromocion', {
        layout: 'admin/layout'
    })
});

/*Agregar una promo*/
router.post('/agregarpromocion', async (req, res, next) => {
    try {
        var img_id='';
        if (req.files && Object.keys(req.files).length > 0){
            imagen = req.files.imagen;
            img_id = (await uploader (imagen.tempFilePath)).public_id;
        }

        console.log(req.body);
        if (req.body.titulo != "" && req.body.descripcion != "" && req.body.precio !=""){
            await promocionesModel.insertPromocion({
                ...req.body,
                img_id
            });
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
        let img_id = req.body.img_original;
        let borrar_img_vieja = false;

        if (req.body.img_delete === "1") {
            img_id = null;
            borrar_img_vieja = true;
        }else {
            if (req.files && Object.keys (req.files).length > 0) {
                imagen = req.files.imagen;
                img_id = (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_vieja = true;
            }
        }

        if (borrar_img_vieja && req.body.img_original) {
            await (destroy(req.body.img_original));
        }

        console.log(req.body.id);
        var obj = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            img_id
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