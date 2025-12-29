import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useNavigationType } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Header = () => {

const location = useLocation();
const [searchParams] = useSearchParams();
const searchFromUrl = searchParams.get("search") || "";
const [search, setSearch] = useState(searchFromUrl);

const [debouncedSearch, setDebouncedSearch] = useState(searchFromUrl);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { items  } = useSelector((state) => state.cart);

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 400); // 400ms delay

  return () => clearTimeout(timer);
}, [search]);


useEffect(() => {
  setSearch(searchFromUrl);
}, [searchFromUrl]);



useEffect(() => {
  // ✅ Search logic ONLY runs on /products page
  if (location.pathname !== "/products") return;

  // Clear search → show default products
  if (!debouncedSearch.trim()) {
    navigate("/products", { replace: true });
    return;
  }

  // Active search
  navigate(
    `/products?search=${debouncedSearch.trim().toLowerCase()}`,
    { replace: true }
  );
}, [debouncedSearch, location.pathname, navigate]);


  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          shopEasy :)
        </Link>

        {/* Search */}
       {token && location.pathname === "/products" && (
  <form className="hidden md:block w-1/3">

    <input
      type="text"
      placeholder="Search products or category..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </form>
)}


        {/* Right */}
        <div className="flex items-center gap-7">
          {token && (
            <Link
              to="/cart"
              className="text-gray-700 font-medium hover:text-blue-600"
            >
              🛒 <span className="absolute  top-3 ">{items.length}</span>
            </Link>
          )}

          <Link to='/products' className="text-gray-700 font-medium hover:text-blue-600">Products</Link>

          {token ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
