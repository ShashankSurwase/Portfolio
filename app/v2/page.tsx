import EditorialNav from "@/components/editorial/EditorialNav";
import EditorialHero from "@/components/editorial/EditorialHero";
import Bio from "@/components/editorial/Bio";
import Story from "@/components/editorial/Story";
import WorkIndex from "@/components/editorial/WorkIndex";
import StackAndContact from "@/components/editorial/StackAndContact";

export default function EditorialPage() {
  return (
    <div className="v2 min-h-screen">
      <EditorialNav />

      <main>
        <EditorialHero />
        <Bio />

        {/* Three feature stories — one per domain */}
        <section id="stories">
          <Story
            number="I"
            domain="Renewable Energy"
            title="The day the dashboards were lying."
            dek="A six-to-seventeen-times error sat unchallenged across thirteen production dashboards because the numbers looked plausible. This is how I found it, and why I now validate against the standard instead of against itself."
            body={[
              "The platform was already running when I joined the engagement. Two hundred and forty-five solar plants, telemetry every five minutes, thirteen Grafana dashboards quietly displaying Performance Ratio values that looked entirely reasonable — seventy-two percent here, sixty-eight percent there — and which, as it turned out, were anywhere from six to seventeen times higher than physically possible.",
              "The cause was two compounding mistakes in a single SQL block. When a site has multiple pyranometer readings at the same timestamp, the correct operation is to deduplicate by sensor identity and then sum across the deduplicated readings. The previous implementation averaged instead. Separately, the conversion factor that turns five-minute W/m² readings into kWh/m² is twelve thousand, not one thousand. Either of these would have been a noticeable error on its own; together they produced numbers that nobody flagged because the numbers also happened to fall within a believable range for a healthy plant.",
              "The fix was small and unglamorous — a few corrected SQL files, a reprocess of the affected partitions, validation against the IEC 61724 reference formulas. The lesson behind the fix is the bigger thing: a dashboard that is internally consistent with its own bug will survive for months. Cross-reference against an external standard, not against last month&apos;s dashboard.",
              "While correcting that, I also re-architected the upstream Lambda layer. The original design ran a Lambda per uploaded file — eight hundred and sixty-four thousand invocations a month, each opening its own Redshift connection, and a system that was minutes from hitting Redshift&apos;s five-hundred-connection ceiling every busy morning. I collapsed it into a single EventBridge-scheduled ETL Lambda using the Redshift Data API, which submits SQL over HTTP and holds no persistent connections at all. Invocations dropped to eight thousand six hundred a month. The platform now scales to a thousand plants without further code changes.",
            ]}
            pullquote="A dashboard that is internally consistent with its own bug will survive for months. Validate against the standard, not against itself."
            stats={[
              { v: "245",      k: "solar plants now monitored at ≤10-minute freshness" },
              { v: "±2%",      k: "KPI accuracy versus IEC 61724 reference values" },
              { v: "−99%",     k: "Lambda invocations (864K → 8.6K per month)" },
              { v: "≤10 min",  k: "fault detection latency, down from 8–12 hours" },
            ]}
            tech={[
              "AWS Lambda",
              "Redshift Serverless · Data API",
              "EventBridge",
              "S3",
              "Grafana (13 surfaces · 12 roles)",
              "FastAPI",
              "IEC 61724",
            ]}
          />

          <Story
            number="II"
            domain="E-commerce"
            title="A million dollars hiding in a character-encoding bug."
            dek="The Amazon Vendor Central UAE feed had a zero-percent match rate against our product master. The fix was a single line in a cleaning step. The recovered revenue was $1.05M."
            body={[
              "When you operate across India and the Gulf at the same time, you discover that ASINs are not quite the same thing in both regions. Indian product identifiers fit comfortably inside ASCII. UAE identifiers, in some metadata fields, do not — they contain Unicode characters that simply have no ASCII representation. The original cleaning step in our reconciliation pipeline applied ASCII encoding to every ASIN it touched, which silently corrupted the UAE side of every join.",
              "The visible symptom was that the Amazon Vendor Central UAE feed matched our product master at zero percent. The hidden symptom was that one million and fifty thousand dollars of vendor revenue was sitting in the unmapped bucket — invisible to brand-level reporting, invisible to category-level reporting, invisible to anyone trying to make a serious decision about UAE ad spend. The fix was to encode both sides of the join consistently, strip whitespace, uppercase, and only then attempt to match. The match rate moved from zero to ninety-nine point eight percent. The revenue, finally, became visible.",
              "Alongside the fix, I rebuilt the reconciliation as a five-step framework — collect, platform-clean, master-join, unify, validate — with per-platform match rates monitored against a half-percent discrepancy threshold. Platforms that fell below the threshold (a Noon Vendor flow at six and a half percent, a Nysaa flow at zero) were explicitly flagged as needing a cross-reference table, rather than silently absorbed into the averaged total. Half the value of a quality system is what it refuses to claim.",
              "The throughput rewrite came along for free. Replacing row-iterative pandas operations with vectorised ones and parallelising the per-platform passes brought a full run from fifty-three seconds to six — an 8.8× speedup at fifteen thousand records per second. Useful, because analysts now trigger reruns themselves after fixing catalog entries.",
            ]}
            pullquote="Half the value of a quality system is what it refuses to claim."
            stats={[
              { v: "$1.05M",    k: "previously-untracked revenue recovered in one fix" },
              { v: "0 → 99.8%", k: "match rate on Amazon Vendor Central UAE feed" },
              { v: "8.8×",      k: "pipeline speedup (53 → 6 seconds per run)" },
              { v: "96.5%",     k: "overall revenue coverage across 6 platforms" },
            ]}
            tech={[
              "Python · pandas (vectorised)",
              "PostgreSQL",
              "Apache Airflow",
              "ClickHouse",
              "AWS S3",
              "Power BI",
            ]}
            reverse
          />

          <Story
            number="III"
            domain="EdTech"
            title="Turning ten days of manual evaluation into a single morning."
            dek="A coaching institute&apos;s exam-evaluation cycle ran on bubble sheets, spreadsheets, and ten to fifteen days of patience. The system I built does the same job before the next class starts."
            body={[
              "Coaching institutes that prepare students for entrance exams operate on a brutal cadence. A test on Friday means rankings by Monday, ideally, because the faculty needs to plan Tuesday around what students got wrong. The institute I worked with was managing this rhythm on bubble sheets — physical paper, manually scanned, manually scored, manually compiled into Excel rankings. The cycle took ten to fifteen days. By the time results were ready, the faculty had already moved on.",
              "The replacement is a pipeline that ingests a multi-sheet Excel containing model answers and student answer matrices, runs SQL window functions for scoring and ranking, and handles every edge case the institute had quietly been living with — cancelled questions where everyone gets full marks, bonus questions where everyone gets extra, blank answers with no negative marking, four different institute-specific test types. The output is an evaluated Excel uploaded back to the institute&apos;s drive, with the rankings ready before the next class begins.",
              "The same engagement produced a personalised question paper generator. For each student, the pipeline builds a SWOT view from test history — which chapters they consistently score well on, which they consistently fail — fuzzy-matches those chapter names against the question bank using a SequenceMatcher threshold (because chapter names rarely match exactly between systems), selects questions weighted by weak-topic priority and difficulty calibration, renders a branded PDF with reportlab, uploads to S3, and stores a pre-signed URL in the database. Five hundred personalised papers per cycle, generated without anyone manually building them.",
              "All of this sits on a dual database — PostgreSQL for the messy multi-source raw layer with its forty-seven analytical views, ClickHouse for the wide aggregate scans that power the six student-facing dashboards. Six dashboards turned out to be the right number: a student report card with five auto-classified personas, a faculty-feedback matrix across eight teaching dimensions, a chapter-prioritisation table that ranks weak chapters by impact rather than difficulty, and so on. Thirty to forty hours per week of manual MIS work disappeared.",
            ]}
            pullquote="By the time results were ready, the faculty had already moved on. The new pipeline finishes before the next class begins."
            stats={[
              { v: "10–15 days → same day", k: "OMR evaluation turnaround" },
              { v: "70+",                   k: "ETL pipelines across 7 source systems" },
              { v: "500+",                  k: "personalised question papers per cycle" },
              { v: "30–40 hrs/week",        k: "manual MIS work eliminated" },
            ]}
            tech={[
              "Python (Selenium · IMAP · reportlab · boto3)",
              "PostgreSQL · ClickHouse",
              "Grafana · Apache Superset",
              "AWS S3 (signed URLs)",
              "Canvas LMS API",
              "Mistral OCR",
            ]}
          />
        </section>

        <WorkIndex />
        <StackAndContact />
      </main>
    </div>
  );
}
