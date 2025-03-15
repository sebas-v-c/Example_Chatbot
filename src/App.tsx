import './App.css'

import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { Container } from 'react-bootstrap';



function App() {

  return (
        <div>
      <Navbar/>
      <Container className="mt-5">
        <h1 className="text-center mb-4">🛒 Tienda de Electrónica</h1>
        <ProductList />
      </Container>
      <Chatbot />
      <Footer />
    </div>
  );
}

export default App
