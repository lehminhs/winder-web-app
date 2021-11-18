import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './index.css';
import AuthWrapper from './components/auth/Auth'
import ContextWrapper from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route exact path="/login" element={<AuthWrapper />} />
          <Route exact path="/register" element={<AuthWrapper />} />
          <Route exact path="/" element={<ContextWrapper />} />
        </Routes>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
