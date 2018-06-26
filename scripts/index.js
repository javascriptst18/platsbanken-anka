// async function searchByCriteria(searchCriteria) {
//   const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
//   const responseObject = await fetch(baseURL + searchCriteria);
//   const matches = await responseObject.json();
//   console.log(matches);
// }

// searchByCriteria('platsannonser/matchning?lanid=1&yrkesomradeid=3&antalrader=30');

const valAntal = document.getElementById('valAntal');
let nyttAntal = 10;

fetch("http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=1")
  .then(response => response.json())
  .then(result => {
    // console.log(result.matchningslista.matchningdata);
    for (let i = 0; i < nyttAntal; i++) {
      let element = result.matchningslista.matchningdata[i];
      console.log(element);
      
    }
  })

function antalAnnonser(event) {
  event.preventDefault();
  const form = event.target;
  nyttAntal = form.antal.value;
  return nyttAntal;
}

valAntal.addEventListener('submit', antalAnnonser);