// sampleData[month] → tiers S/A/B/C/D
const sampleData = {
  April: {
    S: [
      { id:1, name:'Avocado', price:1.20, img:'https://via.placeholder.com/140x80?text=Avocado', isLowest:true },
      { id:2, name:'Strawberry', price:1.10, img:'https://via.placeholder.com/140x80?text=Strawberry', isLowest:false },
    ],
    A: [
      { id:3, name:'Broccoli', price:0.89, img:'https://via.placeholder.com/140x80?text=Broccoli', isLowest:false },
    ],
    B: [
      { id:4, name:'Spinach', price:1.49, img:'https://via.placeholder.com/140x80?text=Spinach', isLowest:false },
    ],
    C: [
      { id:5, name:'Kale', price:null, img:'https://via.placeholder.com/140x80?text=Kale', isLowest:false },
    ],
    D: [
      { id:6, name:'Pineapple', price:null, img:'https://via.placeholder.com/140x80?text=Pineapple', isLowest:false },
    ],
  },
  // add other months...
};

const months = Object.keys(sampleData);

function populateMonthSelect() {
  const sel = document.getElementById('month-select');
  months.forEach((m, i) => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.text = m;
    sel.appendChild(opt);
  });
  sel.addEventListener('change', () => renderTiers(sel.value));
}

function renderTiers(month) {
  const container = document.getElementById('tier-list');
  container.innerHTML = '';
  const data = sampleData[month];
  const tierNames = { S:'Top Picks', A:'Great Deals', B:'Okay', C:'Coming Soon', D:'Skip' };
  const tierIcons = { S:'🏆', A:'👍', B:'👌', C:'⏳', D:'🚫' };

  for (let tier of ['S','A','B','C','D']) {
    const items = data[tier] || [];
    const row = document.createElement('div');
    row.className = 'tier-row';
    row.innerHTML = `
      <h2><span class="icon">${tierIcons[tier]}</span>${tier} — ${tierNames[tier]}</h2>
      <div class="card-container"></div>
    `;
    const cards = row.querySelector('.card-container');
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="name">${item.name}</div>
        <div class="price">${item.price!=null?`$${item.price.toFixed(2)}/lb`:'—'}</div>
        ${item.isLowest?`<div class="badge lowest">📉 Lowest Today</div>`:''}
      `;
      cards.appendChild(card);
    });
    container.appendChild(row);
  }
}

// init
populateMonthSelect();
renderTiers(months[0]);
