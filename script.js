const population = document.getElementById("population-count");
const deathsToday = document.getElementById("deaths-today-count");
const caseToday = document.getElementById("new-cases-today");
const totalCases = document.getElementById('total-case-count');
const activeCases = document.getElementById('active-case-count');
const recoveries = document.getElementById('recoveries-count');
const deaths = document.getElementById('deaths-count');

fetch('https://corona-api.com/countries')
  .then(response => response.json())
  .then(data => {
      console.log(data);

      for (i=0; i < data.data.length; i++){
        let targetSelect = document.getElementById("country");
        let option = document.createElement("option");
        option.text = data.data[i].name;
        targetSelect.add(option);
      }
    
      population.innerText = data.data[231].population.toLocaleString();
      deathsToday.innerText = data.data[231].today.deaths.toLocaleString();
      caseToday.innerText = data.data[231].today.confirmed.toLocaleString();
      let dateSlice = data.data[231].updated_at;
      let dateCut = dateSlice.slice(0, 10);
      document.getElementById('update').innerText = dateCut;

      // Chart
      let totalChart = data.data[231].latest_data.confirmed;
      let activeChart = data.data[231].latest_data.critical;
      let recoveriesChart = data.data[231].latest_data.recovered;
      let deathsChart = data.data[231].latest_data.deaths;

      Chart.defaults.global.defaultFontFamily = 'Montserrat';

      let myChart0 = document.getElementById('myChart').getContext('2d');
      let chart = new Chart(myChart0, {
        type: 'bar',
        data: {
          labels: ['Total cases', 'Active cases', 'Recoveries', 'Deaths'],
          datasets: [{
            label: 'Count',
            data: [
              totalChart,
              activeChart,
              recoveriesChart,
              deathsChart
            ],
            backgroundColor:'#3F3F3F',
            borderWidth: 4,
            borderColor: 'black'
          }]
        },
        options: {
            legend: {
            display: false
          }
        }
      });
    });

function selectCountry(){
  fetch('https://corona-api.com/countries')
    .then(response => response.json())
    .then(data => {

        let targetIndex = document.getElementById("country").selectedIndex;
        let index = targetIndex - 1;
        let targetCountryName = document.getElementById("country-name");
        let y = document.getElementById("country").options;
        targetCountryName.innerText = y[targetIndex].text;

        totalCases.innerText = data.data[index].latest_data.confirmed.toLocaleString();
        activeCases.innerText = data.data[index].latest_data.critical.toLocaleString();
        recoveries.innerText = data.data[index].latest_data.recovered.toLocaleString();
        deaths.innerText = data.data[index].latest_data.deaths.toLocaleString();
    });
}

