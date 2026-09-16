document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.querySelector('.iniciodesesion');
    const inputCorreo = document.getElementById('correo');
    const inputContrasena = document.getElementById('contrasena');
    const errorCorreo = document.getElementById('errorCorreo');

    const regexCorreo = /^[^\s@]+@(gmail\.com|outlook\.com|hotmail\.com|live\.com|mail\.udp\.cl)$/i;

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        // Reinicia el mensaje de error en cada intento
        errorCorreo.classList.add('d-none');
        inputCorreo.classList.remove('is-invalid');

        if (!regexCorreo.test(inputCorreo.value.trim())) {
            errorCorreo.textContent = 'Ingresa un correo válido (gmail.com, outlook.com, hotmail.com, live.com, mail.udp.cl).';
            errorCorreo.classList.remove('d-none');
            inputCorreo.classList.add('is-invalid');
            return; // se detiene acá, no navega a ningún lado
        }

        const correo = inputCorreo.value;
        const contrasena = inputContrasena.value;

        window.location.href = '../resumen_Invernadero/resumen.html';
    });
});