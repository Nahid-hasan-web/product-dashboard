const orderModel = require("../models/orderModel");

// ---------------------------------------------------- sales report controller -----------------------------------------------------
const salesReport = async (req, res) => {
  try {
    // ------------- time duration for daily sales report

    const startTodaysTime = new Date();
    startTodaysTime.setHours(0, 0, 0, 0);

    const endTodaysTime = new Date();
    endTodaysTime.setHours(23, 59, 59, 999);

    // -------------- daily sales report filteration
    const dailyReport = await orderModel.aggregate([
      { $match: { orderDate: { $gt: startTodaysTime, $lt: endTodaysTime } } },
      {
        $group: {
          _id: 1,
          totalSale: { $sum: 1 },
          totalSaleAmount: { $sum: "$totalAmmount" },
        },
      },
    ]);

    // ------------- time duration for 7 days sales report
    const today = new Date();
    const prevSavenDays = new Date();

    prevSavenDays.setDate(today.getDate() - 7);

    const weeklySalesReport = await orderModel.aggregate([
      { $match: { orderDate: { $gt: prevSavenDays, $lte: today } } },
      {
        $group: {
          _id: { $dateToString: { format: "%d-%m-%Y", date: "$orderDate" } },
          totalSale: { $sum: 1 },
          totalSaleInAmount: { $sum: "$totalAmmount" },
        },
      },
      {$sort:{_id:1}}
    ]);

    // ------------- time duration for 1mo  sales report

    const monthlySaleReport = await orderModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$orderDate" },
            month: { $month: "$orderDate" },
          },
          totalSale: { $sum: 1 },
          totalSaleInAmount: { $sum: "$totalAmmount" },
        },
      },
      {$project:{
        _id:0,
        year:'$_id.year',
        month:'$_id.month',
        totalSale:1,
        totalSaleOnamount:1
      }},
    {$sort:{year:1 , month:1}}
    ]);

    res.send({dailySale: dailyReport ,weeklySale:weeklySalesReport , monthlySale: monthlySaleReport});
  } catch (err) {
    res.status(500).send(`Internal server error ${err}`);
  }
};
// ---------------------------------------------------- revenue report controller -----------------------------------------------------
const revenueReport  =  async (req,res)=>{
try{
  const target = [
    {
      targetMo:10,
      targetAmount:30000
    },
    {
      targetMo:11,
      targetAmount:40000
    },
    {
      targetMo:12,
      targetAmount:50000
    },
  ]

    const revenueReport = await orderModel.aggregate([
        {$group:{
            _id:{
                year:{$year:'$orderDate'},
                month:{$month:'$orderDate'}
            },
            totalSale:{$sum:'$totalAmmount'}
        }},
      {  $project:{
            _id:0,
            year:"$_id.year",
            month:"$_id.month",
            totalSale:'$totalSale'
        }},
    ])

    const finalReport = revenueReport.map((item)=>{
      const findTargertInfo = target.find((t)=>t.targetMo == item.month)
      console.log(findTargertInfo)

      const finalRation = {...item , targtemonth:findTargertInfo.targetMo , targetAmount:findTargertInfo.targetAmount , aciveRevenue:( (item.totalSale / findTargertInfo.targetAmount)*100 ).toFixed(2)+ '%'  }


      return finalRation


    })

    console.log(finalReport)








    res.send(revenueReport)
}
catch(err){
    res.status(500).send(`Internal server error ${err}`)
}
}




module.exports = { salesReport  ,revenueReport};
