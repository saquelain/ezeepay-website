// app/certificates/page.tsx
import CertificatesHero from "@/components/certificates/CertificatesHero";
import CertificatesGrid from "@/components/certificates/CertificatesGrid";

export default function CertificatesPage() {
  return (
    <>
      <CertificatesHero />
      <CertificatesGrid />
    </>
  );
}