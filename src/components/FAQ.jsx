import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  CircularProgress,
  Alert,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { apiService } from '../services/api';

function FAQ() {
  const theme = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const faqData = await apiService.getFAQ();
        console.log('📋 FAQ data received:', faqData);
        console.log('📋 FAQ data structure:', Object.keys(faqData || {}));
        
        setData(faqData);
      } catch (err) {
        console.error('❌ FAQ component: Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Función para extraer las FAQs de diferentes estructuras posibles
  const getFAQs = () => {
    if (!data) {
      return [];
    }

    console.log('🔍 Processing FAQ data structure:', data);
    
    let faqs = [];
    
    // Estructura 1: { data: { faqs: [...] } }
    if (data.data && data.data.faqs && Array.isArray(data.data.faqs)) {
      console.log('📋 Found faqs in data.data.faqs, length:', data.data.faqs.length);
      faqs = data.data.faqs;
    }
    // Estructura 2: { data: [...] }
    else if (data.data && Array.isArray(data.data)) {
      console.log('📋 Found faqs in data.data array, length:', data.data.length);
      faqs = data.data;
    }
    // Estructura 3: { faqs: [...] }
    else if (data.faqs && Array.isArray(data.faqs)) {
      console.log('📋 Found faqs in data.faqs, length:', data.faqs.length);
      faqs = data.faqs;
    }
    // Estructura 4: directamente un array
    else if (Array.isArray(data)) {
      console.log('📋 Data is direct array, length:', data.length);
      faqs = data;
    }
    // Estructura 5: buscar cualquier array en las propiedades
    else {
      console.log('🤔 Searching for arrays in FAQ object properties...');
      const keys = Object.keys(data);
      for (const key of keys) {
        if (Array.isArray(data[key]) && data[key].length > 0) {
          console.log(`📋 Found array in key '${key}', length:`, data[key].length);
          faqs = data[key];
          break;
        }
      }
    }

    console.log('📦 Final FAQs extracted:', faqs.length);
    console.log('📦 Sample FAQ:', faqs[0]);
    
    return faqs;
  };

  const faqs = getFAQs();

  if (loading) {
    return (
      <Box sx={{ 
        py: { xs: 6, md: 10 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px'
      }} id="faq">
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Cargando preguntas frecuentes...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: { xs: 6, md: 10 } }} id="faq">
        <Container maxWidth="lg">
          <Alert severity="error" sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Error al cargar preguntas frecuentes
            </Typography>
            <Typography>
              {error}
            </Typography>
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      py: { xs: 6, md: 10 },
      backgroundColor: theme.palette.background.default
    }} id="faq">  {/* ← ID correcto para navegación */}
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
            {data?.title || data?.titulo || 'Preguntas Frecuentes'}
          </Typography>
          
          {(data?.description || data?.descripcion) && (
            <Typography 
              variant="h5" 
              sx={{ 
                maxWidth: '800px',
                mx: 'auto',
                color: theme.palette.text.secondary,
                mt: 2
              }}
            >
              {data.description || data.descripcion}
            </Typography>
          )}
        </Box>

        {faqs.length > 0 ? (
          <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
            {faqs.map((faq, index) => {
              const panelId = `panel${index}`;
              
              // Extraer pregunta y respuesta de diferentes posibles nombres
              const question = faq.question || faq.pregunta || faq.title || faq.titulo || `Pregunta ${index + 1}`;
              const answer = faq.answer || faq.respuesta || faq.description || faq.descripcion || 'Sin respuesta disponible';
              
              console.log(`🎯 Rendering FAQ ${index}:`, { question, answer });
              
              return (
                <Accordion 
                  key={faq.id || index}
                  expanded={expanded === panelId} 
                  onChange={handleChange(panelId)}
                  sx={{ 
                    mb: 2,
                    borderRadius: 2,
                    '&:before': {
                      display: 'none',
                    },
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    '&.Mui-expanded': {
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    }
                  }}
                >
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      backgroundColor: expanded === panelId ? theme.palette.primary.light : 'transparent',
                      color: expanded === panelId ? 'white' : 'inherit',
                      borderRadius: expanded === panelId ? '8px 8px 0 0' : '8px',
                      minHeight: '64px',
                      '&.Mui-expanded': {
                        minHeight: '64px',
                      },
                      '& .MuiAccordionSummary-content': {
                        my: 2
                      }
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: '1.1rem'
                      }}
                    >
                      {question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails 
                    sx={{ 
                      pt: 3,
                      pb: 3,
                      backgroundColor: 'white'
                    }}
                  >
                    <Typography 
                      variant="body1"
                      sx={{ 
                        lineHeight: 1.7,
                        color: theme.palette.text.secondary
                      }}
                    >
                      {answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Alert severity="info" sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                No se encontraron preguntas frecuentes
              </Typography>
              <Typography variant="body1">
                La API no devolvió datos de FAQ o la estructura es diferente a la esperada.
              </Typography>
              {process.env.NODE_ENV === 'development' && (
                <Typography variant="body2" sx={{ mt: 2, fontFamily: 'monospace' }}>
                  Estructura recibida: {JSON.stringify(data, null, 2)}
                </Typography>
              )}
            </Alert>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default FAQ;
