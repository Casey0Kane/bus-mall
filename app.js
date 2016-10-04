'use strict';

function Product(productName, filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.timesClicked = 0;
  this.timesDisplayed = 0;
}
Product.prototype.findPercentClicked = function() {
  return (this.timesClicked / this.timesDisplayed).toFixed(2) * 100;
};
var totalClicks = 0;
var allProducts = [new Product('bag', 'bag.jpg'),
                  new Product('banana', 'banana.jpg'),
                  new Product('boots', 'boots.jpg'),
                  new Product('bathroom', 'bathroom.jpg'),
                  new Product('breakfast', 'breakfast.jpg'),
                  new Product('bubblegum', 'bubblegum.jpg'),
                  new Product('chair', 'chair.jpg'),
                  new Product('cthulu', 'cthulhu.jpg'),
                  new Product('dog-duck', 'dog-duck.jpg'),
                  new Product('dragon', 'dragon.jpg'),
                  new Product('pen', 'pen.jpg'),
                  new Product('scissors', 'scissors.jpg'),
                  new Product('pet-sweep', 'pet-sweep.jpg'),
                  new Product('shark', 'shark.jpg'),
                  new Product('sweep', 'sweep.jpg'),
                  new Product('tuantuan', 'tuantuan.jpg'),
                  new Product('unicorn', 'unicorn.jpg'),
                  new Product('usb', 'usb.jpg'),
                  new Product('water-can', 'water-can.jpg'),
                  new Product('wine-glass', 'wine-glass.jpg')];
var alreadyDisplayed = [];

// var chartData = localStorage.getItem('dataPersist');
// if (chartData) {
//   allProducts = JSON.parse(chartData);
// } else {
//   localStorage.setItem('dataPersist', JSON.stringify(allProducts));
// }

var displayedProductLeft, displayedProductCenter, displayedProductRight;
var displayLeft = document.getElementById('displayLeft');
var displayCenter = document.getElementById('displayCenter');
var displayRight = document.getElementById('displayRight');

function displayProduct () {
  displayedProductLeft = Math.floor(Math.random() * allProducts.length);
  displayLeft.innerHTML = '<img src = "img/' + allProducts[displayedProductLeft].filePath + '">';

  displayedProductCenter = Math.floor(Math.random() * allProducts.length);
  while (displayedProductCenter === displayedProductLeft) {
    displayedProductCenter = Math.floor(Math.random() * allProducts.length);
  }
  displayCenter.innerHTML = '<img src = "img/' + allProducts[displayedProductCenter].filePath + '">';

  displayedProductRight = Math.floor(Math.random() * allProducts.length);
  while (displayedProductRight === displayedProductLeft || displayedProductRight === displayedProductCenter) {
    displayedProductRight = Math.floor(Math.random() * allProducts.length);
  }
  displayRight.innerHTML = '<img src = "img/' + allProducts[displayedProductRight].filePath + '">';
}

displayProduct();

displayLeft.addEventListener('click', handleClickLeft);
displayCenter.addEventListener('click', handleClickCenter);
displayRight.addEventListener('click', handleClickRight);


function genericClickMethods() {
  console.log(event);
  totalClicks += 1;
  allProducts[displayedProductLeft].timesDisplayed += 1;
  allProducts[displayedProductCenter].timesDisplayed += 1;
  allProducts[displayedProductRight].timesDisplayed += 1;
  if (alreadyDisplayed.indexOf(displayedProductLeft) === -1) {
    alreadyDisplayed.push(displayedProductLeft);
  }
  if (alreadyDisplayed.indexOf(displayedProductCenter) === -1) {
    alreadyDisplayed.push(displayedProductCenter);
  }
  if (alreadyDisplayed.indexOf(displayedProductRight) === -1) {
    alreadyDisplayed.push(displayedProductRight);
  }
  checkForButton();
  displayProduct();
  localStorage.setItem('dataPersist', JSON.stringify(allProducts));
}
function handleClickLeft(event) {
  allProducts[displayedProductLeft].timesClicked += 1;
  genericClickMethods();
}

function handleClickCenter(event) {
  allProducts[displayedProductCenter].timesClicked += 1;
  genericClickMethods();
}

function handleClickRight(event) {
  allProducts[displayedProductRight].timesClicked += 1;
  genericClickMethods();
}

var resultsButton = document.getElementById('resultsButton');
checkForButton();
function checkForButton () {
  if (totalClicks < 25) {
    console.log('totalClicks is: ' + totalClicks);
    resultsButton.style.display = 'none';
  }
  else {
    resultsButton.style.display = 'block';
  }
}

resultsButton.addEventListener('click', handleButtonClick);

var clearLS = document.getElementById('clearLS');
var handleLSClear = function() {
  console.log('Clearing Local Storage');
  localStorage.clear();
};

clearLS.addEventListener('click', handleLSClear);

function renderList() {
  resultsDisplay.textContent = '';
  var errorMessage = document.createElement('p');
  errorMessage.textContent = 'You can click "Display Updated Results" to render this in a chart once all ' + allProducts.length + ' products have been displayed at least once (you will have to click an item one last time once your final item appears before updating as well). Thus far, ' + alreadyDisplayed.length + ' products have been displayed.';
  resultsDisplay.appendChild(errorMessage);
  var displayList = document.createElement('ul');
  for (var i = 0; i < allProducts.length; i++) {
    allProducts[i].findPercentClicked();
    var productResults = document.createElement('li');
    productResults.textContent = allProducts[i].productName + ' has receieved ' + allProducts[i].timesClicked + ' clicks after being displayed ' + allProducts[i].timesDisplayed + ' times, for a ' + allProducts[i].findPercentClicked() + '% selection rate';
    displayList.appendChild(productResults);
  }
  resultsDisplay.appendChild(displayList);
}

function createRawClicksChart() {
  var rawBarData = {
    labels : [],
    datasets : [
      {
        fillColor : '#B1FFFF',
        strokeColor : 'black',
        data : []
      },
      {
        fillColor: '#0E00C4',
        strokeColor: 'black',
        data: []
      }
    ]
  };
  for (var i = 0; i < allProducts.length; i++) {
    rawBarData.labels.push(allProducts[i].productName);
    rawBarData.datasets[0].data.push(allProducts[i].timesClicked);
    rawBarData.datasets[1].data.push(allProducts[i].timesDisplayed);
  }
  var rawResults = document.getElementById('rawResultsChart').getContext('2d');
  new Chart(rawResults).bar(rawBarData);
}
