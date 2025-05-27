import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Box } from "@mui/material";

// Importación de componentes principales
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer"; // Crearé este componente adicional

// Importación de secciones
import Home from "./components/Sections/Home";
import About from "./components/Sections/About";
import Products from "./components/Sections/Products";

import './App.css';

// Crear tema personalizado con los nuevos colores
const theme = createTheme({
  palette: {
    primary: {
      main: '#A06083', 
      light: '#C98DAC',
      dark: '#7A3E61',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#D68060', 
      light: '#F2A485',
      dark: '#A25741',
      contrastText: '#ffffff',
    },
    background: {
      default: '#FDF6EC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748',
      secondary: '#596577',
    },
    accent: {
      teal: '#78BDBD',
      sage: '#B4C5A9',
      rose: '#E8B0AE',
      mustard: '#E3B448',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Segoe UI", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      '@media (min-width:600px)': {
        fontSize: '3.5rem',
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      '@media (min-width:600px)': {
        fontSize: '2.75rem',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      '@media (min-width:600px)': {
        fontSize: '2.25rem',
      },
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
          boxShadow: '0 3px 5px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 5px 10px rgba(0,0,0,0.15)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #A06083 30%, #B16D94 90%)',
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #D68060 30%, #E39B7D 90%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        {/* Navbar - siempre visible */}
        <Navbar />
        
        {/* Hero section */}
        <Home />
        
        {/* Productos */}
        <Products />
        
        {/* Separador ondulado */}
        <div className="wave-divider" />
        
        {/* Sobre nosotros */}
        <About />
        
        {/* FAQ */}
        <FAQ />
        
        {/* Contacto */}
        <ContactForm />
        
        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;