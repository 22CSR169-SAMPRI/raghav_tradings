import Order from "../models/Order.js";

export const getSalesSummary = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const totalOrders = await Order.countDocuments();

    res.json([
      { label: "Total Sales", value: `₹${totalSales[0]?.total.toFixed(2) || 0}`, change: "+5%" },
      { label: "Total Orders", value: totalOrders, change: "+3%" },
    ]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sales summary" });
  }
};

export const getPopularProducts = async (req, res) => {
  try {
    const popularProducts = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          name: { $first: "$items.name" },
          price: { $first: "$items.price" },
          totalSold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
    ]);

    res.json(popularProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch popular products" });
  }
};

export const getTopProductSales = async (req, res) => {
  try {
    const topProductSales = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          name: { $first: "$items.name" },
          value: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
        },
      },
      { $sort: { value: -1 } },
      { $limit: 5 },
    ]);

    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];
    const data = topProductSales.map((item, index) => ({
      ...item,
      color: colors[index % colors.length],
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch top product sales" });
  }
};

export const getSalesThisYear = async (req, res) => {
  try {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1); // January 1st of the current year
    const salesThisYear = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfYear } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          month: { $first: { $month: "$createdAt" } },
          sales: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Map month numbers to names
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const formattedData = salesThisYear.map((item) => ({
      month: months[item.month - 1],
      sales: item.sales,
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sales this year" });
  }
};