// frontend/src/App.jsx

import { Routes, Route } from 'react-router-dom'
import Head from './components/Head'
import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Head />
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/register" element={<Register />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/inicio" element={<Inicio />} />
    </Routes>
    </>
  )
}

export default App