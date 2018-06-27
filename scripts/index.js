/* INNEHÅLL
* Globala variabler
* Funktioner
* - startvyn
* - Anpassningar
* - Sökning
* Koden körs
*/ 

//GLOBALA VARIABLER

const forms = {
 valAntal: document.getElementById('valAntal'),
jobSearch: document.getElementById('jobSearch'),
}

let searchVariables = {
  nyttAntal: 10,
  keyword: "",
  lanid: 1,
  page: 1,
}

//FUNKTIONER

//hämtar annonser från API
function getAdsAndPrint() {
  let url = `http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=${searchVariables.lanid}&nyckelord=${searchVariables.keyword}&sida=${searchVariables.page}&antalrader=${searchVariables.nyttAntal}`;
  fetch(url)
    .then(response => response.json())
    .then(result => {
      //Visar antal jobb
      console.log(result.matchningslista.antal_platsannonser);
      getCardInfo(result);
    })
}

//DOM-manipulation för att lägga in all info i korten
//Plockar ut valt antal annonser för visning
function getCardInfo(result) {
  for (let i = 0; i < searchVariables.nyttAntal; i++) {
    let element = result.matchningslista.matchningdata[i];
    console.log(element);

    let lastApplyDate = result.matchningslista.matchningdata[i].sista_ansokningsdag;
    let applyDateSplit = lastApplyDate.split("", 10);

    let getCard = document.querySelector("#card");
    let card = `<div class="cardContainer">

    <div class="cardBody">
      <h1 class="cardTitle">${result.matchningslista.matchningdata[i].annonsrubrik}</h1>
      <h2>${result.matchningslista.matchningdata[i].arbetsplatsnamn}</h2>
      <h3>${result.matchningslista.matchningdata[i].kommunnamn}</h3>
      <p>Yrkesbenämning: ${result.matchningslista.matchningdata[i].yrkesbenamning}<p>
      <p>Anställningstyp: ${result.matchningslista.matchningdata[i].anstallningstyp}<p>
     <a href="${result.matchningslista.matchningdata[i].annonsurl}"><button class="buttonInCard">Ansök här<br> <p class="lastApply">innan ${applyDateSplit.join("")}</p></button></a>
    </div>
  </div>`
    getCard.insertAdjacentHTML("beforeend", card);
  }
}

//Väljer antal annonser som visas
function antalAnnonser(event) {
  event.preventDefault();
  const form = event.target;
  searchVariables.nyttAntal = form.antal.value;
  getAdsAndPrint();
}

//Sökfunktionens delar
function handleSearch(event) {
  event.preventDefault();
  const searchForm = event.target;
  searchVariables.keyword = searchForm.keyword.value;
  getAdsAndPrint();
}

//RUN, RUN RUN YOUR CODE
getAdsAndPrint();
forms.valAntal.addEventListener('submit', antalAnnonser);
forms.jobSearch.addEventListener('submit', handleSearch);