const pokeSearchForm = document.querySelector("#poke-search-form");
const pokeContainer = document.querySelector(".poke-container");
const toTopBtn = document.querySelector(".back-to-top-button");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector(".search-btn");
const loadBtn = document.querySelector("#load-button");

const pokePerPage = 10;
const pokedexURL = `https://pokeapi.co/api/v2/pokemon?limit=${pokePerPage}&offset=0`;
let nextPageURL;

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#d6b3ff",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
  ice: "#e0f5ff ",
};

const loadPokedex = async (loadNext = false) => {
  const url = loadNext ? nextPageURL : pokedexURL;
  const response = await fetch(url);
  const { results, next } = await response.json();

  nextPageURL = next;

  return {
    results,
  };
};

const loadPokemons = async (loadNext) => {
  const { results } = await loadPokedex(loadNext);

  for (const pokemon of results) {
    await getPokemon(pokemon);
  }
};

const getPokemon = async (pokemon) => {
  const res = await fetch(pokemon.url);
  const data = await res.json();

  createPokemonBox(data);
};

const createPokemonBox = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("poke-box");

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");
  const type = pokemon.types[0].type.name;
  const weight = pokemon.weight;
  const color = colors[type];
  pokemonEl.style.backgroundColor = color;

  const pokemonHtml = `
  <img
    class="poke-img"
    src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png"
    alt=""
  />
  <h3 class="poke-name">${name}</h3>
  <p class="poke-id"># ${id}</p>
  <p class="poke-weight">${weight} kg</p>
  <p class="poke-type">Type : ${type}</p>
  `;

  pokemonEl.innerHTML = pokemonHtml;
  pokeContainer.appendChild(pokemonEl);
};

const clearAllPokemons = () => {
  pokeContainer.innerHTML = "";
};

pokeSearchForm.addEventListener("submit", (e) => e.preventDefault());

// TODO: Debounce mechanism can be added.
searchInput.addEventListener("input", function () {
  let search = searchInput.value;
  const pokeName = document.querySelectorAll(".poke-name");

  console.log(search);
  pokeName.forEach((poke) => {
    poke.parentElement.style.display = "block";
    if (!poke.innerHTML.toLowerCase().includes(search.toLowerCase())) {
      poke.parentElement.style.display = "none";
    }
  });
});

loadBtn.addEventListener("click", () => {
  loadPokemons(true); // Load next pokemons
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) toTopBtn.classList.add("show");
  else toTopBtn.classList.remove("show");
});

toTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

loadPokemons();
