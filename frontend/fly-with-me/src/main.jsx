import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
    <BrowserRouter>
      <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
