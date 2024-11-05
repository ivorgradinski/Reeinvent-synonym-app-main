import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import RoutesConfig from './routes/RoutesConfig';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <RoutesConfig />
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
