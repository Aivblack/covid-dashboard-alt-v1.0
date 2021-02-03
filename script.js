const population = document.getElementById("population-count");
const deathsToday = document.getElementById("deaths-today-count");
const caseToday = document.getElementById("new-cases-today");

fetch('https://corona-api.com/countries')
  .then(response => response.json())
  .then(data => {
      console.log(data);
    
      population.innerText = data.data[231].population.toLocaleString();
      deathsToday.innerText = data.data[231].today.deaths.toLocaleString();
      caseToday.innerText = data.data[231].today.confirmed.toLocaleString();
      let dateSlice = data.data[231].updated_at;
      let dateCut = dateSlice.slice(0, 10);
      document.getElementById('update').innerText = dateCut;
  });