// NusaStat views: six page templates rendered by the hash router in app.js.
// Every figure carries its source and year next to it. Views return HTML
// strings; app.js wires the controls after each render.

import { KEY_INDICATORS, SERIES, YEARS, AGE_STRUCTURE, HEALTH_EDUCATION, PROVINCES, SOURCES } from './data.js';
import { lineChart, barChart, donutChart } from './charts.js';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function srcTag(source, year) {
  return `<span class="src">${esc(source)} ${year}</span>`;
}

function card(ind) {
  return `<article class="card">
    <h3>${esc(ind.name)}</h3>
    <p class="big">${esc(ind.value)}</p>
    <p class="detail">${esc(ind.detail || '')}</p>
    <p class="meta">${srcTag(ind.source, ind.year)}</p>
  </article>`;
}

function indicatorRows(list) {
  return list.map((ind) => `<tr>
    <td>${esc(ind.name)}</td><td class="num">${esc(ind.value)}</td>
    <td>${esc(ind.detail || '')}</td><td>${esc(ind.source)}</td><td class="num">${ind.year}</td>
  </tr>`).join('');
}

export function viewOverview() {
  const cards = KEY_INDICATORS.slice(0, 8).map(card).join('');
  return `<section class="hero">
    <p class="kicker">National Statistics Portal of Indonesia</p>
    <h1>Indonesia in numbers, <span>2024</span></h1>
    <p class="lede">Ten headline indicators, ten years of series, and every province,
    drawn from the World Bank, BPS Statistics Indonesia and the ILO. No
    estimates of our own, every figure carries its source and year.</p>
  </section>
  <section class="grid cards">${cards}</section>
  <section class="panel">
    <div class="panel-head">
      <h2>Find an indicator</h2>
      <input id="indicator-search" type="search" placeholder="Search indicators, for example poverty or trade" aria-label="Search indicators">
    </div>
    <table class="data" id="indicator-table">
      <thead><tr><th>Indicator</th><th>Value</th><th>Note</th><th>Source</th><th>Year</th></tr></thead>
      <tbody>${indicatorRows(KEY_INDICATORS)}</tbody>
    </table>
    <p class="count" id="indicator-count"></p>
  </section>
  <section class="panel">
    <h2>GDP 2015-2024: growth, then the Covid dip, then recovery</h2>
    <div class="chart">${lineChart(YEARS, SERIES.gdp.values, { label: 'GDP of Indonesia 2015 to 2024, current US dollars', unit: 'bn $' })}</div>
    <p class="meta">GDP fell from $1,119bn in 2019 to $1,060bn in 2020, then rose every year after. ${srcTag(SERIES.gdp.source, 2024)}</p>
    <p><a class="btn" href="#/economy">Open the economy page</a></p>
  </section>`;
}

export function viewEconomy(range = 'all') {
  const ranges = { all: [2015, 2024], recent: [2020, 2024], early: [2015, 2019] };
  const [from, to] = ranges[range] || ranges.all;
  const idx = YEARS.map((y, i) => (y >= from && y <= to ? i : -1)).filter((i) => i >= 0);
  const yrs = idx.map((i) => YEARS[i]);
  const gdp = idx.map((i) => SERIES.gdp.values[i]);
  const growth = idx.map((i) => SERIES.growth.values[i]);
  const btn = (key, label) => `<button class="seg${range === key ? ' active' : ''}" data-range="${key}">${label}</button>`;
  const tradeRows = YEARS.map((y, i) => `<tr><td class="num">${y}</td><td class="num">${SERIES.exports.values[i].toFixed(1)}%</td><td class="num">${SERIES.imports.values[i].toFixed(1)}%</td></tr>`).join('');
  return `<section class="hero slim">
    <p class="kicker">Economy</p>
    <h1>The economy: $1.40 trillion in 2024</h1>
    <p class="lede">Indonesia is the 16th largest economy in the world and the largest in
    Southeast Asia. Growth has run near 5% a year for a decade, with one sharp
    interruption: a 2.1% contraction in 2020.</p>
  </section>
  <section class="grid cards">
    ${card(KEY_INDICATORS[1])}${card(KEY_INDICATORS[2])}${card(KEY_INDICATORS[3])}${card(KEY_INDICATORS[9])}
  </section>
  <section class="panel">
    <div class="panel-head"><h2>GDP, current US$ billions</h2>
      <div class="segs" role="group" aria-label="Year range">
        ${btn('all', '2015-2024')}${btn('recent', '2020-2024')}${btn('early', '2015-2019')}
      </div>
    </div>
    <div class="chart">${lineChart(yrs, gdp, { label: 'GDP of Indonesia, current US dollars', unit: 'bn $' })}</div>
    <p class="meta">${srcTag(SERIES.gdp.source, 2024)}</p>
  </section>
  <section class="panel">
    <h2>Real GDP growth, annual %</h2>
    <div class="chart">${barChart(yrs.map(String), growth, { label: 'Real GDP growth of Indonesia', unit: '%' })}</div>
    <p class="meta">The 2020 bar is negative: the only contraction in the decade. ${srcTag(SERIES.growth.source, 2024)}</p>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Trade as a share of GDP</h2>
      <button class="btn" id="download-trade">Download CSV</button>
    </div>
    <table class="data"><thead><tr><th>Year</th><th>Exports, % of GDP</th><th>Imports, % of GDP</th></tr></thead>
    <tbody>${tradeRows}</tbody></table>
    <p class="meta">${srcTag(SERIES.exports.source, 2024)}</p>
  </section>`;
}

export function viewPeople() {
  return `<section class="hero slim">
    <p class="kicker">People</p>
    <h1>283.5 million people, still growing</h1>
    <p class="lede">Indonesia is the fourth most populous country on earth. Two in three
    people are of working age, and the poverty rate fell to its lowest ever
    recorded level in September 2024.</p>
  </section>
  <section class="grid cards">
    ${card(KEY_INDICATORS[0])}${card(KEY_INDICATORS[5])}${card(KEY_INDICATORS[4])}${card(KEY_INDICATORS[8])}
  </section>
  <section class="panel">
    <h2>Population 2015-2024, millions</h2>
    <div class="chart">${lineChart(YEARS, SERIES.population.values, { label: 'Population of Indonesia 2015 to 2024', unit: 'm' })}</div>
    <p class="meta">${srcTag(SERIES.population.source, 2024)}</p>
  </section>
  <section class="duo">
    <div class="panel">
      <h2>Who lives here: age structure, 2024</h2>
      <div class="chart small">${donutChart(AGE_STRUCTURE, { label: 'Age structure of Indonesia 2024' })}</div>
      <ul class="legend">${AGE_STRUCTURE.map((s, i) => `<li><span class="dot" style="background:${['#0c4a45', '#d9930d', '#7fa8a0'][i]}"></span>${esc(s.label)}: <strong>${s.value}%</strong></li>`).join('')}</ul>
      <p class="meta">${srcTag('World Bank WDI', 2024)}</p>
    </div>
    <div class="panel">
      <h2>Poverty rate, % (March observation)</h2>
      <div class="chart">${lineChart(YEARS, SERIES.poverty.values, { label: 'Poverty rate of Indonesia 2015 to 2024', unit: '%' })}</div>
      <p class="meta">September 2024: 8.57%, the lowest since BPS began publishing the series in 1960. ${srcTag(SERIES.poverty.source, 2024)}</p>
    </div>
  </section>
  <section class="panel">
    <h2>Unemployment, % of labour force</h2>
    <div class="chart">${lineChart(YEARS, SERIES.unemployment.values, { label: 'Unemployment in Indonesia 2015 to 2024', unit: '%' })}</div>
    <p class="meta">Modelled ILO estimate. ${srcTag(SERIES.unemployment.source, 2024)}</p>
  </section>`;
}

export function viewHealth() {
  const cards = HEALTH_EDUCATION.slice(0, 4).map(card).join('');
  const rows = HEALTH_EDUCATION.map((ind) => `<tr>
    <td>${esc(ind.name)}</td><td class="num">${esc(ind.value)}</td>
    <td>${esc(ind.detail || '')}</td><td>${esc(ind.source)}</td><td class="num">${ind.year}</td>
  </tr>`).join('');
  return `<section class="hero slim">
    <p class="kicker">Health and Education</p>
    <h1>Living longer, learning more</h1>
    <p class="lede">Life expectancy reached 71.3 years in 2024, up from 69.6 a decade
    earlier, and primary school enrolment is effectively universal. Health
    spending remains low at 2.7% of GDP.</p>
  </section>
  <section class="grid cards">${cards}</section>
  <section class="panel">
    <h2>Life expectancy at birth, years</h2>
    <div class="chart">${lineChart(YEARS, SERIES.lifeExpectancy.values, { label: 'Life expectancy in Indonesia 2015 to 2024', unit: 'yrs' })}</div>
    <p class="meta">The 2021 dip follows the pandemic years. ${srcTag(SERIES.lifeExpectancy.source, 2024)}</p>
  </section>
  <section class="panel">
    <h2>Internet use, % of population</h2>
    <div class="chart">${barChart(YEARS.map(String), SERIES.internet.values, { label: 'Internet use in Indonesia 2015 to 2024', unit: '%' })}</div>
    <p class="meta">Internet use more than tripled in a decade. ${srcTag(SERIES.internet.source, 2024)}</p>
  </section>
  <section class="panel">
    <div class="panel-head"><h2>Health and education indicators</h2>
      <button class="btn" id="download-health">Download CSV</button>
    </div>
    <table class="data"><thead><tr><th>Indicator</th><th>Value</th><th>Note</th><th>Source</th><th>Year</th></tr></thead>
    <tbody>${rows}</tbody></table>
  </section>`;
}

export function viewProvinces() {
  const rows = PROVINCES.map((p) => `<tr>
    <td>${esc(p.name)}</td><td class="num">${p.population.toFixed(1)}</td>
    <td class="num">${p.poverty.toFixed(1)}%</td><td class="num">${p.gdpShare.toFixed(1)}%</td>
  </tr>`).join('');
  return `<section class="hero slim">
    <p class="kicker">Provinces</p>
    <h1>Ten provinces, three quarters of the country</h1>
    <p class="lede">Java holds more than half of all Indonesians, while Jakarta alone
    produces 17.4% of national GDP. Sort the table or filter it to compare
    population, poverty and economic weight.</p>
  </section>
  <section class="panel">
    <div class="panel-head">
      <h2>Largest provinces by population</h2>
      <div class="tools">
        <input id="province-filter" type="search" placeholder="Filter provinces" aria-label="Filter provinces">
        <button class="btn" id="download-provinces">Download CSV</button>
      </div>
    </div>
    <table class="data" id="province-table">
      <thead><tr>
        <th><button class="sort" data-key="name">Province</button></th>
        <th><button class="sort" data-key="population">Population, millions</button></th>
        <th><button class="sort" data-key="poverty">Poverty, %</button></th>
        <th><button class="sort" data-key="gdpShare">Share of GDP, %</button></th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="meta">Population: BPS mid-year estimate 2024. Poverty: BPS September 2024. GDP share: BPS regional accounts 2024. Click a column heading to sort.</p>
  </section>
  <section class="panel">
    <h2>Population by province, millions</h2>
    <div class="chart">${barChart(['W. Java', 'E. Java', 'C. Java', 'N. Sumatra', 'Banten', 'Jakarta', 'S. Sulawesi', 'Lampung', 'S. Sumatra', 'W. Sumatra'], PROVINCES.map((p) => p.population), { label: 'Population of the ten largest provinces', unit: 'm', height: 320 })}</div>
    <p class="meta">West Java alone has more people than most countries. ${srcTag('BPS Statistics Indonesia', 2024)}</p>
  </section>`;
}

export function viewMethods() {
  const list = SOURCES.map((s) => `<li><strong>${esc(s.name)}</strong> (${esc(s.short)}): ${esc(s.note)}</li>`).join('');
  return `<section class="hero slim">
    <p class="kicker">Methods and Sources</p>
    <h1>Where every number comes from</h1>
    <p class="lede">NusaStat is an independent reader of public statistics. It is not
    affiliated with, endorsed by, or connected to the World Bank, BPS
    Statistics Indonesia, the ILO, the IMF or UNDP.</p>
  </section>
  <section class="panel">
    <h2>Sources</h2>
    <ul class="sources">${list}</ul>
  </section>
  <section class="panel">
    <h2>How the figures were chosen</h2>
    <ul class="sources">
      <li><strong>Latest observation wins.</strong> Each headline figure is the most recent published value for its year, shown with that year next to it.</li>
      <li><strong>Series are annual.</strong> Ten-year series run 2015 to 2024. Poverty uses the March observation each year; the September 2024 value of 8.57% is noted where it differs.</li>
      <li><strong>Inflation has two faces.</strong> The headline 1.57% is the BPS December 2024 year-on-year rate; the chart shows the annual average consumer price series from the World Bank.</li>
      <li><strong>Nothing is estimated by us.</strong> No figure on this site is modelled, interpolated or rounded beyond one decimal place by NusaStat. Where a source revises a value, the revised value is the one shown.</li>
      <li><strong>Provinces.</strong> Population is the BPS mid-year estimate, poverty is the BPS September 2024 rate, and GDP share comes from BPS regional accounts.</li>
    </ul>
  </section>
  <section class="panel">
    <h2>Reuse</h2>
    <p>Every table on this site can be downloaded as CSV from its own page.
    Figures may be quoted with their source and year as shown. The site
    itself runs entirely offline from its own files: no request leaves your
    browser.</p>
  </section>`;
}

export const VIEWS = {
  overview: viewOverview,
  economy: viewEconomy,
  people: viewPeople,
  health: viewHealth,
  provinces: viewProvinces,
  methods: viewMethods,
};
