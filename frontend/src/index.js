import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from "axios";
import ReactDOM from 'react-dom/client';

import { AuthenticateProvider } from './context/AuthenticateContext';
import { CategoryProvider } from "./context/CategoryContext";
import { AuthorProvider } from "./context/AuthorContext";
import { BookProvider } from './context/BookContext';

import Categories from "./pages/Categories/Categories";
import Authors from './pages/Authors/Authors';
import Books from "./pages/Books/Books";

import Login from './pages/Login/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthenticateProvider>
    <AuthorProvider>
      <CategoryProvider>
        <BookProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login"     element={<Login />} />
              <Route path="/authors"   element={<Authors />} />
              <Route path="/category"  element={<Categories />} />
              <Route path="/books"     element={<Books />} />
            </Routes>
          </BrowserRouter>
        </BookProvider>
      </CategoryProvider>
    </AuthorProvider>
  </AuthenticateProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();