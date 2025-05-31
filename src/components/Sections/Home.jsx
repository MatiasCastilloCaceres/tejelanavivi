import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid,
  useTheme,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import { ShoppingBag, School, Instagram } from '@mui/icons-material';

// API Service directo en el componente
const API_BASE_URL = 'https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1';
const AUTH_TOKEN = 'ipss.get';

const apiService = {
  getAboutUs: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/about-us/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AUTH_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors'
      });
      if (!response.ok) throw new Error('Error fetching data');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
};

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getAboutUs();
        setHomeData(data);
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box 
      id="inicio" 
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.light}20 100%)`,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23A06083" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Contenido principal */}
          <Grid item xs={12} md={6}>
            <Box>
              {/* Badge */}
              <Box 
                sx={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  bgcolor: 'primary.main',
                  color: 'white',
                  px: 3,
                  py: 1,
                  borderRadius: 25,
                  mb: 3,
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
              >
                ✨ Emprendimiento Local Zapallar
              </Box>

              {/* Título principal */}
              <Typography 
                variant="h1" 
                component="h1"
                sx={{ 
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: 3,
                  lineHeight: 1.2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              > 
                {loading ? 'Tejelanas Vivi' : (homeData?.title || homeData?.nombre || 'Tejelanas Vivi')}
              </Typography>

              {/* Subtítulo */}
              <Typography 
                variant="h5" 
                component="h2"
                sx={{ 
                  color: 'text.secondary',
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.4
                }}
              > 
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  homeData?.subtitle || homeData?.subtitulo || 
                  'Lanas naturales y vellón de alta calidad en Zapallar'
                )}
              </Typography>

              {/* Descripción */}
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary',
                  mb: 4,
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  maxWidth: 500
                }}
              >
                {loading ? (
                  'Cargando información...'
                ) : (
                  homeData?.description || homeData?.descripcion || 
                  'Descubre nuestra selección única de lanas naturales teñidas artesanalmente y únete a nuestros talleres especializados en técnicas tradicionales de tejido.'
                )}
              </Typography>

              {/* Botones de acción */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexDirection: { xs: 'column', sm: 'row' },
                  mb: 4
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingBag />}
                  onClick={() => scrollToSection('productos')}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                    boxShadow: '0 8px 25px rgba(160, 96, 131, 0.3)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 35px rgba(160, 96, 131, 0.4)'
                    }
                  }}
                >
                  Ver Productos
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<School />}
                  onClick={() => scrollToSection('productos')}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderColor: 'secondary.main',
                    color: 'secondary.main',
                    '&:hover': {
                      bgcolor: 'secondary.main',
                      borderColor: 'secondary.main',
                      color: 'white',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  Talleres
                </Button>
              </Box>

              {/* Estadísticas */}
              <Grid container spacing={3} sx={{ maxWidth: 400 }}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      396
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Publicaciones
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                      471
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Seguidores
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'accent.teal' }}>
                      5⭐
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Valoración
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Instagram CTA -para mejor flujo */}
              <Box sx={{ mt: 4, textAlign: { xs: 'center', md: 'left' } }}>
                <Button
                  variant="text"
                  startIcon={<Instagram />}
                  href="https://www.instagram.com/teje_lanas.vivi"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'primary.main',
                      color: 'white',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                    Síguenos en Instagram @teje_lanas.vivi
                  </Box>
                  <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                    @teje_lanas.vivi
                  </Box>
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Imagen/Visual */}
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                position: 'relative',
                textAlign: 'center',
                display: { xs: 'none', md: 'block' }
              }}
            >
              {/* Círculo decorativo */}
              <Box
                sx={{
                  width: 400,
                  height: 400,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '120%',
                    height: '120%',
                    borderRadius: '50%',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}10, transparent, ${theme.palette.secondary.main}10)`,
                    animation: 'rotate 20s linear infinite',
                    zIndex: -1
                  }
                }}
              >
                <Box
                  sx={{
                    fontSize: '8rem',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  🧶
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* ELIMINAR: Ya no necesitamos el botón absoluto */}
        {/* 
        <Box sx={{ position: 'absolute'... }}>
          ...
        </Box>
        */}
      </Container>

      {/* Animación CSS */}
      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
}

export default Home;
