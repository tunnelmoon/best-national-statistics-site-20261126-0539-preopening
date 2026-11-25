// NusaStat charts: small SVG chart builders with no dependencies.
// Each function takes plain data and returns an SVG string, so the views can
// drop a chart into any page. Nothing here fetches or loads anything.

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const size = nice * mag;
  const start = Math.floor(min / size) * size;
  const ticks = [];
  for (let v = start; v <= max + size * 0.001; v += size) ticks.push(v);
  return { ticks, size };
}

function fmt(value, unit) {
  if (unit === "US$") return "$" + Math.round(value).toLocaleString("en-US");
  if (Math.abs(value) >= 100) return String(Math.round(value));
  return String(Math.round(value * 10) / 10);
}

export function lineChart(series, options) {
  const width = options.width || 720;
  const height = options.height || 280;
  const pad = { top: 18, right: 16, bottom: 30, left: 56 };
  const values = series.values;
  const years = series.years;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const lo = min < 0 ? min * 1.15 : Math.max(0, min - (max - min) * 0.15);
  const hi = max * 1.08;
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const x = (i) => pad.left + (i / (values.length - 1)) * innerW;
  const y = (v) => pad.top + (1 - (v - lo) / (hi - lo)) * innerH;
  const { ticks } = niceTicks(lo, hi, 4);
  const points = values.map((v, i) => x(i) + "," + y(v).toFixed(1)).join(" ");
  const area =
    pad.left + "," + y(lo).toFixed(1) + " " + points + " " + x(values.length - 1) + "," + y(lo).toFixed(1);
  // Only draw ticks inside the plot: a tick below the axis floor would land
  // on top of the year labels.
  const grid = ticks.filter((t) => t >= lo && t <= hi)
    .map(
      (t) =>
        '<line x1="' + pad.left + '" y1="' + y(t).toFixed(1) + '" x2="' + (width - pad.right) + '" y2="' + y(t).toFixed(1) + '" stroke="#e3ded4" stroke-width="1"/>' +
        '<text x="' + (pad.left - 8) + '" y="' + (y(t) + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="#5c6b68">' + fmt(t, series.unit) + "</text>",
    )
    .join("");
  const labels = years
    .map(
      (yr, i) =>
        '<text x="' + x(i).toFixed(1) + '" y="' + (height - 8) + '" text-anchor="middle" font-size="11" fill="#5c6b68">' + yr + "</text>",
    )
    .join("");
  const dots = values
    .map(
      (v, i) =>
        '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(v).toFixed(1) + '" r="3.5" fill="#147a6e" stroke="#fff" stroke-width="1.5"/>',
    )
    .join("");
  const last = values[values.length - 1];
  const lastLabel =
    '<text x="' + (x(values.length - 1) - 6).toFixed(1) + '" y="' + (y(last) - 12).toFixed(1) + '" text-anchor="end" font-size="13" font-weight="700" fill="#0b3d3a">' +
    fmt(last, series.unit) + " " + series.unit + "</text>";
  return (
    '<svg viewBox="0 0 ' + width + " " + height + '" role="img" aria-label="' + series.label + ' chart">' +
    grid +
    '<polygon points="' + area + '" fill="#147a6e" opacity="0.10"/>' +
    '<polyline points="' + points + '" fill="none" stroke="#147a6e" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>' +
    dots + lastLabel + labels +
    "</svg>"
  );
}

export function barChart(rows, options) {
  const width = options.width || 720;
  const rowH = options.rowHeight || 34;
  const height = rows.length * rowH + 34;
  const pad = { top: 8, right: 90, bottom: 26, left: 130 };
  const max = Math.max(...rows.map((r) => r.value));
  const innerW = width - pad.left - pad.right;
  const bars = rows
    .map((r, i) => {
      const y = pad.top + i * rowH;
      const w = (r.value / max) * innerW;
      return (
        '<text x="' + (pad.left - 10) + '" y="' + (y + 19) + '" text-anchor="end" font-size="12" fill="#1c2422">' + r.label + "</text>" +
        '<rect x="' + pad.left + '" y="' + (y + 6) + '" width="' + w.toFixed(1) + '" height="20" rx="3" fill="' + (i === 0 ? "#0b3d3a" : "#147a6e") + '"/>' +
        '<text x="' + (pad.left + w + 8).toFixed(1) + '" y="' + (y + 20) + '" font-size="12" font-weight="700" fill="#0b3d3a">' + r.valueLabel + "</text>"
      );
    })
    .join("");
  return (
    '<svg viewBox="0 0 ' + width + " " + height + '" role="img" aria-label="Bar chart">' + bars + "</svg>"
  );
}

export function donutChart(parts, options) {
  const size = options.size || 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const hole = r * 0.62;
  const colors = ["#0b3d3a", "#147a6e", "#e8a33d"];
  let acc = 0;
  const arcs = parts
    .map((p, i) => {
      const start = (acc / 100) * Math.PI * 2 - Math.PI / 2;
      acc += p.share;
      const end = (acc / 100) * Math.PI * 2 - Math.PI / 2;
      const large = end - start > Math.PI ? 1 : 0;
      const x1 = cx + r * Math.cos(start);
      const y1 = cy + r * Math.sin(start);
      const x2 = cx + r * Math.cos(end);
      const y2 = cy + r * Math.sin(end);
      return (
        '<path d="M ' + x1.toFixed(1) + " " + y1.toFixed(1) + " A " + r + " " + r + " 0 " + large + " 1 " + x2.toFixed(1) + " " + y2.toFixed(1) +
        " L " + (cx + hole * Math.cos(end)).toFixed(1) + " " + (cy + hole * Math.sin(end)).toFixed(1) +
        " A " + hole + " " + hole + " 0 " + large + " 0 " + (cx + hole * Math.cos(start)).toFixed(1) + " " + (cy + hole * Math.sin(start)).toFixed(1) +
        ' Z" fill="' + colors[i % colors.length] + '"/>'
      );
    })
    .join("");
  const legend = parts
    .map(
      (p, i) =>
        '<div class="legend-row"><span class="swatch" style="background:' + colors[i % colors.length] + '"></span>' +
        p.group + ' <strong>' + p.share + "%</strong></div>",
    )
    .join("");
  return (
    '<div class="donut-wrap"><svg viewBox="0 0 ' + size + " " + size + '" role="img" aria-label="Age structure chart" width="' + size + '" height="' + size + '">' +
    arcs +
    '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" font-size="26" font-weight="700" fill="#0b3d3a">68.1%</text>' +
    '<text x="' + cx + '" y="' + (cy + 16) + '" text-anchor="middle" font-size="11" fill="#5c6b68">working age</text>' +
    "</svg>" +
    '<div class="legend">' + legend + "</div></div>"
  );
}
