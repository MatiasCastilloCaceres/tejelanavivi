import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box 
      id="home"
      sx={{ 
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
        color: 'white',
        pt: { xs: 10, md: 16 }, 
        pb: { xs: 14, md: 20 },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Elementos decorativos */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          zIndex: 1
        }}
      />
      <Box 
        sx={{ 
          position: 'absolute',
          bottom: '-5%',
          right: '10%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          zIndex: 1
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              Tejelanas Vivi
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                opacity: 0.9
              }}
            >
              Especialistas en lanas naturales y vellón para tus creaciones más hermosas
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  fontSize: '1.1rem',
                  whiteSpace: 'nowrap'
                }}
              >
                Ver Productos
              </Button>
              <Button 
                variant="outlined" 
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  fontSize: '1.1rem',
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  },
                  whiteSpace: 'nowrap'
                }}
              >
                Sobre Nosotros
              </Button>
            </Box>
          </Grid>
          {!isMobile && (
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  position: 'relative',
                  height: '500px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box 
                  component="img"
                  src="/images/Lanas_Naturales.jpg"
                  alt="Lanas Naturales"
                  sx={{
                    width: '90%',
                    height: 'auto',
                    maxHeight: '450px',
                    objectFit: 'cover',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    transform: 'rotate(-5deg)',
                    zIndex: 1
                  }}
                />
                <Box 
                  component="img"
                  src="/images/Vellon+Premium.jpg"
                  alt="Vellón Premium"
                  sx={{
                    position: 'absolute',
                    width: '60%',
                    height: 'auto',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    bottom: '10%',
                    right: '5%',
                    transform: 'rotate(8deg)',
                    zIndex: 2
                  }}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
      
      {/* Forma ondulada en la parte inferior */}
      <Box 
        sx={{ 
          position: 'absolute',
          bottom: -2,
          left: 0,
          width: '100%',
          height: '150px',
          backgroundColor: theme.palette.background.default,
          clipPath: 'polygon(0 100%, 100% 100%, 100% 25%, 0 75%)',
          zIndex: 2
        }}
      />
    </Box>
  );
};

export default Home;
