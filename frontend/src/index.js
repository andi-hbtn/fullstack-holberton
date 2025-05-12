import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from "axios";
import ReactDOM from 'react-dom/client';

import { CartProvider } from "./context/CartContext.js";
import { AuthenticateProvider } from './context/AuthenticateContext';
import { CategoryProvider } from "./context/CategoryContext";
import { ProductProvider } from './context/ProductContext';

import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Orders from './pages/Orders/';
import ProductWithColorOptions from "./pages/ProductWithColors";
import ForgotPassword from "./pages/ForgotPassword";
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import Faq from './pages/Faq';
import Contact from './pages/Contact';

import Cart from './components/Cart/'
import Checkout from './components/Checkout/';
import AdminRoute from "./components/AdminRoute";

import Test from "./pages/ProductPage/test.js"

import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthenticateProvider>
    <CartProvider>
      <CategoryProvider>
        <ProductProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/admin-category" element={
                <AdminRoute>
                  <Categories />
                </AdminRoute>
              }
              />
              <Route path="/admin-products" element={
                <AdminRoute>
                  <Products />
                </AdminRoute>
              }
              />

              <Route path="/admin-product-with-colors" element={
                <AdminRoute>
                  <ProductWithColorOptions />
                </AdminRoute>
              }
              />

              <Route path="/admin-orders" element={
                <AdminRoute>
                  <Orders />
                </AdminRoute>
              }
              />

              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/category/:id" element={<CategoryPage />} />


              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />

              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/test/:id" element={<Test />} />
            </Routes>
          </BrowserRouter>
        </ProductProvider>
      </CategoryProvider>
    </CartProvider>
  </AuthenticateProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();