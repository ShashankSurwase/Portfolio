// Full domain detail shown when a domain card is clicked.
// Content sourced from 02_Domains/*/01_Domain_Summary (anonymized — no client names).

export interface DomainDetail {
  id: string;
  name: string;
  clients: string;
  tagline: string;
  overview: string;
  engagements: { title: string; points: string[] }[];
  metrics: string[];
  dataFlow: string;
  stack: string[];
}

export const DOMAINS: DomainDetail[] = [
  {
    id: "ecommerce",
    name: "E-commerce & Retail",
    clients: "3 client brands",
    tagline:
      "Complete data platforms for three consumer brands selling one SKU across up to 31 channels — marketplaces, D2C sites, quick-commerce and offline retail.",
    overview:
      "Three separate engagements: a D2C apparel brand (India), a personal-care brand (India + UAE), and a K-beauty cosmetics brand (India). In each case the business could not get one reliable cross-channel number. I built the full stack — raw platform exports to unified warehouse to dashboards, ML and automated reporting — with strict revenue traceability.",
    engagements: [
      {
        title: "D2C Apparel Brand (India)",
        points: [
          "131 production Airflow DAGs integrating 31 source systems — Amazon SP-API, Vendor Central & Ads, Flipkart, Myntra, Ajio, quick-commerce (Blinkit, Swiggy, Zepto), WMS/OMS, logistics, attribution and GA4/BigQuery.",
          "Schema-fingerprint validation (CSV header hash) catches upstream changes before bad data enters the warehouse; Excel-driven column mapping means a new marketplace needs a spreadsheet row, not code — onboarding cut from 2–5 days to 2–4 hours.",
          "1,400+ SQL transformations; Kafka consumers for same-day event data; 80+ hours/month of manual MIS eliminated.",
          "RFM segmentation (scikit-learn + R) proved the top 20% of customers drive 70–80% of revenue; product adjacency analysis deployed to live product pages; demand forecasting drives real purchase orders.",
          "Real-time cross-channel inventory visibility in Grafana across 5+ fulfilment locations.",
        ],
      },
      {
        title: "Personal-Care Brand (India + UAE)",
        points: [
          "Unified 6 platforms into one revenue view — 94,497 records, $3.78M tracked, 96.5% mapped.",
          "Recovered $1.05M in unattributed UAE marketplace revenue by root-causing an ASIN encoding bug: match rate 0% → 99.8%.",
          "5-step processing framework cut pipeline runtime 53s → 6s (8.8×) at ~15,000 records/second.",
          "Per-platform match-rate monitoring with >0.5% deviation alerts; 22+ executive KPIs on C-suite dashboards; master catalog of 1,425 products and 9,975 platform-SKU mappings.",
        ],
      },
      {
        title: "K-Beauty Brand (India)",
        points: [
          "ClickHouse warehouse built from scratch: 30+ tables over 5 source systems (ERP, OMS, Shopify, marketplace and retail sub-channels).",
          "Three standardised write patterns matched to data semantics — snapshot refresh, incremental append, delta upsert.",
          "27 production reports + version-controlled Power BI inventory dashboard covering ₹5.79 Cr revenue, 87,514 transactions, 28,419 orders.",
        ],
      },
    ],
    metrics: [
      "131 Airflow DAGs",
      "31 source systems",
      "$1.05M recovered",
      "$3.78M reconciled",
      "1,400+ SQL files",
      "~15,000 records/sec",
      "27 automated reports",
      "80+ hrs/month saved",
    ],
    dataFlow:
      "Marketplace / D2C / logistics / ads sources → REST · SFTP · Selenium · webhooks → Airflow (131 DAGs) → Python + SQL transforms → S3 + PostgreSQL → ClickHouse warehouse → Superset · Grafana · Power BI → business teams",
    stack: [
      "Python", "SQL", "Apache Airflow", "ClickHouse", "PostgreSQL", "Kafka",
      "AWS S3", "BigQuery", "Superset", "Grafana", "Power BI", "Selenium / Playwright",
    ],
  },
  {
    id: "edtech",
    name: "EdTech & Student Analytics",
    clients: "2 coaching institutes",
    tagline:
      "End-to-end analytics platform for two coaching institutes (~2,200 students/year, board · JEE · NEET preparation) — from scraping a no-API tool to personalised question papers.",
    overview:
      "Two Indian coaching institutes — one for grades 8–10 (~1,200 students/year), one IIT-focused for grades 11–12 (~1,000 students/year). Student data lived in seven disconnected systems, results took two weeks, and staff burned 30–40 hours a week on manual spreadsheets. I built the entire platform: ingestion, dual-database warehouse, dashboards, and automated personalised outputs.",
    engagements: [
      {
        title: "Data platform & integrations",
        points: [
          "7 sources → 70+ Python pipelines: a coaching-management tool with no API (Selenium scraping + IMAP email interception with crash-resumption), an online testing LMS (REST with parallel fetching and retry recovery), Google Sheets/Drive/Forms, and IoT/RFID attendance.",
          "Dual warehouse: PostgreSQL (47+ analytical views) + ClickHouse (16 tables) — operational reporting and fast student-facing analytics separated cleanly.",
          "Data accuracy lifted from ~80% to 99%+; 30–40 hours/week of manual MIS eliminated; automated daily email reports and Slack data-quality alerts.",
        ],
      },
      {
        title: "Student analytics & automation",
        points: [
          "OMR test evaluation cut from 10–15 days to same-day for 1,000+ students per test, handling cancelled/bonus/blank marks across 4 test types.",
          "5-type student persona engine (Star Performer → Drop-off Risk) built on score trajectory, attendance and homework signals, with persona-specific recommendations.",
          "SWOT-based question paper generator: per-student weakness analysis → weighted question selection → branded PDF → S3 delivery. 500+ unique papers per test cycle with zero teacher involvement.",
          "6 Grafana dashboards: student report card, test performance, subject insight, institute overview (geo heatmap + competitor overlay), faculty feedback (8 dimensions), segmentation.",
          "Mistral AI vision OCR digitised years of historical physical test records into the live schema.",
        ],
      },
    ],
    metrics: [
      "~2,200 students/year",
      "70+ pipelines",
      "7 source systems",
      "10–15 days → same-day",
      "80% → 99%+ accuracy",
      "30–40 hrs/week saved",
      "500+ papers per cycle",
      "6 dashboards",
    ],
    dataFlow:
      "Coaching tool (Selenium + IMAP) · testing LMS (REST) · Google Sheets / Drive / Forms · OMR files · RFID attendance → 70+ Python pipelines → PostgreSQL (47+ views) + ClickHouse (16 tables) → Grafana & Superset dashboards + automated papers, email MIS and Slack alerts",
    stack: [
      "Python", "SQL", "PostgreSQL", "ClickHouse", "Selenium", "Grafana",
      "Google APIs", "AWS S3", "ReportLab", "Mistral AI OCR", "Slack API",
    ],
  },
  {
    id: "energy",
    name: "Renewable Energy (Solar)",
    clients: "1 utility-scale solar company",
    tagline:
      "Cloud energy-management platform for a utility-scale solar power producer — 245 plants across India, monitored to the IEC 61724 standard.",
    overview:
      "A solar Independent Power Producer operating 245 plants (utility ground-mount, rooftop and captive). I owned every layer: IoT ingestion from plant dataloggers, ETL, the KPI engine, 13 dashboard surfaces, and billing/alarm automation. The two signature pieces: fixing performance KPIs that were silently 6–17× wrong, and re-architecting ingestion that was about to fail at scale.",
    engagements: [
      {
        title: "IoT ingestion & warehouse",
        points: [
          "Dual-protocol ingestion for two datalogger families (Modbus register parsing with scaling maps, and pre-scaled CSV) → SFTP → S3 → Lambda → Redshift; ~70,560 file events per day, historic archive backfilled to June 2021.",
          "Re-architected a Lambda-per-file design hitting Redshift's 500-connection hard limit into one scheduled ETL via Redshift Data API: 864,000 → 8,600 invocations/month (−99%), zero connection failures, headroom for 1,000+ plants.",
          "10M+ row analytics table with watermark incremental loads, 36-hour lookback for late data, deduplication and atomic writes; plant-to-dashboard freshness ≤10 minutes.",
        ],
      },
      {
        title: "KPI engine, dashboards & automation",
        points: [
          "Audited all 13 dashboards and found Performance Ratio errors of 6–17× (aggregation and unit-conversion bugs); rewrote the KPI SQL — now within ±2% of the IEC 61724 standard.",
          "13 dashboard surfaces for 12 user roles (operations, finance, management, clients) with row-level access control enforced at query level.",
          "Real-time alarm engine using absence-based detection: fault discovery 8–12 hours → ≤10 minutes, protecting ~₹2.8 lakh per 8-hour incident on a 10 MW plant.",
          "Automated Daily Generation Reports (80+ hrs/month saved) and tariff × generation PDF invoicing (15–20 hrs/month saved, billing disputes eliminated).",
        ],
      },
    ],
    metrics: [
      "245 plants",
      "≤10 min freshness",
      "10M+ rows",
      "−99% Lambda cost",
      "±2% of IEC 61724",
      "13 dashboards · 12 roles",
      "95+ hrs/month saved",
      "≤10 min fault detection",
    ],
    dataFlow:
      "Plant dataloggers (5-min polling) → SFTP → S3 → parsing Lambda → Redshift Auto-Copy → scheduled ETL (Redshift Data API) → KPI engine (IEC 61724) → FastAPI → 13 Grafana dashboards + automated reports, invoices and alarms",
    stack: [
      "Python", "SQL", "AWS Lambda", "Amazon Redshift", "EventBridge", "S3",
      "PostgreSQL", "FastAPI", "Grafana", "SFTPGo", "Docker / Kubernetes", "Modbus / IoT",
    ],
  },
];
