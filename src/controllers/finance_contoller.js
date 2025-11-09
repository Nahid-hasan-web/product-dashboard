const salesReport = (req,res)=>{
    try{
        res.send('this is from sales report controler')
    }
    catch(err){
        res.status(500).send(`Internal server error ${err}`)
    }


}