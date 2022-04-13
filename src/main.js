// Fetch the items from the JSON file
function loadItems() {
  return fetch('data/data.json') //
    .then((response) => response.json())
    .then((json) => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector('#list');
  container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

// 데이터를 받아와서 html에 추가하기
function createHTMLString(item) {
  return `
  <li class="listbox">
    <img src="${item.image}" alt="${item.type}" class="item_image" />
    <span class="detail"> ${item.type}, ${item.gender}, ${item.size}, ${item.color}</span>
  </li>
  `;
}
// 이벤트를 처리하는 함수는 보통 이름 앞에 on을 붙임
function onButtonClick(event, items) {
  const target = event.target;
  const key = target.dataset.key;
  const value = target.dataset.value;
  if (key == null || value == null) {
    return;
  }
  updateItems(items, key, value);
}

function updateItems(items, key, value) {
  items.forEach((item) => {
    if (item.dataset[key] === value) {
      item.classList.remove('invisible');
    } else {
      item.classList.add('invisible');
    }
  });
}

function setEventListnerers(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('#menu');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', (event) => onButtonClick(event, items));
}

// main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListnerers(items);
  })
  .catch((error) => {
    console.log(error);
  });
