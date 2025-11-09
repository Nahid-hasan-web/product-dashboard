const orderModel = require("../models/orderModel")


// ---------------------------------------------------- sales report controller -----------------------------------------------------
const salesReport = async (req,res)=>{
    try{    
        // ------------- time duration 

        const startTodaysTime = new Date()
        startTodaysTime.setHours(0 ,0,0,0)

        const endTodaysTime = new Date()
        endTodaysTime.setHours(23,59,59,999)


        // -------------- daily sales report 
        const dailyReport =  await orderModel.aggregate([
            {$match:{orderDate:{$gt:startTodaysTime , $lt:endTodaysTime}}},
            {$group:{
                _id:null,
                totalOrder:{$sum:1},
                totalSales: { $sum: "$totalAmmount" },
            }}
        ]) 













        res.send(dailyReport)
        
        
    }
    catch(err){
        res.status(500).send(`Internal server error ${err}`)
    }


}



module.exports  = {salesReport}