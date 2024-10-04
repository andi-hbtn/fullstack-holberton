import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AllPosts from './posts/AllPosts';
// import CreatePost from './posts/CreatePost';
import { ParentProvider } from './context/ParentContext';
import Parent from './example/Parent';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <>
    <ParentProvider>
      <Parent />
    </ParentProvider>
  </>
  // <React.StrictMode>
  // <BrowserRouter>
  //   <Routes>
  //     <Route path='all-posts' element={<AllPosts />} />
  //     <Route path='create-posts' element={<CreatePost />} />
  //   </Routes>
  // </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
