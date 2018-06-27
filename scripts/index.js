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
    // console.log(element);

    let lastApplyDate = result.matchningslista.matchningdata[i].sista_ansokningsdag;
    let applyDateSplit = lastApplyDate.split("", 10);

    let card = `<div class="cardContainer">
    <div class="cardBody">
      <h1 class="cardTitle">${result.matchningslista.matchningdata[i].annonsrubrik}</h1>
      <h2>${result.matchningslista.matchningdata[i].arbetsplatsnamn}</h2>
      <h3>${result.matchningslista.matchningdata[i].kommunnamn}</h3>
      <p>Yrkesbenämning: ${result.matchningslista.matchningdata[i].yrkesbenamning}<p>
      <p>Anställningstyp: ${result.matchningslista.matchningdata[i].anstallningstyp}<p>
    </div>
    <div class="buttonParent">
     <a href="${result.matchningslista.matchningdata[i].annonsurl}"><button class="buttonInCard">Ansök här<br> <p class="lastApply">innan ${applyDateSplit.join("")}</p></button></a>
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
  for(let currentLan of listOfLan) {
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
function fetchLan(){
  let url = (`http://api.arbetsformedlingen.se/af/v0/arbetsformedling/soklista/lan`)
  fetch(url)
  .then((res) => res.json())
  .then((listOfLan) =>{
      populate(listOfLan.soklista.sokdata);
      console.log(listOfLan);
  });
}

fetchLan();

// Aktiveras bara när vi ändrar i dropdown
slct1.addEventListener('change', function(){
  let selectedValue = slct1.value;
  fetch(`http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=${selectedValue}`)
      .then((res) => res.json())
      .then((data) =>{ 
          // Istället för att logga, kalla på er funktion som lägger till annonser på sidan
          console.log(data);
          getCardInfo()
      });
});
listOfLan.insertAdjacentHTML("beforeend", selectedValue);



//RUN, RUN RUN YOUR CODE
getAdsAndPrint();
getDOM.valAntal.addEventListener('submit', antalAnnonser);
getDOM.jobSearch.addEventListener('submit', handleSearch);

// Hämtar annonser per yrkesområde
function getAdsByField() {
  let url = `http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrkesomraden`;
  fetch(url)
    .then(response => response.json())
    .then(result => {
      let fieldList = result.soklista.sokdata;
      for (let i = 0; i < fieldList.length; i++) {
        let element = fieldList[i];
        console.log(element);
    
        let getLinks = document.querySelector("#fieldList");
        let link = `<a href="${element.namn}"><button class="buttonField">${element.namn}</button></a>`;
    
        getLinks.insertAdjacentHTML("beforeend", link);
      }
      console.log(fieldList);
    })
}
getAdsByField()
