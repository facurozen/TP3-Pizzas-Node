app.get('/Pizza',async(req,res)=>{
    const Pizza = await PizzaServices.getAll(req.params.ID)
    res.status(200).send(Pizza)
})
app.post('/Pizza',async(req,res)=>{
    console.log("en post, req:",req)
    try{
        await PizzaServices.insert(req.body)
        res.status(200).json({message:'Pizza creada'});
    }   catch (error){
        console.error(error);
        res.status(500).json({error:'Fallo el insertar'});
    }
})