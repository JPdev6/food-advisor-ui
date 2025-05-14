import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Tailwind CSS
import App from './App';
import "./styles/index.css"; // Make sure it exists and includes Tailwind's base


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app') // This matches the div in public/index.html
);