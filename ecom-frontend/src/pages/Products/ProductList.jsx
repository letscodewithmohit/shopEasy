import { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/products/productSlice";
import ProductCard from "../../components/ProductCard";
import Filters from "../../components/Filters";
import Pagination from "../../components/Pagination";


const ProductList = () => {


  const dispatch = useDispatch();

   const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
    page: 1,
  });

  const { products, loading, error, page, totalPages } = useSelector(
    (state) => state.products
  );
  
  const handlePageChange = (newPage) => {
  setFilters((prev) => ({
    ...prev,
    page: newPage,
  }));
};


  useEffect(() => {
    dispatch(getProducts(filters));
  }, [dispatch,filters]);
  
  console.log("page:", page, "totalPages:", totalPages);

  return (
   <section className="bg-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        {/* Products */}
        <div className="md:col-span-3">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>


          {/* pagination component */}

          <Pagination
  page={page}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>

        </div>

      </div>
    </section>
  );
};

export default ProductList;
