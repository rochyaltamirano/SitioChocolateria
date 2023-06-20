const pool = require('./bd');

/*Listar FAQs*/
async function getFaqs() {
    var query = 'select * from faqs';
    var rows = await pool.query(query);
    return rows;
}

/*Eliminar FAQ por ID*/
async function deleteFaqById(id){
    var query = 'delete from faqs where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

/*Agregar FAQ*/
async function insertFaq (obj) {
    try {
        var query = "insert into faqs set ?";
        var rows = await pool.query (query, [obj]);
        return rows;
    }
    catch (error){
        throw error;
    }
}

async function getFaqsById (id) {
    var query = "select * from faqs where id = ?";
    var rows = await pool.query (query, [id]);
    return rows[0];
}

async function modificarFaqById (obj, id) {
    try{
        var query = "update faqs set ? where id = ?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = { getFaqs, deleteFaqById, insertFaq, getFaqsById, modificarFaqById }