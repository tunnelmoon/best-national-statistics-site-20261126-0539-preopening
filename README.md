[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/tunnelmoon/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/tunnelmoon/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# NusaStat: National Statistics Portal of Indonesia

A make.fun bounty entry for [best-national-statistics-site-20261126-0539](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

NusaStat is a working national statistics site that runs offline from static files, on desktop and on a phone. It covers Indonesia with real published figures, each naming its source and year: population, GDP, growth, poverty, unemployment, life expectancy, enrolment, trade and the provinces.

## What it has

- Overview with eight headline indicators, a search box, GDP growth and population charts with a year range control, largest provinces and latest releases.
- Economy page: GDP, GDP per capita, inflation, trade and finance tables, with CSV download.
- People page: population chart, age structure donut, poverty and unemployment charts, labour force table.
- Health and education page: full indicator table with CSV download.
- Provinces page: bar chart of the ten largest provinces and a sortable, filterable table of provinces.
- Methods and sources page: where every number comes from and what the site does not claim.

## How it is built

- `app/` holds the site as static files with no build step: `index.html`, `styles.css`, and ES modules `app.js` (router and controls), `views.js` (page templates), `charts.js` (SVG line, bar and donut charts drawn in code), `data.js` (figures with sources and years).
- No framework, no network request, no webfont: system fonts only, charts drawn by hand, so the first load is small.
- `main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with `buildDossier` from `vendor/makefun-frontend.ts`.
- `screenshots/` holds four real renders of the site in a browser: the overview, the economy page, the provinces page, and a phone-sized overview.

## Run it

Serve `app/` with any static server and open `index.html`. For example:

```sh
cd app && python3 -m http.server 8080
```

Then open http://localhost:8080 in a browser. To build the hand-in:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Sources

World Bank World Development Indicators, Statistics Indonesia (BPS), International Labour Organization, International Monetary Fund, United Nations Development Programme. NusaStat is an independent portal and is not affiliated with any of those organisations.
