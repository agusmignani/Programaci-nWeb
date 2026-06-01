const formBuscar = document.getElementById('form-busqueda') || document.querySelector('form');
const inputBuscar = document.getElementById('input-busqueda') || document.querySelector('input[type="text"]');
const ulResultados = document.getElementById('ul-resultados');

let catalogoPeliculas = JSON.parse(localStorage.getItem('misPeliculas')) || [
    "Erreway: 4 Caminos", "Son Como Niños", "Zootopia", "Cars"
];

function renderizarResultados(listaFiltrada) {
    ulResultados.innerHTML = "";

    if (listaFiltrada.length === 0) {
        ulResultados.innerHTML = `<li style="color: #7f8c8d; justify-content: center; border: none; padding: 20px 0;">No se encontraron películas.</li>`;
        return;
    }

    listaFiltrada.forEach(pelicula => {
        const li = document.createElement('li');
        
        li.innerHTML = `
            <span>🎬 ${pelicula}</span>
            <a href="detalle.html?pelicula=${encodeURIComponent(pelicula)}" class="btn-detalles">Ver detalles</a>
        `;
        ulResultados.appendChild(li);
    });
}

if (formBuscar) {
    formBuscar.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const textoBusqueda = inputBuscar.value.trim().toLowerCase();
        
        const peliculasFiltradas = catalogoPeliculas.filter(pelicula => 
            pelicula.toLowerCase().includes(textoBusqueda)
        );
        
        renderizarResultados(peliculasFiltradas);
    });
}

renderizarResultados(catalogoPeliculas);
