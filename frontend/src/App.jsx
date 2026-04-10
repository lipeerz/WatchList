import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ListaFilmes from './pages/ListaFilmes';
import DetalheFilme from './pages/DetalheFilme';
import FormFilme from './pages/FormFilme';
import Sobre from './pages/Sobre';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<ListaFilmes />} />
            <Route path="/filme/:id" element={<DetalheFilme />} />
            <Route path="/novo" element={<FormFilme />} />
            <Route path="/editar/:id" element={<FormFilme />} />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
