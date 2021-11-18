const pokeSearchForm = document.querySelector("#poke-search-form");
const pokeContainer = document.querySelector(".poke-container");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector(".search-btn");
const pokeCount = document.querySelector(".poke-count");
const prevBtn = document.querySelector("#prev-button");
const nextBtn = document.querySelector("#next-button");

let page = 1;

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

const loadPokedex = async (pageNumber = 1) => {
  const pokePerPage = pokeCount.value;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${pokePerPage}&offset=${
    pokePerPage * (pageNumber - 1)
  }`;
  const response = await fetch(url);
  const { results, next, previous } = await response.json();

  return {
    results,
    next,
    previous,
  };
};

const loadPokemons = async (pageNumber) => {
  const { results } = await loadPokedex(pageNumber);

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

prevBtn.addEventListener("click", () => {
  if (page > 1) {
    clearAllPokemons();

    page = page - 1; // Decrement page

    loadPokemons(page); // Load previous page
  }
});

nextBtn.addEventListener("click", () => {
  clearAllPokemons();

  page = page + 1; // Increment page

  loadPokemons(page); // Load next page
});

loadPokemons(page);
