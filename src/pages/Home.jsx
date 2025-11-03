import Carousel from "../components/Carousel/Carousel";
import Features from "../components/Features/Features";
import Footer from "../components/Footer/Footer";
import IntroSection from "../components/IntroSection/IntroSection";
import Navbar from "../components/NavBar/Navbar";
import ProductList from "../components/Products/ProductList";

const Home = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <IntroSection />
      <Features />
      <ProductList />
      <Footer />
    </>
  );
};

export default Home;
