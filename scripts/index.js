const valAntal = document.getElementById('valAntal');
let nyttAntal = 10;



//hämtar annonser från API
function hamtaAnnonser() {
  let url = `http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=1&sida=1&antalrader=${nyttAntal}`;
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
   for (let i = 0; i < nyttAntal; i++) {
  let element = result.matchningslista.matchningdata[i];
  console.log(element);
  let getCard = document.querySelector("#card");
  let card = `<div class="cardContainer">
    <div class="cardBody">
      <h1 class="cardTitle">${result.matchningslista.matchningdata[i].annonsrubrik}</h1>
      <h2>${result.matchningslista.matchningdata[i].arbetsplatsnamn}</h2>
      <h3>${result.matchningslista.matchningdata[i].kommunnamn}</h3>
      <br>
      <p>Yrkesbenämning: ${result.matchningslista.matchningdata[i].yrkesbenamning}<p>
      <p>Anställningstyp: ${result.matchningslista.matchningdata[i].anstallningstyp}<p>
     <a href="" class="applyLink"><button class="buttonInCard">Ansök här<br> <p class="lastApply">innan ${result.matchningslista.matchningdata[i].sista_ansokningsdag}</p></button></a>
    </div>
  </div>`
  getCard.insertAdjacentHTML("beforeend", card);
}
  }

//Väljer antal annonser som visas
function antalAnnonser(event) {
  event.preventDefault();
  const form = event.target;
  nyttAntal = form.antal.value;
  hamtaAnnonser();
}

//RUN, RUN RUN YOUR CODE
hamtaAnnonser();
valAntal.addEventListener('submit', antalAnnonser);


