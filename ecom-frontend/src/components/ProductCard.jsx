import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCart, updateCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart);

  // 🔍 check if product exists in cart
  const cartItem = items.find(
    (item) => item.product?._id === product._id
  );

  const quantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock === 0;
  const isMaxReached = quantity >= product.stock;

  const handleAddToCart = async () => {
    if (isOutOfStock || isMaxReached) return;

    if (!cartItem) {
      await dispatch(
        addToCart({ productId: product._id, quantity: 1 })
      );
    } else {
      await dispatch(
        updateCart({ productId: product._id, action: "increase" })
      );
    }

    dispatch(fetchCart());
  };

  return (
    <div className="overflow-hidden hover:shadow-lg transition bg-white rounded-lg">
      <Link to={`/products/${product._id}`}>
        <div className="h-48 w-full flex items-center justify-center">
          <img
            src={product?.image?.url}
            alt={product?.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </Link>

      <div className="p-4">
        <h3 className="font-medium line-clamp-1">
          {product?.name}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          ₹{product?.price}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isMaxReached}
          className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg
          hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isOutOfStock
            ? "Out of Stock"
            : isMaxReached
            ? "Stock Limit Reached"
            : quantity > 0
            ? "Added to Cart"
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
