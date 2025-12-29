import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const totalPaid = location.state?.totalPaid;

  // Protect route (refresh / direct access)
  useEffect(() => {
    if (!totalPaid) {
      navigate("/");
    }
  }, [totalPaid, navigate]);

  if (!totalPaid) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="max-w-xl mx-auto text-center bg-white rounded-2xl shadow-lg p-10">
        <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto" />

        <h1 className="text-3xl font-bold mt-6">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-600 mt-4">
          Thank you for shopping with us. Your order has been placed and will
          be delivered soon.
        </p>

        <div className="mt-6 bg-gray-50 rounded-xl p-4">
        <p>Subtotal: ₹{location.state.itemsPrice}</p>
<p>
  Delivery:{" "}
  {location.state.deliveryCharge === 0
    ? "FREE"
    : `₹${location.state.deliveryCharge}`}
</p>
<p>Total Paid: ₹{location.state.totalPaid}</p>

        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/products")}
            className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Browse Products
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-6">
          🔒 Your order is secure and confirmed
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
