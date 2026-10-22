/* ============ IMPORTES ============= */

import React from 'react';
import { useState } from 'react';
import {Alert,Box,Button,Card,CardContent,Chip,Grid,InputAdornment,Stack,TextField,Typography} from '@mui/material';
import MonitorWeightRoundedIcon from '@mui/icons-material/MonitorWeightRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';




/* ============ FUNCOES ============= */

function classificarImc(imc) {
  if (imc < 18.5) {
    return { texto: 'Abaixo do peso', cor: 'error' };
  }

  if (imc < 25) {
    return { texto: 'Peso adequado', cor: 'success' };
  }

  if (imc < 30) {
    return { texto: 'Sobrepeso', cor: 'warning' };
  }

  if (imc < 35) {
    return { texto: 'Obesidade grau I', cor: 'error' };
  }

  if (imc < 40) {
    return { texto: 'Obesidade grau II', cor: 'error' };
  }

  return { texto: 'Obesidade grau III', cor: 'error' };
}




/* ============ PAGINA ============= */

export default function ImcPage({ adicionarRegistro }) {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');





/* ============ CALCULAR ============= */

  function calcular(event) {
    event.preventDefault();

    const pesoKg = Number(peso.replace(',', '.'));
    const alturaM = Number(altura.replace(',', '.')) / 100;

    if (
      !pesoKg ||
      !alturaM ||
      pesoKg <= 0 ||
      alturaM <= 0 ||
      pesoKg > 500 ||
      alturaM > 2.6
    ) {
      setErro('Informe um peso e uma altura válidos.');
      setResultado(null);
      return;
    }

    const imc = pesoKg / (alturaM * alturaM);
    const classificacao = classificarImc(imc);

    const novoResultado = {
      valor: Number(imc.toFixed(1)),
      ...classificacao
    };

    setResultado(novoResultado);
    setErro('');

    adicionarRegistro({
      tipo: 'IMC',
      resumo: `${novoResultado.valor} · ${novoResultado.texto}`,
      valor: novoResultado.valor
    });
  }




/* ============ LIMPAR CAMPOS ============= */

  function limpar() {
    setPeso('');
    setAltura('');
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
          CALCULADORA DE IMC
        </Typography>

        <Typography
          variant="h4"
          color="primary.main"
          sx={{ fontSize: { xs: '1.8rem', md: '2.25rem' } }}
        >
          Descubra seu IMC
        </Typography>

        <Typography color="text.secondary" mt={1}>
          Coloque seu peso e sua altura para calcular o IMC.
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
                <Box className="icon-tile">
                  <MonitorWeightRoundedIcon />
                </Box>

                <Box>
                  <Typography variant="h6" fontWeight={800}>
                    Seus dados
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Preencha os dois campos abaixo.
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

                  <TextField
                    label="Altura"
                    value={altura}
                    onChange={(event) => setAltura(event.target.value)}
                    type="number"
                    inputProps={{ min: 1, max: 260, step: '0.1' }}
                    required
                    fullWidth
                    placeholder="Ex.: 170"
                    helperText="Informe a altura em centímetros (cm)."
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          cm
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
                      startIcon={<CalculateRoundedIcon />}
                      fullWidth
                    >
                      Calcular IMC
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
                : 'linear-gradient(145deg, #202b7a, #3445a0)',
              color: resultado ? 'text.primary' : '#fff'
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
              <Typography
                variant="subtitle1"
                fontWeight={800}
                color={resultado ? 'primary.main' : 'secondary.main'}
              >
                Seu resultado
              </Typography>

              {resultado ? (
                <>
                  <Typography variant="h2" fontWeight={900} my={1}>
                    {resultado.valor}
                  </Typography>

                  <Typography color="text.secondary" mb={2}>
                    Índice de Massa Corporal (IMC)
                  </Typography>

                  <Box>
                    <Chip
                      label={resultado.texto}
                      color={resultado.cor}
                    />
                  </Box>
                </>
              ) : (
                <>
                  <Typography variant="h5" fontWeight={800} mt={1}>
                    O resultado aparece aqui
                  </Typography>

                  <Typography sx={{ opacity: 0.82 }} mt={1}>
                    Preencha peso e altura e clique em Calcular IMC.
                  </Typography>

                  <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #ffffff38' }}>
                    <Typography variant="body2">
                      Fórmula Utilizada
                    </Typography>

                    <Typography fontWeight={700}>
                      IMC = peso (kg) ÷ altura² (m)
                    </Typography>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
