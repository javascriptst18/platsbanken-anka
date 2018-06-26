
const valAntal = document.getElementById('valAntal');
const jobSearch = document.getElementById('jobSearch');
let nyttAntal = 10;

//hämtar annonser från API
function hamtaAnnonser() {
  let url = `http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=1&sida=1&antalrader=${nyttAntal}`;
fetch(url)
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

//Sökfunktionens delar
function handleSearch(event) {
  event.preventDefault();
  const searchForm = event.target;
  let searchValue = searchForm.writeJobSearch.value;
  return searchValue;
}

//RUN, RUN RUN YOUR CODE
hamtaAnnonser();
valAntal.addEventListener('submit', antalAnnonser);
