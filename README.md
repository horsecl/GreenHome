## 1. Descripción del proyecto:

GreenHome es una aplicación web integral diseñada para la supervisión, administración y monitoreo en tiempo real de condiciones ambientales en invernaderos. La plataforma permite controlar variables críticas como temperatura y humedad, gestionar sensores instalados y mantener un inventario de cultivos, facilitando la automatización y toma de decisiones para un mantenimiento óptimo del invernadero.

## 2. Tecnologías usadas:

HTML5: Estructuración semántica y accesible de la interfaz de usuario.

CSS \ Bootstrap 5: Maquetación responsiva, diseño adaptativo y estilos visuales.

JavaScript: Lógica del lado del cliente, manipulación del DOM, eventos e interacción con sensores.

Amazon Web Services (AWS EC2): Infraestructura en la nube para el alojamiento y despliegue del servidor.

## 3. Estructura del proyecto

```
/var/www/html
│
├── index.html                  # Página de inicio
├── index.js                    # Scripts de la página principal
├── style.css                   # Estilos globales
├── fondo.png                   # Imagen de fondo del sitio
├── logo.jpg                    # Imagen del Hero banner
│
├── datos/                      # Datos en JSON (cargados con fetch)
│   ├──usuarios.json            # Usuarios ficticios de prueba
│   └── invernadero.json        #Simulacion de datos de sensor-planta previamente guardados
├── login/                      # Módulo de autenticación
│   ├── login.html              # Formulario de inicio de sesión (Alpine.js)
│   ├── login.js                # Componente loginApp(): fetch, validación y sesión
│   └── style.css               # Estilo de inicio de sesión
│
├── Registro_Usuario/           # Módulo de registro
│   ├── registro.html           # Formulario para nuevos usuarios
│   ├── registro.js             # Validaciones de registro y contraseñas
│   └── style.css               # Estilo del formulario de registro
│
└── resumen_Invernadero/        # Panel de control
    ├── resumen.html            # Métricas y tablas
    ├── resumen.js              # Reloj, sensores, contadores y lógica de interacción
    └── style.css               # Estilo del panel de control
```

## 4. Descripción de las principales funcionalidades.

Monitoreo Ambiental: Visualización activa de mediciones de temperatura y humedad simuladas con reloj funcional.

Gestión de Cultivos y Sensores: Tabla interactiva para agregar, consultar y eliminar registros de plantas y sensores.

Búsqueda y Filtro de Registros: Búsqueda de plantas en los datos listados.

Validación de Usuarios: Autenticación de inicio de sesión y registro de usuario para correo y contraseña.

## 5. Dirección IP utilizada para el despliegue.

IP Elástica: 34.237.209.6

## 6. Inicio de sesión con Alpine.js

- **Alpine.js** se incorpora por CDN con `<script defer>` en `login/login.html`.
- **Datos:** `datos/usuarios.json` (id, nombre, correo, contrasena, rol). Son datos ficticios de prueba.
- **Flujo:** al iniciar el componente `loginApp()`, `init()` hace `fetch('../datos/usuarios.json')` una sola vez y guarda los usuarios en memoria. Al enviar el formulario se valida el formato del correo y se busca el usuario con `find()` sobre esos datos, sin volver a pedir el JSON.
- **Sesión:** si las credenciales coinciden se guarda `sesion` (id, nombre, correo, rol; sin contraseña) en `localStorage`, se muestra un mensaje de bienvenida y se redirige al resumen.
- **Cómo probar:** correo `camila.demo@gmail.com`, contraseña `Demo1234`. Para probar el error de carga, renombrar temporalmente `usuarios.json` y recargar.
- **Limitaciones:** comprobar credenciales en el navegador no es autenticación real y el JSON es público, por eso solo contiene datos ficticios. `localStorage` guarda la sesión en este navegador, no en el servidor. El registro de usuarios no guarda cuentas nuevas.

## 7. Resumen del Invernadero con Alpine.js

Integración: Alpine.js se incorpora por CDN con <script defer> en el <head> del archivo HTML (resumen.html).

-Datos: Fuente de datos externa situada en datos/invernadero.json con objetos ficticios de prueba (id, sensor, planta, fecha).

-Flujo: Al iniciar el componente gestionInvernadero, la función reservada init() realiza un fetch('../datos/invernadero.json') una sola vez para poblar el arreglo en memoria (plantas). El spinner de carga se gestiona de forma reactiva con la variable cargando.

-Interacciones y Reactividad: Búsqueda: El filtro de texto utiliza x-model="busqueda" sobre un getter (filtrar) que filtra el arreglo local en tiempo real sin reiniciar la lista ni realizar peticiones HTTP adicionales.

-Registro: El formulario @submit.prevent="agregarRegistro" agrega un nuevo objeto con x-model directamente al arreglo local en memoria con la fecha/hora actual, actualizando instantáneamente la tabla y los contadores.

-Eliminación: Los registros se borran por ID único mediante eliminar(id) aplicando un .filter(), lo que mantiene la integridad aunque la lista esté filtrada.

-Cómo probar: Cargar la página resumen.html para verificar la descarga automática de plantas. Filtrar escribiendo "Tomate" u otro término en el buscador, agregar un registro nuevo con el formulario y eliminar una fila existente para observar la actualización reactiva de las tarjetas de totales (plantas.length).

-Limitaciones: Los registros agregados o eliminados viven únicamente en la memoria del estado local de Alpine.js durante la sesión actual; al recargar la página se restaurarán los datos del archivo estático invernadero.json, ya que no existe persistencia en una base de datos ni comunicación de escritura con un servidor backend.
