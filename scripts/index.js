// async function searchByCriteria(searchCriteria) {
//   const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
//   const responseObject = await fetch(baseURL + searchCriteria);
//   const matches = await responseObject.json();
//   console.log(matches);
// }

// searchByCriteria('platsannonser/matchning?lanid=1&yrkesomradeid=3&antalrader=30');

/* fetch("http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=1")
  .then(response => response.json())
  .then(result => {
    // console.log(result.matchningslista.matchningdata);
    for (let i = 0; i < 10; i++) {
      let element = result.matchningslista.matchningdata[i];
      console.log(element);
      
    }
  })  */
  /* Nedanför har jag skrivit in adressen där jag "fetchar" datan från arbetsförmedlningen. */
  fetch("http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=1")
  .then(response => response.json())
  /* then funktionen hämtar data från json och gör den kompatibel med js */
  .then(result => {
    console.log(result.matchningslista.antal_platsannonser)
  })