$(document).ready(function () {
  $.ajax({
    url: "http://localhost:5000/currency/USD",
    headers: {"Accept": "application/json"}
  })
  .done(function (data) {
    console.log(data);
  }).fail(function( jqXHR, textStatus ) {
 alert( "Request failed: " + textStatus );
});
});
