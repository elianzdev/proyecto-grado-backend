import Order from "../models/order.js";

// Crear una nueva orden

export const createOrder = async (req, res) => {
  try {
    const { cursos, total } = req.body;

    const userId = req.usuario?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    if (!cursos || cursos.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const newOrder = new Order({
      usuario: userId,
      cursos,
      total,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    console.error("Create order error:", error.message);

    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};


// Obtener los cursos comprados por el usuario

export const getUserCourses = async (req, res) => {
  try {
    const userId = req.usuario?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const orders = await Order.find({
      usuario: userId,
    }).populate("cursos");

    const purchasedCourses = [];

    orders.forEach((order) => {
      order.cursos.forEach((course) => {
        const alreadyExists = purchasedCourses.find(
          (c) => c._id.toString() === course._id.toString()
        );

        if (!alreadyExists) {
          purchasedCourses.push(course);
        }
      });
    });

    res.status(200).json({
      success: true,
      count: purchasedCourses.length,
      data: purchasedCourses,
    });
  } catch (error) {
    console.error("Get purchased courses error:", error.message);

    res.status(500).json({
      success: false,
      message: "Error fetching purchased courses",
      error: error.message,
    });
  }
};