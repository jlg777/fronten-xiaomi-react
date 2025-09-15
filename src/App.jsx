
import './App.css'
import Carousel from './components/Carousel/Carousel'
import IntroSection from './components/Introsection/Introsection'
import Navbar from './components/NavBar/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <section className="section-banner">
        <Carousel />
      </section>
       <main className="container-xl section-main">
        <IntroSection />
       </main>
    </>
  )
}

export default App
