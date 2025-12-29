import { useNavigate } from "react-router-dom";

const categories = [
  "Electronics",
  "Fashion",
  "Home",
  "Books",
  "Accessories",
];

const Categories = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-8">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1  md:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="cursor-pointer border border-blue-400 p-6 bg-white shadow rounded-lg 
          hover:shadow-md hover:scale-105 transition text-center flex items-center justify-center"
            >
              <p className="font-medium">{cat}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
