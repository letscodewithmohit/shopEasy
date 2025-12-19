const features = [
  { title: "Fast Delivery", icon: "🚚" },
  { title: "Secure Payment", icon: "🔒" },
  { title: "Quality Products", icon: "⭐" },
  { title: "24/7 Support", icon: "💬" },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold mb-10">
          Why Choose ShopEasy?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <p className="font-medium">{f.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
