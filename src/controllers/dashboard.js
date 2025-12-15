const orderModel = require("../models/orderModel");

const report_no_controller = async (req, res) => {
  try {
    // Total Orders
    const totalOrders = await orderModel.countDocuments();

    //  Total Customers (unique emails)
    const customers = await orderModel.distinct("email");
    const totalCustomers = customers.length;

    // Total Sales (sum of totalAmmount)
    const totalSalesAgg = await orderModel.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalAmmount" },
        },
      },
    ]);

    const totalSales = totalSalesAgg.length > 0 ? totalSalesAgg[0].totalSales : 0;

    return res.status(200).json({
      success: true,
      data: {
        totalOrders,
        totalCustomers,
        totalSales,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};

module.exports = { report_no_controller };
