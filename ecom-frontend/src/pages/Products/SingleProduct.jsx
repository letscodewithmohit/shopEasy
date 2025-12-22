import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../features/products/productSlice";
import { addToCart, updateCart } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
const { items } = useSelector(state => state.cart);




  const { singleProduct, loading } = useSelector(
    (state) => state.products
  );



  const handleAddToCart = () => {
  dispatch(addToCart({ productId: singleProduct._id, quantity: 1 }));
};

   const handleBuyNow = () => {
  dispatch(
    addToCart({
      productId: singleProduct._id,
      quantity,
    })
  );

  navigate("/cart"); // later replace with /checkout
};


const cartItem = items.find(
  (item) => item.product._id === singleProduct?._id
);

const quantity = cartItem ? cartItem.quantity : 0;

const handleIncrease = () => {
  if (!cartItem) {
    dispatch(addToCart({ productId: singleProduct._id, quantity: 1 }));
  } else {
    dispatch(
      updateCart({
        productId: singleProduct._id,
        action: "increase"
      })
    );
  }
};

const handleDecrease = () => {
  if (!cartItem) return;

  dispatch(
    updateCart({
      productId: singleProduct._id,
      action: "decrease"
    })
  );
};



  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

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
                src={singleProduct.image.url}
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
                singleProduct.stock > 0
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {singleProduct.stock > 0
                ? "In Stock"
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
    className="px-3 py-1 border rounded"
  >
    -
  </button>

  <span className="font-medium">{quantity}</span>

  <button
    onClick={handleIncrease}
    className="px-3 py-1 border rounded"
  >
    +
  </button>
</div>
            {/* ACTION */}
         <div className="mt-6 flex gap-4">
  <button
    disabled={singleProduct.stock === 0}
    onClick={() =>
      dispatch(
        addToCart({
          productId: singleProduct._id,
          quantity,
        })
      )
    }
    className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
  >
    Add to Cart
  </button>

  <button
    disabled={singleProduct.stock === 0}
    onClick={handleBuyNow}
    className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
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
