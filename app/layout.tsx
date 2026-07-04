import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Inter, Poppins, Roboto } from "next/font/google";
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
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], display: "swap" });
const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });

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
    var theme = stored || 'light';
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {
    document.documentElement.classList.remove('dark');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${inter.variable} ${poppins.variable} ${roboto.variable} antialiased`}
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
