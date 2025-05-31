import React, { useState } from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  Button,
  Box,
  Chip
} from '@mui/material';

const ProductCard = ({ image, title, description, price, isNew, tag }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  console.log('🎴 ProductCard props:', { image, title, description, price, isNew, tag });

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
      }
    }}>
      <Box sx={{ position: 'relative', minHeight: '220px', bgcolor: '#f5f5f5' }}>
        {image && !imageError ? (
          <CardMedia 
            component="img" 
            height="220" 
            image={image} 
            alt={title || 'Producto'} 
            onError={handleImageError}
            sx={{ 
              transition: '0.5s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        ) : (
          <Box 
            sx={{ 
              height: '220px', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
              color: '#666'
            }}
          >
            <Typography variant="h1" sx={{ fontSize: '3rem', mb: 1 }}>
              🧶
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', px: 2 }}>
              {title || 'Producto Tejelanas'}
            </Typography>
          </Box>
        )}
        
        {isNew && (
          <Chip 
            label="Nuevo" 
            color="secondary" 
            sx={{ 
              position: 'absolute', 
              top: 10, 
              right: 10, 
              fontWeight: 600 
            }}
          />
        )}
        {tag && (
          <Chip 
            label={tag} 
            sx={{ 
              position: 'absolute', 
              top: 10, 
              left: 10, 
              bgcolor: 'rgba(0,0,0,0.6)',
              color: 'white',
              fontWeight: 500
            }}
          />
        )}
      </Box>
      
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" component="h3" gutterBottom sx={{ 
          fontWeight: 600,
          fontSize: '1.1rem',
          lineHeight: 1.3
        }}>
          {title || 'Producto sin título'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ 
          mb: 2,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {description || 'Descubre nuestros productos de alta calidad para tus proyectos de tejido.'}
        </Typography>
        {price && (
          <Typography variant="h6" component="p" color="primary.main" sx={{ 
            fontWeight: 600,
            fontSize: '1.2rem'
          }}>
            ${typeof price === 'number' ? price.toLocaleString() : price}
          </Typography>
        )}
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
        <Button size="small" variant="outlined" color="primary">
          Ver detalles
        </Button>
        <Button 
          size="small" 
          variant="contained" 
          color="secondary"
          onClick={() => {
            // Scroll al formulario de contacto
            const contactForm = document.getElementById('contacto');
            if (contactForm) {
              contactForm.scrollIntoView({ behavior: 'smooth' });
              
              // Rellenar campo producto después de un delay
              setTimeout(() => {
                const productField = document.querySelector('input[name="producto"]');
                if (productField) {
                  productField.value = title || 'Producto seleccionado';
                  productField.dispatchEvent(new Event('input', { bubbles: true }));
                }
              }, 500);
            }
          }}
        >
          Contactar
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
