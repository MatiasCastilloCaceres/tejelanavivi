import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Grid,
  Button,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FAQ() {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question: "¿Qué tipos de lana ofrecen?",
      answer: "Ofrecemos una variedad de lanas naturales, incluyendo merino, alpaca y mezclas especiales. Todas nuestras lanas son de origen natural y muchas están teñidas artesanalmente con tintes naturales."
    },
    {
      question: "¿Cómo puedo inscribirme en un taller?",
      answer: "Puedes inscribirte en nuestros talleres a través del formulario de contacto en nuestra página web, enviándonos un correo electrónico o llamándonos directamente. Los talleres tienen cupos limitados, así que te recomendamos reservar con anticipación."
    },
    {
      question: "¿Hacen envíos a todo Chile?",
      answer: "Sí, realizamos envíos a todo Chile a través de empresas de transporte confiables. El tiempo de entrega varía según la localidad, generalmente entre 3 a 7 días hábiles. Los costos de envío se calculan según el destino y el peso del paquete."
    },
    {
      question: "¿Puedo visitar su tienda física?",
      answer: "Sí, tenemos una tienda física ubicada en Zapallar. Estamos abiertos de martes a sábado, de 10:00 a 18:00 horas. Te recomendamos contactarnos antes de tu visita para asegurarnos de poder atenderte de la mejor manera."
    },
    {
      question: "¿Ofrecen descuentos por compras al por mayor?",
      answer: "Sí, tenemos precios especiales para compras al por mayor. Si estás interesado/a, puedes contactarnos directamente para discutir tus necesidades y obtener una cotización personalizada."
    },
    {
      question: "¿Tienen muestras de colores disponibles?",
      answer: "Sí, podemos enviarte muestras de colores si necesitas ver la tonalidad exacta antes de realizar una compra mayor. Hay un pequeño costo por el envío de muestras, que será descontado de tu compra si decides adquirir nuestros productos."
    }
  ];

  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 12 }, 
        background: `linear-gradient(to bottom, white 0%, ${theme.palette.background.default} 100%)`
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
            Preguntas frecuentes
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
            Resolvemos tus dudas sobre nuestros productos y servicios
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box>
              {faqs.map((faq, index) => (
                <Accordion 
                  key={index} 
                  expanded={expanded === `panel${index}`} 
                  onChange={handleChange(`panel${index}`)}
                  sx={{ 
                    mb: 2,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    '&:before': {
                      display: 'none',
                    },
                    boxShadow: expanded === `panel${index}` 
                      ? '0 8px 24px rgba(0,0,0,0.15)' 
                      : '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ 
                      backgroundColor: expanded === `panel${index}` 
                        ? theme.palette.primary.light 
                        : theme.palette.background.paper,
                      '& .MuiAccordionSummary-content': {
                        py: 1,
                      }
                    }}
                  >
                    <Typography 
                      variant="h6"
                      sx={{ 
                        fontWeight: 600,
                        color: expanded === `panel${index}` 
                          ? theme.palette.primary.contrastText 
                          : theme.palette.text.primary
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails 
                    sx={{ 
                      backgroundColor: theme.palette.background.paper,
                      p: 3
                    }}
                  >
                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box 
              sx={{ 
                bgcolor: theme.palette.primary.main,
                color: 'white',
                p: 4,
                borderRadius: 4,
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h4" gutterBottom>
                ¿No encuentras la respuesta?
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  mb: 4,
                  opacity: 0.9,
                  fontSize: '1.1rem'
                }}
              >
                Contáctanos directamente y te responderemos a la brevedad. Estamos aquí para ayudarte con cualquier duda o consulta.
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  fullWidth 
                  size="large"
                  sx={{ mb: 2 }}
                >
                  Contactar por WhatsApp
                </Button>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  size="large"
                  sx={{ 
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Enviar un email
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FAQ;
