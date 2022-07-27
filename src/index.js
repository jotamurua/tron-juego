import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PlayerProvider } from './components/playersContext/playerContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PlayerProvider>
    <App />
    </PlayerProvider>
  </React.StrictMode>
);

