import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductCard = ({ product }) => {

    const dispatch = useDispatch();

    const handleAddToCart = () => {
    dispatch(addToCart({productId : product._id, quantity : 1}));
  };
  return (
    <div className=" overflow-hidden hover:shadow-lg transition bg-white">
      
      <div className="h-48 w-full  flex items-center justify-center">
        <img
          src={product?.image?.url}
          alt={product?.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="p-4">
        <h3 className="font-medium line-clamp-1">
          {product?.name}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          ₹{product?.price}
        </p>

        <button className="cursor-pointer mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
