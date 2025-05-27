import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  Tabs, 
  Tab, 
  useTheme 
} from '@mui/material';
import ProductCard from '../ProductCard';

const Products = () => {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  
  useEffect(() => {
    setProducts([
      { 
        id: 1, 
        title: 'Lana Merino', 
        description: 'Lana 100% natural teñida artesanalmente con tintes naturales.', 
        image: '/images/Lanas_Naturales.jpg', 
        price: 12500,
        category: 'lanas',
        isNew: true
      },
      { 
        id: 2, 
        title: 'Vellón Premium', 
        description: 'Vellón de alta calidad para fieltro y proyectos artesanales.', 
        image: '/images/Vellon+Premium.jpg', 
        price: 8900,
        category: 'vellon',
        tag: 'Popular'
      },
      { 
        id: 3, 
        title: 'Kit Principiante', 
        description: 'Todo lo que necesitas para comenzar a tejer: agujas, lanas y patrón.', 
        image: '/images/Talleres_de_Tejido.jpg', 
        price: 22500,
        category: 'kits'
      },
      { 
        id: 4, 
        title: 'Lana Alpaca', 
        description: 'Suave lana de alpaca para prendas de abrigo de gran calidad.', 
        image: '/images/Lanas_Naturales.jpg', 
        price: 15900,
        category: 'lanas'
      }
    ]);
  }, []);

  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
  };

  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(product => product.category === category);

  return (
    <Box 
      id="products"
      sx={{ 
        py: { xs: 6, md: 10 },
        background: `linear-gradient(to bottom, ${theme.palette.background.default} 0%, white 100%)`
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
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
            Nuestros Productos
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              maxWidth: '800px',
              mx: 'auto',
              color: theme.palette.text.secondary,
              mt: 2
            }}
          >
            Descubre nuestra selección de lanas naturales, vellón y accesorios para tus proyectos
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={category} 
            onChange={handleCategoryChange} 
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '.MuiTabs-flexContainer': {
                justifyContent: { sm: 'center' }
              }
            }}
          >
            <Tab value="all" label="Todos" />
            <Tab value="lanas" label="Lanas" />
            <Tab value="vellon" label="Vellón" />
            <Tab value="kits" label="Kits" />
          </Tabs>
        </Box>

        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard 
                title={product.title}
                description={product.description}
                image={product.image}
                price={product.price}
                isNew={product.isNew}
                tag={product.tag}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Products;
