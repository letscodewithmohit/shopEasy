import Order from "../models/Order.model.js";
import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress, paymentMethod } = req.body;

    // 1️⃣ Get cart
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ Prepare order items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.image?.url,
      price: item.price,
      quantity: item.quantity,
    }));

    const itemsPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const deliveryCharge = itemsPrice >= 1000 ? 0 : 40;
    const totalAmount = itemsPrice + deliveryCharge;

    // 3️⃣ Create order
    const order = await Order.create({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      deliveryCharge,
      totalAmount,
    });

    // 4️⃣ Reduce stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity },
      });
    }

    // 5️⃣ Clear cart
    cart.items = [];
    await cart.save();

 res.status(201).json({
  message: "Order placed successfully",
  order: {
    _id: order._id,
    itemsPrice,
    deliveryCharge,
    totalAmount,
  },
});
  } catch (error) {
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Security: user can see only their order
    if (order.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
