import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton, 
  TextField, 
  Button,
  Divider,
  useTheme 
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function Footer() {
  const theme = useTheme();
  const year = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: theme.palette.primary.dark, 
        color: 'white',
        pt: { xs: 6, md: 10 },
        pb: 4
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo y descripción */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Tejelanas Vivi
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
              Especialistas en lanas naturales y vellón de alta calidad para tus proyectos creativos.
              Ubicados en Zapallar, Chile.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <IconButton 
                color="inherit" 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                color="inherit"
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                color="inherit"
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <PinterestIcon />
              </IconButton>
              <IconButton 
                color="inherit"
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Enlaces rápidos */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Enlaces rápidos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Inicio', 'Productos', 'Talleres', 'Nosotros', 'Contacto'].map((item, index) => (
                <Link 
                  key={index} 
                  href="#" 
                  underline="hover" 
                  color="inherit"
                  sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Productos */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Productos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Lanas Naturales', 'Vellón', 'Kits', 'Accesorios', 'Talleres'].map((item, index) => (
                <Link 
                  key={index} 
                  href="#" 
                  underline="hover" 
                  color="inherit"
                  sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="600">
              Suscríbete a nuestro newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Recibe información sobre nuevos productos, talleres y promociones especiales.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                label="Tu email"
                variant="outlined"
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,255,255,0.5)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255,255,255,0.7)',
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  }
                }}
              />
              <Button 
                variant="contained" 
                color="secondary"
              >
                Enviar
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />
        
        <Box sx={{ textAlign: 'center', opacity: 0.8, fontSize: '0.9rem' }}>
          <Typography variant="body2">
            © {year} Tejelanas Vivi. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;