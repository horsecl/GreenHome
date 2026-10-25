document.addEventListener('alpine:init', () => {
    Alpine.data('gestionInvernadero', () => ({
        plantas: [],
        busqueda: '',
        nuevoSensor: '',
        nuevaPlanta: '',
        mostrarAyuda: false,
        cargando: true,
        error: false,
            
        async init() {
            const respuesta = await fetch('../datos/invernadero.json');
            this.plantas = await respuesta.json();

            try {
                const respuesta = await fetch('../datos/invernadero.json');
               
                if (!respuesta.ok) {
                    throw new Error('No se pudo obtener el archivo JSON');
                }

                this.plantas = await respuesta.json();
            } catch (e) {
                console.error("Error al cargar invernadero.json:", e);
                this.error = true; 
            } finally {
                this.cargando = false;
            }
        },

        get filtrar() {
            if(this.busqueda.trim() === ''){
            return this.plantas;
        }
            const cosa = this.busqueda.toLowerCase();
            return this.plantas.filter(item => item.planta.toLowerCase().includes(cosa));
            },
            
        agregarRegistro() {
            if (!this.nuevoSensor || !this.nuevaPlanta) return;

            const ahora = new Date();
            const fechaHora = `${ahora.getFullYear()}-${String(ahora.getMonth()+1).padStart(2,'0')}-${String(ahora.getDate()).padStart(2,'0')} ${ahora.toLocaleTimeString()}`;

            this.plantas.push({
                id: Date.now(),
                sensor: this.nuevoSensor,
                planta: this.nuevaPlanta,
                fecha: fechaHora
            });
                this.nuevoSensor = '';
                this.nuevaPlanta = '';
            },
            eliminar(id) {
                this.plantas = this.plantas.filter(item => item.id !== id);
            }
        }));  
     }); 
       
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

    document.addEventListener('DOMContentLoaded', () => {
        actualizarReloj();
        simularAmbiente();
        setInterval(actualizarReloj, 1000);
        setInterval(simularAmbiente, 5000);
    }); 
