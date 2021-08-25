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
  })

}
