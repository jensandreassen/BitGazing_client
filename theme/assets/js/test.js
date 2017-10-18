function getCurrencyinfo(){
  $.ajax({
    url: "http://country.io/currency.json",
    headers: {"Accept": "application/json"}
  }).done(function (data) {
    console.log(data);
    $.ajax({
      url: "http://localhost:5000/currency/USD",
      headers: {"Accept": "application/json"}
    }).done(function (data2) {
      console.log("Break");
      console.log(data2);

      //Här rockar vi koden med tillgång till båda
      var textArray = "[['Country', 'Currency', 'Amount'],";
      var eur = ["Austria", "Belgium", "Cyprus", "Estonia", "Finland", "France", "Germany",
                  "Greece", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", 
                  "Malta", "Netherlands", "Portugal", "Slovakia", "Slovenia", "Spain"];
      for(var i=0; i<data2.lenght; i++){
        //Lägg till eu undantag?
        var text = "['" + getKeyByValue(data, data2[i]['currency']) + "', '" +
        data[i]['currency'] + "', '" + data[i]['total_volume'] + "']";
        if(i+1<data2.lenght){
          text = text + ",";
        } else {
          text = text + "]";
        }
        textArray = textArray + text;
        console.log(textArray);
      }
    })
  })
};
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
$(document).ready(function () {
  getCurrencyinfo();
});
