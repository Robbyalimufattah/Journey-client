import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';


import { LoginProvider, RegisteredProvider } from './context/AuthContext';
import { ModalProvider } from './context/ModalContext';
import { UserProvider } from './context/UserContext';


ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <LoginProvider>
          <Router>
            <App /> 
          </Router>
      </LoginProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);