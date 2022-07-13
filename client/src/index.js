import React from 'react';
import ReactDOM from 'react-dom/client';
import { MealContextProvider } from './context/MealContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MealContextProvider>
    <App />
    </MealContextProvider>
  </React.StrictMode>
);
