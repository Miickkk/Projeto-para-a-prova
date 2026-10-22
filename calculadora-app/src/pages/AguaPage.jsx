/* ============ IMPORTES ============= */

import React from 'react';
import { useState } from 'react';
import {Alert,Box,Button,Card,CardContent,Grid,InputAdornment,Stack,TextField,Typography} from '@mui/material';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import LocalDrinkRoundedIcon from '@mui/icons-material/LocalDrinkRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';




/* ============ PAGINA ============= */

export default function AguaPage({ adicionarRegistro }) {
  const [peso, setPeso] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');




/* ============ CALCULAR AGUA ============= */

  function calcular(event) {
    event.preventDefault();

    const pesoKg = Number(peso.replace(',', '.'));

    if (!pesoKg || pesoKg <= 0 || pesoKg > 500) {
      setErro('Informe um peso válido.');
      setResultado(null);
      return;
    }

    const ml = Math.round(pesoKg * 35);

    const litros = (ml / 1000).toLocaleString('pt-BR', {
      maximumFractionDigits: 2
    });

    setResultado({ ml, litros });
    setErro('');

    adicionarRegistro({
      tipo: 'Água diária',
      resumo: `${litros} L por dia`,
      valor: ml
    });
  }




/* ============ LIMPAR ============= */

  function limpar() {
    setPeso('');
    setResultado(null);
    setErro('');
  }




/* ============ INTERFACE ============= */

  return (
    <Box>
      <Box mb={3}>
        <Typography
          color="secondary.dark"
          fontWeight={800}
          variant="overline"
          letterSpacing={1.2}
        >
          ÁGUA DIÁRIA
        </Typography>

        <Typography
          variant="h4"
          color="primary.main"
          sx={{ fontSize: { xs: '1.8rem', md: '2.25rem' } }}
        >
          Calcule sua água diária
        </Typography>

        <Typography color="text.secondary" mt={1}>
          Uma estimativa baseada no peso corporal.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                mb={3}
              >
                <Box className="icon-tile water-tile">
                  <WaterDropRoundedIcon />
                </Box>

                <Box>
                  <Typography variant="h6" fontWeight={800}>
                    Seu peso
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    A estimativa usa 35 ml por kg.
                  </Typography>
                </Box>
              </Stack>

              <Box component="form" onSubmit={calcular}>
                <Stack spacing={2.5}>
                  <TextField
                    label="Peso"
                    value={peso}
                    onChange={(event) => setPeso(event.target.value)}
                    type="number"
                    inputProps={{ min: 1, max: 500, step: '0.1' }}
                    required
                    fullWidth
                    placeholder="Ex.: 65.5"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          kg
                        </InputAdornment>
                      )
                    }}
                  />

                  {erro && (
                    <Alert severity="error">
                      {erro}
                    </Alert>
                  )}

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1.5}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<WaterDropRoundedIcon />}
                      fullWidth
                    >
                      Calcular quantidade
                    </Button>

                    <Button
                      type="button"
                      variant="outlined"
                      size="large"
                      startIcon={<RestartAltRoundedIcon />}
                      onClick={limpar}
                    >
                      Limpar
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card
            sx={{
              height: '100%',
              background: resultado
                ? '#fff'
                : 'linear-gradient(145deg, #eaf8ff, #d4efff)'
            }}
          >
            <CardContent
              sx={{
                p: { xs: 2.5, md: 4 },
                minHeight: 280,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <LocalDrinkRoundedIcon
                color="primary"
                sx={{ fontSize: 42, mb: 1 }}
              />

              <Typography
                variant="subtitle1"
                fontWeight={800}
                color="primary.main"
              >
                Sua estimativa diária
              </Typography>

              {resultado ? (
                <>
                  <Typography
                    variant="h2"
                    color="primary.main"
                    fontWeight={900}
                    my={1}
                  >
                    {resultado.litros} L
                  </Typography>

                  <Typography color="text.secondary">
                    Aproximadamente {resultado.ml.toLocaleString('pt-BR')} ml por dia.
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    variant="h5"
                    color="primary.main"
                    fontWeight={800}
                    mt={1}
                  >
                    Sua meta aparece aqui
                  </Typography>

                  <Typography color="text.secondary" mt={1}>
                    Informe seu peso para estimar a quantidade diária.
                  </Typography>
                </>
              )}

              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #c9e3f3' }}>
                <Typography variant="body2" color="text.secondary">
                  Fórmula utilizada
                </Typography>

                <Typography fontWeight={800} color="primary.main">
                  Peso (kg) × 35 ml
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
