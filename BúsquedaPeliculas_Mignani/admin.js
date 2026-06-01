const formAdmin = document.getElementById('form-admin');
const inputPeli = document.getElementById('input-peli');
const indexPeli = document.getElementById('index-peli');
const btnFormAdmin = document.getElementById('btn-form-admin');
const tituloFormAdmin = document.getElementById('titulo-form-admin');
const ulCatalogo = document.getElementById('ul-catalogo');

let peliculas = JSON.parse(localStorage.getItem('misPeliculas')) || [
    "Erreway: 4 Caminos", "Son Como Niños", "Zootopia", "Cars"
];

function renderizarCatalogo() {
    ulCatalogo.innerHTML = "";

    if (peliculas.length === 0) {
        ulCatalogo.innerHTML = `<li style="color: #7f8c8d; justify-content: center; border: none;">El catálogo está vacío.</li>`;
        return;
    }

    peliculas.forEach((peli, index) => {
        const li = document.createElement('li');
        
        li.innerHTML = `
            <span style="color: #2c3e50; font-weight: 500;">🎬 ${peli}</span>
            <div class="acciones-admin">
                <button class="btn-editar" data-index="${index}">Editar</button>
                <button class="btn-borrar" data-index="${index}">Borrar</button>
            </div>
        `;
        ulCatalogo.appendChild(li);
    });
}

formAdmin.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombrePeli = inputPeli.value.trim();
    const idEdicion = indexPeli.value;

    if (nombrePeli === "") return;

    if (idEdicion === "") {
        peliculas.push(nombrePeli);
    } else {
        peliculas[parseInt(idEdicion)] = nombrePeli;
        
        indexPeli.value = "";
        tituloFormAdmin.textContent = "Agregar Película";
        btnFormAdmin.textContent = "Agregar al Catálogo";
    }

    localStorage.setItem('misPeliculas', JSON.stringify(peliculas));
    renderizarCatalogo();
    formAdmin.reset();
});

ulCatalogo.addEventListener('click', function(e) {
    const index = e.target.getAttribute('data-index');

    if (e.target.classList.contains('btn-borrar')) {
        peliculas.splice(index, 1);
        localStorage.setItem('misPeliculas', JSON.stringify(peliculas));
        renderizarCatalogo();
        formAdmin.reset();
        
        indexPeli.value = "";
        tituloFormAdmin.textContent = "Agregar Película";
        btnFormAdmin.textContent = "Agregar al Catálogo";
    }

    if (e.target.classList.contains('btn-editar')) {
        inputPeli.value = peliculas[index];
        indexPeli.value = index;
        
        tituloFormAdmin.textContent = "Modificar Película";
        btnFormAdmin.textContent = "Guardar Cambios";
        inputPeli.focus();
    }
});

renderizarCatalogo();
