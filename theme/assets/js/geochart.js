google.charts.load('current', {
  'packages':['geochart'],
  'mapsApiKey': 'AIzaSyC1-rQet1lK5uWPJLtim9N4V90q5Pbzseg'
});
google.charts.setOnLoadCallback(drawRegionsMap);
function drawRegionsMap() {
  $.ajax({
    url: "http://country.io/currency.json",
    headers: {"Accept": "application/json"}
  }).done(function (currencies) {
    $.ajax({
      url: "http://localhost:5010/volumes",
      headers: {"Accept": "application/json"}
    }).done(function (volumes) {
      if(volumes.hasOwnProperty('USD')){
        var textArray = "[['Country', 'Currency', 'BTC'],";
        for(var key in volumes){
            var arr = getKeyByValue(currencies, key);
            for(var code in arr){
              textArray += "['" + arr[code] + "', '" + key + "', " + volumes[key] + "],";
            }
        }
        var googleCommand = textArray.slice(0,-1) + "]";
        googleCommand = googleCommand.replace(/'/g, '"');
        var data = google.visualization.arrayToDataTable(JSON.parse(googleCommand));
        var options = {
          colorAxis: {colors: ['#ffffff', '#28fc8c']},
                backgroundColor: '#f2f2f2',
                datalessRegionColor: '#f2f2f2',
                defaultColor: '#f5f5f5',
        };
        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        chart.draw(data, options);
      } else {
        showError();
      }
    }).fail(function (jqXHR, textStatus, error) {
        showError();
    });
  }).fail(function (jqXHR, textStatus, error) {
        showError();
    });
}
function getKeyByValue(object, value) {
  var arr =[];
  for(currency in object) {
    if(object[currency] === value) { arr.push(currency); }
  }
  return arr;
}
function showError(){
    document.getElementById('mapText').innerHTML = "The server isnt responding, please try again.";
}
