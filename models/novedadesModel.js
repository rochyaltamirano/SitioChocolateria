const pool = require('./bd');

/*Listar novedades*/
async function getNovedades() {
    var query = 'select * from novedades';
    var rows = await pool.query(query);
    return rows;
}

/*Eliminar novedad por ID*/
async function deleteNovedadesById(id){
    var query = 'delete from novedades where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

/*Agregar novedad*/
async function insertNovedad (obj) {
    try {
        var query = "insert into novedades set ?";
        var rows = await pool.query (query, [obj]);
        return rows;
    }
    catch (error){
        throw error;
    }
}

async function getNovedadesById (id) {
    var query = "select * from novedades where id = ?";
    var rows = await pool.query (query, [id]);
    return rows[0];
}

async function modificarNovedadById (obj, id) {
    try{
        var query = "update novedades set ? where id = ?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function buscarNovedades(busqueda) {
    var query = "select * from novedades where titulo like ? OR novedad like ?";
    var rows = await pool.query(query, ['%' + busqueda + '%', '%' + busqueda + '%']);
    return rows;
}

async function getTotalNovedades(){
    var query = "SELECT COUNT(*) FROM novedades";
    var rows = await pool.query(query);
    return rows[0];
}

module.exports = { getNovedades, deleteNovedadesById, insertNovedad, getNovedadesById, modificarNovedadById, buscarNovedades, getTotalNovedades}