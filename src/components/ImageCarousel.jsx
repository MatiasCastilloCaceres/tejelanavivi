import React, { useState, useEffect } from 'react';
import { 
  Box, 
  IconButton, 
  useTheme, 
  useMediaQuery,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Modal,
  Backdrop,
  Fade,
  Button
} from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight, 
  FiberManualRecord,
  ShoppingCart,
  Event,
  People,
  Close,
  ZoomIn,
  Fullscreen
} from '@mui/icons-material';
import { apiService } from '../services/api';

const ImageCarousel = ({ 
  height = 400, 
  autoPlay = true, 
  autoPlayInterval = 4000,
  showIndicators = true,
  showControls = true,
  title = "",
  apiEndpoint = null,
  fallbackImages = []
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para el modal de zoom
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Cargar imágenes desde la API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🖼️ Carousel: Starting to fetch images...');

        // Intentar obtener datos de la API
        try {
          const apiData = await apiService.getProductsServices();
          console.log('🖼️ Carousel: Raw API data received:', apiData);

          let imageData = [];

          // Extraer datos según la estructura real de la API
          if (apiData && apiData.data && apiData.data.data) {
            const { productos = [], servicios = [] } = apiData.data.data;
            
            console.log('🖼️ Carousel: Products found:', productos.length);
            console.log('🖼️ Carousel: Services found:', servicios.length);

            // Mapear productos
            const productImages = productos.map((producto) => ({
              src: producto.imgs && producto.imgs.length > 0 ? producto.imgs[0] : null,
              alt: producto.nombre || 'Producto',
              title: producto.nombre || 'Producto',
              description: producto.descripcion || 'Descubre este increíble producto',
              price: producto.precio ? `$${producto.precio.toLocaleString('es-CL')}` : null,
              colors: producto.colores || [],
              sizes: producto.tallas || [],
              type: 'producto'
            }));

            // Mapear servicios
            const serviceImages = servicios.map((servicio) => ({
              src: servicio.imgs && servicio.imgs.length > 0 ? servicio.imgs[0] : null,
              alt: servicio.nombre || 'Servicio',
              title: servicio.nombre || 'Servicio',
              description: `${servicio.ubicacion || 'Ubicación por confirmar'}`,
              date: servicio.fecha || null,
              cupos: servicio.cupos || null,
              type: 'servicio'
            }));

            // Combinar productos y servicios
            imageData = [...productImages, ...serviceImages];

            console.log('🖼️ Carousel: Final processed images from API:', imageData);
          }

          // Si obtuvimos datos de la API, usarlos
          if (imageData.length > 0) {
            // Filtrar imágenes válidas
            const validImages = imageData.filter(img => img.src && img.src.trim() !== '');
            
            if (validImages.length > 0) {
              setImages(validImages);
              return;
            }
          }
        } catch (apiError) {
          console.log('🖼️ Carousel: API failed, using fallback images:', apiError.message);
        }

        // Si no hay datos de la API o falló, usar fallback
        console.log('🖼️ Carousel: Using fallback images:', fallbackImages.length);
        if (fallbackImages.length > 0) {
          setImages(fallbackImages);
        } else {
          // Últimos recursos - imágenes por defecto
          setImages([
            {
              src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&q=80',
              alt: 'Lanas naturales',
              title: 'Lanas Naturales',
              description: 'Productos de alta calidad para tejido',
              type: 'producto'
            }
          ]);
        }

      } catch (err) {
        console.error('❌ Carousel: Critical error:', err);
        setError(err.message);
        
        // Último fallback
        if (fallbackImages.length > 0) {
          setImages(fallbackImages);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [apiEndpoint, fallbackImages]);

  // Auto-play functionality (pausar cuando modal está abierto)
  useEffect(() => {
    if (autoPlay && images.length > 1 && !modalOpen) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, autoPlayInterval);
      
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, images.length, modalOpen]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Funciones para el modal
  const openModal = (index) => {
    setModalImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Manejar teclas en el modal
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (modalOpen) {
        if (event.key === 'Escape') {
          closeModal();
        } else if (event.key === 'ArrowLeft') {
          prevModalImage();
        } else if (event.key === 'ArrowRight') {
          nextModalImage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [modalOpen, images.length]);

  // Estado de carga
  if (loading) {
    return (
      <Box sx={{ 
        width: '100%', 
        height: { xs: 250, md: height },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ mb: 2, color: 'primary.main' }} />
          <Typography variant="h6" color="text.secondary">
            Cargando galería...
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Obteniendo productos y servicios
          </Typography>
        </Box>
      </Box>
    );
  }

  // Estado de error
  if (error && images.length === 0) {
    return (
      <Box sx={{ width: '100%', mb: 4 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          Cargando contenido desde el respaldo local. {error}
        </Alert>
      </Box>
    );
  }

  // Si no hay imágenes, mostrar placeholder
  if (!images || images.length === 0) {
    return (
      <Box sx={{ 
        width: '100%', 
        height: { xs: 250, md: height },
        backgroundColor: theme.palette.grey[100],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2
      }}>
        <Typography variant="h6" color="text.secondary">
          No hay contenido disponible
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ width: '100%', mb: 4 }}>
        {/* Título del carrusel */}
        {title && (
          <Typography 
            variant="h4" 
            component="h3" 
            gutterBottom 
            sx={{ 
              textAlign: 'center',
              color: theme.palette.primary.main,
              mb: 4,
              fontWeight: 600
            }}
          >
            {title}
          </Typography>
        )}

        {/* Contenedor principal del carrusel */}
        <Box sx={{ 
          position: 'relative', 
          width: '100%', 
          height: { xs: 350, md: height },
          overflow: 'hidden',
          borderRadius: 3,
          boxShadow: '0 16px 50px rgba(0,0,0,0.15)',
          '&:hover .carousel-button': {
            opacity: showControls ? 1 : 0
          },
          '&:hover .zoom-button': {
            opacity: 1
          }
        }}>
          {/* Contenedor de imágenes */}
          <Box sx={{ 
            display: 'flex',
            transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: `translateX(-${currentIndex * 100}%)`,
            height: '100%'
          }}>
            {images.map((image, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: '100%',
                  height: '100%',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onClick={() => openModal(index)}
              >
                <Box
                  component="img"
                  src={image.src}
                  alt={image.alt}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                  loading="lazy"
                  onError={(e) => {
                    console.log(`❌ Image failed to load: ${e.target.src}`);
                    e.target.src = `https://via.placeholder.com/800x400/${theme.palette.primary.main.replace('#', '')}/ffffff?text=${encodeURIComponent(image.title || 'TejelAnas Vivi')}`;
                  }}
                />
                
                {/* Botón de zoom */}
                <IconButton
                  className="zoom-button"
                  sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    color: theme.palette.primary.main,
                    opacity: 0,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'white',
                      transform: 'scale(1.1)'
                    },
                    zIndex: 3
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(index);
                  }}
                  aria-label="Ver imagen en tamaño completo"
                >
                  <ZoomIn />
                </IconButton>
                
                {/* Overlay con información */}
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
                  color: 'white',
                  p: { xs: 3, md: 4 }
                }}>
                  {/* Badge de tipo */}
                  <Chip
                    label={image.type === 'producto' ? 'Producto' : 'Servicio'}
                    icon={image.type === 'producto' ? <ShoppingCart /> : <Event />}
                    sx={{
                      position: 'absolute',
                      top: -30,
                      left: 20,
                      bgcolor: image.type === 'producto' ? theme.palette.secondary.main : theme.palette.primary.main,
                      color: 'white',
                      fontWeight: 600,
                      '& .MuiChip-icon': {
                        color: 'white'
                      }
                    }}
                  />

                  {/* Título */}
                  {image.title && (
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                      {image.title}
                    </Typography>
                  )}
                  
                  {/* Descripción */}
                  {image.description && (
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        opacity: 0.95,
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: { xs: 2, md: 3 },
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.4
                      }}
                    >
                      {image.description}
                    </Typography>
                  )}

                  {/* Información específica del tipo */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    {/* Para productos */}
                    {image.type === 'producto' && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {image.price && (
                          <Typography variant="h6" sx={{ 
                            color: theme.palette.secondary.light, 
                            fontWeight: 700,
                            fontSize: '1.25rem'
                          }}>
                            {image.price}
                          </Typography>
                        )}
                        {image.colors && image.colors.length > 0 && (
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            🎨 {image.colors.length} color{image.colors.length > 1 ? 'es' : ''}
                          </Typography>
                        )}
                      </Box>
                    )}
                    
                    {/* Para servicios */}
                    {image.type === 'servicio' && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        {image.date && (
                          <Typography variant="body1" sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 0.5,
                            fontWeight: 500
                          }}>
                            <Event fontSize="small" /> {image.date}
                          </Typography>
                        )}
                        {image.cupos && (
                          <Typography variant="body1" sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 0.5,
                            fontWeight: 500
                          }}>
                            <People fontSize="small" /> {image.cupos} cupos
                          </Typography>
                        )}
                      </Box>
                    )}

                    {/* Botón de ver detalles */}
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Fullscreen />}
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(index);
                      }}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.3)'
                        }
                      }}
                    >
                      Ver Detalles
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Controles de navegación */}
          {showControls && images.length > 1 && (
            <>
              <IconButton
                className="carousel-button"
                onClick={prevSlide}
                sx={{
                  position: 'absolute',
                  left: { xs: 10, md: 20 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255,255,255,0.95)',
                  color: theme.palette.primary.main,
                  opacity: 0,
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    bgcolor: 'white',
                    transform: 'translateY(-50%) scale(1.1)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.25)'
                  },
                  zIndex: 2,
                  width: 56,
                  height: 56
                }}
                aria-label="Imagen anterior"
              >
                <ChevronLeft fontSize="large" />
              </IconButton>

              <IconButton
                className="carousel-button"
                onClick={nextSlide}
                sx={{
                  position: 'absolute',
                  right: { xs: 10, md: 20 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255,255,255,0.95)',
                  color: theme.palette.primary.main,
                  opacity: 0,
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    bgcolor: 'white',
                    transform: 'translateY(-50%) scale(1.1)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.25)'
                  },
                  zIndex: 2,
                  width: 56,
                  height: 56
                }}
                aria-label="Siguiente imagen"
              >
                <ChevronRight fontSize="large" />
              </IconButton>
            </>
          )}

          {/* Indicadores */}
          {showIndicators && images.length > 1 && (
            <Box sx={{
              position: 'absolute',
              bottom: { xs: 20, md: 30 },
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 1.5,
              zIndex: 2
            }}>
              {images.map((_, index) => (
                <IconButton
                  key={index}
                  onClick={() => goToSlide(index)}
                  size="small"
                  sx={{
                    color: currentIndex === index ? 'white' : 'rgba(255,255,255,0.5)',
                    p: 0.5,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'white',
                      transform: 'scale(1.3)'
                    }
                  }}
                  aria-label={`Ir a imagen ${index + 1}`}
                >
                  <FiberManualRecord sx={{ fontSize: currentIndex === index ? 16 : 12 }} />
                </IconButton>
              ))}
            </Box>
          )}

          {/* Contador de imágenes */}
          <Box sx={{
            position: 'absolute',
            top: { xs: 20, md: 30 },
            right: { xs: 20, md: 30 },
            bgcolor: 'rgba(0,0,0,0.75)',
            color: 'white',
            px: 2.5,
            py: 1,
            borderRadius: 25,
            fontSize: '0.95rem',
            fontWeight: 500,
            zIndex: 2,
            backdropFilter: 'blur(10px)'
          }}>
            {currentIndex + 1} / {images.length}
          </Box>
        </Box>
      </Box>

      {/* Modal para imagen ampliada */}
      <Modal
        open={modalOpen}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { bgcolor: 'rgba(0,0,0,0.9)' }
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', md: '90%' },
            height: { xs: '90%', md: '85%' },
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Header del modal */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              borderBottom: '1px solid',
              borderColor: 'divider'
            }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                {images[modalImageIndex]?.title || 'Imagen'}
              </Typography>
              <IconButton onClick={closeModal} size="large">
                <Close />
              </IconButton>
            </Box>

            {/* Imagen ampliada */}
            <Box sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              bgcolor: '#f5f5f5'
            }}>
              <Box
                component="img"
                src={images[modalImageIndex]?.src}
                alt={images[modalImageIndex]?.alt}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: 2
                }}
              />

              {/* Controles del modal */}
              {images.length > 1 && (
                <>
                  <IconButton
                    onClick={prevModalImage}
                    sx={{
                      position: 'absolute',
                      left: 20,
                      bgcolor: 'rgba(255,255,255,0.9)',
                      '&:hover': { bgcolor: 'white' }
                    }}
                  >
                    <ChevronLeft />
                  </IconButton>
                  <IconButton
                    onClick={nextModalImage}
                    sx={{
                      position: 'absolute',
                      right: 20,
                      bgcolor: 'rgba(255,255,255,0.9)',
                      '&:hover': { bgcolor: 'white' }
                    }}
                  >
                    <ChevronRight />
                  </IconButton>
                </>
              )}
            </Box>

            {/* Footer con información */}
            <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {images[modalImageIndex]?.description}
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {images[modalImageIndex]?.price && (
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                    {images[modalImageIndex]?.price}
                  </Typography>
                )}
                
                {images[modalImageIndex]?.date && (
                  <Typography variant="body2" color="text.secondary">
                    📅 {images[modalImageIndex]?.date}
                  </Typography>
                )}

                <Typography variant="body2" color="text.secondary">
                  {modalImageIndex + 1} / {images.length}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ImageCarousel;