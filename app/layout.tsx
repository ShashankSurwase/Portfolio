import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shashank Surwase | Data Engineer & Analytics Engineer",
  description:
    "Portfolio of Shashank Surwase — Data Engineer and Analytics Engineer specialising in scalable ETL pipelines, BI dashboards, and intelligent automation across e-commerce, EdTech, and renewable energy.",
  keywords: [
    "Data Engineer Portfolio",
    "Analytics Engineer",
    "ETL Pipeline Engineer",
    "BI Developer",
    "Apache Airflow",
    "Redshift",
    "ClickHouse",
    "Power BI",
    "Grafana",
    "Automation Engineer",
    "Dashboard Developer",
  ],
  authors: [{ name: "Shashank Surwase" }],
  openGraph: {
    title: "Shashank Surwase | Data Engineer & Analytics Engineer",
    description:
      "Building scalable data systems, automation platforms, and intelligent analytics ecosystems for modern businesses.",
    type: "website",
  },
};

const NO_FOUC = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'dark');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FOUC }} />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
