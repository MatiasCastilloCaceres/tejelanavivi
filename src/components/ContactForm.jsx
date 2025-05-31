import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  CircularProgress
} from '@mui/material';
import { Send, Shield, CheckCircle } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const ContactForm = ({ preselectedProduct = '' }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    producto: preselectedProduct,
    mensaje: '',
    acepta_terminos: false,
    captcha_verified: false
  });
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [captchaKey, setCaptchaKey] = useState(Math.random());

  // Validaciones del lado del cliente
  const validateField = (name, value) => {
    const validations = {
      nombre: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        message: 'Nombre debe tener al menos 2 caracteres y solo letras'
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Ingresa un email válido'
      },
      telefono: {
        required: true,
        pattern: /^(\+56)?[0-9]{8,9}$/,
        message: 'Teléfono debe tener formato chileno válido'
      },
      mensaje: {
        required: true,
        minLength: 10,
        maxLength: 500,
        message: 'Mensaje debe tener entre 10 y 500 caracteres'
      }
    };

    const validation = validations[name];
    if (!validation) return '';

    if (validation.required && !value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} es requerido`;
    }

    if (validation.minLength && value.length < validation.minLength) {
      return validation.message;
    }

    if (validation.maxLength && value.length > validation.maxLength) {
      return validation.message;
    }

    if (validation.pattern && !validation.pattern.test(value)) {
      return validation.message;
    }

    return '';
  };

  // Sanitización de datos
  const sanitizeInput = (value) => {
    return value
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
      .replace(/[<>]/g, '') // Remove < and >
      .trim();
  };

  // Captcha simple (matemático)
  const [captchaQuestion, setCaptchaQuestion] = useState(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { a, b, answer: a + b };
  });
  const [captchaInput, setCaptchaInput] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const sanitizedValue = type === 'checkbox' ? checked : sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Validación en tiempo real
    if (type !== 'checkbox') {
      const error = validateField(name, sanitizedValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleCaptchaChange = (e) => {
    const value = e.target.value;
    setCaptchaInput(value);
    
    const isCorrect = parseInt(value) === captchaQuestion.answer;
    setFormData(prev => ({
      ...prev,
      captcha_verified: isCorrect
    }));
    
    setErrors(prev => ({
      ...prev,
      captcha: isCorrect ? '' : 'Respuesta incorrecta'
    }));
  };

  const refreshCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptchaQuestion({ a, b, answer: a + b });
    setCaptchaInput('');
    setFormData(prev => ({ ...prev, captcha_verified: false }));
    setCaptchaKey(Math.random());
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validar todos los campos
    Object.keys(formData).forEach(key => {
      if (key !== 'acepta_terminos' && key !== 'captcha_verified') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    // Validaciones especiales
    if (!formData.acepta_terminos) {
      newErrors.acepta_terminos = 'Debes aceptar los términos y condiciones';
    }

    if (!formData.captcha_verified) {
      newErrors.captcha = 'Debes completar la verificación correctamente';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus({
        type: 'error',
        message: 'Por favor corrige los errores en el formulario'
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulación de envío al servidor con validación del lado del servidor
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest', // Protección CSRF
        },
        body: JSON.stringify({
          ...formData,
          timestamp: Date.now(), // Para prevenir replay attacks
          honeypot: '', // Campo oculto para detectar bots
        }),
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: '¡Mensaje enviado exitosamente! Te contactaremos pronto.'
        });
        
        // Limpiar formulario
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          producto: '',
          mensaje: '',
          acepta_terminos: false,
          captcha_verified: false
        });
        setCaptchaInput('');
        refreshCaptcha();
        
      } else {
        throw new Error('Error del servidor');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      setStatus({
        type: 'error',
        message: 'Error al enviar el mensaje. Inténtalo nuevamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id="contacto" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 2
            }}
          >
            Contáctanos
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
          >
            ¿Tienes alguna pregunta sobre nuestros productos o talleres? 
            ¡Escríbenos y te responderemos pronto!
          </Typography>
        </Box>

        {status.message && (
          <Alert 
            severity={status.type} 
            sx={{ mb: 3 }}
            icon={status.type === 'success' ? <CheckCircle /> : undefined}
          >
            {status.message}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: { xs: 3, md: 4 },
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}
        >
          {/* Honeypot field - oculto para detectar bots */}
          <input
            type="text"
            name="honeypot"
            style={{ display: 'none' }}
            tabIndex="-1"
            autoComplete="off"
          />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre completo"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                error={!!errors.nombre}
                helperText={errors.nombre}
                required
                inputProps={{
                  maxLength: 50,
                  autoComplete: 'name'
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                required
                inputProps={{
                  autoComplete: 'email'
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                error={!!errors.telefono}
                helperText={errors.telefono || 'Formato: +56912345678 o 912345678'}
                required
                inputProps={{
                  autoComplete: 'tel'
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Producto de interés</InputLabel>
                <Select
                  name="producto"
                  value={formData.producto}
                  onChange={handleChange}
                  label="Producto de interés"
                >
                  <MenuItem value="">Selecciona una opción</MenuItem>
                  <MenuItem value="lanas">Lanas y vellones</MenuItem>
                  <MenuItem value="talleres">Talleres de crochet</MenuItem>
                  <MenuItem value="productos">Productos terminados</MenuItem>
                  <MenuItem value="consulta">Consulta general</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mensaje"
                name="mensaje"
                multiline
                rows={4}
                value={formData.mensaje}
                onChange={handleChange}
                error={!!errors.mensaje}
                helperText={errors.mensaje || `${formData.mensaje.length}/500 caracteres`}
                required
                inputProps={{
                  maxLength: 500
                }}
              />
            </Grid>

            {/* Captcha matemático */}
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label={`Verificación: ¿Cuánto es ${captchaQuestion.a} + ${captchaQuestion.b}?`}
                value={captchaInput}
                onChange={handleCaptchaChange}
                error={!!errors.captcha}
                helperText={errors.captcha}
                required
                type="number"
                key={captchaKey}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Button
                variant="outlined"
                onClick={refreshCaptcha}
                fullWidth
                sx={{ height: '56px' }}
              >
                Nueva pregunta
              </Button>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="acepta_terminos"
                    checked={formData.acepta_terminos}
                    onChange={handleChange}
                    required
                  />
                }
                label={
                  <Typography variant="body2">
                    Acepto los términos y condiciones y el tratamiento de mis datos personales
                    según la Ley de Protección de Datos Personales.
                  </Typography>
                }
              />
              {errors.acepta_terminos && (
                <Typography variant="caption" color="error">
                  {errors.acepta_terminos}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Shield color="success" fontSize="small" />
                <Typography variant="body2" color="success.main">
                  Tus datos están protegidos con encriptación SSL
                </Typography>
              </Box>
              
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send />}
                disabled={loading || !formData.captcha_verified || !formData.acepta_terminos}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
                  }
                }}
              >
                {loading ? 'Enviando...' : 'Enviar Mensaje'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactForm;
