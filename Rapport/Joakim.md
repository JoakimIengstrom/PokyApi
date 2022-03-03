
# Grupprojekt - frontend app

Ni ska jobba i par och det vanliga gäller när det kommer till jämt committande. Ni kan dela upp arbetet eller parkoda hur ni vill. **Båda måsta ha egna commits där ni gör web-api anrop.**

Användaren ska kunna trigga fler web-api anrop än de som sker i början för att bygga upp hemsidan första gången. Sidan ska inte behöva laddas om och man ska heller inte behöva navigera till en ny sida. Det viktiga är att ni använder fetch + DOM manipulering för att hålla sidan uppdaterad.

Ni måste båda koda var sitt sådant här moment för att fylla **kursmål 6**.

Den ena kan göra en [Collapse](https://getbootstrap.com/docs/5.1/components/collapse/) eller [Modal](https://getbootstrap.com/docs/5.0/components/modal/) som visar mer info om ett item när man klickar på `read more`/`read comments`.

Den andra kan göra en [Pagination](https://getbootstrap.com/docs/5.1/components/pagination/) eller [Navigation](https://getbootstrap.com/docs/5.0/components/navs-tabs/#vertical) där man bara ser en viss mängd items åt gången och användaren kan bläddra fram och tillbaka.

Det är ok att komma på något annat att göra med, men det måste innefatta användarevent som leder till web-api anrop.

### Pokemon webbshop

Denna hemsida bygger på [PokéAPI](https://pokeapi.co/), all info om pokemon hämtas härifrån. Tanken är att skapa en webbshop där man kan browsa pokemon via en pagination. Nedan är ett par wireframe exempel:

## Allmänt

### G krav

Program:
- web-api:n används för att fylla ut hemsidan. Ingen hårdkodad data
- events används för trigga ytterligare web-api anrop vid behov

Rapport:
- ta upp ett exempel där du använder `fetch` och gå igenom tidsförloppet. Vad händer från att du kallar på metoden till att du får ut ett JS objekt som svar?

- reflektera över, och analysera de lösningar du gjort i projektet

### Reflektioner
___
Vi samlade alla eventListeners för att det skall synas direkt när du kollar koden, gör det överskådligt. Sedan börjar det med att ladda senaste sidan från LocalStorage.


```javascript

    let currentPage = shop.loadPageNr();

document.getElementById("prevPage").addEventListener("click", prevPage);
document.getElementById("nextPage").addEventListener("click", nextPage);
document.getElementById("choosePage").addEventListener("keyup", jumpToPage);

```

Till en början så gjordes en ganska enkel pagination där vi med hjälp av hämtar en ny URL med en offset på 12 pokemons åt gången. Vi skickar in ett sidnummer. Märkte dock snart att det gick att skriva in fel saker, men att lägga till curretPage <= 1 samt >= 94 så löste detta på ett bra sätt.


```javascript

function prevPage() {
  if (currentPage <= 1) {
    currentPage = 94;
    updatePokemonsOnPage(shop.lastpageUrl);
  } else {
    currentPage--;
    updatePokemonsOnPage(shop.previousPageUrl);
  }
  updatePageNummer();
}

function nextPage() {
  if (currentPage >= 94) {
    currentPage = 1;
    updatePokemonsOnPage(shop.pageOneUrl);
  } else {
    currentPage++;
    updatePokemonsOnPage(shop.nextPageUrl);
  }
  updatePageNummer();
}
```

I jumpToPage så har jag valt att använda en input som triggar på när du tycker enter. Denna är är skapad för att du inte skall behöva bläddra genom all sidor. För att få denna att funka så skapade vi getJumpToPageURL i Logic. Detta är för att då hoppa. Sedan använder vi LocalStorage för att spara ner sidnumret i updatePageNummer. Så nu kan du också lämna sidan och fortästta där du var, funkar både om du klickar runt oh om du hoppar. 

```javascript

function jumpToPage(event) {
  if (event.keyCode === 13) {
    currentPage = parseInt(document.getElementById("choosePage").value);
    if (currentPage >= 1 && currentPage <= 94) {
      updatePokemonsOnPage(shop.getJupmpToPageUrl(currentPage));
      updatePageNummer();
      document.getElementById("choosePage").value = "";
    } else {
      document.getElementById("choosePage").value = "";
    }
  }
}

/* Denna är i Logic */

 getJupmpToPageUrl(askedPageNr) {
    let offset = (askedPageNr - 1) * 12;

    this.jumpToPageUrl = new URL("https://pokeapi.co");
    this.jumpToPageUrl.pathname = "/api/v2/pokemon";
    this.jumpToPageUrl.searchParams.set("limit", "12");
    this.jumpToPageUrl.searchParams.set("offset", offset);

    return this.jumpToPageUrl;
  }

```




