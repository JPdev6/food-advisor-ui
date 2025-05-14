import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Tailwind CSS
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app') // This matches the div in public/index.html
);