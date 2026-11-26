// NusaStat data: real figures for Indonesia, each with its source and year.
// Sources: World Bank World Development Indicators (WDI), BPS Statistics
// Indonesia, ILO ILOSTAT, IMF World Economic Outlook. Values are the latest
// published observation for the year shown; nothing here is estimated by us.

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const KEY_INDICATORS = [
  { name: 'Population', value: '283.5m', detail: '4th most populous country', source: 'World Bank WDI', year: 2024 },
  { name: 'GDP', value: '$1.40tn', detail: '16th largest economy', source: 'World Bank WDI', year: 2024 },
  { name: 'GDP per capita', value: '$4,925', detail: 'Upper middle income', source: 'World Bank WDI', year: 2024 },
  { name: 'GDP growth', value: '5.0%', detail: 'Annual real growth', source: 'World Bank WDI', year: 2024 },
  { name: 'Unemployment', value: '3.3%', detail: 'Modelled ILO estimate', source: 'ILO ILOSTAT', year: 2024 },
  { name: 'Poverty rate', value: '8.57%', detail: '24.06 million people', source: 'BPS Statistics Indonesia', year: 2024 },
  { name: 'Life expectancy', value: '71.3 years', detail: 'At birth', source: 'World Bank WDI', year: 2024 },
  { name: 'Inflation', value: '1.57%', detail: 'December, year on year', source: 'BPS Statistics Indonesia', year: 2024 },
  { name: 'Internet users', value: '72.8%', detail: 'Share of population', source: 'World Bank WDI', year: 2024 },
  { name: 'Exports of goods and services', value: '22.2%', detail: 'Share of GDP', source: 'World Bank WDI', year: 2024 },
];

// 10-year series, World Bank WDI unless noted.
export const SERIES = {
  gdp: {
    label: 'GDP, current US$ billions',
    source: 'World Bank WDI',
    values: [860.9, 931.9, 1015.6, 1042.3, 1119.1, 1059.6, 1186.1, 1319.1, 1371.2, 1396.3],
  },
  growth: {
    label: 'GDP growth, annual %',
    source: 'World Bank WDI',
    values: [4.9, 5.0, 5.1, 5.2, 5.0, -2.1, 3.7, 5.3, 5.1, 5.0],
  },
  population: {
    label: 'Population, millions',
    source: 'World Bank WDI',
    values: [258.2, 261.4, 264.5, 267.7, 270.6, 274.0, 276.6, 279.4, 281.5, 283.5],
  },
  poverty: {
    label: 'Poverty rate, % (March observation)',
    source: 'BPS Statistics Indonesia',
    note: 'September 2024 observation: 8.57%.',
    values: [11.22, 10.86, 10.64, 9.82, 9.41, 9.78, 10.14, 9.54, 9.36, 9.03],
  },
  unemployment: {
    label: 'Unemployment, % of labour force (modelled)',
    source: 'ILO ILOSTAT',
    values: [4.5, 4.3, 4.1, 4.3, 3.6, 4.3, 4.3, 3.9, 3.5, 3.3],
  },
  inflation: {
    label: 'Consumer price inflation, annual %',
    source: 'World Bank WDI',
    note: 'BPS headline inflation, December 2024 year on year: 1.57%.',
    values: [6.4, 3.5, 3.8, 3.2, 2.8, 1.9, 1.6, 4.2, 3.7, 2.3],
  },
  lifeExpectancy: {
    label: 'Life expectancy at birth, years',
    source: 'World Bank WDI',
    values: [69.6, 69.9, 70.1, 70.4, 70.6, 70.5, 70.0, 70.8, 71.1, 71.3],
  },
  internet: {
    label: 'Individuals using the Internet, % of population',
    source: 'World Bank WDI',
    values: [22.0, 25.4, 32.3, 39.9, 47.7, 53.7, 62.1, 66.5, 69.2, 72.8],
  },
  exports: {
    label: 'Exports of goods and services, % of GDP',
    source: 'World Bank WDI',
    values: [21.2, 19.1, 20.4, 21.0, 18.5, 17.3, 21.6, 26.0, 21.9, 22.2],
  },
  imports: {
    label: 'Imports of goods and services, % of GDP',
    source: 'World Bank WDI',
    values: [20.8, 18.7, 19.9, 22.1, 19.3, 15.9, 19.5, 23.2, 20.3, 20.4],
  },
};

// Age structure 2024, World Bank WDI.
export const AGE_STRUCTURE = [
  { label: 'Ages 0-14', value: 24.6, source: 'World Bank WDI', year: 2024 },
  { label: 'Ages 15-64', value: 68.1, source: 'World Bank WDI', year: 2024 },
  { label: 'Ages 65 and over', value: 7.3, source: 'World Bank WDI', year: 2024 },
];

// Health and education indicators.
export const HEALTH_EDUCATION = [
  { name: 'Life expectancy at birth', value: '71.3 years', source: 'World Bank WDI', year: 2024 },
  { name: 'Under-5 mortality', value: '21.5 per 1,000 live births', source: 'World Bank WDI', year: 2023 },
  { name: 'Infant mortality', value: '18.8 per 1,000 live births', source: 'World Bank WDI', year: 2023 },
  { name: 'Health spending', value: '2.7% of GDP', source: 'World Bank WDI', year: 2023 },
  { name: 'Primary school enrolment', value: '100.4% gross', source: 'World Bank WDI', year: 2025 },
  { name: 'Youth literacy (ages 15-24)', value: '99.7%', source: 'World Bank WDI', year: 2023 },
  { name: 'Fertility rate', value: '2.1 births per woman', source: 'World Bank WDI', year: 2023 },
  { name: 'Urban population', value: '58.8%', detail: 'Share of total population', source: 'World Bank WDI', year: 2024 },
];

// Ten largest provinces by population. Population: BPS mid-year estimate 2024.
// Poverty: BPS, September 2024. GDP share: BPS regional accounts 2024.
export const PROVINCES = [
  { name: 'West Java', population: 49.9, poverty: 7.5, gdpShare: 14.4 },
  { name: 'East Java', population: 41.8, poverty: 10.3, gdpShare: 14.6 },
  { name: 'Central Java', population: 37.9, poverty: 10.5, gdpShare: 8.2 },
  { name: 'North Sumatra', population: 15.6, poverty: 8.3, gdpShare: 4.9 },
  { name: 'Banten', population: 12.4, poverty: 6.2, gdpShare: 3.2 },
  { name: 'Jakarta', population: 10.7, poverty: 4.1, gdpShare: 17.4 },
  { name: 'South Sulawesi', population: 9.4, poverty: 8.5, gdpShare: 3.2 },
  { name: 'Lampung', population: 9.3, poverty: 11.8, gdpShare: 2.0 },
  { name: 'South Sumatra', population: 8.8, poverty: 11.8, gdpShare: 2.9 },
  { name: 'West Sumatra', population: 6.0, poverty: 5.9, gdpShare: 1.7 },
];

export const SOURCES = [
  { name: 'World Bank World Development Indicators', short: 'World Bank WDI', note: 'Population, GDP, growth, life expectancy, internet use, trade, health and education series, 2015-2024.' },
  { name: 'BPS Statistics Indonesia', short: 'BPS', note: 'Poverty rate and provincial population, poverty and regional GDP figures, 2024.' },
  { name: 'ILO ILOSTAT', short: 'ILO', note: 'Modelled unemployment estimates, 2015-2024.' },
  { name: 'IMF World Economic Outlook', short: 'IMF', note: 'Cross-check for GDP and growth aggregates.' },
  { name: 'UNDP Human Development Report', short: 'UNDP', note: 'Context for life expectancy and schooling.' },
];

export function toCsv(headers, rows) {
  const esc = (v) => {
    const s = String(v);
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  return [headers.map(esc).join(','), ...rows.map((r) => r.map(esc).join(','))].join('\n') + '\n';
}
