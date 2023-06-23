const pool = require('./bd');

/*Listar promos*/
async function getPromociones() {
    var query = 'select * from promociones';
    var rows = await pool.query(query);
    return rows;
}

/*Eliminar promo por ID*/
async function deletePromocionById(id){
    var query = 'delete from promociones where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

/*Agregar promo*/
async function insertPromocion (obj) {
    try {
        var query = 'insert into promociones set ?';
        var rows = await pool.query (query, [obj]);
        return rows;
    }
    catch (error){
        throw error;
    }
}

async function getPromocionesById (id) {
    var query = "select * from promociones where id = ?";
    var rows = await pool.query (query, [id]);
    return rows[0];
}

async function modificarPromocionById (obj, id) {
    try{
        var query = "update promociones set ? where id = ?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function buscarPromociones(busqueda) {
    var query = "select * from promociones where titulo like ? OR descripcion like ? OR precio like ?";
    var rows = await pool.query(query, ['%' + busqueda + '%', '%' + busqueda + '%', '%' + busqueda + '%']);
    return rows;
}

async function getTotalPromociones(){
    var query = "SELECT COUNT(*) FROM promociones";
    var rows = await pool.query(query);
    return rows[0];
}

module.exports = { getPromociones, deletePromocionById, insertPromocion, getPromocionesById, modificarPromocionById, buscarPromociones, getTotalPromociones }