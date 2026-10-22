/* ============ IMPORTES ============= */

import React from 'react';
import { useState } from 'react';
import {Alert,Box,Button,Card,CardContent,Chip,Divider,Stack,Typography} from '@mui/material';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';




/* ============ PAGINA ============= */

export default function HistoricoPage({ historico, limparHistorico }) {
  const [confirmar, setConfirmar] = useState(false);




/* ============ INTERFACE ============= */

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        gap={2}
        flexWrap="wrap"
        mb={3}
      >
        <Box>
          <Typography
            color="secondary.dark"
            fontWeight={800}
            variant="overline"
            letterSpacing={1.2}
          >
            SEUS REGISTROS
          </Typography>

          <Typography
            variant="h4"
            color="primary.main"
            sx={{ fontSize: { xs: '1.8rem', md: '2.25rem' } }}
          >
            Histórico de cálculos
          </Typography>

          <Typography color="text.secondary" mt={1}>
            Os resultados ficam salvos neste navegador.
          </Typography>
        </Box>

        {historico.length > 0 && (
          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteOutlineRoundedIcon />}
            onClick={() => setConfirmar(true)}
          >
            Limpar histórico
          </Button>
        )}
      </Box>


      {confirmar && (
        <Alert
          severity="warning"
          sx={{ mb: 2 }}
          action={
            <Stack direction="row" spacing={1}>
              <Button
                color="inherit"
                size="small"
                onClick={() => setConfirmar(false)}
              >
                Cancelar
              </Button>

              <Button
                color="error"
                size="small"
                onClick={() => {
                  limparHistorico();
                  setConfirmar(false);
                }}
              >
                Confirmar
              </Button>
            </Stack>
          }
        >
          Tem certeza que deseja apagar todos os registros?
        </Alert>
      )}


      {historico.length === 0 ? (
        <Card>
          <CardContent sx={{ py: 7, textAlign: 'center' }}>
            <HistoryRoundedIcon
              sx={{ fontSize: 54, color: '#9aa5c5', mb: 1 }}
            />

            <Typography variant="h6" fontWeight={800}>
              Nenhum registro ainda
            </Typography>

            <Typography color="text.secondary" mt={1}>
              Faça um cálculo de IMC ou água diária para ele aparecer aqui.
            </Typography>
          </CardContent>
        </Card>
      ) : (




/* ============ LISTA DE REGISTROS ============= */

        <Card>
          <CardContent sx={{ p: { xs: 1.5, md: 3 } }}>
            <Stack spacing={0}>
              {historico.map((item, index) => (
                <Box key={item.id}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    justifyContent="space-between"
                    gap={1.5}
                    py={2}
                    px={1}
                  >
                    <Box>
                      <Chip
                        label={item.tipo}
                        color={item.tipo === 'IMC' ? 'primary' : 'info'}
                        size="small"
                        sx={{ mb: 1 }}
                      />

                      <Typography fontWeight={800}>
                        {item.resumo}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        {item.data}
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      {item.tipo === 'IMC'
                        ? `IMC: ${item.valor}`
                        : `Quantidade: ${Number(item.valor).toLocaleString('pt-BR')} ml`}
                    </Typography>
                  </Stack>

                  {index < historico.length - 1 && <Divider />}
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
