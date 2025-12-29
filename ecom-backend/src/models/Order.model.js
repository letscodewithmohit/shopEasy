import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],

    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      pincode: String,
    },

    paymentMethod: {
      type: String,
      default: "COD",
    },

    itemsPrice: Number,
    deliveryCharge: Number,
    totalAmount: Number,

    orderStatus: {
      type: String,
      default: "Placed",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
