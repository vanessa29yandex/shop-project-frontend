import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App.jsx';
import CartProvider from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ChakraProvider>
      <CartProvider>
        <AuthProvider>
          <ToastContainer />
          <App />
        </AuthProvider>
      </CartProvider>
    </ChakraProvider>
);
