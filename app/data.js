// NusaStat data: headline figures for Indonesia, each with its source and year.
// All figures are the latest published values available as of November 2026.
// Sources: World Bank World Development Indicators (WB WDI), Statistics Indonesia
// (BPS), International Monetary Fund (IMF), United Nations Development Programme
// (UNDP), International Labour Organization (ILO). Series values come from the
// same sources; see the Methods page for the full source list.

export const SITE = {
  name: "NusaStat",
  fullName: "NusaStat: National Statistics Portal of Indonesia",
  tagline: "Indonesia in numbers, from the sources that publish them.",
  updated: "November 2026",
};

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// Headline indicators shown on the overview and topic pages.
export const INDICATORS = [
  {
    id: "population",
    topic: "people",
    name: "Population",
    value: 283.5,
    unit: "million",
    display: "283.5m",
    year: 2024,
    source: "World Bank WDI",
    note: "4th largest in the world",
    change: "+0.8% on 2023",
  },
  {
    id: "gdp",
    topic: "economy",
    name: "GDP, current US$",
    value: 1396.3,
    unit: "US$ billion",
    display: "$1.40tn",
    year: 2024,
    source: "World Bank WDI",
    note: "16th largest economy",
    change: "+5.0% real growth",
  },
  {
    id: "gdp-per-capita",
    topic: "economy",
    name: "GDP per capita",
    value: 4925,
    unit: "US$",
    display: "$4,925",
    year: 2024,
    source: "World Bank WDI",
    note: "Upper middle income",
    change: "+1.4% on 2023",
  },
  {
    id: "unemployment",
    topic: "people",
    name: "Unemployment rate",
    value: 3.3,
    unit: "% of labour force",
    display: "3.3%",
    year: 2024,
    source: "ILO / World Bank WDI",
    note: "Modelled ILO estimate",
    change: "Down from 3.6% in 2023",
  },
  {
    id: "poverty",
    topic: "people",
    name: "Poverty rate (national line)",
    value: 8.57,
    unit: "% of population",
    display: "8.57%",
    year: 2024,
    source: "Statistics Indonesia (BPS)",
    note: "September 2024, lowest on record",
    change: "Down from 9.36% in 2023",
  },
  {
    id: "life-expectancy",
    topic: "health",
    name: "Life expectancy at birth",
    value: 71.3,
    unit: "years",
    display: "71.3 yrs",
    year: 2024,
    source: "World Bank WDI",
    note: "Women 73.4, men 69.2",
    change: "+0.2 years on 2023",
  },
  {
    id: "inflation",
    topic: "economy",
    name: "Inflation (CPI, Dec yoy)",
    value: 1.57,
    unit: "%",
    display: "1.57%",
    year: 2024,
    source: "Statistics Indonesia (BPS)",
    note: "Within the 1.5-3.5% target band",
    change: "Down from 2.61% in 2023",
  },
  {
    id: "internet",
    topic: "people",
    name: "People using the internet",
    value: 72.8,
    unit: "% of population",
    display: "72.8%",
    year: 2024,
    source: "World Bank WDI",
    note: "122.5 mobile subscriptions per 100 people",
    change: "+6.3 points on 2023",
  },
];

// Ten-year series, one per chart. Values are the published annual figures.
export const SERIES = {
  gdpGrowth: {
    label: "Real GDP growth",
    unit: "% per year",
    source: "World Bank WDI",
    years: YEARS,
    values: [4.9, 5.0, 5.1, 5.2, 5.0, -2.1, 3.7, 5.3, 5.0, 5.0],
  },
  gdpPerCapita: {
    label: "GDP per capita, current US$",
    unit: "US$",
    source: "World Bank WDI",
    years: YEARS,
    values: [3332, 3563, 3838, 3894, 4135, 3872, 4293, 4726, 4860, 4933],
  },
  population: {
    label: "Total population",
    unit: "million people",
    source: "World Bank WDI",
    years: YEARS,
    values: [258.4, 261.6, 264.7, 267.7, 270.6, 273.5, 276.4, 279.1, 282.1, 283.5],
  },
  poverty: {
    label: "Poverty rate, national line (BPS, September)",
    unit: "% of population",
    source: "Statistics Indonesia (BPS)",
    years: YEARS,
    values: [11.13, 10.7, 10.12, 9.66, 9.22, 10.19, 9.71, 9.57, 9.36, 8.57],
  },
  unemployment: {
    label: "Unemployment rate, modelled ILO estimate",
    unit: "% of labour force",
    source: "ILO / World Bank WDI",
    years: [2019, 2020, 2021, 2022, 2023, 2024],
    values: [3.6, 4.3, 4.4, 3.9, 3.6, 3.3],
  },
  trade: {
    label: "Exports and imports of goods and services",
    unit: "% of GDP",
    source: "World Bank WDI",
    years: [2024],
    values: [22.2],
    extra: { imports: 20.4, fdi: 24.2, debt: 40.8 },
  },
};

// Age structure, 2024, World Bank WDI.
export const AGE_STRUCTURE = [
  { group: "0-14 years", share: 24.6 },
  { group: "15-64 years", share: 68.1 },
  { group: "65+ years", share: 7.3 },
];

// Largest provinces by population, 2024 mid-year estimates, BPS.
export const PROVINCES = [
  { name: "West Java", population: 50.0, share: 17.6 },
  { name: "East Java", population: 41.8, share: 14.7 },
  { name: "Central Java", population: 37.9, share: 13.4 },
  { name: "North Sumatra", population: 15.6, share: 5.5 },
  { name: "Banten", population: 12.4, share: 4.4 },
  { name: "Jakarta", population: 10.6, share: 3.7 },
  { name: "South Sulawesi", population: 9.5, share: 3.4 },
  { name: "Lampung", population: 9.3, share: 3.3 },
  { name: "South Sumatra", population: 8.9, share: 3.1 },
  { name: "West Sumatra", population: 6.0, share: 2.1 },
  { name: "Riau", population: 5.8, share: 2.0 },
  { name: "East Kalimantan", population: 3.9, share: 1.4 },
];

// Health and education figures.
export const HEALTH_EDUCATION = [
  { name: "Infant mortality", value: "15.2", unit: "per 1,000 live births", year: 2024, source: "World Bank WDI" },
  { name: "Maternal mortality", value: "140", unit: "per 100,000 live births", year: 2023, source: "World Bank WDI" },
  { name: "Health spending", value: "2.7%", unit: "of GDP", year: 2023, source: "World Bank WDI" },
  { name: "Physicians", value: "0.5", unit: "per 1,000 people", year: 2023, source: "World Bank WDI" },
  { name: "Primary school enrolment, gross", value: "100.4%", unit: "of school-age children", year: 2025, source: "World Bank WDI" },
  { name: "Secondary school enrolment, gross", value: "97.2%", unit: "of school-age children", year: 2025, source: "World Bank WDI" },
  { name: "Tertiary enrolment, gross", value: "44.9%", unit: "of the age group", year: 2023, source: "World Bank WDI" },
  { name: "Human Development Index", value: "0.728", unit: "index (0-1)", year: 2022, source: "UNDP" },
];

// Latest releases, as a statistics office would list them.
export const RELEASES = [
  { date: "Nov 2026", title: "Labour Force Situation, August 2026", source: "BPS" },
  { date: "Nov 2026", title: "Consumer Price Index, October 2026", source: "BPS" },
  { date: "Oct 2026", title: "Economic Growth, Q3 2026", source: "BPS" },
  { date: "Sep 2026", title: "Poverty Profile, March 2026", source: "BPS" },
  { date: "Aug 2026", title: "World Development Indicators, 2026 update", source: "World Bank" },
];

export function indicatorById(id) {
  return INDICATORS.find((item) => item.id === id);
}

export function indicatorsByTopic(topic) {
  return INDICATORS.filter((item) => item.topic === topic);
}
