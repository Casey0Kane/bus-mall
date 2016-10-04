'use strict.';
//js to create the results table

//functiont to calc % of views
function calcPercentage(){
  for (var i=0; i < allProducts.length; i++) {
    var percentage;
    if (allProducts[i].views === 0){
      percentage = 0;
    }
    else {
      percentage = parseInt(Math.floor((allProducts[i].clicks/allProducts[i].views)*100));
    }
    console.log(allProducts[i].name + ' has ' + allProducts[i].views + ' views and ' + allProducts[i].clicks + ' clicks for a ' + percentage + '% click rate.' );
    return percentage;
  }
}

this.render = function() {
  creates new row for store
  var numCookiesRow = document.createElement('tr');
  cookieTable.appendChild (numCookiesRow);

  //displays store name
  var storeNameElement = document.createElement('td');
  storeNameElement.textContent = this.name;
  numCookiesRow.appendChild(storeNameElement);

  //make td element in a for loop to display the #cookies sold
  for (var i = 0; i < this.cookiesEachHourArray.length; i++){
    var tdElement = document.createElement('td');
    tdElement.textContent = this.cookiesEachHourArray[i];
    numCookiesRow.appendChild (tdElement);
  }
  //displays total on far right
  var totalSalesElement = document.createElement('td');
  totalSalesElement.textContent = this.totalDailyCookieSales;
  numCookiesRow.appendChild (totalSalesElement);
};


creating the table for results of votes

var randomRow = document.createElement('td');
randomRow.textContent = 'test';
table.appendChild (randomRow);

var table = document.getElementById('results');
for (var i = 0; i < 19; i++) {
  var itemRow = document.createElement('tr');
  itemRow.textContent = 'tr test';
  table.appendChild(itemRow);
}
