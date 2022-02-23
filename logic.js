export class logic {
  /**
   * @description Async function
   * @param {*} id
   * @returns pokemon object
   */

  flavorTexts = [];

  fetchPokemon = async (id) => {
    /* const pokemon = await fetch(url).then((response) => response.json());
    const species = await fetch(pokemon.species.url).then((response) =>
      response.json()
    ); */

    const url = new URL("https://pokeapi.co");
    url.pathname = `/api/v2/pokemon/${id}`;

    let pokemon;
    let species;

    let response = await fetch(url);
    pokemon = await response.json(); //HÄR felet måste hanteras!
    response = await fetch(pokemon.species.url);
    species = await response.json();

    //kväver felet i fetch. felet kommer inte ut. måste awaita fetch och sen response.
    // vill man att det ska bubbla upp så måste man använa await/asynch
    //.then funkar rikigt på samma sätt. Kan inte catch hantera saker som skett bakåt i tiden. kan ha en eventlistern som presenterar delet, men kan inte gör anått åt det. nackdel med fetch?
    species.flavor_text_entries.forEach((entry) => {
      if (entry.language.name == "en") {
        this.flavorTexts.push(entry.flavor_text);
      }
    });

    const pokemonObj = {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      sprites: pokemon.sprites.other["official-artwork"].front_default,
      type: pokemon.types.map((mapArr) => mapArr.type.name).join(" / "),
      abilities: pokemon.abilities
        .map((mapArr) => mapArr.ability.name)
        .join(", "),
      base_experience: pokemon.base_experience,
      flavorText: this.flavorTexts[0],
    };
    return pokemonObj;
  };

  /**
   * @description Async function
   * @param {*} pageNr
   * @returns array of 12 pokemonObj on that page.
   */

  getPokemons = async (pageNr) => {
    5;
    const promises = [];
    pageNr = pageNr * 12;
    for (let i = pageNr - 1; i <= pageNr; i++) {
      const pokemon = this.fetchPokemon(i);
      promises.push(pokemon);

      const preloadPokemonsInBrowserChacheMemory = this.fetchPokemon(i + 12);
    }

    const resluts = await Promise.allSettled(promises);
    return resluts
      .filter((promises) => promises.status === "fulfilled")
      .map((promises) => promises.value);
  };
}
