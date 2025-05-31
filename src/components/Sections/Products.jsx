import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  CardActions,
  Button, 
  Box, 
  Chip,
  CircularProgress,
  Alert,
  Badge,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from '@mui/material';
import { 
  ShoppingCart, 
  Event, 
  People, 
  Palette,
  Straighten,
  LocationOn,
  CalendarToday,
  Close,
  ZoomIn,
  Info
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { apiService } from '../../services/api';

const Products = () => {
  const theme = useTheme();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Cargar productos y servicios
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProductsServices();
        console.log('🛍️ Products: API data received:', data);

        let allItems = [];

        if (data && data.data && data.data.data) {
          const { productos = [], servicios = [] } = data.data.data;

          // Procesar productos
          const processedProducts = productos.map(producto => ({
            id: `producto-${producto.id}`,
            name: producto.nombre,
            description: producto.descripcion,
            price: producto.precio,
            image: producto.imgs && producto.imgs.length > 0 ? producto.imgs[0] : null,
            images: producto.imgs || [],
            colors: producto.colores || [],
            sizes: producto.tallas || [],
            type: 'producto',
            category: 'Productos'
          }));

          // Procesar servicios
          const processedServices = servicios.map(servicio => ({
            id: `servicio-${servicio.id}`,
            name: servicio.nombre,
            description: `Ubicación: ${servicio.ubicacion}`,
            location: servicio.ubicacion,
            date: servicio.fecha,
            cupos: servicio.cupos,
            image: servicio.imgs && servicio.imgs.length > 0 ? servicio.imgs[0] : null,
            images: servicio.imgs || [],
            type: 'servicio',
            category: 'Servicios'
          }));

          allItems = [...processedProducts, ...processedServices];
        }

        // Si no hay datos de la API, usar datos de ejemplo
        if (allItems.length === 0) {
          allItems = [
            {
              id: 'producto-1',
              name: 'Falda a Crochet',
              description: 'Hermosa falda tejida a crochet, una pieza artesanal que irradia encanto y delicadeza',
              price: 9990,
              image: 'https://www.clinicatecnologica.cl/ipss/tejelanasVivi/imgs/productos/faldaCrochet1.png',
              colors: ['crema', 'verde esmeralda'],
              sizes: ['S', 'M', 'L', 'XL'],
              type: 'producto',
              category: 'Productos'
            },
            {
              id: 'producto-2',
              name: 'Ovillo de Lana Merino Gigante',
              description: 'Lana conocida por su suavidad, ideal para técnicas como arm knitting o mantas de tejido grueso',
              price: 4990,
              image: 'https://www.clinicatecnologica.cl/ipss/tejelanasVivi/imgs/productos/ovillolanaColor.png',
              colors: ['azul', 'fucsia', 'beige', 'magenta'],
              type: 'producto',
              category: 'Productos'
            },
            {
              id: 'producto-3',
              name: 'Árbol con follaje de colores',
              description: 'Arte textil único con círculos concéntricos de colores vibrantes que dan un toque artístico',
              price: 14990,
              image: 'https://www.clinicatecnologica.cl/ipss/tejelanasVivi/imgs/productos/cuadro1.png',
              type: 'producto',
              category: 'Productos'
            },
            {
              id: 'servicio-1',
              name: 'Taller Telar Decorativo Junio 2025',
              description: 'Aprende técnicas de telar decorativo en Mall Vivo',
              location: 'Mall Vivo, Avda La florida Rojas Magallanes',
              date: '08/06/2025',
              cupos: 50,
              image: 'https://www.clinicatecnologica.cl/ipss/tejelanasVivi/imgs/servicios/taller1.png',
              type: 'servicio',
              category: 'Servicios'
            },
            {
              id: 'servicio-2',
              name: 'Taller Telar Decorativo Julio 2025',
              description: 'Taller en nuestro espacio TEJElANAS',
              location: 'Laguna de Zapallar',
              date: '20/07/2025',
              cupos: 100,
              image: 'https://www.clinicatecnologica.cl/ipss/tejelanasVivi/imgs/servicios/taller2.png',
              type: 'servicio',
              category: 'Servicios'
            }
          ];
        }

        setItems(allItems);
        setFilteredItems(allItems);
        console.log('🛍️ Products: Final processed items:', allItems);

      } catch (err) {
        console.error('❌ Products: Error loading data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar elementos
  useEffect(() => {
    if (selectedFilter === 'todos') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.type === selectedFilter));
    }
  }, [selectedFilter, items]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const openDialog = (item) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

  // Componente de tarjeta de producto/servicio
  const ItemCard = ({ item }) => (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
        },
        position: 'relative'
      }}
    >
      {/* Badge de tipo */}
      <Chip
        label={item.type === 'producto' ? 'Producto' : 'Servicio'}
        icon={item.type === 'producto' ? <ShoppingCart /> : <Event />}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2,
          bgcolor: item.type === 'producto' ? theme.palette.secondary.main : theme.palette.primary.main,
          color: 'white',
          fontWeight: 600,
          '& .MuiChip-icon': {
            color: 'white'
          }
        }}
      />

      {/* Imagen */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="250"
          image={item.image}
          alt={item.name}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x250/${theme.palette.primary.main.replace('#', '')}/ffffff?text=${encodeURIComponent(item.name)}`;
          }}
        />
        
        {/* Botón de zoom */}
        <IconButton
          onClick={() => openDialog(item)}
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            bgcolor: 'rgba(255,255,255,0.9)',
            color: theme.palette.primary.main,
            '&:hover': {
              bgcolor: 'white',
              transform: 'scale(1.1)'
            }
          }}
        >
          <ZoomIn />
        </IconButton>
      </Box>

      {/* Contenido */}
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography 
          variant="h6" 
          component="h3" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            color: theme.palette.text.primary,
            lineHeight: 1.3
          }}
        >
          {item.name}
        </Typography>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5
          }}
        >
          {item.description}
        </Typography>

        {/* Información específica por tipo */}
        {item.type === 'producto' && (
          <Box sx={{ mb: 2 }}>
            {/* Precio */}
            {item.price && (
              <Typography 
                variant="h6" 
                sx={{ 
                  color: theme.palette.secondary.main,
                  fontWeight: 700,
                  mb: 1
                }}
              >
                ${item.price.toLocaleString('es-CL')}
              </Typography>
            )}

            {/* Colores */}
            {item.colors && item.colors.length > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Palette fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {item.colors.length} color{item.colors.length > 1 ? 'es' : ''} disponible{item.colors.length > 1 ? 's' : ''}
                </Typography>
              </Box>
            )}

            {/* Tallas */}
            {item.sizes && item.sizes.length > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Straighten fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  Tallas: {item.sizes.join(', ')}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {item.type === 'servicio' && (
          <Box sx={{ mb: 2 }}>
            {/* Ubicación */}
            {item.location && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocationOn fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {item.location}
                </Typography>
              </Box>
            )}

            {/* Fecha */}
            {item.date && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <CalendarToday fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {item.date}
                </Typography>
              </Box>
            )}

            {/* Cupos */}
            {item.cupos && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <People fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {item.cupos} cupos disponibles
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CardContent>

      {/* Acciones */}
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<Info />}
          onClick={() => openDialog(item)}
          sx={{
            borderRadius: 2,
            py: 1.5,
            fontWeight: 600,
            background: item.type === 'producto' 
              ? `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.secondary.light} 90%)`
              : `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
            }
          }}
        >
          Ver Detalles
        </Button>
      </CardActions>
    </Card>
  );

  // Estados de carga y error
  if (loading) {
    return (
      <Box id="productos" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} sx={{ mb: 3 }} />
            <Typography variant="h6" color="text.secondary">
              Cargando productos y servicios...
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box id="productos" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Alert severity="warning" sx={{ mb: 4 }}>
            Error al cargar datos: {error}. Mostrando contenido de ejemplo.
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <>
      <Box id="productos" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                color: theme.palette.primary.main,
                mb: 2
              }}
            >
              Productos y Servicios
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              Descubre nuestra amplia gama de productos artesanales y talleres especializados
            </Typography>
          </Box>

          {/* Filtros */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button
                variant={selectedFilter === 'todos' ? 'contained' : 'outlined'}
                onClick={() => handleFilterChange('todos')}
                sx={{ borderRadius: 20, px: 3 }}
              >
                Todos ({items.length})
              </Button>
              <Button
                variant={selectedFilter === 'producto' ? 'contained' : 'outlined'}
                onClick={() => handleFilterChange('producto')}
                startIcon={<ShoppingCart />}
                sx={{ borderRadius: 20, px: 3 }}
              >
                Productos ({items.filter(item => item.type === 'producto').length})
              </Button>
              <Button
                variant={selectedFilter === 'servicio' ? 'contained' : 'outlined'}
                onClick={() => handleFilterChange('servicio')}
                startIcon={<Event />}
                sx={{ borderRadius: 20, px: 3 }}
              >
                Servicios ({items.filter(item => item.type === 'servicio').length})
              </Button>
            </Box>
          </Box>

          {/* Grid de productos/servicios */}
          <Grid container spacing={4}>
            {filteredItems.map((item) => (
              <Grid item xs={12} sm={6} lg={4} key={item.id}>
                <ItemCard item={item} />
              </Grid>
            ))}
          </Grid>

          {filteredItems.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No hay elementos para mostrar con el filtro seleccionado
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      {/* Dialog de detalles */}
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        {selectedItem && (
          <>
            <DialogTitle sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              pb: 2
            }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                {selectedItem.name}
              </Typography>
              <IconButton onClick={closeDialog}>
                <Close />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
              {/* Imagen */}
              <Box sx={{ 
                height: 300,
                backgroundImage: `url(${selectedItem.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }} />

              <Box sx={{ p: 3 }}>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                  {selectedItem.description}
                </Typography>

                <Divider sx={{ mb: 3 }} />

                {/* Detalles específicos */}
                {selectedItem.type === 'producto' && (
                  <Grid container spacing={2}>
                    {selectedItem.price && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                          Precio: ${selectedItem.price.toLocaleString('es-CL')}
                        </Typography>
                      </Grid>
                    )}
                    
                    {selectedItem.colors && selectedItem.colors.length > 0 && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          <strong>Colores disponibles:</strong>
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {selectedItem.colors.map((color, index) => (
                            <Chip 
                              key={index}
                              label={color}
                              size="small"
                              sx={{ textTransform: 'capitalize' }}
                            />
                          ))}
                        </Box>
                      </Grid>
                    )}

                    {selectedItem.sizes && selectedItem.sizes.length > 0 && (
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          <strong>Tallas disponibles:</strong>
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {selectedItem.sizes.map((size, index) => (
                            <Chip 
                              key={index}
                              label={size}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                )}

                {selectedItem.type === 'servicio' && (
                  <Grid container spacing={2}>
                    {selectedItem.location && (
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <LocationOn color="primary" />
                          <Typography variant="body1">
                            <strong>Ubicación:</strong> {selectedItem.location}
                          </Typography>
                        </Box>
                      </Grid>
                    )}

                    {selectedItem.date && (
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <CalendarToday color="primary" />
                          <Typography variant="body1">
                            <strong>Fecha:</strong> {selectedItem.date}
                          </Typography>
                        </Box>
                      </Grid>
                    )}

                    {selectedItem.cupos && (
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <People color="primary" />
                          <Typography variant="body1">
                            <strong>Cupos disponibles:</strong> {selectedItem.cupos}
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                )}
              </Box>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
              <Button onClick={closeDialog} variant="outlined">
                Cerrar
              </Button>
              <Button 
                variant="contained" 
                sx={{ 
                  background: selectedItem.type === 'producto' 
                    ? `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.secondary.light} 90%)`
                    : `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`
                }}
              >
                {selectedItem.type === 'producto' ? 'Consultar Precio' : 'Reservar Cupo'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default Products;
