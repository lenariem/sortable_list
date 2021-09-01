const draggable_list = document.getElementById('draggable-list');
const title = document.getElementById('title');
const check = document.getElementById('check');
const restart = document.getElementById('restart');
const answerBtn = document.getElementById('answer');
const answerImg = document.getElementById('answer-overlay');
const answerClose = document.getElementById('close-btn');

const largestCountries = [
  'Russia',
  'Canada',
  'USA',
  'China',
  'Brazil',
  'Australia',
  'India',
  'Argentina',
  'Kazakhstan',
  'Algeria'
];

const largestPopulation = [
  'China',
  'India',
  'USA',
  'Indonesia',
  'Pakistan',
  'Brazil',
  'Nigeria',
  'Bangladesh',
  'Russia',
  'Mexico'
];

const largestGDP = [
  'USA',
  'China',
  'Japan',
  'Germany',
  'UK',
  'India',
  'France',
  'Italy',
  'Canada',
  'South Korea'
];

// Store list items
let listItems = [];
//console.log(listItems);

let countriesArray = [];

let dragStartIndex;

function getProperty() {
  const property = title.value;
  countriesArray = [];
  if (property === "area") {
    countriesArray = [...largestCountries];
    answerImg.style.backgroundImage = "url('./area.png')";
  } else if (property === "population") {
    countriesArray = [...largestPopulation];
    answerImg.style.backgroundImage = "url('./population.png')";
  } else {
    countriesArray = [...largestGDP];
    answerImg.style.backgroundImage = "url('./gdp.jpg')";
  }
  
  draggable_list.innerHTML = ``;
  return countriesArray;
}

// Insert list items into DOM
function createList() {
  getProperty();
  listItems = [];
  
  [...countriesArray]
  .map(item => ({
      value: item,
      sort: Math.random()
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(item => item.value)
    .forEach((country, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="country-name">${country}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

createList();

function dragStart() {
  //console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

//swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

//check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const countryName = listItem.querySelector('.draggable').innerText.trim();

    if (countryName !== countriesArray[index].toUpperCase()) {
      listItem.classList.add('wrong');
      /* console.log( countryName );
      console.log(largestCountries[index]); */
    } else {
      listItem.classList.remove('wrong');
      /* console.log( countryName ) */
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(item => {
    item.addEventListener('dragstart', dragStart);
  })

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  })
}

check.addEventListener('click', checkOrder);

restart.addEventListener('click', () => window.location.reload());

answerBtn.addEventListener('click', () => answerImg.style.transform = "translateX(0)");

answerClose.addEventListener('click', () => answerImg.style.transform = "translateX(-200%)");
document.addEventListener('keydown', e =>
  e.key === "Escape" ? answerImg.style.transform = "translateX(-200%)" : false
);

title.addEventListener('change', createList);