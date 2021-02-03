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