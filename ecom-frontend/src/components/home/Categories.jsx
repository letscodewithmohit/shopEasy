const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Books",
  "Accessories",
];

const Categories = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-8">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div
              key={cat}
              className="border rounded-xl p-6 text-center cursor-pointer hover:border-indigo-600 transition"
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
