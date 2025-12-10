// frontend/src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Head from './components/Head'
import Inicio from './pages/Inicio'
import Products from "./pages/Products/Products";
import Register from './pages/Register'
import Map from './pages/Map/Map'
import Footer from './components/Footer/Footer.jsx'

function App() {
  return (
    <>
      <Head />
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/register" element={<Register />} />
      <Route path="/map" element={<Map />} />
      <Route path="/products" element={<Products />} /> 
    </Routes>
    <Footer />
    </>
  )
}

export default App