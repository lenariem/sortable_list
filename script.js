const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const largestCountries = [
  'Russia (17,098,242)',
  'Canada (9,984,670)',
  'United States (9,826,675)',
  'China (9,596,961)',
  'Brazil (8,514,877)',
  'Australia (7,741,220)',
  'India (3,287,263)',
  'Argentina (2,780,400)',
  'Kazakhstan	(2,724,900)',
  'Algeria (2,381,741)'
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
  })

}
