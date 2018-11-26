// import "../scss/style.scss";
// import { funktionsnamn/variabelnamn i filen } from "./filnamn";

/* INNEHÅLL
 * Globala variabler
 * Funktioner
 * - startvyn
 * - Anpassningar
 * - Sökning
 * Koden körs
 * Event listeners
 */

//GLOBALA VARIABLER

const getDOM = {
  nOfAdsForm: document.getElementById("nOfAds"),
  jobSearch: document.getElementById("jobSearch"),
  getCard: document.querySelector("#card"),
  choosePage: document.getElementById("choosePage"),
  pageSelect: document.getElementById("pageSelect"),
  jobs: document.getElementById("#jobs"),
  readMoreButton: document.getElementById("readMore")
};

let searchVariables = {
  newNumber: 10,
  keyword: "",
  lanid: 1,
  page: 1,
  lastPage: 0,
  numberOfJobs: 0,
  field: "",
  fieldName: ""
};

//FUNKTIONER

//hämtar annonser från API
function getAdsAndPrint() {
  let url = `http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=${searchVariables.lanid}&nyckelord=${searchVariables.keyword}&sida=${searchVariables.page}&antalrader=${searchVariables.newNumber}&yrkesomradeid=${
    searchVariables.field
  }`;
  getDOM.getCard.innerHTML = "";
  fetch(url)
    .then(response => response.json())
    .then(result => {
      //Visar antal jobb
      console.log(result);
      searchVariables.numberOfJobs = result.matchningslista.antal_platsannonser;
      searchVariables.lastPage = result.matchningslista.antal_sidor;
      jobs.innerHTML = "<h5>Lediga tjänster inom " + searchVariables.fieldName + " i länet: " + searchVariables.numberOfJobs + "</h5>";
      pageNumber();
      getCardInfo(result);
    });
}

//DOM-manipulation för att lägga in all info i korten
//Plockar ut valt antal annonser för visning
function getCardInfo(result) {
  for (let i = 0; i < searchVariables.newNumber; i++) {
    let lastApplyHTML = ""; //tar bort kort från tidigare sökning
    // if-sats för att formatera sista datum där sådant finns
    if (result.matchningslista.matchningdata[i].sista_ansokningsdag) {
      let lastApplyDate = result.matchningslista.matchningdata[i].sista_ansokningsdag;
      let applyDateSplit = lastApplyDate.split("", 10);
      lastApplyHTML = `<p class="lastApply">innan ${applyDateSplit.join("")}</p>`;
    }
    // readAddText(result.matchningslista.matchningdata[i].annonsid);
    let card = `<div class="cardContainer">
        <div class="cardBody" id="${result.matchningslista.matchningdata[i].annonsid}">
          <h1 class="cardTitle">${result.matchningslista.matchningdata[i].annonsrubrik}</h1>
          <h2>${result.matchningslista.matchningdata[i].arbetsplatsnamn}</h2>
          <h3>${result.matchningslista.matchningdata[i].kommunnamn}</h3>
          <p>Yrkesbenämning: ${result.matchningslista.matchningdata[i].yrkesbenamning}</p>
          <p>Anställningstyp: ${result.matchningslista.matchningdata[i].anstallningstyp}</p>
          </div>
        <div class="buttonParent">
          <a href="${result.matchningslista.matchningdata[i].annonsurl}" class="hvr-float-shadow"><button class="buttonInCard">Läs mer och ansök här<br> ${lastApplyHTML}</button></a>    </div>
        </div>`;
    //Sätter in kort i HTML
    getDOM.getCard.insertAdjacentHTML("beforeend", card);
  }
}

//Hämstar annonstext
function readAddText(id) {
  let url = `http://api.arbetsformedlingen.se/af/v0/platsannonser/${id}`;
  fetch(url)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      let readMoreAbout = document.getElementById(id);
      let readAdd = `<p id="adText">${result.platsannons.annons.annonstext}</p>`;
      // console.log(readAdd);
      readMoreAbout.insertAdjacentHTML("beforeend", readAdd);
      //Kör json show och hide
    });
}

// $("#readMore").click(function(){
//   $("#adText").toggle();
// https://www.w3schools.com/howto/howto_js_collapsible.asp
// });

//Väljer antal annonser som visas
function displayNOfAds(event) {
  event.preventDefault();
  const form = event.target;
  searchVariables.newNumber = form.number.value;
  getAdsAndPrint();
}

//Sökfunktionens delar
function handleSearch(event) {
  event.preventDefault();
  const searchForm = event.target;
  searchVariables.keyword = searchForm.keyword.value; //lägger in formulärvärde i global variabel
  getAdsAndPrint();
  keyword.value = "";
}

// Populate lägger till en ny <option> för varje län som finns på arbetsförmedlingen
function populateLan(listOfLan) {
  let s1 = document.getElementById("slct1");
  for (let currentLan of listOfLan) {
    // För varje län i listan av län, sätt en variabel med det nuvarande länet
    let nyLan = document.createElement("option"); // Skapa ett nytt option för varje län
    nyLan.value = currentLan.id; // Sätt värdet på option till id som vi får från arbetsförmedlingen
    nyLan.innerText = currentLan.namn; // Och sätt texten på option till namnet på länet
    s1.appendChild(nyLan); // Vi måste också lägga till option till HTMLen innan vi fortsätter
  }
  s1.value = searchVariables.lanid;
}

// Lägger till en ny option för varje yrkesområde som finns på arbetsförmedlingen
function populateCategory(listOfField) {
  let field = document.getElementById("category");
  for (let currentField of listOfField) {
    let nyField = document.createElement("option");
    nyField.value = currentField.id;
    nyField.innerText = currentField.namn;
    field.appendChild(nyField);
    searchVariables.fieldName = currentField.namn;
  }
  field.value = searchVariables.field;
  field.name = searchVariables.fieldName;
}

// Hämtar data från arbetsförmedlingen och kallar på populate
function fetchLan() {
  let url = `http://api.arbetsformedlingen.se/af/v0/arbetsformedling/soklista/lan`;
  fetch(url)
    .then(res => res.json())
    .then(listOfLan => {
      populateLan(listOfLan.soklista.sokdata);
    });
}

function fetchCategory() {
  let url = `http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrkesomraden`;
  fetch(url)
    .then(response => response.json())
    .then(listOfField => {
      populateCategory(listOfField.soklista.sokdata);
    });
}

// Aktiveras bara när vi ändrar i dropdown, när vi trycker på specifikt län dras kortet för det länet ut.
slct1.addEventListener("change", function() {
  // Nedan använder jag "this" funktionen som ersätter "slct1"
  searchVariables.lanid = this.value;
  getAdsAndPrint();
});

category.addEventListener("change", function() {
  searchVariables.field = this.value;
  console.log("This: " + this.name);
  getAdsAndPrint();
});

//Generera val av sidnummer
function pageNumber() {
  for (let i = 1; i <= searchVariables.lastPage; i++) {
    getDOM.pageSelect.insertAdjacentHTML("beforeend", `<option value="${i}">${i}</option>`);
  }
}

//Navigera till rätt sida
function navToPage(event) {
  event.preventDefault();
  searchVariables.page = event.target.pageSelect.value;
  getAdsAndPrint();
}

//Funktioner till knappar för att bläddra sida
//Bläddra framåt
function pageForward() {
  event.preventDefault();
  searchVariables.page += 1;
  pageSelect.value = searchVariables.page; //byter sidnummer i dropdown på bläddring
  getAdsAndPrint();
}
//Bläddra bakåt
function pageBack() {
  event.preventDefault();
  searchVariables.page -= 1;
  pageSelect.value = searchVariables.page;
  getAdsAndPrint();
}

//RUN, RUN RUN YOUR CODE
getAdsAndPrint();
fetchLan();
fetchCategory();
// getAdsByField();

//EVENT LISTENERS

//Antal annonser
getDOM.nOfAdsForm.addEventListener("submit", displayNOfAds);
//Fritextsök
getDOM.jobSearch.addEventListener("submit", handleSearch);
//Navigera till vald sida i dropdown
getDOM.choosePage.addEventListener("submit", navToPage);
//Sidnavigering mha blädderknappar
document.getElementById("forwardBtn").addEventListener("click", pageForward);
document.getElementById("backBtn").addEventListener("click", pageBack);
