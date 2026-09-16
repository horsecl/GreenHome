document.addEventListener('DOMContentLoaded', () => {

    function actualizarReloj() {
        const ahora = new Date();
        const horas = String(ahora.getHours()).padStart(2, '0');
        const minutos = String(ahora.getMinutes()).padStart(2, '0');
        const segundos = String(ahora.getSeconds()).padStart(2, '0');

        const elemReloj = document.getElementById('reloj');
        if (elemReloj) {
            elemReloj.textContent = `${horas}:${minutos}:${segundos}`;
        }
    }
    actualizarReloj();
    setInterval(actualizarReloj, 1000); 

    function simularAmbiente() {
        const elemTemp = document.getElementById('temperatura');
        const elemHumedad = document.getElementById('humedad');

        if (elemTemp) {
            const temp = (Math.random() * (26.5 - 21.0) + 21.0).toFixed(1);
            elemTemp.textContent = temp;
        }

        if (elemHumedad) {
            const humedad = Math.floor(Math.random() * (65 - 50 + 1)) + 50;
            elemHumedad.textContent = humedad;
        }
    }
    simularAmbiente();
    setInterval(simularAmbiente, 3000);
    
    const formRegistro = document.getElementById('registro');
    const tablaCuerpo = document.getElementById('tabla-cuerpo');
    const elemTotalPlantas = document.getElementById('total-plantas');
    const elemTotalSensores = document.getElementById('sensores');

    let contadorID = 1;

    if (formRegistro && tablaCuerpo) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault();

            const sensorVal = document.getElementById('inputsensor').value.trim();
            const plantaVal = document.getElementById('inputplanta').value.trim();

            const ahora = new Date();
            const fechaHora = `${ahora.getFullYear()}-${String(ahora.getMonth()+1).padStart(2,'0')}-${String(ahora.getDate()).padStart(2,'0')} ${ahora.toLocaleTimeString()}`;

            const nuevaFila = document.createElement('tr');
            nuevaFila.innerHTML = `
                <td>${contadorID}</td>
                <td>${sensorVal}</td>
                <td>${plantaVal}</td>
                <td>${fechaHora}</td>
                <td class="text-end">
                    <button class="btn btn-outline-danger btn-sm btn-eliminar">Eliminar</button>
                </td>
            `;

            tablaCuerpo.appendChild(nuevaFila);

            contadorID++;
            if (elemTotalPlantas) {
                elemTotalPlantas.textContent = parseInt(elemTotalPlantas.textContent) + 1;
            }
            if (elemTotalSensores) {
                elemTotalSensores.textContent = parseInt(elemTotalSensores.textContent) + 1;
            }

            formRegistro.reset();
        });

        tablaCuerpo.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-eliminar')) {
                const fila = e.target.closest('tr');
                fila.remove();

                if (elemTotalPlantas && parseInt(elemTotalPlantas.textContent) > 0) {
                    elemTotalPlantas.textContent = parseInt(elemTotalPlantas.textContent) - 1;
                }
                if (elemTotalSensores && parseInt(elemTotalSensores.textContent) > 0) {
                    elemTotalSensores.textContent = parseInt(elemTotalSensores.textContent) - 1;
                }
            }
        });
    }

    const inputBusqueda = document.getElementById('busqueda');

    if (inputBusqueda && tablaCuerpo) {
        inputBusqueda.addEventListener('input', (e) => {
            const termino = e.target.value.toLowerCase().trim();
            const filas = tablaCuerpo.getElementsByTagName('tr');

            Array.from(filas).forEach((fila) => {
                const textoFila = fila.textContent.toLowerCase();

                if (textoFila.includes(termino)) {
                    fila.style.display = '';
                } else {
                    fila.style.display = 'none';
                }
            });
        });
    }
});

