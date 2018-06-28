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
  nOfAdsForm: document.getElementById('nOfAds'),
  jobSearch: document.getElementById('jobSearch'),
  getCard: document.querySelector("#card"),
  choosePage: document.getElementById('choosePage'),
  pageSelect: document.getElementById('pageSelect')
}

let searchVariables = {
  newNumber: 10,
  keyword: "",
  lanid: 1,
  page: 1,
}

//FUNKTIONER

//hämtar annonser från API
function getAdsAndPrint() {
  let url = `http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=${searchVariables.lanid}&nyckelord=${searchVariables.keyword}&sida=${searchVariables.page}&antalrader=${searchVariables.newNumber}`;
  getDOM.getCard.innerHTML = "";
  fetch(url)
    .then(response => response.json())
    .then(result => {
      //Visar antal jobb
      searchVariables.numberOfJobs = result.matchningslista.antal_platsannonser;
      searchVariables.lastPage =  result.matchningslista.antal_sidor;
      pageNumber();
      getCardInfo(result);
    })
}

//DOM-manipulation för att lägga in all info i korten
//Plockar ut valt antal annonser för visning
function getCardInfo(result) {
  for (let i = 0; i < searchVariables.nyttAntal; i++) {

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
          <a href="${result.matchningslista.matchningdata[i].annonsurl}" class="hvr-float-shadow"><button class="buttonInCard">Ansök här<br> ${lastApplyHTML}</button></a>    </div>
        </div>`

    getDOM.getCard.insertAdjacentHTML("beforeend", card);
  }
}

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

// Aktiveras bara när vi ändrar i dropdown, när vi trycker på specifikt län dras kortet för det länet ut. 
slct1.addEventListener('change', function() {
  // Nedan använder jag "this" funktionen som ersätter "slct1"
  let selectedValue = this.value;
      fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=${selectedValue}`)
          .then((res) => res.json())
          .then((data) =>{ 
              let clearCard = document.getElementById("card");
              clearCard.innerHTML = "";
              getCardInfo(data);
      });
  });

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
       
      }
    })
}

//Generera val av sidnummer
function pageNumber() {
  for (i=1; i <=searchVariables.lastPage ; i++)
    getDOM.pageSelect.insertAdjacentHTML("beforeend", `<option value="${i}">${i}</option>`);
}

//Navigera till rätt sida
function navToPage(event) {
  event.preventDefault();
  searchVariables.page = event.target.pageChoiceUpper.value;
  getAdsAndPrint();
}

//RUN, RUN RUN YOUR CODE
getAdsAndPrint();
fetchLan();
getAdsByField();

//EVENT LISTENERS

//Antal annonser
getDOM.nOfAdsForm.addEventListener('submit', displayNOfAds);
//Fritextsök
getDOM.jobSearch.addEventListener('submit', handleSearch);
//Navigera till olika sidor
getDOM.choosePage.addEventListener('submit', navToPage);
//dropdown för yrkesområden
category.addEventListener('change', function() {
  let selectedValue = category.value;
      fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?yrkesomradeid=${selectedValue}`)
          .then((res) => res.json())
          .then((data) =>{ 
              let clearCard = document.getElementById("card");
              clearCard.innerHTML = "";
              getCardInfo(data);
      });
  });
