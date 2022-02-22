import { logic as Shop } from "./logic.js";

let shop;
shop = new Shop();

let currentPage = 1; //TODOCommer behöva nån localstorage här kanske om man inte alltid vill att de ska börja på 1 ved refresh?

document.getElementById("prevPage").addEventListener("click", prevPage);
document.getElementById("nextPage").addEventListener("click", nextPage);

function prevPage() {
  if (currentPage == 1) {
    currentPage = 89;
    updatePage(currentPage);
    currentPageNumber();
  } else {
    currentPage -= 1;
    updatePage(currentPage);
    currentPageNumber();
  }
}

function nextPage() {
  if (currentPage == 89) {
    currentPage = 1;
    updatePage(currentPage);
    currentPageNumber();
  } else {
    currentPage += 1;
    updatePage(currentPage);
    currentPageNumber();
  }
}

currentPageNumber();

function currentPageNumber() {
  document.getElementById("currentPage").innerHTML = "Page: " + currentPage;
}

function HandleReadMoreClick(e) {
  const clickedPokemonID = e.target.id;
  console.log(clickedPokemonID);
}

/**
 *
 * @description emptys all product-container divs
 */
function emptyShop() {
  document.getElementById("pokemonShop").innerHTML = "";
}

function updatePage(pageNr) {
  let pokemonDiv = "";
  let name = "";
  let image = "";
  let type = "";
  let weight = "";
  let height = "";
  let price = "";
  let id = "";
  let base_experience = "";
  let abilities = "";
  let flavorText = "";

  //TODO jag förstår inte rikigt vad function gör här? behövs den ens?!
  shop.getPokemons(pageNr).then(function (pokemons) {
    emptyShop();
    for (let pokemon of pokemons) {
      name = pokemon.name;
      price = (pokemon.height * pokemon.weight) / 10;
      image = pokemon.sprites;
      type = pokemon.type;
      weight = pokemon.weight;
      height = pokemon.height * 10;
      base_experience = pokemon.base_experience;
      id = pokemon.id;
      abilities = pokemon.abilities;
      flavorText = pokemon.flavorText;

      pokemonDiv = `
         
            <div class="product-container">
            <h3 class="name">${name}</h3>
            <img class="sprite" src="${image}">
            <div class="type">Type: ${type}</div>            
            <div class="price">Price: ${price} :-</div>
            <button class="button add-to-shart">Buy</button>
            
            
            <!-- Button trigger modal -->
            <button
              type="button"
              class="button read-more"
              id ="${id}"
              data-bs-toggle="modal"
              data-bs-target="#readMoreModal${id}"
            >
              Read more
            </button>

            <!-- Modal -->
              <div
                class="modal fade"
                id="readMoreModal${id}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h3 class="modal-title name" id="exampleModalLabel">${name}</h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <img class="sprite" src="${image}">                    
                      <div>Type: ${type}</div                    
                      <div>Start XP: ${base_experience}</div>
                      <div class="measurement">
                        <div class="weight">Weight: ${weight} g</div>
                        <div class="height">Height: ${height} cm</div>
                      </div>
                      <div class="type">Abilities: ${abilities}</div>
                      <br>
                      <p class="type">Info: ${flavorText}</p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="button"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" class="button">Buy</button>
                    </div>
                  </div>
                </div>
              </div>
            `;

      document
        .getElementById("pokemonShop")
        .insertAdjacentHTML("beforeend", pokemonDiv);
    }
    document
      .querySelectorAll(".read-more")
      .forEach((btn) => btn.addEventListener("click", HandleReadMoreClick));
  });
}

updatePage(currentPage);

document.getElementById("prevPage").addEventListener("click", prevPage);
document.getElementById("nextPage").addEventListener("click", nextPage);
