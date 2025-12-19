const categories = [
  "Electronics",
  "Fashion",
  "Home",
  "Books",
  "Accessories",
];

const Filters = ({ filters, setFilters }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-6">
      
      {/* Category */}
      <div>
        <h3 className="font-medium mb-2">Category</h3>
        <select
          className="w-full border rounded p-2"
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value, page: 1 })
          }
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-medium mb-2">Price</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 border rounded p-2"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value, page: 1 })
            }
          />
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 border rounded p-2"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value, page: 1 })
            }
          />
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-medium mb-2">Sort</h3>
        <select
          className="w-full border rounded p-2"
          value={filters.sort}
          onChange={(e) =>
            setFilters({ ...filters, sort: e.target.value, page: 1 })
          }
        >
          <option value="">Default</option>
          <option value="priceAsc">Price: Low → High</option>
          <option value="priceDesc">Price: High → Low</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
