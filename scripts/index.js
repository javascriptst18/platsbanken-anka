
const valAntal = document.getElementById('valAntal');
let nyttAntal = 10;

//hämtar annonser från API
function hamtaAnnonser() {
fetch("http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=1")
  .then(response => response.json())
  .then(result => {
    //Visar antal jobb
    console.log(result.matchningslista.antal_platsannonser);
    //Plockar ut valt antal annonser för visning
    for (let i = 0; i < nyttAntal; i++) { 
      let element = result.matchningslista.matchningdata[i];
      console.log(element);
    }
  })
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

