import TravelServicesHero from "@/components/travel-services/TravelServicesHero";
import TravelServicesList from "@/components/travel-services/TravelServicesList";
import Resources from "@/components/sections/Resources";

export const metadata = {
  title: "Travel Services | Ezeepay",
  description:
    "Book flights, trains, and buses for your customers with Ezeepay and earn commission on every ticket booked.",
};

export default function TravelServicesPage() {
  return (
    <>
      <TravelServicesHero />
      <TravelServicesList />
      <Resources />
    </>
  );
}