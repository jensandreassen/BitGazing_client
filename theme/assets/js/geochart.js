/*!
  * Script for index.html. Uses two different apis to collect
  * and reformat information for googles Geochart api
  * Author Jens Andreassen
*/

//Provides ket for GeoChart
google.charts.load('current', {
  'packages':['geochart'],
  'mapsApiKey': 'AIzaSyC1-rQet1lK5uWPJLtim9N4V90q5Pbzseg'
});
/*!
*Chains to different Api calls and reformats the data
*for the geochart Api
*/
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
  //For currency to coutry-conversion
  $.ajax({
    url: "http://country.io/currency.json",
    headers: {"Accept": "application/json"}
  }).done(function (currencies) {
    //For volumes totaled by currencies
    $.ajax({
      url: "http://localhost:5000/volumes",
      headers: {"Accept": "application/json"}
    }).done(function (volumes) {
        if(volumes.hasOwnProperty('USD')){
          //COnstructs an array containing wanted info
          var textArray = "[['Country', 'Currency', 'BTC Volume'],";
          for(var key in volumes){
              var arr = getKeyByValue(currencies, key);
              for(var code in arr){
                textArray += "['" + arr[code] + "', '" + key + "', " + volumes[key] + "],";
              }
          }
          //Formats array and adds options for GeoChart api
          var googleCommand = textArray.slice(0,-1) + "]";
          googleCommand = googleCommand.replace(/'/g, '"');
          var data = google.visualization.arrayToDataTable(JSON.parse(googleCommand));
          var options = {
            colorAxis: {colors: ['#ffffff', '#28fc8c']},
                  backgroundColor: '#f2f2f2',
                  datalessRegionColor: '#f2f2f2',
                  defaultColor: '#f5f5f5',
          };
          //Initializes map
          var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
          chart.draw(data, options);

        } else {
          console.log(volumes);
          showError(volumes.status);
        }

    //If api call fails
    }).fail(function (jqXHR, textStatus, error) {
        showError(jqXHR.status);
    });
  //If api call fails
  }).fail(function (jqXHR, textStatus, error) {
        showError(jqXHR.status);
    });
}
//Creates an array of countries based on Value containing a currency
function getKeyByValue(object, value) {
  var arr =[];
  for(currency in object) {
    if(object[currency] === value) { arr.push(currency); }
  }
  return arr;
}
//Shows error message
function showError(errorcode){
    document.getElementById('mapText').innerHTML = "The server isnt responding: " + errorcode;
}
