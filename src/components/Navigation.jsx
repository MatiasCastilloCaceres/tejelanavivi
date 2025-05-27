
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navigation = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Tejelanas Vivi
      </Typography>
      <Button color="inherit" href="#about">Quiénes Somos</Button>
      <Button color="inherit" href="#products">Productos</Button>
      <Button color="inherit" href="#faq">Preguntas</Button>
      <Button color="inherit" href="#contact">Contacto</Button>
    </Toolbar>
  </AppBar>
);

export default Navigation;
