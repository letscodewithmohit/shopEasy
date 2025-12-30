import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchFromUrl = searchParams.get("search") || "";

  const [search, setSearch] = useState(searchFromUrl);
  const [debouncedSearch, setDebouncedSearch] = useState(searchFromUrl);

  const { token } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const { profile } = useSelector((state) => state.user);

  /* ------------------ DEBOUNCE ------------------ */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setSearch(searchFromUrl);
  }, [searchFromUrl]);

  /* ------------------ SEARCH NAV ------------------ */
  useEffect(() => {
    if (location.pathname !== "/products") return;

    if (!debouncedSearch.trim()) {
      navigate("/products", { replace: true });
      return;
    }

    navigate(
      `/products?search=${debouncedSearch.trim().toLowerCase()}`,
      { replace: true }
    );
  }, [debouncedSearch, location.pathname, navigate]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          shopEasy
        </Link>

        {/* Search */}
        {token && location.pathname === "/products" && (
          <div className="hidden md:block w-1/3">
            <input
              type="text"
              placeholder="Search products or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Right */}
        <div className="flex items-center gap-6">
           
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-blue-600">
            Products
          </Link>

          {token && (
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 text-xl">
              🛒
              {items.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                  {items.length}
                </span>
              )}
            </Link>
          )}

          {token ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 hover:opacity-80"
            >
              <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {profile?.name?.charAt(0) || "U"}
              </div>
              <span className="hidden sm:block text-gray-700">
                Profile
              </span>
            </Link>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
              >
                Login
              </Link>
              {/* <Link
                to="/register"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
              >
                Register
              </Link> */}
            </>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;
