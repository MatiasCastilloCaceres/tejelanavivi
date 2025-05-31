const API_BASE_URL = 'https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1';
const AUTH_TOKEN = 'ipss.get';

const defaultHeaders = {
  'Authorization': `Bearer ${AUTH_TOKEN}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export const apiService = {
  // Obtener productos y servicios
  getProductsServices: async () => {
    console.log('🔄 API: Fetching products from:', `${API_BASE_URL}/products-services/`);
    
    const response = await fetch(`${API_BASE_URL}/products-services/`, {
      method: 'GET',
      headers: defaultHeaders,
      mode: 'cors'
    });
    
    console.log('📡 API Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  },

  // Obtener información "Sobre nosotros"
  getAboutUs: async () => {
    const response = await fetch(`${API_BASE_URL}/about-us/`, {
      method: 'GET',
      headers: defaultHeaders,
      mode: 'cors'
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  },

  // Obtener preguntas frecuentes
  getFAQ: async () => {
    console.log('🔄 API: Fetching FAQ from:', `${API_BASE_URL}/faq/`);
    
    const response = await fetch(`${API_BASE_URL}/faq/`, {
      method: 'GET',
      headers: defaultHeaders,
      mode: 'cors'
    });
    
    console.log('📡 FAQ API Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('📦 FAQ Raw API Response:', data);
    console.log('📦 FAQ Response type:', typeof data);
    console.log('📦 FAQ Response keys:', Object.keys(data || {}));
    
    // Buscar FAQs en diferentes ubicaciones
    if (data.data) {
      console.log('📦 FAQ data.data structure:', data.data);
      console.log('📦 FAQ data.data type:', typeof data.data);
      if (data.data.faqs) {
        console.log('📦 FAQ data.data.faqs length:', data.data.faqs?.length);
      }
    }
    
    return data;
  }
};