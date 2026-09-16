1) Descripción del proyecto:

GreenHome es una aplicación web integral diseñada para la supervisión, administración y monitoreo en tiempo real de condiciones ambientales en invernaderos. La plataforma permite controlar variables críticas como temperatura y humedad, gestionar sensores instalados y mantener un inventario de cultivos, facilitando la automatización y toma de decisiones para un mantenimiento óptimo del invernadero.

2) Tecnologías usadas:

HTML5: Estructuración semántica y accesible de la interfaz de usuario.

CSS \ Bootstrap 5: Maquetación responsiva, diseño adaptativo y estilos visuales.

JavaScript: Lógica del lado del cliente, manipulación del DOM, eventos e interacción con sensores.

Amazon Web Services (AWS EC2): Infraestructura en la nube para el alojamiento y despliegue del servidor.

3) Estructura del proyecto:

/var/www/HTML
│
├── index.html                   # Página de inicio
├── index.js                     # Scripts de la página principal
├── style.css                    # Estilos globales
├── fondo.png                    # Imagen de fondo del sitio
├── logo.png                     # Imagen del Hero banner
│
├── login/                       # Módulo de Autenticación
│   ├── login.html               # Formulario de inicio de sesión
│   ├── login.js                 # Lógica de autenticación y validación
│   └── style.css                # Estilo de inicio de sesión
│
├── Registro_Usuario/            # Módulo de Registro
│   ├── registro.html            # Formulario para nuevos usuarios
│   ├── registro.js              # Validaciones de registro y contraseñas
│   └── style.css                # Estilo del formulario de registro
│
└── resumen_Invernadero/         # Panel de Control
├── resumen.html             # Métricas y tablas
├── resumen.js               # Funcionamiento de reloj, sensores, contadores de sensores y plantas e interacciones de la pagina
└── style.css                # Estilo del panel de control

4) Descripción de las principales funcionalidades.

Monitoreo Ambiental: Visualización activa de mediciones de temperatura y humedad simuladas con reloj funcional.

Gestión de Cultivos y Sensores: Tabla interactiva para agregar, consultar y eliminar registros de plantas y sensores.

Búsqueda y Filtro de Registros: Búsqueda de plantas en los datos listados.

Validación de Usuarios: Autenticación de inicio de sesión y registro de usuario para correo y contraseña.

5) Dirección IP utilizada para el despliegue.

IP Elástica: 34.237.209.6
