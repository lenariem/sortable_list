const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const largestCountries = [
  'Russia',
  'Canada',
  'United States',
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
console.log(listItems)

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

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
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
