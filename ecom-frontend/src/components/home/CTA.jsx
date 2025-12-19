const CTA = () => {
  return (
    <section className="bg-neutral-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold">
          Ready to start shopping?
        </h2>

        <p className="text-gray-400 mt-4">
          Browse our products and find what suits you best.
        </p>

        <a
          href="/products"
          className="inline-block mt-8 bg-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-700"
        >
          View Products
        </a>
      </div>
    </section>
  );
};

export default CTA;
