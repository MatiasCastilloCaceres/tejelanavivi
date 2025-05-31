# Tejelanas Vivi - Sitio Web Oficial

🧶 **Página web informativa para el emprendimiento Tejelanas Vivi**

Plataforma digital que conecta a los amantes del tejido con productos artesanales de calidad y talleres especializados en la hermosa zona de Zapallar.

## 🌟 Características

- **Carrusel interactivo** con productos y servicios desde API
- **Catálogo dinámico** con filtros por tipo (productos/servicios)  
- **Formulario de contacto** con validación avanzada y protección anti-spam
- **Diseño responsive** optimizado para móviles y escritorio
- **Accesibilidad completa** con navegación por teclado y ARIA labels
- **Integración CMS** para gestión de contenido con Postman
- **Optimización de rendimiento** con lazy loading y imágenes optimizadas

## 🚀 Demo en Vivo

🔗 **[Ver sitio web](https://tejelanasvivi.netlify.app)**

## 📋 Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Componentes](#componentes)
- [API](#api)
- [Estructura del Proyecto](#estructura)
- [Buenas Prácticas](#buenas-prácticas)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## 🛠️ Instalación

### Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn
- Git

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tuusuario/tejelanasvivi.git
cd tejelanasvivi
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env.local
REACT_APP_API_URL=https://www.clinicatecnologica.cl/ipss/tejelanasVivi/api/v1
REACT_APP_API_TOKEN=ipss.get
```

4. **Ejecutar en desarrollo**
```bash
npm start
# o
yarn start
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

## 🎯 Uso

### Desarrollo Local

```bash
# Ejecutar en modo desarrollo
npm start

# Ejecutar tests
npm test

# Build para producción
npm run build

# Análizar bundle
npm run analyze
```

### Gestión de Contenido

```bash
# Exportar colección de Postman
http://localhost:3000/admin
```

## 🧩 Componentes

### ImageCarousel

Carrusel interactivo con imágenes de productos y servicios.

```jsx
import ImageCarousel from './components/ImageCarousel';

<ImageCarousel 
  height={500}
  autoPlay={true}
  autoPlayInterval={5000}
  title="Nuestros Productos"
  showIndicators={true}
  showControls={true}
  fallbackImages={[...]}
/>
```

**Props:**
- `height`: Altura del carrusel (default: 400)
- `autoPlay`: Reproducción automática (default: true)
- `autoPlayInterval`: Intervalo en ms (default: 4000)
- `title`: Título del carrusel
- `showIndicators`: Mostrar indicadores (default: true)
- `showControls`: Mostrar controles (default: true)
- `fallbackImages`: Imágenes de respaldo

### ContactForm

Formulario de contacto con validación avanzada y protección anti-spam.

```jsx
import ContactForm from './components/ContactForm';

<ContactForm preselectedProduct="lanas" />
```

**Props:**
- `preselectedProduct`: Producto preseleccionado (opcional)

**Características:**
- Validación en tiempo real
- Sanitización de datos
- Captcha matemático
- Protección honeypot
- Validación de email y teléfono chileno

### Products

Sección de productos y servicios con filtros dinámicos.

```jsx
import Products from './components/Sections/Products';

<Products />
```

**Características:**
- Carga de datos desde API
- Filtros por tipo (productos/servicios)
- Modal de detalles
- Cards responsivas
- Estados de carga y error

## 🌐 API

### Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/products-services/` | Obtener productos y servicios |
| GET | `/about-us/` | Información de la empresa |
| GET | `/faq/` | Preguntas frecuentes |

### Ejemplo de Uso

```javascript
import { apiService } from './services/api';

// Obtener productos
const products = await apiService.getProductsServices();

// Obtener FAQ
const faq = await apiService.getFAQ();

// Obtener información de empresa
const about = await apiService.getAboutUs();
```

### Estructura de Respuesta

```json
{
  "success": true,
  "data": {
    "data": {
      "productos": [
        {
          "id": 1,
          "nombre": "Falda a Crochet",
          "descripcion": "...",
          "precio": 9990,
          "imgs": ["https://..."],
          "colores": ["crema", "verde"],
          "tallas": ["S", "M", "L", "XL"]
        }
      ],
      "servicios": [
        {
          "id": 1,
          "nombre": "Taller de Crochet",
          "ubicacion": "Zapallar",
          "fecha": "08/06/2025",
          "cupos": 50,
          "imgs": ["https://..."]
        }
      ]
    }
  }
}
```

## 📁 Estructura del Proyecto

```
tejelanasvivi/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Sections/
│   │   │   ├── Home.jsx          # Página principal
│   │   │   ├── About.jsx         # Sobre nosotros
│   │   │   └── Products.jsx      # Productos y servicios
│   │   ├── ImageCarousel.jsx     # Carrusel de imágenes
│   │   ├── ContactForm.jsx       # Formulario de contacto
│   │   ├── Navbar.jsx           # Barra de navegación
│   │   ├── Footer.jsx           # Pie de página
│   │   ├── FAQ.jsx              # Preguntas frecuentes
│   │   └── CMSAdmin.jsx         # Panel de administración
│   ├── services/
│   │   ├── api.js               # Servicio de API
│   │   └── cmsService.js        # Servicio CMS
│   ├── utils/
│   │   └── helpers.js           # Funciones auxiliares
│   ├── styles/
│   │   └── App.css              # Estilos globales
│   ├── App.jsx                  # Componente principal
│   └── index.js                 # Punto de entrada
├── docs/
│   ├── BUENAS_PRACTICAS.md      # Guía de buenas prácticas
│   └── API_DOCUMENTATION.md     # Documentación de API
├── .gitignore
├── package.json
└── README.md
```

## 🎨 Tecnologías Utilizadas

### Frontend
- **React 18** - Framework principal
- **Material-UI** - Componentes y diseño
- **JavaScript ES6+** - Lenguaje de programación

### Herramientas
- **Git & GitHub** - Control de versiones
- **Postman** - Gestión de API
- **ESLint & Prettier** - Calidad de código
- **React Testing Library** - Testing

### API
- **REST API** - Consumo de datos
- **JSON** - Formato de datos
- **CORS** - Comunicación entre dominios

## 📚 Buenas Prácticas

### Nomenclatura
- **Componentes**: PascalCase (`ImageCarousel`)
- **Variables**: camelCase (`currentIndex`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Archivos**: PascalCase para componentes, camelCase para servicios

### Estructura de Código
- Importaciones ordenadas (React → librerías → componentes → servicios → estilos)
- Componentes funcionales con hooks
- PropTypes para validación de props
- Destructuring para mejor legibilidad

### Accesibilidad
- ARIA labels en todos los elementos interactivos
- Navegación por teclado completa
- Contraste de colores WCAG AA
- Imágenes con alt text descriptivo

### Rendimiento
- Lazy loading para imágenes
- useMemo y useCallback para optimización
- Componentes con React.memo cuando sea necesario
- Imágenes optimizadas y comprimidas

## 🤝 Contribuir

### Flujo de Trabajo Git

1. **Crear rama para nueva funcionalidad**
```bash
git checkout -b feature/nueva-funcionalidad
```

2. **Hacer commits descriptivos**
```bash
git commit -m "feat: agregar validación de formulario de contacto"
```

3. **Push y crear Pull Request**
```bash
git push origin feature/nueva-funcionalidad
```

4. **Code Review y Merge**

### Convenciones de Commits

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Documentación
- `style:` Cambios de formato
- `refactor:` Refactorización
- `test:` Tests
- `chore:` Tareas de mantenimiento

### Checklist antes de PR

- [ ] Código formateado con Prettier
- [ ] Sin errores de ESLint
- [ ] Tests pasan
- [ ] Documentación actualizada
- [ ] Responsive design verificado
- [ ] Accesibilidad probada

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Tests con coverage
npm run test:coverage

# Tests e2e
npm run test:e2e
```

### Ejemplos de Tests

```javascript
// Ejemplo: Test de componente
import { render, screen } from '@testing-library/react';
import ContactForm from './ContactForm';

test('renders contact form', () => {
  render(<ContactForm />);
  expect(screen.getByText('Contáctanos')).toBeInTheDocument();
});

// Ejemplo: Test de API
import { apiService } from './services/api';

test('fetches products from API', async () => {
  const products = await apiService.getProductsServices();
  expect(products).toBeDefined();
  expect(products.data).toBeDefined();
});
```

## 🚀 Despliegue

### Netlify (Recomendado)

1. **Conectar repositorio de GitHub**
2. **Configurar build**:
   - Build command: `npm run build`
   - Publish directory: `build`
3. **Variables de entorno** en Netlify dashboard
4. **Deploy automático** en cada push a main

### Vercel

```bash
npm install -g vercel
vercel --prod
```

### Build Manual

```bash
npm run build
# Archivos generados en /build
```

## 📞 Soporte

### Contacto del Proyecto

- **Email**: contacto@tejelanasvivi.cl
- **Instagram**: [@teje_lanas.vivi](https://www.instagram.com/teje_lanas.vivi)
- **Ubicación**: Laguna de Zapallar, Chile

### Reportar Issues

1. Revisar [issues existentes](https://github.com/tuusuario/tejelanasvivi/issues)
2. Crear nuevo issue con template
3. Incluir pasos para reproducir
4. Agregar screenshots si es visual

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para detalles.

---

**Desarrollado con ❤️ para Tejelanas Vivi**

> Un espacio donde la tradición del tejido se encuentra con la innovación digital, conectando artesanas de Zapallar con el mundo.

## 🎯 Roadmap

### Próximas Funcionalidades

- [ ] Sistema de autenticación de usuarios
- [ ] Carrito de compras integrado
- [ ] Pasarela de pagos
- [ ] Blog con tutoriales
- [ ] Galería de trabajos de estudiantes
- [ ] Sistema de reservas online para talleres
- [ ] Chat en tiempo real
- [ ] App móvil complementaria

### Mejoras Planificadas

- [ ] PWA (Progressive Web App)
- [ ] Optimización SEO avanzada
- [ ] Análitics y métricas
- [ ] A/B testing para conversiones
- [ ] CDN para imágenes
- [ ] Caché inteligente
- [ ] Modo offline

---

**¿Tienes preguntas?** No dudes en abrir un [issue](https://github.com/tuusuario/tejelanasvivi/issues) o contactarnos directamente.