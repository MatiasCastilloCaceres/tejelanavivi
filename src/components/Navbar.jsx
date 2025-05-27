import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Container,
  useScrollTrigger,
  Slide,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

// Componente que oculta la barra al hacer scroll
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Función para manejar el desplazamiento suave a las secciones
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      handleCloseNavMenu(); // Cierra el menú móvil si está abierto
      
      // Desplazamiento suave a la sección
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Actualiza la URL sin recargar la página
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  // Navegación principal
  const pages = [
    { name: 'Inicio', id: 'home' },
    { name: 'Productos', id: 'products' },
    { name: 'Talleres', id: 'workshops' },
    { name: 'Nosotros', id: 'about' },
    { name: 'Contacto', id: 'contacto' },
  ];

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={0}
        sx={{ 
          backgroundColor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo para desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 3 }}>
              <Avatar 
                src="/images/logo.jpg" 
                alt="Tejelanas Vivi" 
                sx={{ width: 48, height: 48 }}
                onClick={() => scrollToSection('home')}
                style={{ cursor: 'pointer' }}
              />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => scrollToSection('home')}
              sx={{ 
                mr: 2, 
                display: { xs: 'none', md: 'flex' },
                color: theme.palette.primary.main, 
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Tejelanas Vivi
            </Typography>

            {/* Menú móvil */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="primary"
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem 
                    key={page.name} 
                    onClick={() => scrollToSection(page.id)}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo para móvil */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
              <Avatar 
                src="/images/logo.jpg" 
                alt="Tejelanas Vivi" 
                sx={{ width: 40, height: 40 }}
                onClick={() => scrollToSection('home')}
                style={{ cursor: 'pointer' }}
              />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => scrollToSection('home')}
              sx={{ 
                flexGrow: 1, 
                display: { xs: 'flex', md: 'none' },
                color: theme.palette.primary.main,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Tejelanas Vivi
            </Typography>
            
            {/* Navegación desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => scrollToSection(page.id)}
                  sx={{ 
                    mx: 1.5, 
                    color: theme.palette.text.primary,
                    '&:hover': {
                      color: theme.palette.primary.main,
                      backgroundColor: 'transparent',
                    }
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Botón de carrito */}
            <Box sx={{ display: 'flex' }}>
              <IconButton color="primary">
                <ShoppingBagOutlinedIcon />
              </IconButton>
              {!isMobile && (
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ ml: 2 }}
                  onClick={() => scrollToSection('contacto')}
                >
                  Contactar
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}

export default Navbar;