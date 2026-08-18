
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/utilities.css";
import "./styles/responsive.css";
import './index.css'
import "./styles/design-system.css";

import "./styles/main.css";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      {/* <ToastContainer /> */}
    </AuthProvider>
  </BrowserRouter>
)

