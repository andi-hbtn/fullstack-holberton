import React from 'react';
import axios from "axios";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CategoryProvider } from './context/CategoryContext';
import Category from "./pages/Category";
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CategoryProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/category' element={<Category />} />
      </Routes>
    </BrowserRouter>
  </CategoryProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();