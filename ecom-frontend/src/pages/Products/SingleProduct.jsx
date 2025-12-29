import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../features/products/productSlice";
import { addToCart, fetchCart, updateCart } from "../../features/cart/cartSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.cart);
  const { singleProduct, loading } = useSelector(
    (state) => state.products
  );

  // 🔐 SAFE GUARDS
  const stock = singleProduct?.stock ?? 0;

  const cartItem = items.find(
    (item) => item.product?._id === singleProduct?._id
  );

  const quantity = cartItem ? cartItem.quantity : 0;

  const isOutOfStock = stock === 0;
  const isMaxQuantityReached = quantity >= stock;
  const availableStock = Math.max(stock - quantity, 0);

  // 🔹 HANDLERS
  const handleAddToCart = async () => {
    if (isOutOfStock || isMaxQuantityReached) return;

    if (!cartItem) {
      await dispatch(
        addToCart({ productId: singleProduct._id, quantity: 1 })
      );
    } else {
      await dispatch(
        updateCart({ productId: singleProduct._id, action: "increase" })
      );
    }
    dispatch(fetchCart());
  };

  const handleBuyNow = async () => {
    if (isOutOfStock) return;

    await dispatch(
      addToCart({ productId: singleProduct._id, quantity: 1 })
    );
    dispatch(fetchCart());
    navigate("/cart");
  };

  const handleIncrease = async () => {
    if (isMaxQuantityReached) return;

    await dispatch(
      updateCart({ productId: singleProduct._id, action: "increase" })
    );
    dispatch(fetchCart());
  };

  const handleDecrease = async () => {
    if (!cartItem) return;

    await dispatch(
      updateCart({ productId: singleProduct._id, action: "decrease" })
    );
    dispatch(fetchCart());
  };

  // 🔹 FETCH PRODUCT
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  // 🔹 UI STATES
  if (loading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (!singleProduct) {
    return (
      <p className="text-center py-20 text-gray-500">
        Product not found
      </p>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">
     
      <div className="max-w-7xl mx-auto px-6">
      
        <div className="bg-white rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
       
          {/* IMAGE */}
          <div className="flex items-center justify-center">
            <div className="w-full h-[420px] flex items-center justify-center">
              <img
                src={singleProduct.image?.url}
                alt={singleProduct.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              {singleProduct.name}
            </h1>

            <p className="text-2xl text-indigo-600 mt-4">
              ₹{singleProduct.price}
            </p>

            {/* STOCK */}
            <p
              className={`mt-2 font-medium ${
                availableStock > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {availableStock > 0
                ? `In Stock (${availableStock} left)`
                : "Out of Stock"}
            </p>

            <p className="text-gray-600 mt-4 leading-relaxed">
              {singleProduct.description}
            </p>

            {/* QUANTITY */}
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={handleDecrease}
                disabled={quantity === 0}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                -
              </button>

              <span className="font-medium">{quantity}</span>

              <button
                onClick={handleIncrease}
                disabled={isMaxQuantityReached}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                +
              </button>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-6 flex gap-4">
              <button
                disabled={isOutOfStock || isMaxQuantityReached}
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg 
                hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOutOfStock
                  ? "Out of Stock"
                  : isMaxQuantityReached
                  ? "Stock Limit Reached"
                  : quantity > 0
                  ? "Added to Cart"
                  : "Add to Cart"}
              </button>

              <button
                disabled={isOutOfStock}
                onClick={handleBuyNow}
                className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg 
                hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

            {/* EXTRA INFO */}
            <p className="text-sm text-gray-500 mt-4">
              Category: {singleProduct.category}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
