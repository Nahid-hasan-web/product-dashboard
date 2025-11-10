const orderModel = require("../models/orderModel")


// ---------------------------------------------------- sales report controller -----------------------------------------------------
const salesReport = async (req,res)=>{
    try{    
        // ------------- time duration for daily sales report 

        const startTodaysTime = new Date()
        startTodaysTime.setHours(0 ,0,0,0)

        const endTodaysTime = new Date()
        endTodaysTime.setHours(23,59,59,999)


        // -------------- daily sales report filteration
        const dailyReport =  await orderModel.aggregate([
            {$match:{orderDate:{$gt:startTodaysTime , $lt:endTodaysTime}}},
            {$group:{
                _id:1,
                totalSale:{$sum:1},
                totalSaleAmount:{$sum:'$totalAmmount'}
            }}
        ])

        // ------------- time duration for 7 days sales report
        const  today  = new Date()
        const prevSavenDays = new Date()

        prevSavenDays.setDate(today.getDate() - 7)

        console.log(prevSavenDays)
    
        const weeklySalesReport = await orderModel.aggregate([
            {$match:{orderDate:{$gt:prevSavenDays , $lte:today }}},
            {$group:{
                _id:{$dateToString:{format:"%d-%m-%Y" , date:'$orderDate'}},
                totalSale:{$sum:1},
                totalSaleInAmount:{$sum:'$totalAmmount'}
            }},
        ])












        res.send(weeklySalesReport)
        
        
    }
    catch(err){
        res.status(500).send(`Internal server error ${err}`)
    }


}



module.exports  = {salesReport}