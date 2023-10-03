

var config = require('./bdconfig');
const sql = require('mssql');

// GET all items
const getCategoria =  async() => {
    try {
        let pool = await sql.connect(config);
        let categories = await pool.request().query("SP_L_CATEGORIA_01");
        return categories.recordsets;

    } catch (error) {
        console.log(error);
    }
}

//GET item by id
const getCategoria_x_id  = async(cat_id) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('input_parameter', sql.Int, cat_id)
        .query('SELECT * FROM TM_CATEGORIA WHERE CAT_ID = @input_parameter');
        return result.recordsets;
    } catch (error) {
        console.log(error);
    }
} 

//POST item
const insertCategoria = async(categoria) => {
    try {
        let pool = await sql.connect(config);
        let Insertcate = await pool
          .request()
          .input("cat_id", sql.Int, categoria.cat_id)
          .input("car_nom", sql.VarChar, categoria.car_nom)
          .input("cat_obs", sql.VarChar, categoria.cat_obs)
          .execute("SP_I_CATEGORIA_02");
        return Insertcate.recordsets;
    } catch (error) {
        console.log(error);
    }
}

//UPDATE item
const updateCategoria = async(categoria) => {
    try {
        let pool = await sql.connect(config);
        let updatedCategory = await pool
          .request()
          .input("cat_id", sql.Int, categoria.cat_id)
          .input("car_nom", sql.VarChar, categoria.car_nom)
          .input("cat_obs", sql.VarChar, categoria.cat_obs)
          .execute("SP_U_CATEGORIA_01");
          return updatedCategory.recordsets;
    } catch (error) {
        console.log(error);
    }
}

/* Delete category */
const deleteCategoria = async(cat_id) => {
    try {
        let pool = await sql.connect(config);
        let deletedCategory = await pool
          .request()
          .input("input_parameter", sql.Int, cat_id)
          .query("DELETE FROM TM_CATEGORIA WHERE CAT_ID = @input_parameter ");          return deletedCategory.recordsets;
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
  getCategoria: getCategoria,
  getCategoria_x_id: getCategoria_x_id,
  insertCategoria : insertCategoria,
  updateCategoria : updateCategoria,
  deleteCategoria : deleteCategoria
};