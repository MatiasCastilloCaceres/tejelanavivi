import React from 'react';
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
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia 
          component="img" 
          height="220" 
          image={image} 
          alt={title} 
          sx={{ 
            transition: '0.5s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
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
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        {price && (
          <Typography variant="h6" component="p" color="primary.main" sx={{ fontWeight: 600 }}>
            ${price.toLocaleString()}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
        <Button size="small">Ver detalles</Button>
        <Button size="small" variant="outlined" color="secondary">
          Consultar
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
