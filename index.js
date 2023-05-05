import express from "express";
import cors from "cors";
import pizzasServices from './pizzasServices.js';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json())


app.get('/pizza',async(req,res)=>{
    const pizza = await pizzasServices.getAll()
    res.status(200).send(pizza)
})

app.get('/pizza/:id',async(req,res)=>{
    const pizza = await pizzasServices.getById(req.params.id);
    res.status(200).send(pizza);
})

app.post('/pizza',async(req,res)=>{
    try{
        await pizzasServices.insert(req.body)
        res.status(200).json({message:'Pizza creada'});
    }   catch (error){
        console.error(error);
        res.status(500).json({error:'Fallo el insertar'});
    }
})

app.put('/pizza',async(req,res)=>{
    try{
        let resultado = await pizzasServices.update(req.body)
        if(resultado != 1) {res.status(500).json({message: "Hubo un error al actualizar la pizza"});}
        else res.status(200).json({message:'Pizza actualizada'});
    }   catch (error){
        console.error(error);
        res.status(500).json({error:'Fallo al actualizar'});
    }
})

app.delete('/pizza/:id',async(req,res)=>{
    const pizza = await pizzasServices.deleteById(req.params.id);
    res.status(200).send(pizza);
})

app.listen(port, () => {
    console.log("listening");
})







