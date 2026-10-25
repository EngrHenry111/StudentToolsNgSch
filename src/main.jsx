import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css"
import "katex/dist/katex.min.css";
// import { AuthProvider } from "./context/AuthContext";
import { AuthProvider } from "./contextQuiz/AuthContext";


// ✅ ADD THIS
import { HelmetProvider } from "react-helmet-async";

// For crawlers the edge middleware (seoFallback.js) puts the article text
// inside #root. createRoot() wipes it, so keep a copy that pages can show
// while their API fetch is in flight — otherwise Googlebot's render can
// land on an identical "Loading..." for every URL.
const rootEl = document.getElementById("root");
if (rootEl.innerHTML.trim()) {
  window.__EDGE_SNAPSHOT__ = {
    path: window.location.pathname,
    title: document.title,
    html: rootEl.innerHTML
  };
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);



// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
