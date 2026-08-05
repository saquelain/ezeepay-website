import AboutHero from "@/components/about/AboutHero";
import MissionValues from "@/components/about/MissionValues";
import FounderNote from "@/components/about/FounderNote";
import TrustedBy from "@/components/sections/TrustedBy";
import ImpactNumbers from "@/components/about/ImpactNumbers";
import DownloadCTA from "@/components/about/DownloadCTA";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionValues />
      <FounderNote />
      <TrustedBy />
      <ImpactNumbers />
      <DownloadCTA />
    </>
  );
}