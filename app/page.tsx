import Sidebar from "@/components/dashboard/Sidebar";
import Toolbar from "@/components/dashboard/Toolbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Domains from "@/components/Domains";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <div className="md:ml-14">
        <Toolbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Domains />
          <Projects />
          <TechStack />
          <Contact />
          <Footer />
        </main>
      </div>
    </div>
  );
}
