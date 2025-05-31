import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Alert,
  useTheme,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import {
  Handyman,
  LocationOn,
  School,
  Favorite,
  LocalShipping,
  Groups,
} from "@mui/icons-material";
import { apiService } from "../../services/api";

function About() {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const aboutData = await apiService.getAboutUs();
        console.log("📋 About data received:", aboutData);

        setData(aboutData);
      } catch (err) {
        console.error("❌ About component: Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  // Extraer imagen de diferentes posibles ubicaciones en la respuesta de la API
  const getImageUrl = () => {
    if (!data) return null;

    // Buscar imagen en diferentes ubicaciones
    return (
      data.image ||
      data.foto ||
      data.imagen ||
      data.photo ||
      data.data?.image ||
      data.data?.foto ||
      data.data?.imagen
    );
  };

  const imageUrl = getImageUrl();

  const features = [
    {
      icon: <Handyman />,
      title: "Productos Artesanales",
      description:
        "Lanas naturales y vellón de alta calidad, seleccionados cuidadosamente para tus proyectos de tejido.",
    },
    {
      icon: <School />,
      title: "Talleres Especializados",
      description:
        "Aprende técnicas de crochet y telar en nuestro acogedor espacio TEJElANAS en Laguna de Zapallar.",
    },
    {
      icon: <LocalShipping />,
      title: "Envíos a Todo Chile",
      description: "Despachos seguros a Santiago y regiones a través de Starken y Chilexpress.",
    },
    {
      icon: <Groups />,
      title: "Comunidad de Tejedoras",
      description:
        "Únete a nuestra comunidad de 471 seguidores apasionadas por el arte del tejido.",
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
        id="about"
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Cargando información...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: { xs: 6, md: 10 } }} id="about">
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Error al cargar información
            </Typography>
            <Typography>{error}</Typography>
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.secondary.light}10 100%)`,
        position: "relative",
      }}
      id="about"
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            Quiénes Somos
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.6,
              mb: 4,
            }}
          >
            Somos un emprendimiento familiar dedicado al arte del tejido,
            ubicado en la hermosa zona de Zapallar
          </Typography>
        </Box>

        {/* Story Section */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h4"
                component="h3"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  mb: 3,
                }}
              >
                Nuestra Historia
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  color: "text.secondary",
                  mb: 3,
                }}
              >
                TejelAnas Vivi nace de la pasión por preservar y compartir las
                técnicas
                tradicionales de tejido. Con más de 396 publicaciones en nuestro
                Instagram,
                hemos construido una comunidad de tejedoras que comparten el amor
                por
                crear con sus propias manos.
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  color: "text.secondary",
                  mb: 3,
                }}
              >
                Nuestro espacio TEJElANAS, ubicado en Laguna de Zapallar, es más que
                un taller: es un lugar de encuentro donde las tradiciones se
                mantienen
                vivas y nuevas tejedoras descubren su pasión por este arte
                milenario.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 3,
                  bgcolor: theme.palette.primary.main + "10",
                  borderRadius: 2,
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                }}
              >
                <LocationOn color="primary" />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Ubicación
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    TEJElANAS - Laguna de Zapallar, Chile
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative", textAlign: "center" }}>
              {/* Imagen representativa */}
              <Box
                sx={{
                  width: { xs: 280, md: 350 },
                  height: { xs: 280, md: 350 },
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  position: "relative",
                  border: `3px solid ${theme.palette.primary.main}30`,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    width: "calc(100% + 20px)",
                    height: "calc(100% + 20px)",
                    borderRadius: "50%",
                    border: `2px dashed ${theme.palette.primary.main}40`,
                    animation: "spin 30s linear infinite",
                    zIndex: -1,
                  },
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Box sx={{ fontSize: "4rem", mb: 2 }}>🧶</Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    }}
                  >
                    Tradición & Calidad
                  </Typography>
                </Box>
              </Box>

              {/* Elementos flotantes */}
              <Box
                sx={{
                  position: "absolute",
                  top: "20%",
                  left: "10%",
                  fontSize: "2rem",
                  animation: "float 6s ease-in-out infinite",
                }}
              >
                🪡
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: "20%",
                  right: "10%",
                  fontSize: "2rem",
                  animation: "float 6s ease-in-out infinite 2s",
                }}
              >
                ✂️
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Features Grid */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h3"
            sx={{
              textAlign: "center",
              fontWeight: 600,
              color: "text.primary",
              mb: 6,
            }}
          >
            ¿Por qué elegirnos?
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    p: 2,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardContent>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        width: 64,
                        height: 64,
                        mx: "auto",
                        mb: 3,
                      }}
                    >
                      {feature.icon}
                    </Avatar>

                    <Typography
                      variant="h6"
                      component="h4"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats Section */}
        <Box
          sx={{
            textAlign: "center",
            bgcolor: theme.palette.background.paper,
            borderRadius: 3,
            p: 6,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: "text.primary",
              mb: 4,
            }}
          >
            Números que nos enorgullecen
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    mb: 1,
                  }}
                >
                  396
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Publicaciones en Instagram
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.secondary.main,
                    mb: 1,
                  }}
                >
                  471
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Seguidores Fieles
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.accent.teal,
                    mb: 1,
                  }}
                >
                  100%
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Satisfacción Garantizada
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </Box>
  );
}

export default About;
