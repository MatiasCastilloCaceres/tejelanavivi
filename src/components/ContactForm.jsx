import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Alert, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  useTheme
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactForm = () => {
  const theme = useTheme();
  const [data, setData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    subject: 'general', 
    message: '' 
  });
  const [sent, setSent] = useState(false);

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    
    // Reset form after submission
    setTimeout(() => {
      setSent(false);
      setData({ 
        name: '', 
        email: '', 
        phone: '',
        subject: 'general', 
        message: '' 
      });
    }, 6000);
  };

  const handleClose = () => {
    setSent(false);
  };

  const contactInfo = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Dirección",
      content: "Av. Principal 123, Zapallar"
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Teléfono",
      content: "+56 9 8765 4321"
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Email",
      content: "contacto@tejelanasvivi.cl"
    }
  ];

  return (
    <Box 
      id="contacto"
      sx={{ 
        py: { xs: 8, md: 12 },
        background: `linear-gradient(to bottom, ${theme.palette.background.default} 0%, white 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom
            sx={{ 
              color: theme.palette.primary.main,
              position: 'relative',
              display: 'inline-block',
              pb: 2,
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                backgroundColor: theme.palette.secondary.main,
                borderRadius: '2px'
              }
            }}
          >
            Contáctanos
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              maxWidth: '700px',
              mx: 'auto',
              color: theme.palette.text.secondary,
              mt: 2
            }}
          >
            Estamos aquí para responder tus dudas sobre nuestros productos y talleres
          </Typography>
        </Box>

        <Grid container spacing={5}>
          {/* Información de contacto */}
          <Grid item xs={12} md={5}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="600" color="primary">
                Información de Contacto
              </Typography>
              <Typography variant="body1" paragraph>
                Puedes comunicarte con nosotros directamente o utilizar nuestro formulario de contacto.
                Te responderemos a la brevedad.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {contactInfo.map((info, index) => (
                <Grid item xs={12} key={index}>
                  <Card 
                    elevation={2} 
                    sx={{ 
                      borderRadius: 2,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)'
                      }
                    }}
                  >
                    <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                      <Box sx={{ mr: 3 }}>
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" gutterBottom fontWeight="500">
                          {info.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {info.content}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box 
              component="img"
              src="/images/Talleres_de_Tejido.jpg"
              alt="Contacto"
              sx={{
                width: '100%',
                height: '220px',
                objectFit: 'cover',
                borderRadius: 3,
                mt: 4,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            />
          </Grid>

          {/* Formulario */}
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: 3,
                backgroundColor: 'white',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Elementos decorativos */}
              <Box 
                sx={{
                  position: 'absolute',
                  top: -30,
                  right: -30,
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.light,
                  opacity: 0.1,
                  zIndex: 0
                }}
              />
              <Box 
                sx={{
                  position: 'absolute',
                  bottom: -40,
                  left: -40,
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.secondary.light,
                  opacity: 0.1,
                  zIndex: 0
                }}
              />

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h5" gutterBottom fontWeight="600" color="primary.dark">
                  Envíanos un mensaje
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 3 }}>
                  Completa el formulario y te responderemos a la brevedad
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                        fullWidth 
                        label="Nombre" 
                        name="name" 
                        value={data.name}
                        onChange={handleChange} 
                        required
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                        fullWidth 
                        label="Correo" 
                        name="email" 
                        type="email" 
                        value={data.email}
                        onChange={handleChange} 
                        required
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                        fullWidth 
                        label="Teléfono (opcional)" 
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Asunto</InputLabel>
                        <Select
                          name="subject"
                          value={data.subject}
                          onChange={handleChange}
                          label="Asunto"
                          sx={{ borderRadius: 2 }}
                        >
                          <MenuItem value="general">Consulta general</MenuItem>
                          <MenuItem value="products">Productos</MenuItem>
                          <MenuItem value="workshops">Talleres</MenuItem>
                          <MenuItem value="wholesale">Ventas por mayor</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        fullWidth 
                        multiline 
                        rows={5} 
                        label="Mensaje" 
                        name="message"
                        value={data.message}
                        onChange={handleChange} 
                        required
                        variant="outlined"
                        InputProps={{
                          sx: { borderRadius: 2 }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        size="large" 
                        fullWidth
                        sx={{ 
                          mt: 2, 
                          py: 1.5, 
                          borderRadius: 2,
                          fontSize: '1rem'
                        }}
                      >
                        Enviar mensaje
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Snackbar 
        open={sent} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleClose} 
          severity="success" 
          variant="filled"
          sx={{ 
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          ¡Gracias por contactarnos! Te responderemos a la brevedad.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactForm;
