// NusaStat views: one template function per page. Each returns an HTML string
// that app.js drops into the page shell. Every figure carries its source and year.

import { INDICATORS, SERIES, PROVINCES, AGE_STRUCTURE, HEALTH_EDUCATION, RELEASES, indicatorsByTopic } from "./data.js";
import { lineChart, barChart, donutChart } from "./charts.js";

function sourceLine(source, year) {
  return '<p class="source">Source: ' + source + ", " + year + "</p>";
}

function indicatorCard(item) {
  return (
    '<article class="card indicator" data-name="' + item.name.toLowerCase() + '">' +
    '<h3>' + item.name + "</h3>" +
    '<p class="big">' + item.display + ' <span class="unit">' + item.unit + "</span></p>" +
    "<p>" + item.note + "</p>" +
    '<p class="change">' + item.change + "</p>" +
    sourceLine(item.source, item.year) +
    "</article>"
  );
}

function chartCard(title, chartHtml, source, year, controlHtml) {
  return (
    '<section class="card chart-card"><div class="chart-head"><h3>' + title + "</h3>" +
    (controlHtml || "") + "</div>" +
    chartHtml + sourceLine(source, year) + "</section>"
  );
}

export function overviewView() {
  const cards = INDICATORS.map(indicatorCard).join("");
  const topProvinces = PROVINCES.slice(0, 5)
    .map((p) => "<li><span>" + p.name + "</span><strong>" + p.population.toFixed(1) + "m</strong></li>")
    .join("");
  const releases = RELEASES.map(
    (r) => '<li><span class="rel-date">' + r.date + '</span> ' + r.title + ' <em>(' + r.source + ")</em></li>",
  ).join("");
  return (
    '<section class="hero"><p class="eyebrow">National Statistics Portal &middot; Indonesia</p>' +
    "<h1>Indonesia in numbers.</h1>" +
    '<p class="lede">Population, economy, health and education for the world&rsquo;s fourth largest country, ' +
    "from the sources that publish them. Every figure names its source and year.</p>" +
    '<p class="hero-actions"><a class="btn" href="#/economy">Explore the economy</a> ' +
    '<a class="btn ghost" href="#/regions">See the provinces</a></p></section>' +
    '<section><div class="section-head"><h2>At a glance</h2>' +
    '<label class="search">Search indicators <input id="indicator-search" type="search" placeholder="Try &ldquo;poverty&rdquo; or &ldquo;GDP&rdquo;" aria-label="Search indicators"></label></div>' +
    '<div class="grid" id="indicator-grid">' + cards + "</div>" +
    '<p class="empty-note" id="no-indicators" hidden>No indicator matches that search.</p></section>' +
    '<section class="two-col">' +
    chartCard(
      "Real GDP growth, 2015-2024",
      '<div id="growth-chart">' + lineChart(SERIES.gdpGrowth, {}) + "</div>",
      SERIES.gdpGrowth.source, 2024,
      '<label class="chart-control">Range <select id="growth-range"><option value="all" selected>2015-2024</option><option value="recent">2020-2024</option><option value="early">2015-2019</option></select></label>',
    ) +
    chartCard(
      "Population, 2015-2024",
      lineChart(SERIES.population, {}),
      SERIES.population.source, 2024,
    ) +
    "</section>" +
    '<section class="two-col"><div class="card"><h3>Largest provinces</h3>' +
    '<ol class="ranked">' + topProvinces + "</ol>" +
    '<p><a href="#/regions">All provinces &rarr;</a></p>' +
    sourceLine("Statistics Indonesia (BPS)", 2024) + "</div>" +
    '<div class="card"><h3>Latest releases</h3><ul class="releases">' + releases + "</ul></div></section>"
  );
}

export function economyView() {
  const cards = indicatorsByTopic("economy").map(indicatorCard).join("");
  return (
    "<h1>Economy</h1>" +
    '<p class="lede">Output, prices and trade for Indonesia, with the source and year on every figure.</p>' +
    '<div class="grid">' + cards + "</div>" +
    '<section class="two-col">' +
    chartCard("Real GDP growth, 2015-2024", lineChart(SERIES.gdpGrowth, {}), SERIES.gdpGrowth.source, 2024) +
    chartCard("GDP per capita, 2015-2024", lineChart(SERIES.gdpPerCapita, {}), SERIES.gdpPerCapita.source, 2024) +
    "</section>" +
    '<section class="card"><h3>Trade and finance, 2024</h3>' +
    '<table class="data-table"><thead><tr><th>Measure</th><th>Value</th><th>Source</th></tr></thead><tbody>' +
    "<tr><td>Exports of goods and services</td><td>22.2% of GDP</td><td>World Bank WDI, 2024</td></tr>" +
    "<tr><td>Imports of goods and services</td><td>20.4% of GDP</td><td>World Bank WDI, 2024</td></tr>" +
    "<tr><td>Foreign direct investment, net inflows</td><td>US$ 24.2 billion</td><td>World Bank WDI, 2024</td></tr>" +
    "<tr><td>General government gross debt</td><td>40.8% of GDP</td><td>IMF, 2025</td></tr>" +
    "<tr><td>Gini index</td><td>34.9</td><td>World Bank WDI, 2024</td></tr>" +
    "</tbody></table>" +
    '<p><button class="btn small" data-csv="trade">Download this table (CSV)</button></p></section>'
  );
}

export function peopleView() {
  const cards = indicatorsByTopic("people").map(indicatorCard).join("");
  return (
    "<h1>People</h1>" +
    '<p class="lede">How many Indonesians there are, how old they are, and how they work.</p>' +
    '<div class="grid">' + cards + "</div>" +
    '<section class="two-col">' +
    chartCard("Population, 2015-2024", lineChart(SERIES.population, {}), SERIES.population.source, 2024) +
    '<section class="card chart-card"><h3>Age structure, 2024</h3>' +
    donutChart(AGE_STRUCTURE, {}) + sourceLine("World Bank WDI", 2024) + "</section>" +
    "</section>" +
    '<section class="two-col">' +
    chartCard("Poverty rate, national line, 2015-2024", lineChart(SERIES.poverty, {}), SERIES.poverty.source, 2024) +
    chartCard("Unemployment rate, 2019-2024", lineChart(SERIES.unemployment, {}), SERIES.unemployment.source, 2024) +
    "</section>" +
    '<section class="card"><h3>Labour force, 2024</h3>' +
    '<table class="data-table"><thead><tr><th>Measure</th><th>Value</th><th>Source</th></tr></thead><tbody>' +
    "<tr><td>Labour force</td><td>143.1 million people</td><td>ILO, 2024</td></tr>" +
    "<tr><td>Labour force participation</td><td>67.0%</td><td>World Bank WDI, 2024</td></tr>" +
    "<tr><td>Female labour participation</td><td>53.6%</td><td>World Bank WDI, 2024</td></tr>" +
    "<tr><td>Youth unemployment (ages 15-24)</td><td>13.1%</td><td>World Bank WDI, 2024</td></tr>" +
    "<tr><td>Urban population</td><td>58.8% of total</td><td>World Bank WDI, 2024</td></tr>" +
    "</tbody></table></section>"
  );
}

export function healthView() {
  const rows = HEALTH_EDUCATION.map(
    (r) => "<tr><td>" + r.name + "</td><td>" + r.value + " " + r.unit + "</td><td>" + r.source + ", " + r.year + "</td></tr>",
  ).join("");
  return (
    "<h1>Health and education</h1>" +
    '<p class="lede">How long Indonesians live, how healthy they are, and how far they go in school.</p>' +
    '<div class="grid">' + indicatorsByTopic("health").map(indicatorCard).join("") + "</div>" +
    '<section class="card"><h3>Health and education in full</h3>' +
    '<table class="data-table"><thead><tr><th>Measure</th><th>Value</th><th>Source</th></tr></thead><tbody>' + rows + "</tbody></table>" +
    '<p><button class="btn small" data-csv="health">Download this table (CSV)</button></p>' +
    "<p>Life expectancy at birth is 73.4 years for women and 69.2 years for men (World Bank WDI, 2024). " +
    "Fertility is 2.1 births per woman (2023), and 24.6% of the population is under 15.</p></section>"
  );
}

export function regionsView() {
  const rows = PROVINCES.map(
    (p) =>
      "<tr><td>" + p.name + "</td><td>" + p.population.toFixed(1) + "</td><td>" + p.share.toFixed(1) + "%</td></tr>",
  ).join("");
  const bars = PROVINCES.slice(0, 10).map((p) => ({
    label: p.name,
    value: p.population,
    valueLabel: p.population.toFixed(1) + "m",
  }));
  return (
    "<h1>Provinces</h1>" +
    '<p class="lede">Indonesia has 38 provinces. Java is home to about 56% of the population. ' +
    "Click a column heading to sort the table.</p>" +
    '<section class="card chart-card"><h3>Population of the ten largest provinces, 2024</h3>' +
    barChart(bars, {}) + sourceLine("Statistics Indonesia (BPS), mid-year estimates", 2024) + "</section>" +
    '<section class="card"><div class="section-head"><h3>All provinces listed</h3>' +
    '<label class="search">Filter <input id="province-search" type="search" placeholder="Type a province name" aria-label="Filter provinces"></label></div>' +
    '<table class="data-table sortable" id="province-table"><thead><tr>' +
    '<th data-sort="name">Province</th><th data-sort="population">Population (millions)</th><th data-sort="share">Share of Indonesia</th>' +
    "</tr></thead><tbody>" + rows + "</tbody></table>" +
    sourceLine("Statistics Indonesia (BPS), mid-year estimates", 2024) +
    '<p><button class="btn small" data-csv="provinces">Download this table (CSV)</button></p></section>'
  );
}

export function methodsView() {
  return (
    "<h1>Methods and sources</h1>" +
    '<p class="lede">How NusaStat is built, where every number comes from, and what it does not claim.</p>' +
    '<section class="card"><h3>Sources</h3><ul class="source-list">' +
    "<li><strong>World Bank, World Development Indicators.</strong> Population, GDP, GDP per capita, growth, trade, unemployment, life expectancy, age structure, enrolment, internet use. Latest vintage as of November 2026.</li>" +
    "<li><strong>Statistics Indonesia (BPS).</strong> National poverty rate (September), consumer price inflation, provincial population estimates.</li>" +
    "<li><strong>International Labour Organization (ILO).</strong> Modelled unemployment and labour force figures, via World Bank WDI.</li>" +
    "<li><strong>International Monetary Fund (IMF).</strong> General government gross debt, 2025.</li>" +
    "<li><strong>United Nations Development Programme (UNDP).</strong> Human Development Index, 2022.</li>" +
    "</ul></section>" +
    '<section class="card"><h3>What this site is</h3>' +
    "<p>NusaStat is an independent statistics portal built for this competition. It is not affiliated with " +
    "Statistics Indonesia, the World Bank, the IMF or the United Nations, and it republishes their published " +
    "figures with the source and year on every figure. Where two sources disagree, the site says which one it uses.</p>" +
    "<p>Figures are rounded for display; charts use the published annual values. Population and GDP series are " +
    "World Bank WDI annual values, 2015 to 2024. The poverty series is the BPS national line measured each September.</p></section>" +
    '<section class="card"><h3>Release calendar</h3>' +
    "<p>BPS publishes the consumer price index in the first week of each month, GDP growth about five weeks after " +
    "each quarter ends, and the poverty profile twice a year. World Bank WDI is updated several times a year.</p></section>"
  );
}
