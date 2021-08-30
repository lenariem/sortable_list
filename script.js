const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');
const restart = document.getElementById('restart');
const answerBtn = document.getElementById('answer');
const answerImg = document.getElementById('overlay');
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

// Store list items
const listItems = [];
//console.log(listItems);

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  [...largestCountries]
    .map(item => ({value: item, sort: Math.random()}))
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
  swapItems(dragStartIndex,dragEndIndex);

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
console.log( countryName )
    if(countryName !== largestCountries[index].toUpperCase()) {
      listItem.classList.add('wrong');
      console.log( countryName );
      console.log(largestCountries[index])
    } else {
      listItem.classList.remove('wrong');
      console.log( countryName )
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

answerClose.addEventListener('click', () => answerImg.style.transform = "translateX(-200%)")

