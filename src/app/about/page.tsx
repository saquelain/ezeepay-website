import AboutHero from "@/components/about/AboutHero";
import MissionValues from "@/components/about/MissionValues";
import FounderNote from "@/components/about/FounderNote";
import TrustedBy from "@/components/sections/TrustedBy";
import ImpactNumbers from "@/components/about/ImpactNumbers";
import DownloadCTA from "@/components/about/DownloadCTA";
import JourneyTimeline from "@/components/about/JourneyTimeline";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionValues />
      <FounderNote />
      <JourneyTimeline />
      <TrustedBy />
      <ImpactNumbers />
      <DownloadCTA />
    </>
  );
}