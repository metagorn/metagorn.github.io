const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');
if (pokemonId) {
    loadPokemonDetails(pokemonId);
}

function loadPokemonDetails(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => {
            displayPokemonDetails(data);
        });
}

function displayPokemonDetails(pokemon) {
    const pokemonDetails = document.getElementById('pokemon-details');
    const types = pokemon.types.map(type => type.type.name).join(', ');
    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');
    const stats = pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join('<br>');

    const typesLinks = pokemon.types.map(type =>
        `<a href="type.html?name=${type.type.name}" class="badge badge-primary mr-1">${type.type.name}</a>`
    ).join('');

    const abilitiesLinks = pokemon.abilities.map(ability =>
        `<a href="ability.html?name=${ability.ability.name}" class="badge badge-secondary mr-1">${ability.ability.name}</a>`
    ).join('');

    const pokemonDetailsContent = `
        <div class="col-md-6 mb-4">
          <div class="card">
            <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
            <div class="card-body">
              <h5 class="card-title text-center">${pokemon.name}</h5>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Profile</h5>
              <p class="card-text"><b>Height:</b> ${pokemon.height}</p>
              <p class="card-text"><b>Weight:</b> ${pokemon.weight}</p>
              <p class="card-text"><b>Types:</b> ${typesLinks}</p>
              <p class="card-text"><b>Abilities:</b> ${abilitiesLinks}</p>
              <h6 class="card-subtitle mt-4 mb-2">Stats</h6>
              <p class="card-text">${stats}</p> 
            </div>
          </div>
        </div>
      `;

    pokemonDetails.innerHTML = pokemonDetailsContent;
}