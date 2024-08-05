const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAtk = document.getElementById("special-attack");
const specialDef = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const spriteContainer = document.getElementById("sprite-container");

// fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
//   .then((res) => res.json())
//   .then((data) => data)
//   .catch((err) => err)

const fetchData = async () => {
  try {
    const pokemonNameorId = searchInput.value.toLowerCase();
    const res = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameorId}`
    );
    const data = await res.json();
    setPokemonInfo(data);
  } catch (err) {
    alert("Pokémon not found");
    console.log(err);
  }
};

const setPokemonInfo = (data) => {
  const { name, id, weight, height, types, sprites, stats } = data;
  pokemonName.textContent = `${name[0].toUpperCase() + name.slice(1)}`;
  pokemonId.textContent = `#${id}`;
  pokemonWeight.textContent = `Weight: ${weight}`;
  pokemonHeight.textContent = `Height: ${height}`;
  spriteContainer.innerHTML = `<img class="rounded" id="sprite" src="${sprites.front_default}" alt="${name}">`;
  pokemonTypes.innerHTML = types
    .map(
      (obj) =>
        `<span>${
          obj.type.name[0].toUpperCase() + obj.type.name.slice(1)
        }</span>`
    )
    .join(" ");

  hp.textContent = `${stats[0].base_stat}`;
  attack.textContent = `${stats[1].base_stat}`;
  defense.textContent = `${stats[2].base_stat}`;
  specialAtk.textContent = `${stats[3].base_stat}`;
  specialDef.textContent = `${stats[4].base_stat}`;
  speed.textContent = `${stats[5].base_stat}`;
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetchData();
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
