import FolioNav from "@/components/folio/FolioNav";
import FolioHero from "@/components/folio/FolioHero";
import FolioStats from "@/components/folio/FolioStats";
import FolioDomains from "@/components/folio/FolioDomains";
import FolioProjects from "@/components/folio/FolioProjects";
import FolioSkills from "@/components/folio/FolioSkills";
import FolioContact from "@/components/folio/FolioContact";
import FolioFooter from "@/components/folio/FolioFooter";

export default function Home() {
  return (
    <div className="folio min-h-screen">
      <FolioNav />
      <main>
        <FolioHero />
        <FolioStats />
        <FolioDomains />
        <FolioProjects />
        <FolioSkills />
        <FolioContact />
      </main>
      <FolioFooter />
    </div>
  );
}
