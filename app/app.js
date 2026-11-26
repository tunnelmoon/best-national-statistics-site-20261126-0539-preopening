// NusaStat app: hash router and page controls. One job: read the hash,
// render the matching view from views.js, then wire that page's controls
// (search, year-range buttons, table sort and filter, CSV downloads).

import { VIEWS } from './views.js';
import { KEY_INDICATORS, SERIES, YEARS, HEALTH_EDUCATION, PROVINCES, toCsv } from './data.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('[data-route]')];
let economyRange = 'all';

function downloadCsv(filename, csv) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function wireOverview() {
  const input = document.getElementById('indicator-search');
  const table = document.getElementById('indicator-table');
  const count = document.getElementById('indicator-count');
  if (!input || !table) return;
  const rows = [...table.querySelectorAll('tbody tr')];
  const apply = () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    for (const row of rows) {
      const hit = row.textContent.toLowerCase().includes(q);
      row.style.display = hit ? '' : 'none';
      if (hit) shown += 1;
    }
    count.textContent = q ? `${shown} of ${rows.length} indicators match "${input.value.trim()}"` : '';
  };
  input.addEventListener('input', apply);
}

function wireEconomy() {
  for (const btn of document.querySelectorAll('[data-range]')) {
    btn.addEventListener('click', () => {
      economyRange = btn.dataset.range;
      render();
    });
  }
  const dl = document.getElementById('download-trade');
  if (dl) {
    dl.addEventListener('click', () => {
      const rows = YEARS.map((y, i) => [y, SERIES.exports.values[i], SERIES.imports.values[i]]);
      downloadCsv('nusastat-trade-2015-2024.csv', toCsv(['Year', 'Exports % of GDP', 'Imports % of GDP'], rows));
    });
  }
}

function wireHealth() {
  const dl = document.getElementById('download-health');
  if (dl) {
    dl.addEventListener('click', () => {
      const rows = HEALTH_EDUCATION.map((ind) => [ind.name, ind.value, ind.source, ind.year]);
      downloadCsv('nusastat-health-education.csv', toCsv(['Indicator', 'Value', 'Source', 'Year'], rows));
    });
  }
}

function wireProvinces() {
  const table = document.getElementById('province-table');
  const filter = document.getElementById('province-filter');
  if (!table) return;
  const body = table.querySelector('tbody');
  let sortKey = 'population';
  let sortDir = -1;
  let query = '';
  const draw = () => {
    const rows = PROVINCES.filter((p) => p.name.toLowerCase().includes(query))
      .sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0) * sortDir);
    body.innerHTML = rows.map((p) => `<tr>
      <td>${p.name}</td><td class="num">${p.population.toFixed(1)}</td>
      <td class="num">${p.poverty.toFixed(1)}%</td><td class="num">${p.gdpShare.toFixed(1)}%</td>
    </tr>`).join('');
  };
  for (const btn of table.querySelectorAll('.sort')) {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      if (sortKey === key) sortDir *= -1;
      else { sortKey = key; sortDir = key === 'name' ? 1 : -1; }
      draw();
    });
  }
  if (filter) filter.addEventListener('input', () => { query = filter.value.trim().toLowerCase(); draw(); });
  const dl = document.getElementById('download-provinces');
  if (dl) {
    dl.addEventListener('click', () => {
      const rows = PROVINCES.map((p) => [p.name, p.population, p.poverty, p.gdpShare]);
      downloadCsv('nusastat-provinces.csv', toCsv(['Province', 'Population millions 2024', 'Poverty % Sep 2024', 'Share of GDP % 2024'], rows));
    });
  }
}

const WIRING = { overview: wireOverview, economy: wireEconomy, health: wireHealth, provinces: wireProvinces };

function route() {
  const hash = location.hash.replace(/^#\/?/, '');
  const name = hash.split('/')[0] || 'overview';
  return VIEWS[name] ? name : 'overview';
}

function render() {
  const name = route();
  app.innerHTML = name === 'economy' ? VIEWS.economy(economyRange) : VIEWS[name]();
  for (const link of navLinks) link.classList.toggle('active', link.dataset.route === name);
  document.title = `NusaStat: ${name[0].toUpperCase() + name.slice(1)} | National Statistics Portal of Indonesia`;
  if (WIRING[name]) WIRING[name]();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
