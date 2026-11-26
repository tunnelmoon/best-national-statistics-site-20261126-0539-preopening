[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/tunnelmoon/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/tunnelmoon/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# NusaStat: National Statistics Portal of Indonesia

A national statistics site for Indonesia, built for the make.fun bounty
[best-national-statistics-site-20261126-0539](https://make.fun/bounty/best-national-statistics-site-20261126-0539).
It runs offline in a browser from its own static files: no framework, no
webfont, no network request.

## What it shows

Six pages, reached by hash routing from the nav bar:

- **Overview**: ten headline indicators for 2024, a live indicator search,
  and the GDP line chart.
- **Economy**: GDP 2015-2024 with a year-range control (2015-2024, 2020-2024,
  2015-2019), real growth bars showing the 2020 Covid contraction, and a
  trade table with CSV download.
- **People**: population series, age-structure donut, poverty and
  unemployment series.
- **Health and Education**: life expectancy and internet-use charts, plus a
  health and education table with CSV download.
- **Provinces**: the ten largest provinces in a sortable, filterable table
  with CSV download, and a population bar chart.
- **Methods and Sources**: where every number comes from, and a statement
  that the site is independent and not affiliated with its sources.

## Figures

Every figure carries its source and year next to it. Headline values for
2024: population 283.5 million, GDP $1.40 trillion, GDP per capita $4,925,
unemployment 3.3%, poverty 8.57% (BPS, September 2024), life expectancy
71.3 years, inflation 1.57% (BPS, December year on year), internet use
72.8%. Sources: World Bank World Development Indicators, BPS Statistics
Indonesia, ILO ILOSTAT, IMF World Economic Outlook, UNDP.

## Design

Dark teal and amber on warm paper, serif display type, charts hand-drawn as
SVG (line, bar, donut). Source is split one job per file: `app/data.js`
holds the figures, `app/charts.js` draws the charts, `app/views.js` holds
the six page templates, `app/app.js` routes and wires the controls.

## Run it

Serve `app/` with any static server and open `index.html`, for example:

```sh
node serve.ts
```

Then open http://localhost:8080. To hand the entry in:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT. See [LICENSE](LICENSE).
