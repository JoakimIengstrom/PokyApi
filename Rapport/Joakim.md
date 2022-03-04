# `Grupprojekt - frontend app`

### `Index`

---
- [`Grupprojekt - frontend app`](#grupprojekt---frontend-app)
    - [`Index`](#index)
    - [`Fetch`](#fetch)
    - [Reflektioner](#reflektioner)
    - [Personlig reflektioner](#personlig-reflektioner)

---

### `Fetch`
___

Det går att göra en fetch på många sätt, det jag lärde mig tidigt är att javascript jobbar på ett sätt som jag inte riktigt är van vid. Dvs att saker och ting inte synkar riktigt i tiden. I slutet så önskade jag att bygga sidan så att den ur UI perspektiv skall kunna uppdatera antalet i count och med alla sökbara Pokemons som finns. Genom att göra det så blir det ju också mindre underhåll på sidan. 

Började lite försent med detta och det blir "undifiend", då det inte finns något värde när du kör previous. 
Problemet som sker är ju att konstruktorn körs och allt går så fort, att när jag sedan trycker på previous så hinner den inte fylla i värdet. Jag har nu hårdkodat det i själva programmet igen, för att det skall finnas ett värde, och det fungerar nu, men hoppas på att kunna jobba vidare på denna. 

```javascript

  constructor() {
    let offset = (this.loadPageNr() - 1) * 12;
    let offsetLastPage = this.fetchLastPageOffset();

    this.firstPageUrl = new URL("https://pokeapi.co");
    this.firstPageUrl.pathname = "/api/v2/pokemon";
    this.firstPageUrl.searchParams.set("limit", "12");
    this.firstPageUrl.searchParams.set("offset", offset);

    this.lastpageUrl = new URL("https://pokeapi.co");
    this.lastpageUrl.pathname = "/api/v2/pokemon";
    this.lastpageUrl.searchParams.set("limit", "12");
    this.lastpageUrl.searchParams.set("offset", offsetLastPage);

    this.pageOneUrl = new URL("https://pokeapi.co");
    this.pageOneUrl.pathname = "/api/v2/pokemon";
    this.pageOneUrl.searchParams.set("limit", "12");
    this.pageOneUrl.searchParams.set("offset", "0");
  }

```

För att kunna göra detta så gör jag följade fetch. Jag använder Apins egna count finns. Jag hämtar `"https://pokeapi.co/api/v2/pokemon"` och på den så gör vi object.count. 
Denna hämtar då hur många som finns just nu i APIn. Utifrån det värdet så delar jag med 12 då vi jobbar med sidor som visar tolv Pokemons. Det jag dock gör är att använda Math.ceil för att få närmaste heltal avrundat upp. För att våran pagination sedan skall funka så behöver vi dock ta det värdet -1 för att sedan gångra med 12 för att få vårt offset att stämma. Så ovan så funkar det fint hit, men i praktiken så har inte denna fetchen och värdet sparats i tid på ett sätt så vi kan använda det. 


```javascript

async fetchLastPageOffset() {
    let pokemonCount;

    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const object = await response.json();

    pokemonCount = object.count;
    let maxNumberOfPages = Math.ceil(pokemonCount / 12);
    let lastPageOffset = (maxNumberOfPages - 1) * 12;
    return lastPageOffset;
  }

```
[Index](#index)
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

### Personlig reflektioner
___

Skriv klart rapporten innan du fortsätter bygga massa extra funktionen så att jag nu sitter här sita dagen ändå och försöker få klart det. 
<br><br>
Det har varit superkul att jobba med Anna Märta, det känns som vi båda är duktiga på att sväva iväg ibland och behöver påminna varandra att ta en sak åt gången, jag behöver bli bättre på att låga andra sätta mig in i mina problem när jag ber om hjälp och inte springa i 120. Anna Märta påminner jag om att hon är grym, och att inte allt funkar direkt är helt okej! Vi kompleterar varandra bra, jag har jobbat lite mer frontend och Märta backend, så det är kul! 

[Index](#index)






