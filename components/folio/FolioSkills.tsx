"use client";
import { Code2, Workflow, Database, Cloud, BarChart3, ShieldCheck, Cpu, Brain } from "lucide-react";

const GROUPS = [
  { icon: Code2, title: "Languages", items: ["Python", "SQL", "R", "Bash"] },
  { icon: Workflow, title: "Pipelines & Orchestration", items: ["Apache Airflow", "AWS Lambda", "EventBridge", "Kafka", "Selenium"] },
  { icon: Database, title: "Databases & Warehouses", items: ["ClickHouse", "Amazon Redshift", "PostgreSQL", "BigQuery", "S3 Data Lake"] },
  { icon: Cloud, title: "Cloud", items: ["AWS", "GCP", "Docker", "Kubernetes", "FastAPI"] },
  { icon: BarChart3, title: "Dashboards & BI", items: ["Grafana", "Power BI", "Apache Superset", "Metabase"] },
  { icon: Brain, title: "ML & Analytics", items: ["scikit-learn", "RFM Segmentation", "Demand Forecasting", "Anomaly Detection", "AI OCR"] },
  { icon: ShieldCheck, title: "Data Quality", items: ["Schema Validation", "Match-Rate Monitoring", "Idempotent Loads", "IEC 61724 Auditing"] },
  { icon: Cpu, title: "APIs & IoT", items: ["Amazon SP-API", "40+ Platform APIs", "Modbus / IoT Loggers", "Webhooks & SFTP"] },
];

export default function FolioSkills() {
  return (
    <section id="skills" className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center">
          <h2 className="text-[30px] sm:text-[36px] font-bold">Skills</h2>
          <div className="fo-underline fo-underline-center" />
          <p className="mt-4 text-[14.5px] fo-muted">Tools I work with daily</p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GROUPS.map((g) => (
            <div key={g.title} className="fo-card p-5">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--fo-accent-soft)", color: "var(--fo-accent)" }}>
                  <g.icon size={15} />
                </span>
                <h3 className="text-[14px] font-bold">{g.title}</h3>
              </div>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <span key={it} className="fo-tag">{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
