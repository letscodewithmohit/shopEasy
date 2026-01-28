import { Link } from "react-router-dom";
import useAuthRedirect from "../../hooks/useAuthRedirect";

const Footer = () => {
  const { requireAuth } = useAuthRedirect();

  return (
    <footer className="bg-neutral-900 text-gray-400 py-10">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 1️⃣ Brand */}
        <div>
          <h3 className="text-white font-semibold text-lg">ShopEasy</h3>
          <p className="mt-3 text-sm">
            Simple, fast and secure shopping experience.
          </p>
        </div>

        {/* 2️⃣ Quick Links */}
        <div>
          <h4 className="text-white font-medium mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() =>
                  requireAuth("/cart", "Please login to view cart")
                }
                className="hover:text-white"
              >
                Cart
              </button>
            </li>

            <li>
              <button
                onClick={() =>
                  requireAuth("/profile", "Please login to view profile")
                }
                className="hover:text-white"
              >
                Profile
              </button>
            </li>
          </ul>
        </div>

        {/* 3️⃣ Legal */}
        <div>
          <h4 className="text-white font-medium mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              Privacy Policy
            </li>
            <li >
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* 4️⃣ Contact / Social */}
        <div>
          <h4 className="text-white font-medium mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
         
            <li>
              <a
                href="https://github.com/letscodewithmohit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/manmohan-choudhary01/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="text-center text-sm text-gray-500 mt-10">
        © 2025 ShopEasy — Created by{" "}
        <span className="text-gray-300 font-medium">
          Manmohan Choudhary
        </span>
      </div>
    </footer>
  );
};

export default Footer;
