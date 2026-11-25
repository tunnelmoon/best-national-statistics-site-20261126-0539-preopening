// NusaStat app: hash router plus the controls that make the site work.
// Routes: #/ overview, #/economy, #/people, #/health, #/regions, #/methods.
// Every control is wired after its view renders; nothing loads over the network.

import { SERIES, PROVINCES, HEALTH_EDUCATION } from "./data.js";
import { lineChart } from "./charts.js";
import { overviewView, economyView, peopleView, healthView, regionsView, methodsView } from "./views.js";

const ROUTES = {
  "/": { title: "Overview", render: overviewView },
  "/economy": { title: "Economy", render: economyView },
  "/people": { title: "People", render: peopleView },
  "/health": { title: "Health and education", render: healthView },
  "/regions": { title: "Provinces", render: regionsView },
  "/methods": { title: "Methods and sources", render: methodsView },
};

const view = document.getElementById("view");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, "") || "/";
  return ROUTES[hash] ? hash : "/";
}

function render() {
  const route = currentRoute();
  const page = ROUTES[route];
  document.title = page.title + " | NusaStat";
  navLinks.forEach((a) => {
    const target = a.getAttribute("href").replace(/^#/, "") || "/";
    a.classList.toggle("active", target === route);
    if (target === route) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  view.innerHTML = page.render();
  wireControls(route);
  window.scrollTo(0, 0);
}

function wireControls(route) {
  if (route === "/") wireOverview();
  if (route === "/regions") wireRegions();
  view.querySelectorAll("[data-csv]").forEach((button) => {
    button.addEventListener("click", () => downloadCsv(button.getAttribute("data-csv")));
  });
}

function wireOverview() {
  const search = document.getElementById("indicator-search");
  const grid = document.getElementById("indicator-grid");
  const empty = document.getElementById("no-indicators");
  if (search && grid) {
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      let visible = 0;
      grid.querySelectorAll(".indicator").forEach((card) => {
        const hit = !q || card.getAttribute("data-name").includes(q);
        card.hidden = !hit;
        if (hit) visible += 1;
      });
      empty.hidden = visible > 0;
    });
  }
  const range = document.getElementById("growth-range");
  const chart = document.getElementById("growth-chart");
  if (range && chart) {
    range.addEventListener("change", () => {
      const full = SERIES.gdpGrowth;
      let years = full.years;
      let values = full.values;
      if (range.value === "recent") {
        years = full.years.slice(5);
        values = full.values.slice(5);
      } else if (range.value === "early") {
        years = full.years.slice(0, 5);
        values = full.values.slice(0, 5);
      }
      chart.innerHTML = lineChart({ ...full, years, values }, {});
    });
  }
}

function wireRegions() {
  const search = document.getElementById("province-search");
  const table = document.getElementById("province-table");
  if (!table) return;
  const body = table.querySelector("tbody");
  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      body.querySelectorAll("tr").forEach((row) => {
        row.hidden = q ? !row.cells[0].textContent.toLowerCase().includes(q) : false;
      });
    });
  }
  table.querySelectorAll("th[data-sort]").forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.getAttribute("data-sort");
      const rows = Array.from(body.querySelectorAll("tr"));
      const ascending = th.getAttribute("data-dir") !== "asc";
      table.querySelectorAll("th").forEach((other) => other.removeAttribute("data-dir"));
      th.setAttribute("data-dir", ascending ? "asc" : "desc");
      const index = key === "name" ? 0 : key === "population" ? 1 : 2;
      rows.sort((a, b) => {
        const av = a.cells[index].textContent;
        const bv = b.cells[index].textContent;
        if (index === 0) return ascending ? av.localeCompare(bv) : bv.localeCompare(av);
        return ascending ? parseFloat(av) - parseFloat(bv) : parseFloat(bv) - parseFloat(av);
      });
      rows.forEach((row) => body.appendChild(row));
    });
  });
}

function csvRows(kind) {
  if (kind === "trade") {
    return [
      ["Measure", "Value", "Source"],
      ["Exports of goods and services", "22.2% of GDP", "World Bank WDI, 2024"],
      ["Imports of goods and services", "20.4% of GDP", "World Bank WDI, 2024"],
      ["Foreign direct investment, net inflows", "US$ 24.2 billion", "World Bank WDI, 2024"],
      ["General government gross debt", "40.8% of GDP", "IMF, 2025"],
      ["Gini index", "34.9", "World Bank WDI, 2024"],
    ];
  }
  if (kind === "health") {
    return [
      ["Measure", "Value", "Source"],
      ...HEALTH_EDUCATION.map((r) => [r.name, r.value + " " + r.unit, r.source + ", " + r.year]),
    ];
  }
  return [
    ["Province", "Population (millions)", "Share of Indonesia"],
    ...PROVINCES.map((p) => [p.name, p.population.toFixed(1), p.share.toFixed(1) + "%"]),
  ];
}

function downloadCsv(kind) {
  const lines = csvRows(kind).map((row) =>
    row.map((cell) => '"' + String(cell).replace(/"/g, '""') + '"').join(","),
  );
  const blob = new Blob([lines.join("\n") + "\n"], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "nusastat-" + kind + ".csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

window.addEventListener("hashchange", render);
render();
