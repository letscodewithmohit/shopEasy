import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/products/productSlice";
import ProductCard from "../ProductCard";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({ featured: true, limit: 8 }));
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <section className="bg-neutral-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-8">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );  
};

export default FeaturedProducts;
