const formFavoritos = document.getElementById('form-favoritos');
const ulFavoritos = document.getElementById('ul-favoritos');

const selectContainer = document.querySelector('.custom-select-container');
const selectTrigger = document.getElementById('custom-select-trigger');
const optionsList = document.getElementById('custom-options-list');

let valorSeleccionado = "";

let catalogoGeneral = JSON.parse(localStorage.getItem('misPeliculas')) || [
    "Erreway: 4 Caminos", "Son Como Niños", "Zootopia", "Cars"
];

let favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [
    "Zootopia", "Cars"
];

function cargarComboPeliculas() {
    optionsList.innerHTML = "";
    
    const liDefault = document.createElement('li');
    liDefault.textContent = "-- Elegí una película --";
    liDefault.classList.add('option-disabled');
    optionsList.appendChild(liDefault);
    
    catalogoGeneral.forEach(peli => {
        const li = document.createElement('li');
        li.textContent = peli;
        li.setAttribute('data-value', peli);
        optionsList.appendChild(li);
    });
}

selectTrigger.addEventListener('click', function(e) {
    e.stopPropagation();
    selectContainer.classList.toggle('open');
    optionsList.classList.toggle('custom-options-hidden');
});

optionsList.addEventListener('click', function(e) {
    const targetLi = e.target;
    
    if (targetLi.tagName === 'LI' && !targetLi.classList.contains('option-disabled')) {
        valorSeleccionado = targetLi.getAttribute('data-value');
        selectTrigger.textContent = valorSeleccionado;
        
        selectContainer.classList.remove('open');
        optionsList.classList.add('custom-options-hidden');
    }
});

document.addEventListener('click', function() {
    selectContainer.classList.remove('open');
    optionsList.classList.add('custom-options-hidden');
});

function renderizarFavoritos() {
    ulFavoritos.innerHTML = "";

    if (favoritos.length === 0) {
        ulFavoritos.innerHTML = `<li style="color: #7f8c8d; background: none; box-shadow: none; justify-content: center;">No tenés películas en tus favoritos todavía.</li>`;
        return;
    }

    favoritos.forEach((peli, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span style="font-weight: 500; color: #2c3e50;">${peli}</span>
            <button class="btn-borrar" data-index="${index}">Quitar de Favoritos</button>
        `;
        ulFavoritos.appendChild(li);
    });
}

formFavoritos.addEventListener('submit', function(e) {
    e.preventDefault();

    if (valorSeleccionado) {
        if (favoritos.includes(valorSeleccionado)) {
            alert("¡Esta película ya está en tus favoritos!");
        } else {
            favoritos.push(valorSeleccionado);
            localStorage.setItem('misFavoritos', JSON.stringify(favoritos));
            renderizarFavoritos();
            
            valorSeleccionado = "";
            selectTrigger.textContent = "-- Elegí una película --";
        }
    } else {
        alert("Por favor, seleccioná una película primero.");
    }
});

ulFavoritos.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-borrar')) {
        const index = e.target.getAttribute('data-index');
        favoritos.splice(index, 1);
        localStorage.setItem('misFavoritos', JSON.stringify(favoritos));
        renderizarFavoritos();
    }
});

cargarComboPeliculas();
renderizarFavoritos();
