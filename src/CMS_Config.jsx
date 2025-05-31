const CMS_CONFIG = {
  baseURL: 'https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1',
  endpoints: {
    products: '/products-services/',
    about: '/about-us/',
    faq: '/faq/',
    contact: '/contact/',
    images: '/images/'
  },
  headers: {
    'Authorization': 'Bearer ipss.get',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Servicio CMS para gestión de contenido
export const cmsService = {
  // Obtener configuración para Postman
  getPostmanCollection: () => ({
    info: {
      name: "Tejelanas Vivi CMS API",
      description: "Colección para gestión de contenido del sitio web",
      version: "1.0.0"
    },
    item: [
      {
        name: "Productos y Servicios",
        request: {
          method: "GET",
          header: Object.entries(CMS_CONFIG.headers).map(([key, value]) => ({
            key,
            value,
            type: "text"
          })),
          url: {
            raw: `${CMS_CONFIG.baseURL}${CMS_CONFIG.endpoints.products}`,
            host: [CMS_CONFIG.baseURL],
            path: [CMS_CONFIG.endpoints.products]
          }
        }
      },
      {
        name: "Acerca de Nosotros",
        request: {
          method: "GET",
          header: Object.entries(CMS_CONFIG.headers).map(([key, value]) => ({
            key,
            value,
            type: "text"
          })),
          url: {
            raw: `${CMS_CONFIG.baseURL}${CMS_CONFIG.endpoints.about}`,
            host: [CMS_CONFIG.baseURL],
            path: [CMS_CONFIG.endpoints.about]
          }
        }
      },
      {
        name: "Preguntas Frecuentes",
        request: {
          method: "GET",
          header: Object.entries(CMS_CONFIG.headers).map(([key, value]) => ({
            key,
            value,
            type: "text"
          })),
          url: {
            raw: `${CMS_CONFIG.baseURL}${CMS_CONFIG.endpoints.faq}`,
            host: [CMS_CONFIG.baseURL],
            path: [CMS_CONFIG.endpoints.faq]
          }
        }
      }
    ]
  }),

  // Función para exportar colección de Postman
  exportPostmanCollection: () => {
    const collection = cmsService.getPostmanCollection();
    const dataStr = JSON.stringify(collection, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'TejelanasvVivi_CMS_Collection.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  },

  // Validar estructura de datos
  validateContent: (type, data) => {
    const schemas = {
      product: ['id', 'nombre', 'descripcion', 'precio', 'imgs'],
      service: ['id', 'nombre', 'ubicacion', 'fecha', 'cupos', 'imgs'],
      faq: ['pregunta', 'respuesta'],
      about: ['titulo', 'contenido']
    };

    const requiredFields = schemas[type];
    if (!requiredFields) return { valid: false, message: 'Tipo de contenido no válido' };

    const missingFields = requiredFields.filter(field => !data.hasOwnProperty(field));
    
    return {
      valid: missingFields.length === 0,
      message: missingFields.length > 0 
        ? `Campos faltantes: ${missingFields.join(', ')}`
        : 'Contenido válido'
    };
  }
};