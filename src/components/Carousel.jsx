import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Box, Typography } from '@mui/material';

const items = [
  { 
    name: 'Lanas Naturales', 
    description: 'Lanas 100% naturales para tus proyectos',
    image: '/images/Lanas_Naturales.jpg'  // Nombre correcto con ruta
  },
  { 
    name: 'Vellón Premium', 
    description: 'El mejor vellón para tus creaciones',
    image: '/images/Vellon+Premium.jpg'  // Nombre correcto con ruta
  },
  { 
    name: 'Talleres de Tejido', 
    description: 'Aprende con nuestros expertos',
    image: '/images/Talleres_de_Tejido.jpg'  // Nombre correcto con ruta
  }
];

function ImageCarousel() {
  return (
    <Box sx={{ maxWidth: '100%', my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom textAlign="center">
        Nuestros Productos
      </Typography>
      <Carousel>
        {items.map((item, i) => (
          <Paper 
            key={i} 
            elevation={3} 
            sx={{ p: 2, height: '400px', position: 'relative' }}
          >
            <img 
              src={item.image} 
              alt={item.name} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1
              }} 
            />
            <Box 
              sx={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                backgroundColor: 'rgba(0,0,0,0.6)', 
                color: 'white',
                p: 2,
                zIndex: 2
              }}
            >
              <Typography variant="h5">{item.name}</Typography>
              <Typography>{item.description}</Typography>
            </Box>
          </Paper>
        ))}
      </Carousel>
    </Box>
  );
}

export default ImageCarousel;
