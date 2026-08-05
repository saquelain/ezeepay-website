// app/contact/page.tsx
import ContactHero from "@/components/contact/ContactHero";
import MapEmbed from "@/components/contact/MapEmbed";
import ContactCards from "@/components/contact/ContactCards";
import ContactFAQ from "@/components/contact/ContactFAQ";

export default function ContactPage() {
  return (
    <>
        <ContactHero />
        <MapEmbed />
        <ContactCards />
        <ContactFAQ />
    </>
  );
}