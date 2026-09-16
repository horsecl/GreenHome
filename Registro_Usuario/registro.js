document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.querySelector('.formulario_registro');
    const inputNombre = document.getElementById('nombre');
    const inputCorreo = document.getElementById('correo');
    const inputContrasena = document.getElementById('contrasena');
    const inputConfirmar = document.getElementById('confirmarContrasena');
    const errorCorreo = document.getElementById('errorCorreo');
    const errorContrasena = document.getElementById('errorContrasena');

    // Dominios de correo permitidos (correos "reales", no temporales)
    const regexCorreo = /^[^\s@]+@(gmail\.com|outlook\.com|hotmail\.com|live\.com|mail\.udp\.cl)$/i;

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        let esValido = true;

        // Reinicia los mensajes de error en cada intento
        errorCorreo.classList.add('d-none');
        errorContrasena.classList.add('d-none');
        inputCorreo.classList.remove('is-invalid');
        inputContrasena.classList.remove('is-invalid');
        inputConfirmar.classList.remove('is-invalid');

        // Validación del correo
        if (!regexCorreo.test(inputCorreo.value.trim())) {
            errorCorreo.textContent = 'Usa un correo de un dominio válido (gmail.com, outlook.com, hotmail.com, live.com, mail.udp.cl).';
            errorCorreo.classList.remove('d-none');
            inputCorreo.classList.add('is-invalid');
            esValido = false;
        }

        // Validación de que las contraseñas coincidan
        if (inputContrasena.value.length < 8) {
            errorContrasena.textContent = 'La contraseña debe tener al menos 8 caracteres.';
            errorContrasena.classList.remove('d-none');
            inputContrasena.classList.add('is-invalid');
            esValido = false;
        } else if (inputContrasena.value !== inputConfirmar.value) {
            errorContrasena.textContent = 'Las contraseñas no coinciden.';
            errorContrasena.classList.remove('d-none');
            inputConfirmar.classList.add('is-invalid');
            esValido = false;
        }

        if (!esValido) {
            return; // Se detiene acá, no navega a ningún lado
        }

        // Si todo pasó las validaciones, simulamos el registro exitoso
        window.location.href = '../login/login.html';
    });
});
