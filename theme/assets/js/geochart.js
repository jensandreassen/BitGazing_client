google.charts.load('current', {
  'packages':['geochart'],
  'mapsApiKey': 'AIzaSyC1-rQet1lK5uWPJLtim9N4V90q5Pbzseg'
});
google.charts.setOnLoadCallback(drawRegionsMap);
function getCurrencyinfo(){
  $.ajax({
    url: "http://country.io/currency.json",
    headers: {"Accept": "application/json"}
  })
  .done(function (data) {

    console.log(data);
  })
}
function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable([
    ['Currency', '%'],
    ['Germany', 200],
    ['United States', 300],
    ['Brazil', 400],
    ['Canada', 500],
    ['France', 600],
    ['RU', 700]
  ]);

  var options = {
    colorAxis: {colors: ['#ffffff', '#28fc8c']},
          backgroundColor: '#f2f2f2',
          datalessRegionColor: '#f2f2f2',
          defaultColor: '#f5f5f5',
  };
  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
  chart.draw(data, options);
  testApi();
}

function testApi(){
   console.log("Jag är här!");
   $.ajax({
     url: "http://localhost:5000/getinfo",
     headers: {"Accept": "application/json"}
   })
   .done(function (data) {
     console.log(data);
   }).fail(function( jqXHR, textStatus ) {
  alert( "Request failed: " + textStatus );
});

}
