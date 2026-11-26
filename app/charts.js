// NusaStat charts: hand-drawn SVG line, bar and donut charts. No library,
// no network, just string building. Every chart labels its axes and values
// so it stays readable when shrunk to a screenshot thumbnail.

const TEAL = '#0c4a45';
const AMBER = '#d9930d';
const INK = '#1d2b29';
const GRID = '#d8d2c2';
const MUTED = '#5d6b68';

function fmt(v, decimals = 1) {
  return Number(v).toFixed(decimals).replace(/\.0$/, '');
}

function niceTicks(min, max, count = 4) {
  const span = max - min || 1;
  const step = span / count;
  const mag = 10 ** Math.floor(Math.log10(step));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const s = nice * mag;
  const lo = Math.floor(min / s) * s;
  const ticks = [];
  for (let t = lo; t <= max + s * 0.001; t += s) ticks.push(t);
  return ticks;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

// Line chart. years: number[], values: number[], opts {label, unit, color, height}
export function lineChart(years, values, opts = {}) {
  const w = 720;
  const h = opts.height || 300;
  const padL = 58;
  const padR = 16;
  const padT = 18;
  const padB = 34;
  const color = opts.color || TEAL;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const lo = min < 0 ? Math.min(min * 1.15, min - 1) : Math.max(0, min - (max - min) * 0.25);
  const hi = max + (max - min) * 0.12;
  const x = (i) => padL + ((w - padL - padR) * i) / (years.length - 1);
  const y = (v) => padT + ((h - padT - padB) * (hi - v)) / (hi - lo);
  const ticks = niceTicks(lo, hi, 4);
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${padL},${y(lo)} ${points} ${x(years.length - 1).toFixed(1)},${y(lo)}`;
  let svg = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Line chart')}">`;
  for (const t of ticks) {
    svg += `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>`;
    svg += `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="12" fill="${MUTED}">${fmt(t, Math.abs(t) < 10 ? 1 : 0)}</text>`;
  }
  svg += `<polygon points="${area}" fill="${color}" fill-opacity="0.10"/>`;
  svg += `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  values.forEach((v, i) => {
    svg += `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="#fff" stroke="${color}" stroke-width="2"/>`;
    if (i === 0 || i === values.length - 1 || v === min || v === max) {
      // Anchor edge labels inward so they are never clipped by the SVG edge.
      const anchor = i === 0 ? 'start' : i === values.length - 1 ? 'end' : 'middle';
      const lx = i === 0 ? x(i) + 4 : i === values.length - 1 ? x(i) - 4 : x(i);
      svg += `<text x="${lx}" y="${y(v) - 10}" text-anchor="${anchor}" font-size="12" font-weight="700" fill="${INK}">${fmt(v)}${opts.unit ? ' ' + esc(opts.unit) : ''}</text>`;
    }
  });
  years.forEach((yr, i) => {
    svg += `<text x="${x(i)}" y="${h - 12}" text-anchor="middle" font-size="12" fill="${MUTED}">${yr}</text>`;
  });
  svg += '</svg>';
  return svg;
}

// Vertical bar chart. labels: string[], values: number[], opts {label, color, height}
export function barChart(labels, values, opts = {}) {
  const w = 720;
  const h = opts.height || 300;
  const padL = 58;
  const padR = 16;
  const padT = 24;
  const padB = 34;
  const color = opts.color || AMBER;
  const min = Math.min(0, ...values);
  const max = Math.max(...values);
  const hi = max + (max - min) * 0.12;
  const lo = min - (max - min) * 0.08;
  const slot = (w - padL - padR) / labels.length;
  const bw = Math.min(46, slot * 0.62);
  const y = (v) => padT + ((h - padT - padB) * (hi - v)) / (hi - lo);
  const ticks = niceTicks(lo, hi, 4);
  let svg = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Bar chart')}">`;
  for (const t of ticks) {
    svg += `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>`;
    svg += `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="12" fill="${MUTED}">${fmt(t, Math.abs(t) < 10 ? 1 : 0)}</text>`;
  }
  svg += `<line x1="${padL}" y1="${y(0)}" x2="${w - padR}" y2="${y(0)}" stroke="${INK}" stroke-width="1"/>`;
  values.forEach((v, i) => {
    const bx = padL + slot * i + (slot - bw) / 2;
    const by = v >= 0 ? y(v) : y(0);
    const bh = Math.abs(y(v) - y(0));
    const fill = v < 0 ? '#b23a2e' : color;
    svg += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(bh, 1).toFixed(1)}" rx="3" fill="${fill}"/>`;
    svg += `<text x="${(bx + bw / 2).toFixed(1)}" y="${(v >= 0 ? by - 6 : by + bh + 16).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${fmt(v)}${opts.unit ? ' ' + esc(opts.unit) : ''}</text>`;
    svg += `<text x="${(padL + slot * i + slot / 2).toFixed(1)}" y="${h - 12}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(labels[i])}</text>`;
  });
  svg += '</svg>';
  return svg;
}

// Donut chart. segments: [{label, value, color}].
export function donutChart(segments, opts = {}) {
  const size = opts.size || 300;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const inner = r * 0.62;
  const total = segments.reduce((a, s) => a + s.value, 0);
  const palette = ['#0c4a45', '#d9930d', '#7fa8a0'];
  let svg = `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(opts.label || 'Donut chart')}">`;
  let angle = -90;
  segments.forEach((s, i) => {
    const frac = s.value / total;
    const a0 = (angle * Math.PI) / 180;
    const a1 = ((angle + frac * 360) * Math.PI) / 180;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1);
    const yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0);
    const yi0 = cy + inner * Math.sin(a0);
    const color = s.color || palette[i % palette.length];
    svg += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${color}"/>`;
    const mid = ((angle + (frac * 360) / 2) * Math.PI) / 180;
    const lx = cx + (r + 26) * Math.cos(mid);
    const ly = cy + (r + 26) * Math.sin(mid);
    svg += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${fmt(s.value)}%</text>`;
    angle += frac * 360;
  });
  svg += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="22" font-weight="700" fill="${INK}">${fmt(total, 0)}%</text>`;
  svg += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="12" fill="${MUTED}">of population</text>`;
  svg += '</svg>';
  return svg;
}
