import config from './dbconfig.js';
import sql from 'mssql';

class pizzasServices{ 
    
    static getAll = async () =>{
        console.log('GetAll');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input("pID", sql.Int, ID)
                                    .query('SELECT * FROM Pizzas');
            return result.recordSets[0];
        }
        catch(error){
            console.log(error);
        }
        
    }
    static getById = async (ID) =>{
        console.log('GetById');
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input("pID", sql.Int, ID)
                                    .query('SELECT * FROM Pizzas WHERE ID = @pID');
            return result.recordSets[0][0];
        }
        catch(error){
            console.log(error);
        }
        
    }

    static insert = async (pizza) =>{
        const {nombre,libreGluten,importe,descripcion} = pizza;
        console.log("name:", nombre);
        let pool = await sql.connect(config)
        const request = new sql.Request(pool);
        
        request
        .input('nombre', sql.NVarChar(200), nombre)
        .input('libreGluten', sql.Bit, libreGluten)
        .input('importe', sql.Money, importe)
        .input('descripcion', sql.NVarChar(200), descripcion)
        .query('INSERT INRO Pizzas (nombre,libreGluten,importe,descripcion) VALUES');
            returnEntity = result.recordSets[0][0];
        }
        catch(error){
            console.log(error);
        
        
    }


    deleteById = async (ID) =>{
        let rowsAffected = 0;
        console.log('DeleteById');
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