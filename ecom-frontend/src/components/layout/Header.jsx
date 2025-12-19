import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { items  } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          shopEasy 🙂
        </Link>

        {/* Search */}
       {token? ( <input
          type="text"
          placeholder="Search products..."
          className="hidden md:block w-1/3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />) : ("")}

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
