"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, BookOpen, Sun, X, Users, Workflow, ArrowRight } from "lucide-react";
import { DOMAINS, DomainDetail } from "@/lib/domains";

const COVER = "/Portfolio/covers";

// GitHub mark (lucide dropped its brand glyph); inherits currentColor for both themes.
function Github({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

// GitHub repo roots (one repo per domain; each project lives in a Project-NN folder).
const REPO_ROOT: Record<"E-commerce" | "EdTech" | "Energy", string> = {
  "E-commerce": "https://github.com/ShashankSurwase/ECOM",
  EdTech: "https://github.com/ShashankSurwase/EdTech",
  Energy: "https://github.com/ShashankSurwase/Energy",
};
const repoUrl = (domain: "E-commerce" | "EdTech" | "Energy", n: number) =>
  `${REPO_ROOT[domain]}/tree/main/Project-${String(n).padStart(2, "0")}`;

// 16 anonymised projects (sourced from the domain folders). `id` maps to its cover art;
// `repo` opens the matching Project-NN folder in that domain's GitHub repository.
type Project = { id: string; title: string; domain: "E-commerce" | "EdTech" | "Energy"; impact: string; tags: string[]; repo: string };
const PROJECTS: Project[] = [
  { id: "ecom_multi_marketplace_airflow_etl", title: "Multi-Marketplace Airflow ETL Platform", domain: "E-commerce", impact: "A production orchestration layer ingesting 31 fragmented commerce source systems into one governed warehouse.", tags: ["Apache Airflow", "PostgreSQL", "Kafka"], repo: repoUrl("E-commerce", 1) },
  { id: "ecom_automated_mis_reporting", title: "Automated MIS & Daily Growth Reporting", domain: "E-commerce", impact: "Scheduled cross-channel sales reporting with same-day anomaly detection and data-quality gates.", tags: ["Airflow", "pandas", "SciPy"], repo: repoUrl("E-commerce", 2) },
  { id: "ecom_columnar_data_warehouse", title: "Columnar E-commerce Data Warehouse", domain: "E-commerce", impact: "A from-scratch columnar warehouse unifying five sales channels and powering the reporting layer.", tags: ["ClickHouse", "Python", "SQL"], repo: repoUrl("E-commerce", 3) },
  { id: "ecom_customer_intelligence_analytics", title: "Customer Intelligence & RFM Segmentation", domain: "E-commerce", impact: "RFM segmentation, cross-sell adjacency and demand forecasting on a unified customer warehouse.", tags: ["scikit-learn", "R", "Airflow"], repo: repoUrl("E-commerce", 4) },
  { id: "ecom_inventory_analytics_powerbi", title: "Inventory Analytics & Power BI Dashboard", domain: "E-commerce", impact: "Ageing, ABC classification and reorder prediction surfaced through a version-controlled dashboard.", tags: ["ClickHouse", "Power BI", "Python"], repo: repoUrl("E-commerce", 5) },
  { id: "ecom_revenue_integration_recovery", title: "Multi-Platform Revenue Integration & Recovery", domain: "E-commerce", impact: "A canonical revenue dataset across six marketplaces that recovered $1.05M lost to an encoding bug.", tags: ["Python", "pandas", "Jinja2"], repo: repoUrl("E-commerce", 6) },
  { id: "edtech_automated_omr_evaluation", title: "Automated OMR Evaluation System", domain: "EdTech", impact: "A cloud-triggered pipeline that auto-scores thousands of bubble-sheet tests against a model key.", tags: ["Python", "Mistral OCR", "Airflow"], repo: repoUrl("EdTech", 1) },
  { id: "edtech_automated_reporting_system", title: "Automated MIS & Report Generation", domain: "EdTech", impact: "Template-driven MIS, test and faculty reports delivered daily at 06:00 with real-time QA alerts.", tags: ["Python", "PostgreSQL", "Slack API"], repo: repoUrl("EdTech", 2) },
  { id: "edtech_multi_source_etl_platform", title: "Multi-Source Student Data ETL Platform", domain: "EdTech", impact: "A dual-database platform wiring seven disconnected institute source systems into one analytics layer.", tags: ["Airflow", "Selenium", "ClickHouse"], repo: repoUrl("EdTech", 3) },
  { id: "edtech_student_analytics_dashboards", title: "Student Analytics Dashboard Suite", domain: "EdTech", impact: "Six role-aware dashboards with a student-persona engine and chapter-level weakness prioritisation.", tags: ["Grafana", "ClickHouse", "SQL"], repo: repoUrl("EdTech", 4) },
  { id: "edtech_swot_question_paper_generator", title: "SWOT-Based Question Paper Generator", domain: "EdTech", impact: "Derives each student's SWOT profile from test history and generates a weak-topic-weighted practice paper.", tags: ["Python", "reportlab", "AWS S3"], repo: repoUrl("EdTech", 5) },
  { id: "energy_iot_ingestion_pipeline", title: "Solar IoT Data Ingestion Pipeline", domain: "Energy", impact: "Event-driven serverless ingestion of 5-minute telemetry from a 245-plant solar fleet into one schema.", tags: ["AWS Lambda", "Redshift", "EventBridge"], repo: repoUrl("Energy", 1) },
  { id: "energy_operations_automation", title: "Solar Operations Automation Suite", domain: "Energy", impact: "Daily generation reports, revenue invoicing and a real-time absence-based alarm engine on one data model.", tags: ["AWS Lambda", "Redshift", "SES"], repo: repoUrl("Energy", 2) },
  { id: "energy_role_based_dashboard_suite", title: "Role-Based EMS Dashboard Suite", domain: "Energy", impact: "A 13-surface EMS with query-level RBAC that scopes every SQL query to a role across a 245-plant fleet.", tags: ["Grafana", "FastAPI", "Redshift"], repo: repoUrl("Energy", 3) },
  { id: "energy_solar_kpi_engine_pr_audit", title: "IEC 61724 Solar KPI Engine & PR Audit", domain: "Energy", impact: "A root-cause audit that corrected a large Performance Ratio error and rebuilt a self-healing incremental ETL.", tags: ["AWS Lambda", "Redshift", "IEC 61724"], repo: repoUrl("Energy", 4) },
  { id: "energy_platform_overview", title: "Utility-Scale Solar EMS — Platform Overview", domain: "Energy", impact: "End-to-end cloud EMS for a 245-plant portfolio: IoT ingestion, IEC KPI engine, RBAC dashboards and ops automation.", tags: ["AWS", "Redshift", "Grafana"], repo: repoUrl("Energy", 5) },
  // ── Additional E-commerce engagements (repos Project-07..16) ──
  { id: "ecom_erp_offline_channel_analytics", title: "ERP & Offline-Channel Analytics", domain: "E-commerce", impact: "Turned two invisible offline ERP streams into documented procurement, stock-ageing and dispatch-SLA analytics across three locations.", tags: ["SAP / ERP", "Procurement Analytics", "Inventory Ageing"], repo: repoUrl("E-commerce", 7) },
  { id: "ecom_unified_sales_inventory_facts", title: "Unified Cross-Channel Sales & Inventory Facts", domain: "E-commerce", impact: "Unified 12 sales platforms into a 129-column hourly fact and 9 inventory facility types into a 92-column daily fact.", tags: ["ClickHouse", "Fact Tables", "SQL Windows"], repo: repoUrl("E-commerce", 8) },
  { id: "ecom_seller_portal_automation", title: "Marketplace Seller-Portal Automation", domain: "E-commerce", impact: "Automated six OTP-gated seller portals with fully unattended email-OTP login, eliminating all manual daily downloads.", tags: ["Selenium", "Playwright", "OTP Automation"], repo: repoUrl("E-commerce", 9) },
  { id: "ecom_webhook_event_ingestion", title: "Real-Time Webhook Event Ingestion", domain: "E-commerce", impact: "Landed seven webhook event streams in ClickHouse seconds after emission, with zero data loss under crash conditions.", tags: ["FastAPI", "Webhooks", "ClickHouse"], repo: repoUrl("E-commerce", 10) },
  { id: "ecom_offline_retail_gt_integration", title: "Offline Retail & General-Trade Integration", domain: "E-commerce", impact: "Brought three API-less offline channels — ~32M inventory rows and 100+ distributors — into the central warehouse.", tags: ["Web Scraping", "Azure SQL", "Incremental ETL"], repo: repoUrl("E-commerce", 11) },
  { id: "ecom_warehouse_migration_clickhouse", title: "PostgreSQL → ClickHouse Migration", domain: "E-commerce", impact: "Migrated ~600 tables and ~30 dashboards to ClickHouse with zero wrong numbers seen by stakeholders during cut-over.", tags: ["ClickHouse", "Data Migration", "Parity Validation"], repo: repoUrl("E-commerce", 12) },
  { id: "ecom_logistics_courier_analytics", title: "Multi-Courier Logistics Analytics", domain: "E-commerce", impact: "Unified 6+ couriers into one dashboard with same-day SLA-breach detection, replacing half-day manual log pulls with one query.", tags: ["Logistics Analytics", "Async Polling", "ClickHouse"], repo: repoUrl("E-commerce", 13) },
  { id: "ecom_superset_bi_dashboards", title: "Executive BI Dashboard Suite (Superset)", domain: "E-commerce", impact: "Served ~30 self-hosted dashboards on shared facts with one SQL definition per KPI, ending cross-team number disputes at zero per-seat cost.", tags: ["Apache Superset", "Metric Governance", "ClickHouse"], repo: repoUrl("E-commerce", 14) },
  { id: "ecom_d2c_website_data_ingestion", title: "D2C Website Data Ingestion", domain: "E-commerce", impact: "Turned SFTP CSV drops into 54 unattended config-driven flows, cutting order-data latency from T+1 day to ~2 hours.", tags: ["SFTP", "ClickHouse", "Config-Driven ETL"], repo: repoUrl("E-commerce", 15) },
  { id: "ecom_data_quality_observability", title: "Data Quality & Pipeline Observability", domain: "E-commerce", impact: "Built observability over 131 DAGs with a self-maintaining table contract and reconciliation that gates >0.5% discrepancies before stakeholders see them.", tags: ["Data Quality", "Observability", "LLM Docs"], repo: repoUrl("E-commerce", 16) },
  // ── Additional EdTech engagements (repos Project-06..09) ──
  { id: "edtech_iot_rfid_attendance_integration", title: "IoT, RFID & Multi-Source Attendance", domain: "EdTech", impact: "Fused RFID taps, manual registers, schedules and IoT presence telemetry into one reconciled record, flagging proxy attendance no single source could detect.", tags: ["RFID", "IoT Telemetry", "Reconciliation"], repo: repoUrl("EdTech", 6) },
  { id: "edtech_scoresheet_tbr_pdf_report_suite", title: "Automated PDF & Google-Sheet Report Suite", domain: "EdTech", impact: "Cut days of manual report collation to board-ready multi-page PDFs delivered ~30 minutes after every test, triggered by a single Google-Sheet row.", tags: ["ReportLab", "Google Sheets API", "PDF Automation"], repo: repoUrl("EdTech", 7) },
  { id: "edtech_marketing_admissions_analytics_dashboard", title: "Marketing & Admissions Funnel Analytics", domain: "EdTech", impact: "Linked lead source to enrolment for the first time via a 57-query Grafana funnel on ClickHouse, exposing channel ROI and underserved catchment areas.", tags: ["Grafana", "ClickHouse", "Funnel Analytics"], repo: repoUrl("EdTech", 8) },
  { id: "edtech_coaching_superset_platform", title: "10+2 Coaching Superset Analytics Platform", domain: "EdTech", impact: "Replaced manual multi-source report collation with a self-serve, real-time Superset suite of 5 dashboards and 17 tabs, role-scoped so faculty see only their own subject.", tags: ["Apache Superset", "RBAC", "ClickHouse"], repo: repoUrl("EdTech", 9) },
  // ── Additional Energy engagements (repos Project-06..09) ──
  { id: "energy_deployment_production_engineering", title: "EMS Deployment & Production Engineering", domain: "Energy", impact: "Cut serverless compute 99% (864K→8.6K invocations/month) and made new engineers productive in week one via a 6-incident RCA library and rollback matrix.", tags: ["AWS Lambda", "Observability", "SRE"], repo: repoUrl("Energy", 6) },
  { id: "energy_plant_onboarding_registration", title: "Solar Plant Onboarding & Registration", domain: "Energy", impact: "Turned a commissioning form into a live, KPI-validated solar plant in 2–4 hours across 245 plants, blocking partial-config corruption with a go-live gate.", tags: ["Modbus", "Provisioning", "Data Validation"], repo: repoUrl("Energy", 7) },
  { id: "energy_security_vapt_readiness", title: "EMS Security Hardening & VAPT Readiness", domain: "Energy", impact: "Graded 13 security findings (3 Critical) and delivered an 8-step rotate→purge→Secrets-Manager runbook plus least-privilege IAM ahead of an external VAPT.", tags: ["Security / VAPT", "IAM Least-Privilege", "Secrets Manager"], repo: repoUrl("Energy", 8) },
  { id: "energy_historic_data_backfill", title: "Historic Data Extraction & Multi-Year Backfill", domain: "Energy", impact: "Recovered 4+ years from 47 monthly cold archives and backfilled 5-year single-site history in ~4 days through the unmodified production pipeline.", tags: ["Backfill", "Watermark Replay", "Data Lineage"], repo: repoUrl("Energy", 9) },
];

// Per-project detail shown when a project card is clicked (blurb + key results).
// Sourced from each project's repo README (anonymized). Falls back to `impact` if absent.
const DETAILS: Record<string, { blurb: string; results: string[] }> = {
  ecom_multi_marketplace_airflow_etl: { blurb: "A production Apache Airflow platform of 131 pipelines that ingests, validates and transforms data from 31 disconnected sales, logistics and marketing systems into one PostgreSQL warehouse. Configuration-driven onboarding and schema-fingerprint validation made it cheap to extend and safe against silent vendor format changes.", results: ["31 sources → 1 warehouse", "131 Airflow DAGs", "Onboarding 2–5 days → 2–4 hrs", "80+ hrs/mo saved"] },
  ecom_automated_mis_reporting: { blurb: "An automated MIS and reporting suite on the unified warehouse, replacing 80+ hours a month of manual Excel compilation across five channel portals. Reports run only after ingestion completes, and same-day anomaly detection plus source-vs-warehouse reconciliation catch problems before leadership sees them.", results: ["80+ hrs/mo eliminated", "Anomaly T+1 → T+0", "5 channels unified", "Daily/weekly/monthly automated"] },
  ecom_columnar_data_warehouse: { blurb: "A columnar ClickHouse warehouse built from scratch to serve wide cross-channel aggregations fast, consolidating an ERP, order-management system, Shopify and four previously-siloed retail sub-channels. Three explicit append-safe write patterns matched ClickHouse's semantics and powered 27 production reports.", results: ["5 systems → 1 warehouse", "30+ tables built", "27 reports automated", "4 retail channels unified"] },
  ecom_customer_intelligence_analytics: { blurb: "An intelligence layer on the unified warehouse delivering cross-channel RFM segmentation, live cross-sell recommendations, demand-driven procurement and same-day sales anomaly alerts. Every model reads one unified order view, and each output is wired into a real operational action rather than a dashboard.", results: ["5 channels unified", "Top 20% = 70–80% revenue", "Cross-sell live on site", "Anomaly T+1 → T+0"] },
  ecom_inventory_analytics_powerbi: { blurb: "A full inventory-intelligence layer on the columnar warehouse computing ageing, ABC, reorder, stockout and valuation analytics from reconciled ERP and OMS data. It feeds a version-controlled Power BI dashboard used daily by operations and finance, firing reorders before stockout given long sourcing lead times.", results: ["ERP + OMS reconciled", "Zero manual reconciliation", "Reorders before stockout", "Version-controlled dashboard"] },
  ecom_revenue_integration_recovery: { blurb: "A five-step framework unifying $3.78M of revenue across six India and UAE platforms into one canonical dataset with per-platform match-rate quality gates. Root-causing a character-encoding bug that garbled UAE product IDs recovered $1.05M of revenue that had been invisible to every report.", results: ["$1.05M revenue recovered", "Match rate 0% → 99.8%", "94,497 records unified", "53s → 6s (8.8× faster)"] },
  ecom_erp_offline_channel_analytics: { blurb: "Turned two invisible offline ERP streams — a general-trade procurement channel and an SAP distribution operation — into documented, repeatable procurement, stock-ageing and dispatch-SLA analytics. A field-level data dictionary made one-off exports into reusable analytical assets.", results: ["2 offline channels documented", "Stock ageing across 3 locations", "Daily dispatch SLA automated", "Consumption-based reorder model"] },
  ecom_unified_sales_inventory_facts: { blurb: "Two canonical ClickHouse fact tables — a 129-column hourly sales fact across 12 platforms and a 92-column daily inventory fact across 9 facility types — became the single source every dashboard, finance report and query reads. Finance-safe GMV semantics and 'True ADS' metrics are engineered directly into the facts.", results: ["12 platforms in one fact", "9 facilities consolidated", "Hourly freshness", "OMS/WMS/logistics auto-reconciled"] },
  ecom_seller_portal_automation: { blurb: "A reusable browser-automation framework that turned OTP-gated, API-less seller portals into scheduled, monitored pipeline sources. A fully unattended Gmail-OTP login loop plus idempotent parse-and-load shipped across three client engagements in both Selenium and Playwright.", results: ["6 portals on one framework", "Fully unattended OTP login", "Reused across 3 clients", "Broken scrapers caught same-day"] },
  ecom_webhook_event_ingestion: { blurb: "An always-on, zero-data-loss webhook layer landing messaging engagement and order events in ClickHouse seconds after emission. A raw → materialised-view → final pattern makes schema evolution a routine backfill, and layered fallbacks plus systemd deployment guarantee no event is ever lost.", results: ["7 webhook services", "Seconds capture latency", "Zero data loss on crash", "Opt-out compliance enforced"] },
  ecom_offline_retail_gt_integration: { blurb: "Landed three API-less offline channels — 100+ retail stores, 100+ general-trade distributors and pop-up stores — into the same ClickHouse warehouse as ecommerce. Used POS scraping, stateful-cursor DMS APIs and Azure SQL sync over an SSH proxy, with daily payment reconciliation and automated staff incentives.", results: ["~32M retail rows, no API", "100+ GT distributors reconciled", "Pop-up data ~1.5h latency", "Payment reconciliation daily"] },
  ecom_warehouse_migration_clickhouse: { blurb: "Migrated a ~600-table PostgreSQL analytical warehouse and ~30 Superset dashboards to a ClickHouse cluster without the business ever seeing a wrong number. Dual control planes and per-metric parity proofs verified every metric equal in both SQL dialects before cut-over.", results: ["~600 tables migrated", "~130 views recreated", "~30 dashboards, parity-proven", "Zero wrong numbers at cut-over"] },
  ecom_logistics_courier_analytics: { blurb: "A cost-aware two-stage polling pipeline unified 6+ courier partners behind one delivery dashboard via a multi-carrier aggregator API. A cheap change-detection stage gates an expensive full-history pull, feeding same-day SLA-breach detection, RTO early warning and per-courier scorecards.", results: ["6+ couriers unified", "Half-day pulls → one query", "SLA breach same-day", "50+ derived delivery columns"] },
  ecom_superset_bi_dashboards: { blurb: "A self-hosted Apache Superset suite on the ClickHouse warehouse gave every team its own dashboard reading the same facts with identical SQL metric definitions, ending cross-team 'your number vs mine' disputes. Marketing lineage across five ad platforms and ops-owned status mapping keep it governed at zero per-seat cost.", results: ["5 team dashboards", "~30 registered dashboards", "One SQL def per KPI", "Zero per-seat licence cost"] },
  ecom_d2c_website_data_ingestion: { blurb: "Turned a SaaS ecommerce platform's SFTP CSV drops into 54 unattended, config-driven flows behaving like a reliable stream into ClickHouse. Order JSON is unnested into child tables with payment-correct revenue, and an S3-first archive makes recovery a replay rather than an SFTP re-pull.", results: ["54 unattended flows", "Order latency T+1 → ~2h", "~6 entities analyst-onboarded", "Phantom revenue eliminated"] },
  ecom_data_quality_observability: { blurb: "An observability layer over 131 DAGs answering three questions automatically — is the data moving, is it right, and what should exist. LLM-generated per-DAG docs are mined into a self-maintaining table contract validated against the live warehouse, backed by freshness, file-arrival and reconciliation alerting.", results: ["131 DAGs monitored", "155 docs auto-generated", "Self-maintaining table contract", "10–20 day gap caught & backfilled"] },
  edtech_automated_omr_evaluation: { blurb: "A fully automated pipeline that grades OMR bubble-sheet exams the moment staff drop an Excel file into Google Drive. It parses answers against the key, applies edge-case scoring rules, ranks students in SQL and returns formatted results within hours — plus OCR digitisation of legacy paper records.", results: ["10–15 days → same-day results", "1,000+ students scored per test", "Zero arithmetic scoring errors", "4 test types supported"] },
  edtech_automated_reporting_system: { blurb: "A template-driven MIS engine that auto-generates and emails daily admission, test-performance, monthly and faculty reports to management at 06:00, with no staff involvement. Editable HTML templates let non-technical staff change reports, while failed data-quality checks fire real-time Slack alerts.", results: ["30–40 hrs/week eliminated", "4 report types automated", "06:00 zero-touch delivery", "Alerts 4–6 hrs earlier"] },
  edtech_multi_source_etl_platform: { blurb: "An ETL platform wiring 7 disconnected student-data systems into a dual PostgreSQL and ClickHouse warehouse via 70+ production pipelines. It extracts from an API-less SaaS tool with browser automation, normalises messy data shapes and prevents schema drift to deliver a trustworthy single data layer.", results: ["Accuracy ~80% → 99%+", "~85% manual work removed", "7 sources, 70+ pipelines", "~2,200 students/year"] },
  edtech_student_analytics_dashboards: { blurb: "Six Grafana dashboards over ClickHouse giving students, parents, faculty and management live performance visibility. A persona engine auto-classifies each student into one of five types to flag at-risk cases weeks earlier, with chapter-priority scoring, segmentation and a geographic catchment map.", results: ["6 dashboards, 4 stakeholder groups", "5-type persona engine", "At-risk flagged weeks earlier", "Manual reporting eliminated"] },
  edtech_swot_question_paper_generator: { blurb: "A pipeline generating 500+ unique per-student practice papers each test cycle, each weighted toward that student's weak chapters. It derives a live SWOT profile, fuzzy-matches chapters to the question bank, calibrates difficulty, renders branded PDFs and delivers them privately via pre-signed S3 URLs.", results: ["500+ personalised papers/cycle", "Zero teacher time", "Secure S3 delivery", "Redundant runs eliminated"] },
  edtech_iot_rfid_attendance_integration: { blurb: "An integration platform that fuses three disagreeing attendance signals — RFID taps, manual registers and class schedule — plus IoT presence telemetry into one reconciled record. Explicit conflict rules surface proxy attendance and in-building-but-bunking cases no single source could detect.", results: ["3 sources + IoT cross-check", "Proxy attendance detected", "Ghost entries eliminated", "~61 params/device normalised"] },
  edtech_scoresheet_tbr_pdf_report_suite: { blurb: "An automated report suite that turns days of manual collation into board-ready multi-page PDFs delivered about 30 minutes after every test. Staff trigger it from a single Google Sheet row; readiness-flag gating prevents partial-data reports, and outputs route to batch-year Drive folders.", results: ["Days → ~30 min turnaround", "90+ scoresheets, 30+ TPRs", "200+ eval reports/test", "Partial-data reports prevented"] },
  edtech_marketing_admissions_analytics_dashboard: { blurb: "A 57-query Grafana funnel dashboard on ClickHouse that connects lead source to enrolment for the first time. It unifies CRM enquiries, admissions and manual reference data, revealing which channels convert and which catchment areas are underserved via geographic maps.", results: ["Lead-to-enrolment linkage", "Channel ROI visible", "57 queries across 9 tables", "Daily automated reporting"] },
  edtech_coaching_superset_platform: { blurb: "A centralised warehouse and self-serve Apache Superset suite replacing manual multi-source report collation. Built from a question-driven requirements catalogue, it spans student, test, topic and executive analytics with role-based access so faculty see only their own subject.", results: ["5 dashboards, 17 tabs", "Role-scoped access", "OMR + online + LMS unified", "Manual collation replaced"] },
  energy_iot_ingestion_pipeline: { blurb: "An event-driven, zero-touch pipeline that ingests 5-minute solar telemetry from two incompatible datalogger protocols across a 245-plant fleet, auto-detecting format and normalising everything into one canonical Redshift schema. A connectionless re-architecture eliminated connection-limit failures and cut compute 99% while preserving all raw history.", results: ["245 plants live", "Under 10-min freshness", "Lambda calls −99%", "Zero data loss"] },
  energy_operations_automation: { blurb: "Automated three manual solar-operations workflows — daily generation reports, monthly revenue invoicing and inverter fault detection — on one shared data model so reports, invoices and alarms never disagree. Absence-based detection catches stalled telemetry in minutes instead of the next morning.", results: ["95+ hours saved monthly", "Faults caught in under 10 min", "245 plants reported daily", "Billing errors eliminated"] },
  energy_role_based_dashboard_suite: { blurb: "A single Energy Management System serving 13 dashboards to 12 distinct user roles over a 245-plant fleet, with access to sites and screens enforced inside every SQL query rather than hidden in the UI. A FastAPI backend serves a version-controlled parameterised query library with transitive region-to-site resolution.", results: ["13 surfaces, 12 roles", "Query-level access control", "Zero SQL-injection surface", "String-level fault localisation"] },
  energy_solar_kpi_engine_pr_audit: { blurb: "Root-caused Performance Ratio KPIs that were silently inflated 6–17× across all 13 dashboards, rewrote the formula set to IEC 61724 compliance and reprocessed all history. Rebuilt the underlying incremental fact-table ETL to be self-healing, connection-safe and tolerant of late-arriving data.", results: ["PR fixed to ±2% of standard", "All 13 dashboards corrected", "Lambda calls −99%", "36-hour late-data tolerance"] },
  energy_platform_overview: { blurb: "The end-to-end cloud Energy Management System behind a 245-plant solar fleet: IoT ingestion, an IEC 61724 KPI engine, role-based dashboards and operations automation, all delivering measurement to dashboard within 10 minutes. A dual-database OLAP/OLTP core owned across every layer, built to scale past 1,000 plants.", results: ["Full stack owned end to end", "Under 10-min freshness", "245 plants, 13 dashboards", "1,000+ plant headroom"] },
  energy_deployment_production_engineering: { blurb: "The production-engineering layer around a revenue-bearing 245-plant EMS: reproducible Lambda builds, a per-component rollback matrix, CloudWatch and warehouse system-table observability, automated data-quality gates and an incident RCA library. Turned an architecturally sound pipeline into an operable, recoverable one.", results: ["6 RCAs, 15+ SOPs", "Stalls flagged in 15 min", "5 data-quality gates", "New engineers productive week 1"] },
  energy_plant_onboarding_registration: { blurb: "A standardised onboarding system that converts a completed commissioning form into a live, KPI-validated solar plant in 2–4 hours. Structured registration forms and a field checklist catch wiring and Modbus register errors before connection, while a 12-step referential-integrity-gated SOP seeds four data stores consistently.", results: ["Go-live in 2–4 hours", "Partial-config corruption blocked", "±2% KPI acceptance gate", "5 connectivity paths covered"] },
  energy_security_vapt_readiness: { blurb: "A full defensive security audit of a 245-plant solar EMS, enumerating 13 graded findings including committed secrets and plaintext transport. Documented a least-privilege database and IAM architecture, authored an 8-step rotate-purge-Secrets-Manager remediation runbook and scoped an external VAPT across five surfaces against compliance targets.", results: ["13 findings graded", "8-step remediation runbook", "Zero injection surface verified", "ISO 27001 / SOC 2 / CERT-In scoped"] },
  energy_historic_data_backfill: { blurb: "Recovered 4+ years of pre-EMS solar telemetry from 47 monthly cold archives, forensically attributing files to plants by datalogger ID where site folders were missing. Replayed the full history through the unmodified production pipeline via per-site watermark reset, with zero impact on live 5-minute processing.", results: ["4+ years recovered", "47 archives inventoried", "5-yr backfill in ~4 days", "Zero live-processing impact"] },
};

const DOMAIN_FILTER: Record<string, string> = { ecommerce: "E-commerce", edtech: "EdTech", energy: "Energy" };
const ICONS: Record<string, typeof ShoppingCart> = { ecommerce: ShoppingCart, edtech: BookOpen, energy: Sun };
const FILTERS = ["All", "E-commerce", "EdTech", "Energy"] as const;

export default function FolioProjects() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const [detail, setDetail] = useState<DomainDetail | null>(null);
  const [projDetail, setProjDetail] = useState<Project | null>(null);
  const selectedDomain = active === "All" ? null : DOMAINS.find((d) => DOMAIN_FILTER[d.id] === active) || null;

  useEffect(() => {
    document.body.style.overflow = detail || projDetail ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [detail, projDetail]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setDetail(null); setProjDetail(null); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="projects" className="py-16 sm:py-20" style={{ background: "var(--fo-bg-soft)", borderTop: "1px solid var(--fo-border)", borderBottom: "1px solid var(--fo-border)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center">
          <h2 className="text-[32px] sm:text-[40px] font-bold">Projects</h2>
          <div className="fo-underline fo-underline-center" />
          <p className="mt-4 text-[16px] max-w-2xl mx-auto">
            Real production projects across three industries. Pick an industry to
            explore its work — every number is a real, measured outcome.
          </p>
        </div>

        {/* Domain filter buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {FILTERS.map((f) => (
            <button key={f} type="button" onClick={() => setActive(f)} className={`fo-pill-tab ${active === f ? "is-active" : ""}`}>
              {f}
            </button>
          ))}
        </div>

        {active === "All" ? (
          /* ALL: three domain cards → click to open that domain's projects */
          <div key="all" className="mt-10 grid md:grid-cols-3 gap-6">
            {DOMAINS.map((d) => {
              const Icon = ICONS[d.id];
              const label = DOMAIN_FILTER[d.id];
              const count = PROJECTS.filter((p) => p.domain === label).length;
              return (
                <div key={d.id} className="fo-card fo-card-hover fo-fade-up p-6 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "var(--fo-accent-soft)", color: "var(--fo-accent)" }}>
                      <Icon size={22} />
                    </span>
                    <span className="fo-chip !text-[11px] !py-1 !px-2.5"><Users size={11} /> {d.clients}</span>
                  </div>
                  <h3 className="mt-4 text-[19px] font-bold fo-ink">{d.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed fo-muted flex-1">{d.tagline}</p>
                  <div className="mt-5 flex items-center gap-2.5">
                    <button onClick={() => setActive(label as (typeof FILTERS)[number])} className="fo-btn !py-2.5 !px-4 !text-[13px]">
                      View {count} projects <ArrowRight size={14} />
                    </button>
                    <button onClick={() => setDetail(d)} className="fo-btn-light !py-2.5 !px-4 !text-[13px]">Details</button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          selectedDomain && (() => {
            const Icon = ICONS[selectedDomain.id];
            const items = PROJECTS.filter((p) => p.domain === active);
            return (
              <div key={active} className="mt-10">
                <div className="flex items-center gap-3.5 pb-3.5 mb-6" style={{ borderBottom: "2px solid var(--fo-border)" }}>
                  <span className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--fo-accent-soft)", color: "var(--fo-accent)" }}>
                    <Icon size={19} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[18px] sm:text-[21px] font-bold fo-ink leading-tight">{selectedDomain.name}</h3>
                    <p className="text-[13px] fo-muted mt-0.5">{selectedDomain.clients} · {items.length} projects</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((p, i) => (
                    <div
                      key={p.id}
                      className="fo-card fo-card-hover fo-fade-up flex flex-col overflow-hidden"
                      style={{ animationDelay: `${i * 45}ms` }}
                    >
                      <button onClick={() => setProjDetail(p)} className="fo-proj-btn group flex flex-col text-left cursor-pointer flex-1">
                        <span className="relative block w-full overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`${COVER}/${p.id}.svg`} alt={p.title} width={640} height={360} className="w-full block transition-transform duration-300 group-hover:scale-[1.04]" style={{ aspectRatio: "16 / 9", objectFit: "cover" }} />
                          <span className="fo-proj-badge">Click to explore</span>
                        </span>
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="text-[16px] font-bold leading-snug fo-ink">{p.title}</h3>
                          <p className="mt-2 text-[13.5px] leading-relaxed fo-muted flex-1">{p.impact}</p>
                          <div className="mt-3.5 flex flex-wrap gap-1.5">
                            {p.tags.map((t) => (<span key={t} className="fo-tag !text-[11px]">{t}</span>))}
                          </div>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold fo-proj-cta" style={{ color: "var(--fo-accent)" }}>
                            View case study <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                          </span>
                        </div>
                      </button>
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-5 py-3 text-[13px] font-semibold fo-ink transition-colors"
                        style={{ borderTop: "1px solid var(--fo-border)", background: "var(--fo-bg-soft)" }}
                      >
                        <Github size={15} /> View code on GitHub <ArrowRight size={13} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()
        )}
      </div>

      {/* Domain detail modal */}
      <AnimatePresence>
        {detail && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
            style={{ background: "rgba(0, 0, 0, 0.55)", backdropFilter: "blur(4px)" }}
            onClick={() => setDetail(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="folio w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
              style={{ background: "var(--fo-card)" }}
            >
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 sm:px-8 pt-6 pb-4" style={{ background: "var(--fo-card)", borderBottom: "1px solid var(--fo-border)" }}>
                <div>
                  <div className="fo-chip !text-[11px] !py-1 !px-2.5 mb-2"><Users size={11} /> {detail.clients}</div>
                  <h3 className="text-[22px] sm:text-[26px] font-bold leading-tight fo-ink">{detail.name}</h3>
                </div>
                <button aria-label="Close" onClick={() => setDetail(null)} className="fo-btn-light !p-2.5 !rounded-full flex-shrink-0"><X size={16} /></button>
              </div>
              <div className="px-6 sm:px-8 py-6 space-y-7">
                <p className="text-[15px] leading-relaxed">{detail.overview}</p>
                <div>
                  <div className="fo-kicker mb-3">Results</div>
                  <div className="flex flex-wrap gap-2">{detail.metrics.map((m) => (<span key={m} className="fo-chip">{m}</span>))}</div>
                </div>
                {detail.engagements.map((g) => (
                  <div key={g.title}>
                    <h4 className="text-[16px] font-bold fo-ink mb-2.5">{g.title}</h4>
                    <ul className="space-y-2.5">
                      {g.points.map((p) => (
                        <li key={p} className="flex gap-2.5 text-[14px] leading-relaxed">
                          <span className="mt-[8px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--fo-accent)" }} />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="fo-card !shadow-none p-4" style={{ background: "var(--fo-bg-soft)" }}>
                  <div className="flex items-center gap-2 fo-kicker mb-2"><Workflow size={13} /> How the data flows</div>
                  <p className="mono text-[12.5px] leading-relaxed fo-muted">{detail.dataFlow}</p>
                </div>
                <div>
                  <div className="fo-kicker mb-3">Tools used</div>
                  <div className="flex flex-wrap gap-1.5">{detail.stack.map((t) => (<span key={t} className="fo-tag">{t}</span>))}</div>
                </div>
                <div className="pb-2">
                  <a
                    href={REPO_ROOT[DOMAIN_FILTER[detail.id] as "E-commerce" | "EdTech" | "Energy"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fo-btn !py-2.5 !px-4 !text-[13px] inline-flex"
                  >
                    <Github size={15} /> Browse the code on GitHub <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Per-project detail modal */}
      <AnimatePresence>
        {projDetail && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
            style={{ background: "rgba(0, 0, 0, 0.55)", backdropFilter: "blur(4px)" }}
            onClick={() => setProjDetail(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="folio w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl"
              style={{ background: "var(--fo-card)" }}
            >
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${COVER}/${projDetail.id}.svg`} alt={projDetail.title} width={640} height={360} className="w-full block" style={{ aspectRatio: "16 / 9", objectFit: "cover" }} />
                <button aria-label="Close" onClick={() => setProjDetail(null)} className="fo-btn-light !p-2.5 !rounded-full absolute top-3 right-3 flex-shrink-0"><X size={16} /></button>
              </div>
              <div className="px-6 sm:px-8 py-6 space-y-6">
                <div>
                  <span className="fo-chip !text-[11px] !py-1 !px-2.5">{projDetail.domain}</span>
                  <h3 className="text-[21px] sm:text-[25px] font-bold leading-tight fo-ink mt-2.5">{projDetail.title}</h3>
                </div>
                <p className="text-[15px] leading-relaxed">{DETAILS[projDetail.id]?.blurb ?? projDetail.impact}</p>
                {DETAILS[projDetail.id]?.results?.length ? (
                  <div>
                    <div className="fo-kicker mb-3">Key results</div>
                    <div className="flex flex-wrap gap-2">{DETAILS[projDetail.id].results.map((r) => (<span key={r} className="fo-chip">{r}</span>))}</div>
                  </div>
                ) : null}
                <div>
                  <div className="fo-kicker mb-3">Tech</div>
                  <div className="flex flex-wrap gap-1.5">{projDetail.tags.map((t) => (<span key={t} className="fo-tag">{t}</span>))}</div>
                </div>
                <div className="pb-2">
                  <a href={projDetail.repo} target="_blank" rel="noopener noreferrer" className="fo-btn !py-2.5 !px-4 !text-[13px] inline-flex">
                    <Github size={15} /> View code on GitHub <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
