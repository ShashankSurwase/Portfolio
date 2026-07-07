/* Generates varied, beautiful SVG cover art for each project.
   Different data-viz motif per project + distinct gradient per domain.
   Output: public/covers/<id>.svg   Run: node scripts/gen-covers.js */
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "public", "covers");
fs.mkdirSync(OUT, { recursive: true });

// Domain gradient palettes [from, to, glow]
const PALETTE = {
  ecom:   ["#4f46e5", "#7c3aed", "#a78bfa"], // indigo -> violet
  edtech: ["#0ea5e9", "#14b8a6", "#5eead4"], // sky -> teal
  energy: ["#f59e0b", "#ea580c", "#fbbf24"], // amber -> orange
};

const W = 640, H = 360;

// ---- motif drawers (white, translucent, centred band) ---------------------
const M = {
  pipeline() {
    const y = 168, xs = [140, 268, 396, 524];
    let s = "";
    xs.forEach((x, i) => {
      s += `<rect x="${x - 34}" y="${y - 34}" width="68" height="68" rx="16" fill="#fff" fill-opacity="0.14" stroke="#fff" stroke-opacity="0.5" stroke-width="2"/>`;
      s += `<circle cx="${x}" cy="${y}" r="11" fill="#fff" fill-opacity="0.9"/>`;
      if (i < xs.length - 1) s += `<path d="M${x + 40} ${y} H${xs[i + 1] - 40}" stroke="#fff" stroke-opacity="0.6" stroke-width="3" stroke-dasharray="3 7" stroke-linecap="round"/>`;
    });
    return s;
  },
  bars() {
    const base = 250, x0 = 150, bw = 44, gap = 20;
    const hs = [70, 120, 95, 160, 130, 185];
    return hs.map((h, i) => {
      const x = x0 + i * (bw + gap);
      return `<rect x="${x}" y="${base - h}" width="${bw}" height="${h}" rx="7" fill="#fff" fill-opacity="${0.35 + i * 0.1}"/>`;
    }).join("");
  },
  area() {
    const pts = [[120, 210], [200, 170], [280, 195], [360, 120], [440, 150], [520, 80]];
    const line = pts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
    const area = `${line} L520 250 L120 250 Z`;
    const dots = pts.map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="6" fill="#fff"/>`).join("");
    return `<path d="${area}" fill="#fff" fill-opacity="0.14"/><path d="${line}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${dots}`;
  },
  gauge() {
    const cx = 320, cy = 210, r = 118;
    const p = (a) => [cx + r * Math.cos(Math.PI * a), cy - r * Math.sin(Math.PI * a)];
    const arc = (a0, a1, op, w) => {
      const [x0, y0] = p(a0), [x1, y1] = p(a1);
      return `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 0 ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="#fff" stroke-opacity="${op}" stroke-width="${w}" stroke-linecap="round"/>`;
    };
    // ticks around the dial
    let ticks = "";
    for (let i = 0; i <= 10; i++) {
      const a = 1 - i / 10; // π..0
      const [tx0, ty0] = p(a), c1 = Math.cos(Math.PI * a), s1 = Math.sin(Math.PI * a);
      ticks += `<line x1="${(cx + (r + 6) * c1).toFixed(1)}" y1="${(cy - (r + 6) * s1).toFixed(1)}" x2="${(cx + (r + 16) * c1).toFixed(1)}" y2="${(cy - (r + 16) * s1).toFixed(1)}" stroke="#fff" stroke-opacity="0.4" stroke-width="2"/>`;
    }
    const ang = 0.7; // needle (0=right,1=left)
    const nx = cx + (r - 22) * Math.cos(Math.PI * ang), ny = cy - (r - 22) * Math.sin(Math.PI * ang);
    // track (full top arc, left->right) then value arc (from left up to needle)
    return ticks + arc(1, 0, 0.22, 18) + arc(1, ang, 0.9, 18) +
      `<line x1="${cx}" y1="${cy}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="12" fill="#fff"/>`;
  },
  network() {
    const nodes = [[200, 120], [460, 110], [150, 230], [330, 180], [500, 250], [300, 300]];
    const edges = [[0, 3], [1, 3], [2, 3], [3, 4], [3, 5], [0, 2], [1, 4]];
    let s = edges.map((e) => `<line x1="${nodes[e[0]][0]}" y1="${nodes[e[0]][1]}" x2="${nodes[e[1]][0]}" y2="${nodes[e[1]][1]}" stroke="#fff" stroke-opacity="0.4" stroke-width="2.5"/>`).join("");
    s += nodes.map((n, i) => `<circle cx="${n[0]}" cy="${n[1]}" r="${i === 3 ? 22 : 13}" fill="#fff" fill-opacity="${i === 3 ? 0.95 : 0.7}"/>`).join("");
    return s;
  },
  donut() {
    const cx = 320, cy = 180, r = 96, sw = 40;
    const segs = [0.42, 0.24, 0.19, 0.15], ops = [0.95, 0.7, 0.5, 0.32];
    let a = -0.5 * Math.PI, s = "";
    segs.forEach((v, i) => {
      const a1 = a + v * 2 * Math.PI;
      const large = v > 0.5 ? 1 : 0;
      const x0 = cx + r * Math.cos(a), y0 = cy + r * Math.sin(a);
      const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      s += `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="#fff" stroke-opacity="${ops[i]}" stroke-width="${sw}"/>`;
      a = a1 + 0.05;
    });
    return s;
  },
  waveform() {
    let d = "M100 180";
    for (let x = 100; x <= 540; x += 8) {
      const y = 180 - Math.sin((x - 100) / 26) * 46 * Math.exp(-(x - 100) / 900);
      d += ` L${x} ${y.toFixed(1)}`;
    }
    const bars = [];
    for (let x = 110; x <= 530; x += 30) bars.push(`<line x1="${x}" y1="250" x2="${x}" y2="${250 - (10 + ((x) % 70))}" stroke="#fff" stroke-opacity="0.35" stroke-width="4" stroke-linecap="round"/>`);
    return `<path d="${d}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>` + bars.join("");
  },
  grid() {
    let s = "";
    const cols = 8, rows = 4, x0 = 176, y0 = 96, c = 34, g = 10;
    for (let r = 0; r < rows; r++) for (let col = 0; col < cols; col++) {
      const op = (0.18 + ((r * 7 + col * 3) % 9) / 11).toFixed(2);
      s += `<rect x="${x0 + col * (c + g)}" y="${y0 + r * (c + g)}" width="${c}" height="${c}" rx="7" fill="#fff" fill-opacity="${op}"/>`;
    }
    return s;
  },
  stack() {
    const cx = 320, w = 230, h = 34, ov = 0.9;
    let s = "";
    [0, 1, 2, 3].forEach((i) => {
      const y = 110 + i * 46;
      s += `<path d="M${cx - w / 2} ${y} L${cx} ${y - 20} L${cx + w / 2} ${y} L${cx} ${y + 20} Z" fill="#fff" fill-opacity="${(ov - i * 0.18).toFixed(2)}"/>`;
    });
    return s;
  },
  radar() {
    const cx = 320, cy = 185, R = 108, n = 5;
    const pt = (r, i) => [cx + r * Math.cos(-Math.PI / 2 + i * 2 * Math.PI / n), cy + r * Math.sin(-Math.PI / 2 + i * 2 * Math.PI / n)];
    let s = "";
    [0.4, 0.7, 1].forEach((f) => {
      const poly = Array.from({ length: n }, (_, i) => pt(R * f, i).join(",")).join(" ");
      s += `<polygon points="${poly}" fill="none" stroke="#fff" stroke-opacity="0.3" stroke-width="1.5"/>`;
    });
    const vals = [0.9, 0.6, 0.8, 0.5, 0.7];
    const poly = vals.map((v, i) => pt(R * v, i).join(",")).join(" ");
    s += `<polygon points="${poly}" fill="#fff" fill-opacity="0.22" stroke="#fff" stroke-width="3"/>`;
    s += vals.map((v, i) => { const p = pt(R * v, i); return `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="5" fill="#fff"/>`; }).join("");
    return s;
  },
};

// ---- project -> (motif, kicker, hero metric) -------------------------------
const COVERS = [
  { id: "ecom_multi_marketplace_airflow_etl", domain: "ecom", kicker: "E-COMMERCE", num: "01", motif: "pipeline", metric: "31 -> 1", label: "sources unified" },
  { id: "ecom_automated_mis_reporting", domain: "ecom", kicker: "E-COMMERCE", num: "02", motif: "bars", metric: "80+ hrs/mo", label: "reporting effort removed" },
  { id: "ecom_columnar_data_warehouse", domain: "ecom", kicker: "E-COMMERCE", num: "03", motif: "stack", metric: "₹5.79 Cr", label: "revenue tracked" },
  { id: "ecom_customer_intelligence_analytics", domain: "ecom", kicker: "E-COMMERCE", num: "04", motif: "donut", metric: "Top 20% = 70–80%", label: "of revenue identified" },
  { id: "ecom_inventory_analytics_powerbi", domain: "ecom", kicker: "E-COMMERCE", num: "05", motif: "grid", metric: "2 systems", label: "reconciled, zero manual" },
  { id: "ecom_revenue_integration_recovery", domain: "ecom", kicker: "E-COMMERCE", num: "06", motif: "area", metric: "$1.05M", label: "revenue recovered" },
  { id: "edtech_automated_omr_evaluation", domain: "edtech", kicker: "EDTECH", num: "07", motif: "grid", metric: "10–15 days -> same day", label: "result turnaround" },
  { id: "edtech_automated_reporting_system", domain: "edtech", kicker: "EDTECH", num: "08", motif: "bars", metric: "30–40 hrs/wk", label: "manual effort removed" },
  { id: "edtech_multi_source_etl_platform", domain: "edtech", kicker: "EDTECH", num: "09", motif: "network", metric: "80% -> 99%+", label: "data accuracy" },
  { id: "edtech_student_analytics_dashboards", domain: "edtech", kicker: "EDTECH", num: "10", motif: "gauge", metric: "6 dashboards", label: "4 audiences, one model" },
  { id: "edtech_swot_question_paper_generator", domain: "edtech", kicker: "EDTECH", num: "11", motif: "radar", metric: "500+ papers", label: "per test cycle" },
  { id: "energy_iot_ingestion_pipeline", domain: "energy", kicker: "RENEWABLE ENERGY", num: "12", motif: "waveform", metric: "245 plants", label: "<=10 min telemetry" },
  { id: "energy_operations_automation", domain: "energy", kicker: "RENEWABLE ENERGY", num: "13", motif: "pipeline", metric: "8–12 hrs -> <=10 min", label: "fault detection" },
  { id: "energy_role_based_dashboard_suite", domain: "energy", kicker: "RENEWABLE ENERGY", num: "14", motif: "grid", metric: "13 dashboards · 12 roles", label: "query-level RBAC" },
  { id: "energy_solar_kpi_engine_pr_audit", domain: "energy", kicker: "RENEWABLE ENERGY", num: "15", motif: "gauge", metric: "-99%", label: "Lambda cost, PR to ±2%" },
  { id: "energy_platform_overview", domain: "energy", kicker: "RENEWABLE ENERGY", num: "16", motif: "network", metric: "245 plants · 10M+ rows", label: "end-to-end EMS" },
  { id: "ecom_erp_offline_channel_analytics", domain: "ecom", kicker: "E-COMMERCE", num: "17", motif: "stack", metric: "1.8%", label: "GT return rate" },
  { id: "ecom_unified_sales_inventory_facts", domain: "ecom", kicker: "E-COMMERCE", num: "18", motif: "grid", metric: "129 cols", label: "unified sales fact" },
  { id: "ecom_seller_portal_automation", domain: "ecom", kicker: "E-COMMERCE", num: "19", motif: "network", metric: "0 logins", label: "fully unattended" },
  { id: "ecom_webhook_event_ingestion", domain: "ecom", kicker: "E-COMMERCE", num: "20", motif: "waveform", metric: "7 streams", label: "real-time, zero loss" },
  { id: "ecom_offline_retail_gt_integration", domain: "ecom", kicker: "E-COMMERCE", num: "21", motif: "donut", metric: "100+", label: "GT distributors" },
  { id: "ecom_warehouse_migration_clickhouse", domain: "ecom", kicker: "E-COMMERCE", num: "22", motif: "pipeline", metric: "~600 tables", label: "zero-defect cut-over" },
  { id: "ecom_logistics_courier_analytics", domain: "ecom", kicker: "E-COMMERCE", num: "23", motif: "radar", metric: "6+ couriers", label: "same-day SLA breach" },
  { id: "ecom_superset_bi_dashboards", domain: "ecom", kicker: "E-COMMERCE", num: "24", motif: "bars", metric: "~30", label: "governed dashboards" },
  { id: "ecom_d2c_website_data_ingestion", domain: "ecom", kicker: "E-COMMERCE", num: "25", motif: "area", metric: "T+1d -> 2h", label: "order-data latency" },
  { id: "ecom_data_quality_observability", domain: "ecom", kicker: "E-COMMERCE", num: "26", motif: "gauge", metric: "131 DAGs", label: ">0.5% recon gate" },
  { id: "edtech_iot_rfid_attendance_integration", domain: "edtech", kicker: "EDTECH", num: "27", motif: "network", metric: "3+1 sources", label: "attendance reconciled" },
  { id: "edtech_scoresheet_tbr_pdf_report_suite", domain: "edtech", kicker: "EDTECH", num: "28", motif: "stack", metric: "~30 min", label: "board-ready PDFs" },
  { id: "edtech_marketing_admissions_analytics_dashboard", domain: "edtech", kicker: "EDTECH", num: "29", motif: "donut", metric: "57 queries", label: "lead -> enrolment" },
  { id: "edtech_coaching_superset_platform", domain: "edtech", kicker: "EDTECH", num: "30", motif: "grid", metric: "5 / 17", label: "dashboards / tabs" },
  { id: "energy_deployment_production_engineering", domain: "energy", kicker: "RENEWABLE ENERGY", num: "31", motif: "gauge", metric: "-99%", label: "Lambda invocations" },
  { id: "energy_plant_onboarding_registration", domain: "energy", kicker: "RENEWABLE ENERGY", num: "32", motif: "grid", metric: "2-4 hrs", label: "plant go-live" },
  { id: "energy_security_vapt_readiness", domain: "energy", kicker: "RENEWABLE ENERGY", num: "33", motif: "radar", metric: "13 findings", label: "VAPT-graded & fixed" },
  { id: "energy_historic_data_backfill", domain: "energy", kicker: "RENEWABLE ENERGY", num: "34", motif: "area", metric: "47 archives", label: "4+ yrs recovered" },
];

function cover(c) {
  const [a, b, glow] = PALETTE[c.domain];
  const motif = M[c.motif]();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Poppins, Segoe UI, Arial, sans-serif">
<defs>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
  </linearGradient>
  <radialGradient id="glow" cx="0.82" cy="0.12" r="0.7">
    <stop offset="0" stop-color="${glow}" stop-opacity="0.55"/><stop offset="1" stop-color="${glow}" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#g)"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
<g stroke="#fff" stroke-opacity="0.06" stroke-width="1">
  ${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 55}" y1="0" x2="${i * 55}" y2="${H}"/>`).join("")}
  ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 55}" x2="${W}" y2="${i * 55}"/>`).join("")}
</g>
${motif}
<text x="40" y="52" fill="#fff" fill-opacity="0.95" font-size="15" font-weight="700" letter-spacing="3">${c.kicker}</text>
<text x="${W - 40}" y="70" fill="#fff" fill-opacity="0.28" font-size="64" font-weight="800" text-anchor="end">${c.num}</text>
<text x="40" y="${H - 54}" fill="#fff" font-size="34" font-weight="800">${esc(c.metric)}</text>
<text x="42" y="${H - 30}" fill="#fff" fill-opacity="0.85" font-size="15" font-weight="500">${esc(c.label)}</text>
</svg>`;
}
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

let n = 0;
for (const c of COVERS) { fs.writeFileSync(path.join(OUT, c.id + ".svg"), cover(c)); n++; }
console.log("generated", n, "covers ->", OUT);
