import { colors, pokedexURL } from "./constants.js";
import { Pokedex } from "./Pokedex.js";

const pokeContainer = document.querySelector(".poke-container");
const searchInput = document.querySelector("#search-input");
const pokedex = new Pokedex(pokedexURL);

window.addEventListener('load', loadNextPageAndRender);
document.querySelector("#load-button").addEventListener("click", loadNextPageAndRender);

// TODO: Debounce mechanism can be added.
searchInput.addEventListener("input", () => {
  pokeContainer.innerHTML = "";
  pokedex.findPokemonsByName(searchInput.value).forEach(createPokemonBox);
});

async function loadNextPageAndRender() {
  const pokemons = await pokedex.getNextPage();
  pokemons.forEach(createPokemonBox);
}

function createPokemonBox(pokemon) {
  const { name, weight } = pokemon;
  const id = pokemon.id.toString().padStart(3, "0");
  const type = pokemon.types[0].type.name

  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("poke-box");
  pokemonEl.style.backgroundColor = colors[type];
  pokemonEl.innerHTML = buildHtmlOfPokemon(id, name, weight, type)
  pokeContainer.appendChild(pokemonEl);
}

function buildHtmlOfPokemon(id, name, weight, type) {
  return `
  <img
    class="poke-img"
    src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png"
    alt="${name} Pokemon"
  />
  <h3 class="poke-name">${name}</h3>
  <p class="poke-id"># ${id}</p>
  <p class="poke-weight">${weight} kg</p>
  <p class="poke-type">Type : ${type}</p>
  `
}
