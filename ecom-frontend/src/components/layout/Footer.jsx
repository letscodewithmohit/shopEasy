const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-white font-semibold text-lg">ShopEasy</h3>
          <p className="mt-3 text-sm">
            Simple, fast and secure shopping experience.
          </p>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/cart" className="hover:text-white">Cart</a></li>
            <li><a href="/profile" className="hover:text-white">Profile</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} ShopEasy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
