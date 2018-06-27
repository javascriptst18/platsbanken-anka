
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
      });
});


