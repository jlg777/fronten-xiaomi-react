
import './App.css'
import Carousel from './components/Carousel/Carousel'
import Features from './components/Features/Features'
import Footer from './components/Footer/Footer'
import IntroSection from './components/Introsection/Introsection'
import Navbar from './components/NavBar/Navbar'
import ProductList from './components/Products/ProductList'
import Products from './components/Products/Products'

function App() {

  return (
    <>
      <Navbar />
      <section className="section-banner">
        <Carousel />
      </section>
       <main className="container-xl section-main">
        <IntroSection />
        <ProductList />
        <Features />
       </main>
       <Footer />
    </>
  )
}

export default App
