/* ============ IMPORTES ============= */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {AppBar,Box,Container,Tab,Tabs,Toolbar,Typography} from '@mui/material';
import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';




/* ============ CABEÇALHO ============= */

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const rotas = ['/', '/agua', '/historico'];

  const valor = rotas.includes(location.pathname)
    ? location.pathname
    : '/';

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 76,
            gap: 1.5,
            flexWrap: 'wrap'
          }}
        >
          <MonitorHeartRoundedIcon
            sx={{ fontSize: 36, color: 'secondary.main' }}
          />

            <Box sx={{ flexGrow: 1, py: 1 }}>
              <Typography
                fontSize="15px"
                fontWeight={800}>

                Calculadoras de saúde
              </Typography>
            </Box>

          <Tabs
            value={valor}
            onChange={(event, novaRota) => navigate(novaRota)}
            textColor="inherit"
            indicatorColor="secondary"
            variant="scrollable"
            allowScrollButtonsMobile
            aria-label="Navegação principal"
            sx={{
              '& .MuiTab-root': {
                minHeight: 64,
                fontWeight: 700,
                minWidth: 105
              }
            }}
          >
            <Tab
              value="/"
              icon={<CalculateRoundedIcon />}
              iconPosition="start"
              label="Calculadora IMC"
            />

            <Tab
              value="/agua"
              icon={<WaterDropRoundedIcon />}
              iconPosition="start"
              label="Água diária"
            />

            <Tab
              value="/historico"
              icon={<HistoryRoundedIcon />}
              iconPosition="start"
              label="Histórico"
            />
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
