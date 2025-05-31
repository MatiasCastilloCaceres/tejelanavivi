import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  Divider,
  Alert,
  Snackbar,
  useTheme
} from '@mui/material';
import {
  Facebook,
  Instagram,
  WhatsApp,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  // Función de navegación
  const scrollToSection = (sectionId) => {
    console.log(`🧭 Footer: Navegando a sección: ${sectionId}`);
    
    const element = document.getElementById(sectionId);
    console.log(`🎯 Footer: Elemento encontrado:`, element);
    
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      console.log(`✅ Footer: Scroll realizado a posición: ${offsetPosition}`);
    } else {
      console.error(`❌ Footer: No se encontró el elemento con ID: ${sectionId}`);
      
      if (sectionId === 'home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  };

  // Manejar clic en redes sociales
  const handleSocialClick = (platform, url) => {
    console.log(`🌐 Abriendo ${platform}:`, url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Manejar suscripción al newsletter
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setAlertMessage('Por favor ingresa tu correo electrónico');
      setAlertSeverity('warning');
      setShowAlert(true);
      return;
    }
    
    if (!emailRegex.test(email)) {
      setAlertMessage('Por favor ingresa un correo electrónico válido');
      setAlertSeverity('error');
      setShowAlert(true);
      return;
    }

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAlertMessage('¡Gracias por suscribirte! Te mantendremos informado sobre nuestros productos y ofertas.');
      setAlertSeverity('success');
      setShowAlert(true);
      setEmail('');
      
      console.log('📧 Suscripción exitosa:', email);
      
    } catch (error) {
      console.error('❌ Error en suscripción:', error);
      setAlertMessage('Hubo un error al procesar tu suscripción. Inténtalo nuevamente.');
      setAlertSeverity('error');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  // Enlaces de navegación
  const navigationLinks = [
    { label: 'Inicio', id: 'home' },
    { label: 'Acerca de', id: 'about' },
    { label: 'Productos', id: 'products' },
    { label: 'Preguntas Frecuentes', id: 'faq' },
    { label: 'Contacto', id: 'contacto' }
  ];

  // Enlaces de redes sociales
  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://es-la.facebook.com/MezcliMam/',
      color: '#1877F2'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/teje_lanas.vivi/',
      color: '#E4405F'
    },
    {
      name: 'WhatsApp',
      icon: WhatsApp,
      url: 'https://wa.me/56987654321', // Reemplazar con número real
      color: '#25D366'
    }
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.primary.dark,
        color: 'white',
        pt: 6,
        pb: 3,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Información de la empresa */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Tejelanas Vivi
            </Typography>
            <Typography variant="body2" paragraph sx={{ opacity: 0.9, lineHeight: 1.6 }}>
              Especialistas en lanas naturales y vellón de alta calidad. 
              Tradición artesanal desde el corazón de Zapallar.
            </Typography>
            
            {/* Redes sociales con enlaces reales */}
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <IconButton 
                    key={social.name}
                    onClick={() => handleSocialClick(social.name, social.url)}
                    sx={{ 
                      color: 'white',
                      transition: 'all 0.3s ease',
                      '&:hover': { 
                        color: social.color,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-3px)',
                        boxShadow: `0 8px 20px ${social.color}40`
                      }
                    }}
                    aria-label={`Visitar nuestro ${social.name}`}
                    title={`Síguenos en ${social.name}`}
                  >
                    <IconComponent />
                  </IconButton>
                );
              })}
            </Box>
          </Grid>

          {/* Enlaces rápidos */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Enlaces Rápidos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {navigationLinks.map((link) => (
                <Link
                  key={link.id}
                  component="button"
                  onClick={() => scrollToSection(link.id)}
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    opacity: 0.9,
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 0',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      color: theme.palette.secondary.main,
                      transform: 'translateX(5px)'
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Información de contacto */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Contacto
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: '1.2rem', opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Zapallar, Chile
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: '1.2rem', opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  +56 9 8765 4321
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: '1.2rem', opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  info@tejelanasvivi.cl
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Suscribirse
            </Typography>
            <Typography variant="body2" paragraph sx={{ opacity: 0.9, mb: 2 }}>
              Recibe noticias sobre nuevos productos y ofertas especiales.
            </Typography>
            <Box 
              component="form" 
              onSubmit={handleSubscribe}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,255,255,0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.secondary.main,
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    color: 'white',
                    '&::placeholder': {
                      color: 'rgba(255,255,255,0.7)',
                      opacity: 1,
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={loading}
                sx={{
                  py: 1,
                  fontWeight: 600,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                  }
                }}
              >
                {loading ? 'Enviando...' : 'Suscribirse'}
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />

        {/* Copyright */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Tejelanas Vivi. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Footer;