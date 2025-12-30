import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);

  const requireAuth = (
    redirectTo,
    message = "Please login first") => {
    if (!token) {
      toast.error(message);
      navigate("/login", {
        state: { from: location.pathname },
      });
      return;
    }
    navigate(redirectTo);
  };

  return { requireAuth };
};

export default useAuthRedirect;
