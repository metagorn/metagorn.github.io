const pokemonList = document.getElementById('pokemon-list');
const loadMoreBtn = document.getElementById('load-more-btn');
let offset = 0;
const limit = 10;

function loadPokemon(offset, limit) {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then(response => response.json())
        .then(data => {
            displayPokemon(data.results);
        });
}

function displayPokemon(pokemon) {
    pokemon.forEach(p => {
        fetch(p.url)
            .then(response => response.json())
            .then(data => {
                const pokemonCard = `
            <div class="col-md-4 col-sm-6 mb-4">
              <a href="pokemon.html?id=${data.id}" class="text-decoration-none"> 
              <div class="card pokemon-card" data-pokemon-id="${data.id}">
                <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
                <div class="card-body">
                  <h5 class="card-title">${data.name}</h5>
                </div>
              </div>
              </a>
            </div>
          `;
                pokemonList.innerHTML += pokemonCard;
            });
    });
}

loadPokemon(offset, limit);

loadMoreBtn.addEventListener('click', () => {
    offset += limit;
    loadPokemon(offset, limit);
});