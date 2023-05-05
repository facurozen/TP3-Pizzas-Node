import config from './dbconfig.js';
import sql from 'mssql';

class pizzasServices{ 
    
    static getAll = async () =>{
        
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
            .query('SELECT * FROM Pizzas');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
        }
        
    }
    static getById = async (id) =>{
        let returnEntity = null;
        console.log(id);
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                    .input("pId", sql.Int, id)
                    .query('SELECT * FROM Pizzas WHERE id = @pId');
            returnEntity =  result.recordsets[0][0];
        }
        catch(error){
            console.log(error);
        }
        return returnEntity;
    }

    static insert = async (pizza) =>{
        const {nombre,libreGluten,importe,descripcion} = pizza;
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('pNombre', sql.NVarChar(200), nombre)
        .input('pLibreGluten', sql.Bit, libreGluten)
        .input('pImporte', sql.Money, importe)
        .input('pDescripcion', sql.NVarChar(200), descripcion)
        .query('INSERT INTO Pizzas (nombre,libreGluten,importe,descripcion) VALUES(@pNombre, @pLibreGluten, @pImporte, @pDescripcion)');
            
        }
        catch(error){
            console.log(error);      
    }

    static update = async (pizza) =>{
        const {nombre,libreGluten,importe,descripcion} = pizza;
        let pool = await sql.connect(config);
        let result = await pool.request()
        
        request
        .input("pId", sql.Int, id)
        .input('pImporte', sql.Money, importe)
        .input('pDescripcion', sql.NVarChar(200), descripcion)
        .query('UPDATE Pizza SET importe= pImporte, descripcion = pDescripcion WHERE id = pId');      
        }
        catch(error){
            console.log(error);     
    }
    

    static deleteById = async (ID) =>{
        let rowsAffected = 0;
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input(pID, sql.Int, ID)
            .query('DELETE FROM Pizzas WHERE ID = @pID');
            rowsAffected = result.rowsAffected;
        }
        catch(error){
            console.log(error);
        }
        return rowsAffected;
    }

}
export default pizzasServices