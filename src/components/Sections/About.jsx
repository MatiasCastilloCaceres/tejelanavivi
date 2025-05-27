import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Card, 
  CardContent, 
  Avatar, 
  useTheme,
  useMediaQuery 
} from '@mui/material';

function About() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const values = [
    {
      title: "Materiales naturales",
      description: "Todas nuestras lanas y vellones son 100% naturales, respetuosas con el medio ambiente y de la más alta calidad.",
      iconText: "🌿" 
    },
    {
      title: "Producción artesanal",
      description: "Cada producto es seleccionado y teñido a mano para garantizar la calidad y el cuidado por los detalles.",
      iconText: "✨"
    },
    {
      title: "Conocimiento experto",
      description: "Con años de experiencia en tejido y técnicas tradicionales, compartimos nuestra pasión a través de talleres.",
      iconText: "🧵"
    }
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 12 } }} id="about">
      <Container maxWidth="lg">
        {/* Sección principal sobre nosotros */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
          <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
            <Box className="fade-in" sx={{ position: 'relative' }}>
              <Box
                component="img"
                src="/images/Talleres_de_Tejido.jpg"
                alt="Sobre Tejelanas Vivi"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                  zIndex: 1
                }}
              />
              {!isMobile && (
                <Box
                  sx={{
                    position: 'absolute',
                    width: '150px',
                    height: '150px',
                    borderRadius: '20px',
                    bgcolor: theme.palette.primary.light,
                    opacity: 0.7,
                    bottom: -20,
                    right: -20,
                    zIndex: 0
                  }}
                />
              )}
              {!isMobile && (
                <Box
                  component="img"
                  src="/images/Lanas_Naturales.jpg"
                  alt="Detalle de lanas"
                  sx={{
                    position: 'absolute',
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '8px solid white',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    top: -30,
                    right: -50,
                    zIndex: 2
                  }}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
            <Box sx={{ 
              pl: { xs: 0, md: 4 },
              textAlign: { xs: 'center', md: 'left' }
            }}>
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
                    left: { xs: '50%', md: 0 },
                    transform: { xs: 'translateX(-50%)', md: 'none' },
                    width: '80px',
                    height: '4px',
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: '2px'
                  }
                }}
              >
                Nuestra Historia
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3, 
                  fontSize: '1.1rem',
                  lineHeight: 1.7
                }}
              >
                Tejelanas Vivi nació en 2015 como un pequeño emprendimiento en Zapallar, 
                inspirado por la pasión por el tejido y las técnicas tradicionales. Lo que comenzó como 
                un hobby se ha convertido en un espacio dedicado a ofrecer los mejores materiales 
                para amantes del tejido y la artesanía.
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 4,
                  fontSize: '1.1rem',
                  lineHeight: 1.7
                }}
              >
                Nos especializamos en lanas naturales teñidas artesanalmente, vellón de alta calidad 
                y talleres donde compartimos técnicas y conocimientos. Cada producto es seleccionado 
                cuidadosamente para garantizar la mejor experiencia a nuestros clientes.
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                >
                  Conoce nuestros productos
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  size="large"
                >
                  Contactar
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Nuestros valores */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h3" 
            gutterBottom
            sx={{ 
              color: theme.palette.text.primary,
              mb: 1
            }}
          >
            Nuestros Valores
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: theme.palette.text.secondary,
              maxWidth: '700px',
              mx: 'auto',
              mb: 6
            }}
          >
            Lo que nos hace diferentes y define nuestra filosofía
          </Typography>

          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  className="floating-card"
                  sx={{ 
                    height: '100%', 
                    borderRadius: 4,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      bgcolor: theme.palette.background.default,
                      fontSize: '2rem' // Para emojis
                    }}
                  >
                    {value.iconText}
                  </Box>
                  <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Testimonios */}
        <Box sx={{ 
          mt: 10, 
          pt: 8, 
          pb: 8, 
          bgcolor: theme.palette.background.default,
          borderRadius: 4
        }}>
          <Typography 
            variant="h3" 
            component="h3" 
            align="center" 
            gutterBottom
            sx={{ mb: 6 }}
          >
            Lo que dicen nuestros clientes
          </Typography>

          <Grid container spacing={4}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} md={4} key={item}>
                <Card 
                  sx={{ 
                    height: '100%',
                    borderRadius: 4,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                        {item === 1 ? 'MC' : item === 2 ? 'LP' : 'RG'}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" component="p">
                          {item === 1 ? 'María Castro' : item === 2 ? 'Laura Pérez' : 'Rodrigo González'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Cliente desde {2020 + item}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" sx={{ fontStyle: 'italic', mt: 2 }}>
                      {item === 1 
                        ? "Las lanas de Tejelanas Vivi son increíbles. Los colores son vibrantes y la calidad es excepcional. ¡Ya he hecho varios proyectos con ellas!" 
                        : item === 2 
                        ? "Participé en uno de sus talleres y fue una experiencia maravillosa. Aprendí muchísimo y el ambiente es muy acogedor."
                        : "El vellón que compré es perfecto para mis proyectos de fieltro. Definitivamente volveré a comprar más productos."
                      }
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
