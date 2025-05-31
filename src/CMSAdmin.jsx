import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
  Code,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Download,
  Api,
  Settings,
  ExpandMore,
  CheckCircle,
  Error
} from '@mui/icons-material';
import { cmsService } from '../services/cmsService';

const CMSAdmin = () => {
  const [exportStatus, setExportStatus] = useState(null);

  const handleExportPostman = () => {
    try {
      cmsService.exportPostmanCollection();
      setExportStatus({ type: 'success', message: 'Colección de Postman exportada exitosamente' });
    } catch (error) {
      setExportStatus({ type: 'error', message: 'Error al exportar la colección' });
    }
  };

  const apiEndpoints = [
    {
      method: 'GET',
      url: '/products-services/',
      description: 'Obtener productos y servicios',
      params: 'Ninguno',
      response: 'Array de productos y servicios con imágenes'
    },
    {
      method: 'GET',
      url: '/about-us/',
      description: 'Obtener información sobre la empresa',
      params: 'Ninguno',
      response: 'Objeto con información de la empresa'
    },
    {
      method: 'GET',
      url: '/faq/',
      description: 'Obtener preguntas frecuentes',
      params: 'Ninguno',
      response: 'Array de preguntas y respuestas'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        Panel de Administración CMS - Tejelanas Vivi
      </Typography>

      {exportStatus && (
        <Alert 
          severity={exportStatus.type} 
          sx={{ mb: 3 }}
          onClose={() => setExportStatus(null)}
        >
          {exportStatus.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Exportar Postman Collection */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Download sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Exportar Colección Postman</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Descarga la colección de Postman para gestionar el contenido de la API
              </Typography>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={handleExportPostman}
                fullWidth
              >
                Descargar Colección Postman
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Estado de la API */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Api sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h6">Estado de la API</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: 16 }} />
                <Typography variant="body2">Productos y Servicios: Activo</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: 16 }} />
                <Typography variant="body2">Preguntas Frecuentes: Activo</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: 16 }} />
                <Typography variant="body2">Información Empresa: Activo</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Base URL: https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Documentación de Endpoints */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Documentación de Endpoints
              </Typography>
              
              {apiEndpoints.map((endpoint, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          px: 1,
                          py: 0.5,
                          bgcolor: 'success.main',
                          color: 'white',
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        {endpoint.method}
                      </Box>
                      <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                        {endpoint.url}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom>Descripción:</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {endpoint.description}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom>Parámetros:</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {endpoint.params}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" gutterBottom>Respuesta:</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {endpoint.response}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CMSAdmin;