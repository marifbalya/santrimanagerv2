
import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensures createRoot is correctly imported
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  // <React.StrictMode> // Temporarily removed for debugging
    <App />
  // </React.StrictMode>
);