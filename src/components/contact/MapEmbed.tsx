export default function MapEmbed() {
    // Change this to whichever office you want the map to show
    const address = "D-19, A.F.E - 1, Okhla Vihar, NFC New Delhi, Delhi 110025";
  
    return (
      <section className="bg-white px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          {/* Outer frame → padded gap → inner frame around the map */}
          <div className="rounded-[2rem] border-2 border-dashed border-brand-purple/25 bg-[#F7F5FB] p-3 md:p-4">
            <div className="overflow-hidden rounded-3xl border border-brand-purple/20 shadow-sm">
              <iframe
                title="Ezeepay office location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                className="h-[420px] w-full md:h-[480px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    );
  }