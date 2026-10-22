/* ============ IMPORTES ============= */

import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Box, Container, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import ImcPage from './pages/ImcPage.jsx';
import AguaPage from './pages/AguaPage.jsx';
import HistoricoPage from './pages/HistoricoPage.jsx';
import Header from './components/Header.jsx';




/* ============ HISTÓRICO ============= */

const STORAGE_KEY = 'calculadora-historico';

export function useHistorico() {
  const [historico, setHistorico] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(historico)
    );
  }, [historico]);

  function adicionarRegistro(registro) {
    const novoRegistro = {
      ...registro,
      id: crypto.randomUUID(),
      data: new Date().toLocaleString('pt-BR')
    };

    setHistorico((atual) => [novoRegistro, ...atual]);
  }

  function limparHistorico() {
    setHistorico([]);
  }

  return {
    historico,
    adicionarRegistro,
    limparHistorico
  };
}



/* ============ APP ============= */

export default function App() {
  const {
    historico,
    adicionarRegistro,
    limparHistorico
  } = useHistorico();

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">

      <Header />

      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          py: { xs: 3, md: 5 }
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <ImcPage adicionarRegistro={adicionarRegistro} />
            }
          />

          <Route
            path="/agua"
            element={
              <AguaPage adicionarRegistro={adicionarRegistro} />
            }
          />

          <Route
            path="/historico"
            element={
              <HistoricoPage
                historico={historico}
                limparHistorico={limparHistorico}
              />
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </Container>

    </Box>
  );
}