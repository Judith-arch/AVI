// frontend/src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Head from './components/Head'
import Inicio from './pages/Inicio'
import Nosotros from './pages/Nosotros'

function App() {
  return (
    <>
      <Head />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} /> {/* Ajusté la ruta para que coincida con la página */}
      </Routes>
    </>
  )
}

export default App


