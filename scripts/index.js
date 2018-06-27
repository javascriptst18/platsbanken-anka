/* INNEHÅLL
 * Globala variabler
 * Funktioner
 * - startvyn
 * - Anpassningar
 * - Sökning
 * Koden körs
 */

//GLOBALA VARIABLER

const getDOM = {
  valAntal: document.getElementById('valAntal'),
  jobSearch: document.getElementById('jobSearch'),
  getCard: document.querySelector("#card")
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
  getDOM.getCard.innerHTML = "";
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
    let lastApplyHTML ="";
    // console.log(element);
    if (result.matchningslista.matchningdata[i].sista_ansokningsdag) {
      let lastApplyDate = result.matchningslista.matchningdata[i].sista_ansokningsdag;
      let applyDateSplit = lastApplyDate.split("", 10);
      lastApplyHTML= `<p class="lastApply">innan ${applyDateSplit.join("")}</p>`
    }
    let card = `<div class="cardContainer">
    <div class="cardBody">
      <h1 class="cardTitle">${result.matchningslista.matchningdata[i].annonsrubrik}</h1>
      <h2>${result.matchningslista.matchningdata[i].arbetsplatsnamn}</h2>
      <h3>${result.matchningslista.matchningdata[i].kommunnamn}</h3>
      <p>Yrkesbenämning: ${result.matchningslista.matchningdata[i].yrkesbenamning}<p>
      <p>Anställningstyp: ${result.matchningslista.matchningdata[i].anstallningstyp}<p>
    </div>
    <div class="buttonParent">
     <a href="${result.matchningslista.matchningdata[i].annonsurl}"><button class="buttonInCard">Ansök här<br> ${lastApplyHTML} </button></a>
    </div>
  </div>`

    getDOM.getCard.insertAdjacentHTML("beforeend", card);
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

// Populate lägger till en ny <option> för varje län som finns på arbetsförmedlingen
function populate(listOfLan) {
  let s1 = document.getElementById("slct1");
  // För varje län i listan av län, sätt en variabel med det nuvarande länet
  for (let currentLan of listOfLan) {
    // Skapa ett nytt option för varje län
    let nyLan = document.createElement("option");
    // Sätt värdet på option till id som vi får från arbetsförmedlingen
    nyLan.value = currentLan.id;
    // Och sätt texten på option till namnet på länet
    nyLan.innerText = currentLan.namn;
    // Vi måste också lägga till option till HTMLen innan vi fortsätter
    s1.appendChild(nyLan);
  }
}

// Hämtar data från arbetsförmedlingen och kallar på populate
function fetchLan() {
  let url = (`http://api.arbetsformedlingen.se/af/v0/arbetsformedling/soklista/lan`)
  fetch(url)
    .then((res) => res.json())
    .then((listOfLan) => {
      populate(listOfLan.soklista.sokdata);
      console.log(listOfLan);
    });
}

fetchLan();


// Aktiveras bara när vi ändrar i dropdown, när vi trycker på specifikt län dras kortet för det länet ut. 
slct1.addEventListener('change', function(){
  searchVariables.lanid = slct1.value;
  getAdsAndPrint();

//RUN, RUN RUN YOUR CODE
getAdsAndPrint();
getDOM.valAntal.addEventListener('submit', antalAnnonser);
getDOM.jobSearch.addEventListener('submit', handleSearch);



// Hämtar annonser per yrkesområde och lägger in de i dropdown i headern.
function getAdsByField() {
  let url = `http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrkesomraden`;
  fetch(url)
    .then(response => response.json())
    .then(result => {
      let fieldList = result.soklista.sokdata;
      console.log(result);
      let getLinks = document.querySelector("#category");
      for (let currentField of fieldList) {
        let newField = document.createElement("option");
        newField.value = currentField.id;
        newField.innerText = currentField.namn;

        getLinks.appendChild(newField);
        getCardInfo(result);
      }
    })
}

getAdsByField()

