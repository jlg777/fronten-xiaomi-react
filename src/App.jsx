
import './App.css'
import Carousel from './components/Carousel/Carousel'
import Navbar from './components/NavBar/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <section className="section-banner">
        <Carousel />
      </section>
    </>
  )
}

export default App
