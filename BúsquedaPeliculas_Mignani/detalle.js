const txtTitulo = document.getElementById('detalle-titulo');
const imgPoster = document.getElementById('detalle-imagen');
const txtDescripcion = document.getElementById('detalle-descripcion');

const formReseña = document.getElementById('form-reseña');
const inputEdad = document.getElementById('reseña-edad');
const selectPuntaje = document.getElementById('reseña-puntaje');
const inputTexto = document.getElementById('reseña-texto');
const indexReseña = document.getElementById('index-reseña');
const btnFormReseña = document.getElementById('btn-form-reseña');
const tituloFormReseña = document.getElementById('titulo-form-reseña');
const ulReseñas = document.getElementById('ul-reseñas-interactivas');

const infoFijaPeliculas = {
    "Erreway: 4 Caminos": { 
        desc: "Cuatro jóvenes músicos recorren las rutas argentinas en busca de sus sueños, enfrentando desafíos que cambiarán sus vidas para siempre.", 
        img: "imagenes/erreway.jpg" 
    },
    "Son Como Niños": { 
        desc: "Cinco amigos de la infancia se reencuentran años después para pasar un fin de semana juntos, descubriendo que madurar no es tan fácil como parece.", 
        img: "imagenes/son-como-ninos.jpg" 
    },
    "Zootopia": { 
        desc: "En una moderna metrópolis de mamíferos, una coneja policía y un zorro estafador deben trabajar juntos para resolver un misterioso caso.", 
        img: "imagenes/zootopia.jpg" 
    },
    "Cars": { 
        desc: "El aspirante a campeón de carreras Rayo McQueen se pierde en el olvidado pueblo de Radiador Springs, donde descubre el verdadero significado de la amistad.", 
        img: "imagenes/cars.jpg" 
    }
};

const urlParams = new URLSearchParams(window.location.search);
const peliculaSeleccionada = urlParams.get('pelicula');

if (infoFijaPeliculas[peliculaSeleccionada]) {
    const datos = infoFijaPeliculas[peliculaSeleccionada];
    if (txtTitulo) txtTitulo.textContent = peliculaSeleccionada;
    if (txtDescripcion) txtDescripcion.textContent = datos.desc;
    if (imgPoster) {
        imgPoster.src = datos.img;
        imgPoster.alt = peliculaSeleccionada;
        
        imgPoster.onerror = function() {
            this.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400";
        };
    }
} else {
    if (txtTitulo) txtTitulo.textContent = "Película no encontrada";
    if (txtDescripcion) txtDescripcion.textContent = "La película seleccionada no existe en nuestra base de datos.";
    if (imgPoster) imgPoster.style.display = "none";
}

let listaReseñas = JSON.parse(localStorage.getItem(`reseñas_${peliculaSeleccionada}`)) || [];

function renderizarReseñas() {
    if (!ulReseñas) return;
    ulReseñas.innerHTML = "";

    if (listaReseñas.length === 0) {
        ulReseñas.innerHTML = `<li style="color: #7f8c8d; justify-content: center; border: none; padding: 20px 0;">No hay reseñas todavía. ¡Sé el primero!</li>`;
        return;
    }

    listaReseñas.forEach((res, index) => {
        const li = document.createElement('li');
        // Le agregamos estilos específicos acá para que no herede el "nowrap" que corta el texto
        li.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 4px; width: 100%;">
                <span style="font-weight: 600; color: #2867BF; white-space: normal; overflow: visible; text-overflow: clip; max-width: 100%;">
                    Puntaje: ${res.puntaje || res.calificacion || "No asignado"} (+${res.edad || 0} años)
                </span>
                <p style="color: #555; margin: 0; font-size: 0.9rem; word-break: break-word;">${res.texto}</p>
            </div>
            <div class="acciones-reseña" style="margin-left: 10px;">
                <button class="btn-editar-res" data-index="${index}">Editar</button>
                <button class="btn-borrar-res" data-index="${index}">Borrar</button>
            </div>
        `;
        ulReseñas.appendChild(li);
    });
}

if (formReseña) {
    formReseña.addEventListener('submit', function(e) {
        e.preventDefault();

        const edad = inputEdad.value.trim();
        const puntaje = selectPuntaje.value;
        const texto = inputTexto.value.trim();
        const index = indexReseña.value;

        const nuevaReseña = { 
            edad: edad, 
            puntaje: puntaje, 
            calificacion: puntaje,
            texto: texto 
        };

        if (index === "") {
            listaReseñas.push(nuevaReseña);
        } else {
            listaReseñas[index] = nuevaReseña;
        }

        localStorage.setItem(`reseñas_${peliculaSeleccionada}`, JSON.stringify(listaReseñas));
        
        formReseña.reset();
        indexReseña.value = "";
        if (tituloFormReseña) tituloFormReseña.textContent = "Dejá tu Reseña";
        if (btnFormReseña) btnFormReseña.textContent = "Publicar Reseña";
        
        renderizarReseñas();
    });
}

if (ulReseñas) {
    ulReseñas.addEventListener('click', function(e) {
        const index = e.target.getAttribute('data-index');
        if (index === null) return;

        if (e.target.classList.contains('btn-borrar-res')) {
            listaReseñas.splice(index, 1);
            localStorage.setItem(`reseñas_${peliculaSeleccionada}`, JSON.stringify(listaReseñas));
            
            if (formReseña) formReseña.reset();
            if (indexReseña) indexReseña.value = "";
            if (tituloFormReseña) tituloFormReseña.textContent = "Dejá tu Reseña";
            if (btnFormReseña) btnFormReseña.textContent = "Publicar Reseña";
            
            renderizarReseñas();
        }

        if (e.target.classList.contains('btn-editar-res')) {
            const resAEditar = listaReseñas[index];
            
            if (inputEdad) inputEdad.value = resAEditar.edad;
            if (selectPuntaje) selectPuntaje.value = resAEditar.puntaje || resAEditar.calificacion || "";
            if (inputTexto) inputTexto.value = resAEditar.texto;
            if (indexReseña) indexReseña.value = index;
            
            if (tituloFormReseña) tituloFormReseña.textContent = "Modificar tu Reseña";
            if (btnFormReseña) btnFormReseña.textContent = "Guardar Cambios";
            if (inputEdad) inputEdad.focus();
        }
    });
}

renderizarReseñas();
