function loginApp() {
    return {
        // ---------- ESTADO ----------
        correo: '',
        contrasena: '',
        usuarios: [],          // los usuarios cargados desde el JSON (en memoria)
        cargando: true,
        errorCorreo: '',
        errorContrasena: '',
        errorGeneral: '',
        exito: '',

        regexCorreo: /^[^\s@]+@(gmail\.com|outlook\.com|hotmail\.com|live\.com|mail\.udp\.cl)$/i,

        // ---------- CARGA DEL JSON ----------
        init() {
            this.cargarUsuarios();   // alpine ejecuta init() solo, al iniciar el componente
        },

        async cargarUsuarios() {
            this.cargando = true;
            this.errorGeneral = '';
            try {
                const respuesta = await fetch('../datos/usuarios.json');
                if (!respuesta.ok) {
                    throw new Error('HTTP ' + respuesta.status);
                }
                this.usuarios = await respuesta.json();
            } catch (error) {
                this.errorGeneral = 'No se pudo cargar la lista de usuarios. Intenta nuevamente.';
            } finally {
                this.cargando = false;
            }
        },

        // ---------- LOGIN ----------
        async iniciarSesion() {
            // 1) limpiar msjs del intento anterior
            this.errorCorreo = '';
            this.errorContrasena = '';
            this.errorGeneral = '';
            this.exito = '';

            // 2) validar formato
            if (!this.regexCorreo.test(this.correo.trim())) {
                this.errorCorreo = 'Ingresa un correo válido (gmail.com, outlook.com, hotmail.com, live.com, mail.udp.cl).';
                return;
            }
            if (this.contrasena === '') {
                this.errorContrasena = 'Ingresa tu contraseña.';
                return;
            }

            // 3) si la carga inicial fallo, reintentar una vez
            if (this.usuarios.length === 0) {
                await this.cargarUsuarios();
                if (this.usuarios.length === 0) return;
            }

            // 4) buscar al usuario en los datos en memoria
            const correoIngresado = this.correo.trim().toLowerCase();
            const usuario = this.usuarios.find(u =>
                u.correo.toLowerCase() === correoIngresado && u.contrasena === this.contrasena
            );

            if (!usuario) {
                this.errorGeneral = 'Correo o contraseña incorrectos.';
                return;
            }

            // 5) guardar la sesión (sin la contraseña)
            localStorage.setItem('sesion', JSON.stringify({
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }));

            // 6) msj de confirmación y redirección
            this.exito = `¡Bienvenido/a, ${usuario.nombre}! Redirigiendo...`;
            setTimeout(() => {
                window.location.href = '../resumen_Invernadero/resumen.html';
            }, 1500);
        }
    };
}