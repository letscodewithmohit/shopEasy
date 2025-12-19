import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Footer from "../components/layout/Footer";


const Home = () => {
  // TEMP products (until productSlice is ready)
  const products = [];

  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts products={products} />
      <WhyChooseUs />
     
 
    </>
  );
};

export default Home;
