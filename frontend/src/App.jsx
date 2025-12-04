// frontend/src/App.jsx

import { Routes, Route } from 'react-router-dom'
import Head from './components/Head'
import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import Register from './pages/Register'
import Map from './pages/Map/Map'

function App() {
  return (
    <>
      <Head />
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/register" element={<Register />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/map" element={<Map />} />
    </Routes>
    </>
  )
}

export default App