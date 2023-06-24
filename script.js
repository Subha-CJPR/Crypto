fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
.then(response => response.json())
.then(data => {
  renderTable(data); // Render the table with the fetched data
})
.catch(error => {
  console.error(error);
});

// Fetch data using async/await
async function fetchData() {
try {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
  const data = await response.json();
  renderTable(data); // Render the table with the fetched data
} catch (error) {
  console.error(error);
}
}

function renderTable(data) {
const tableBody = document.getElementById('cryptoTableBody');
tableBody.innerHTML = '';

data.forEach(item => {
  const row = document.createElement('tr');
  row.innerHTML = `
  <td><img src=${item.image}></td>
    <td>${item.name}</td>
    <td>${item.symbol}</td>
    <td>$${item.current_price}</td>
    <td>$${item.total_volume}</td>
    <td>$${item.market_cap}</td>
    <td>${item.price_change_percentage}</td>
  `;
  tableBody.appendChild(row);
});
}

function filterData() {
const input = document.getElementById('searchInput');
const searchTerm = input.value.toLowerCase();
const tableRows = document.querySelectorAll('#cryptoTableBody tr');

tableRows.forEach(row => {
  const name = row.cells[0].textContent.toLowerCase();
  const symbol = row.cells[1].textContent.toLowerCase();
  if (name.includes(searchTerm) || symbol.includes(searchTerm)) {
    row.style.display = '';
  } else {
    row.style.display = 'none';
  }
});
}

function sortByMarketCap() {
const tableBody = document.getElementById('cryptoTableBody');
const rows = Array.from(tableBody.getElementsByTagName('tr'));

rows.sort((a, b) => {
  const marketCapA = Number(a.cells[4].textContent.replace(/[^0-9.-]+/g, ''));
  const marketCapB = Number(b.cells[4].textContent.replace(/[^0-9.-]+/g, ''));
  return marketCapA - marketCapB;
});

tableBody.innerHTML = '';
rows.forEach(row => tableBody.appendChild(row));
}

function sortByPercentageChange() {
const tableBody = document.getElementById('cryptoTableBody');
const rows = Array.from(tableBody.getElementsByTagName('tr'));

rows.sort((a, b) => {
  const percentageChangeA = Number(a.cells[5].textContent);
  const percentageChangeB = Number(b.cells[5].textContent);
  return percentageChangeA - percentageChangeB;
});

tableBody.innerHTML = '';
rows.forEach(row => tableBody.appendChild(row));
}
