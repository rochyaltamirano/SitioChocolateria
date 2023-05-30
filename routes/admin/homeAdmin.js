var express = require ('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('admin/homeAdmin', {
        layout: 'admin/layout',
        persona: req.session.nombre
    });
});


module.exports = router;