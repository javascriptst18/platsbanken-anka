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
  pageSelect: document.getElementById('pageSelect'),
<<<<<<< HEAD
  jobs: document.getElementById('#jobs')
=======
  jobs: document.getElementById('#jobs'),
  readMoreButton: document.getElementById("readMore")
>>>>>>> ada8aff73f7d1142f7cb4a7df4332cd9937d37c2
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
<<<<<<< HEAD
      jobs.innerHTML = '<h5>Job applications available: ' + searchVariables.numberOfJobs + '</h5>';
 
=======
      jobs.innerHTML = '<h5>Lediga tjänster i länet: ' + searchVariables.numberOfJobs + '</h5>';
>>>>>>> ada8aff73f7d1142f7cb4a7df4332cd9937d37c2
      pageNumber();
      getCardInfo(result);
    })

}


//DOM-manipulation för att lägga in all info i korten
//Plockar ut valt antal annonser för visning
function getCardInfo(result) {
  for (let i = 0; i < searchVariables.newNumber; i++) {

    let lastApplyHTML = "";
    console.log(result);
    if (result.matchningslista.matchningdata[i].sista_ansokningsdag) {
      let lastApplyDate = result.matchningslista.matchningdata[i].sista_ansokningsdag;
      let applyDateSplit = lastApplyDate.split("", 10);
      lastApplyHTML = `<p class="lastApply">senast ${applyDateSplit.join("")}</p>`
    }
    // readAddText(result.matchningslista.matchningdata[i].annonsid);
    let card = `<div class="cardContainer">
        <div class="cardBody" id="${result.matchningslista.matchningdata[i].annonsid}">
          <h1 class="cardTitle">${result.matchningslista.matchningdata[i].annonsrubrik}</h1>
          <h2>${result.matchningslista.matchningdata[i].arbetsplatsnamn}</h2>
          <h3>${result.matchningslista.matchningdata[i].kommunnamn}</h3>
          <p>Yrkesbenämning: ${result.matchningslista.matchningdata[i].yrkesbenamning}</p>
          <p>Anställningstyp: ${result.matchningslista.matchningdata[i].anstallningstyp}</p>
          <button id="readMore">+</button>
          </div>
        <div class="buttonParent">
          <a href="${result.matchningslista.matchningdata[i].annonsurl}" class="hvr-float-shadow"><button class="buttonInCard">Ansök här<br> ${lastApplyHTML}</button></a>    </div>
        </div>`

    getDOM.getCard.insertAdjacentHTML("beforeend", card);
  }
}

// //Hämstar annonstext
// function readAddText(id) {
//   let url = (`http://api.arbetsformedlingen.se/af/v0/platsannonser/${id}`);
//   fetch(url)
//   .then(response => response.json())
//   .then(result => {
//     console.log(result);
//     let readMoreAbout = document.getElementById(id);
//     let readAdd = `<p id="adText">${result.platsannons.annons.annonstext}</p>`;
//     // console.log(readAdd);
//     readMoreAbout.insertAdjacentHTML("beforeend", readAdd);
//     //Kör json show och hide
// })
// }

// $("#readMore").click(function(){
//   $("#adText").toggle();
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
  s1.value = searchVariables.lanid;
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
slct1.addEventListener('change', function () {
  // Nedan använder jag "this" funktionen som ersätter "slct1"
  let selectedValue = this.value;
      fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=${selectedValue}`)
          .then((res) => res.json())
          .then((data) =>{ 
            jobs.innerHTML = '<h5>Job applications available: ' + data.matchningslista.antal_platsannonser + '</h5>'; 
<<<<<<< HEAD
            let clearCard = document.getElementById("card");
            clearCard.innerHTML = "";
            getCardInfo(data);
=======
/*             let clearCard = document.getElementById("card");
            clearCard.innerHTML = "";
 */            getCardInfo(data);
          
>>>>>>> ada8aff73f7d1142f7cb4a7df4332cd9937d37c2
      });

  });


// Hämtar annonser per yrkesområde och lägger in de i dropdown i headern.
function getAdsByField() {
  let url = `http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrkesomraden`;
  fetch(url)
    .then(response => response.json())
    .then(result => {
      let fieldList = result.soklista.sokdata;
      let jobQuantity = document.getElementById("jobs");
      jobs.innerHTML = '<h5>Job applications available: ' + result.soklista.totalt_antal_ledigajobb + '</h5>';
      let getLinks = document.querySelector("#category");
      for (let currentField of fieldList) {
        let newField = document.createElement("option");
        newField.value = currentField.id;
        newField.innerText = currentField.namn;

        getLinks.appendChild(newField);
      }
    })
}


// getDOM.readMoreButton.addEventListener("click", function () {
//   getAdInformation();
// ta den variabeln som står för texten, eller metoden, eller vad det blir, och kör .show .hide.
// })



//Generera val av sidnummer
function pageNumber() {

  for (i = 1; i <= searchVariables.lastPage; i++) {

    getDOM.pageSelect.insertAdjacentHTML("beforeend", `<option value="${i}">${i}</option>`);
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
getAdsByField();

//EVENT LISTENERS

//Antal annonser
getDOM.nOfAdsForm.addEventListener('submit', displayNOfAds);
//Fritextsök
getDOM.jobSearch.addEventListener('submit', handleSearch);
//Navigera till vald sida i dropdown
getDOM.choosePage.addEventListener('submit', navToPage);
//Sidnavigering mha blädderknappar
document.getElementById('forwardBtn').addEventListener('click', pageForward);
document.getElementById('backBtn').addEventListener('click', pageBack);
//dropdown för yrkesområden
category.addEventListener('change', function () {
  let selectedValue = category.value;
  fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?yrkesomradeid=${selectedValue}`)
    .then((res) => res.json())
    .then((data) => {
      let clearCard = document.getElementById("card");
      clearCard.innerHTML = "";
      getCardInfo(data);
    });
});
