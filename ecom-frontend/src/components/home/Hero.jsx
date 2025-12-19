import { useSelector } from "react-redux";

const Hero = () => {
const { token } = useSelector((state) => state.auth);
  return (
 <section className="bg-neutral-900 text-white">
  <div className="max-w-7xl mx-auto px-6 py-28">
    <p className="uppercase tracking-wide text-sm text-gray-400">
      Simple • Fast • Secure
    </p>

    <h1 className="text-4xl md:text-5xl font-bold mt-4">
      Shopping made<br />
      <span className="text-indigo-500">easy</span> and reliable.
    </h1>

    <p className="text-gray-400 max-w-xl mt-6">
      Discover quality products at fair prices.
      Built for speed, security, and simplicity.
    </p>

    <div className="mt-8 flex gap-4">
      <a
        href="/products"
        className="bg-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-700"
      >
        Explore Products
      </a>

     {!token ? ( <a
        href="/register"
        className="border border-gray-600 px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
      >
        Create Account
      </a>) : ("")}
    </div>
  </div>
</section>

  );
};

export default Hero;
