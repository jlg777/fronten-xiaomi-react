import "./App.css";
import Carousel from "./components/Carousel/Carousel";
import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer";
import IntroSection from "./components/Introsection/Introsection";
import Navbar from "./components/NavBar/Navbar";
import ProductList from "./components/Products/ProductList";
import Products from "./components/Products/Products";
import Admin from "./pages/admin";

function App() {
  return (
    <>
      <Navbar />
      <Admin />
      <Footer />
    </>
  );
}

export default App;
