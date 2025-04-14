import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from "axios";
import ReactDOM from 'react-dom/client';

import { CartProvider } from "./context/CartContext.js";
import { AuthenticateProvider } from './context/AuthenticateContext';
import { CategoryProvider } from "./context/CategoryContext";
import { ProductProvider } from './context/ProductContext';

import Categories from "./pages/Categories/Categories";
import Products from "./pages/Products/index.js";
import Home from './pages/Home/index.js';
import ProductPage from "./pages/ProductPage/index.js";
import Cart from './components/Cart/'
import Checkout from './components/Checkout/';
import AdminRoute from "./components/AdminRoute";

import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <AuthenticateProvider >
      <CategoryProvider>
        <ProductProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/admin-category" element={<Categories />} />
              <Route path="/admin-products" element={ 
                  <AdminRoute> 
                    <Products /> 
                  </AdminRoute>
                } 
              />
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </BrowserRouter>
        </ProductProvider>
      </CategoryProvider>
    </AuthenticateProvider>
  </CartProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();