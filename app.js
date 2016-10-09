'use strict';

var itemsArray = [];
var count = 0;
var selectionDisplay = document.getElementById('selectionDisplay');
var choices = document.getElementById('choices');
var results = document.getElementById('results');
var complete = document.getElementById('complete');
var clear = document.getElementById('clear');
var chartData = document.getElementById('displayCharts');

//checking if LS exist
if (localStorage.getItem('itemsArray')){
  retrieveLS();
} else {
  console.log('It doesn\'t exist');
  //else it makes all new BusMallItem
  new BusMallItem('img/banana.jpg', 'Banana Slicer', 'banana');
  new BusMallItem('img/bathroom.jpg', 'Bathroom', 'bathroom' );
  new BusMallItem('img/boots.jpg', 'Boots', 'boots' );
  new BusMallItem('img/breakfast.jpg', 'Toaster', 'breakfast' );
  new BusMallItem('img/bubblegum.jpg', 'Meatball gum', 'bubblegum' );
  new BusMallItem('img/chair.jpg', 'Chair', 'chair' );
  new BusMallItem('img/cthulhu.jpg', 'Cthulhu', 'cthulhu' );
  new BusMallItem('img/dog-duck.jpg', 'Dog Duck', 'dog-duck' );
  new BusMallItem('img/dragon.jpg', 'Dragon', 'dragon' );
  new BusMallItem('img/pen.jpg', 'Pen', 'pen' );
  new BusMallItem('img/pet-sweep.jpg', 'Pet Sweep', 'pet-sweep' );
  new BusMallItem('img/scissors.jpg', 'Pizza Scissors', 'scissors' );
  new BusMallItem('img/shark.jpg', 'Shark', 'shark' );
  new BusMallItem('img/sweep.jpg', 'Sweeper', 'sweep' );
  new BusMallItem('img/tauntaun.jpg', 'Tauntaun', 'tauntaun' );
  new BusMallItem('img/unicorn.jpg', 'Unicorn', 'unicorn' );
  new BusMallItem('img/usb.jpg', 'USB', 'usb' );
  new BusMallItem('img/water-can.jpg', 'Water Can', 'water-can' );
  new BusMallItem('img/wine-glass.jpg', 'Wine glass', 'wine-glass' );
  console.log(itemsArray);
}

function makeLS() {
  localStorage.setItem('itemsArray', JSON.stringify(itemsArray));
  console.log('make LS');
}

function retrieveLS() {
  //retrieves data from LS and puts in parsedData variable
  var parsedData = JSON.parse(localStorage.getItem('itemsArray'));
  console.log(parsedData, 'retrieve LS');
  //loop through parsedData
  for (var i = 0; i < parsedData.length; i++) {
    var currentProduct = parsedData[i];
    //make a new BusMallItem with timesClicked and timesDisplayed properties from the previous itemsArray
    new BusMallItem(currentProduct.imageSource, currentProduct.displayName, currentProduct.name, currentProduct.timesDisplayed, currentProduct.timesClicked);
  }
}

function BusMallItem(imgSrc, displayName, name, timesDisplayed, timesClicked){
  this.imageSource = imgSrc;
  this.displayName = displayName;
  this.name = name;
  this.timesDisplayed = timesDisplayed || 0; //if no parameter put 0
  this.timesClicked = timesClicked || 0; //if no parameter put 0
  this.recentlyUsed = false;

  this.displayItem = function(){
    var lineElement = document.createElement('li');
    var imageElement = document.createElement('img');
    imageElement.src = this.imageSource;
    imageElement.alt = this.name;
    lineElement.appendChild(imageElement);
    choices.appendChild(lineElement);
  };
  itemsArray.push(this);
}

function getThreeItems(){
  var threeItemArray = [];
  var indexArray = [];
  var validItem = true;
  while(threeItemArray.length != 3){
    var item = itemsArray[Math.floor(Math.random() * itemsArray.length)];
    for (var i = 0; i < threeItemArray.length; i++){
      if (threeItemArray[i].name === item.name){
        console.log('Duplicate picture prevented ' + item.name);
        validItem = false;
      }
    }
    if (validItem && item.recentlyUsed !== true){
      indexArray.push(findIndexByName(item.name));
      threeItemArray.push(item);
      item.timesDisplayed += 1;
    }
    else {
      console.log('tried to duplicate ' + item.name);
      validItem = true;
    }
  }
  clearRecentlyUsed();
  itemsArray[indexArray[0]].recentlyUsed = true;
  itemsArray[indexArray[1]].recentlyUsed = true;
  itemsArray[indexArray[2]].recentlyUsed = true;
  return threeItemArray;
}

function findIndexByName(name){
  for (var i = 0; i < itemsArray.length; i++){
    if (itemsArray[i].name === name){
      return i;
    }
  }
  return -1;
}

function clearRecentlyUsed(){
  for (var i = 0; i < itemsArray.length; i++){
    itemsArray[i].recentlyUsed = false;
  }
}

function displayThreeItems(){
  choices.innerHTML = '';
  var threeItems = getThreeItems();
  for (var i = 0; i < 3; i++){
    threeItems[i].displayItem();
  }
}
function runMain(){
  displayThreeItems();
}

function handleClickEvent(event){
  if(event.target.alt === undefined){//eslint-disable-line
    console.log('Invalid click response');
    return alert('You must click on an image');
  }

  var choice = event.target.alt;
  for (var i = 0; i < itemsArray.length; i++){
    if(itemsArray[i].name === choice){
      itemsArray[i].timesClicked += 1;
    }
  }
  displayThreeItems();
  count++;
  if (count === 25){
    removeListenerAndUpdate();
    makeLS();
  }
}

function removeListenerAndUpdate(){
  selectionDisplay.removeEventListener('click',handleClickEvent);
  complete.textContent = 'See Results';
  clear.textContent = 'Clear LS';
}

function displayResults(){
  results.innerHTML = '';
  for (var i = 0; i < itemsArray.length; i++){
    var lineElement = document.createElement('li');
    lineElement.setAttribute('class', 'disp');
    lineElement.textContent = itemsArray[i].name + ': Clicked - ' + itemsArray[i].timesClicked + '/' + itemsArray[i].timesDisplayed;
    results.appendChild(lineElement);
  }
  prepareLabelsAndData();
  drawChart();
}

selectionDisplay.addEventListener('click', handleClickEvent);
complete.addEventListener('click',displayResults);
var labelArray = [];
var dataArray = [];
function prepareLabelsAndData(){
  for (var i = 0; i < itemsArray.length; i++){
    labelArray[i] = itemsArray[i].name;
    labelArray[i] = labelArray[i].charAt(0).toUpperCase() + labelArray[i].slice(1);
    dataArray[i] = itemsArray[i].timesClicked;
  }
}
clear.addEventListener('click', function(){
  localStorage.clear();
});

var data = {
  labels: labelArray,
  datasets: [
    {
      data: dataArray,
      backgroundColor: [
        'cyan', 'black', 'cyan', 'black', 'cyan', 'black', 'cyan', 'black', 'cyan', 'black', 'cyan', 'black', 'cyan', 'black', 'cyan', 'black', 'cyan', 'black', 'cyan'
      ],
    }]
};

function drawChart() {
  var voteChart = new Chart(chartData,{
    title: {
      text: 'Choices chart'
    },
    type: 'bar',
    data: data,
    options: {responsive: false},
    scales: [{ticks:{ beginAtZero:true}}] });
  console.log(voteChart);
}

runMain();
