import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from "axios";
import ReactDOM from 'react-dom/client';

import { CartProvider } from "./context/CartContext.js";
import { AuthenticateProvider } from './context/AuthenticateContext';
import { CustomerProvider } from "./context/CustomerContext.js"
import { CategoryProvider } from "./context/CategoryContext";
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext.js';

import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Orders from './pages/Orders/';
import Customers from './pages/Customers';
import ProductWithColorOptions from "./pages/ProductVariants/index.js";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import Faq from './pages/Faq';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/Terms/index.js';
import Contact from './pages/Contact';

import Cart from './components/Cart/'
import Checkout from './components/Checkout/';
import AdminRoute from "./components/AdminRoute";
import AuthUserRoute from './components/AuthUserRoute';
import UserProfile from './pages/UserProfile';

import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthenticateProvider>
    <CustomerProvider>
      <CartProvider>
        <CategoryProvider>
          <ProductProvider>
            <OrderProvider>
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

                  <Route path="/admin-customers" element={
                    <AdminRoute>
                      <Customers />
                    </AdminRoute>
                  }
                  />

                  <Route path="/profile" element={
                    <AuthUserRoute>
                      <UserProfile />
                    </AuthUserRoute>
                  }
                  />

                  <Route path="/" element={<Home />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/faq" element={<Faq />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={< TermsAndConditions />} />
                  <Route path="/category/:id" element={<CategoryPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} />
                </Routes>
              </BrowserRouter>
            </OrderProvider>
          </ProductProvider>
        </CategoryProvider>
      </CartProvider>
    </CustomerProvider>
  </AuthenticateProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();