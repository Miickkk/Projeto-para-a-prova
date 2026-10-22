/* ============ IMPORTES ============= */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App.jsx';
import './styles.css';




/* ============ INICIALIZAÇÃO ============= */

const theme = createTheme({
  palette: {
    primary: { main: '#202b7a' },
    secondary: { main: '#f5b323' },
    background: { default: '#f4f6fb', paper: '#ffffff' },
    success: { main: '#16845b' },
    warning: { main: '#d98b00' },
    error: { main: '#c62828' }
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h4: { fontWeight: 800 },
    h5: { fontWeight: 800 },
    button: { textTransform: 'none', fontWeight: 700 }
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: { styleOverrides: { root: { border: '1px solid #e1e7f1', boxShadow: '0 5px 18px #1f2d5a0f.06)' } } },
    MuiButton: { defaultProps: { disableElevation: true } }
  }
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
