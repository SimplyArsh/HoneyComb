import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/Workout-Context'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( // The entire app is wrapped by Workout Context
  <React.StrictMode>
    <WorkoutsContextProvider>
      <App />
    </WorkoutsContextProvider>
  </React.StrictMode>
);

