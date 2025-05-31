import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Función mejorada para scroll suave con offset
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Altura del navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    // Cerrar drawer en móvil
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const menuItems = [
    { label: 'Inicio', id: 'inicio' },
    { label: 'Productos', id: 'productos' },
    { label: 'Nosotros', id: 'nosotros' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contacto', id: 'contacto' }
  ];

  const drawer = (
    <Box sx={{ width: 250, bgcolor: 'background.paper', height: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
          Tejelanas Vivi
        </Typography>
        <IconButton onClick={handleDrawerToggle} color="primary">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.label} 
            onClick={() => scrollToSection(item.id)}
            sx={{
              '&:hover': {
                bgcolor: 'primary.light',
                color: 'white',
                '& .MuiListItemText-primary': {
                  color: 'white'
                }
              },
              transition: 'all 0.3s ease'
            }}
          >
            <ListItemText 
              primary={item.label} 
              primaryTypographyProps={{
                fontWeight: 500
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: 'background.paper',
          color: 'text.primary',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            {/* Logo - CORREGIDO */}
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                color: 'primary.main',
                cursor: 'pointer'
              }}
              onClick={() => scrollToSection('inicio')}
            >
              Tejelanas Vivi
            </Typography>

            {/* Desktop Menu */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => scrollToSection(item.id)}
                    sx={{
                      color: 'text.primary',
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="primary"
                aria-label="abrir menú"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            bgcolor: 'background.paper'
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer for fixed navbar */}
      <Toolbar />
    </>
  );
};

export default Navbar;