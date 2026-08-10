import { ArrowRight } from "lucide-react";

// Replace VIDEO_ID with the actual YouTube video id (the part after v= in the URL)
const YOUTUBE_VIDEO_ID = "2eQMA-kgljY";

export default function AepsVideoSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F7F5FB] py-16 lg:py-20">
      {/* Ambient purple wash for depth, matching the rest of the site */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[380px] max-w-4xl rounded-full bg-brand-purple-light blur-[130px] opacity-50"
      />

      <div className="relative mx-auto w-full max-w-[90rem] px-6 lg:px-12">
        {/* ── Text + video ── */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — copy */}
          <div>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-brand-purple-dark md:text-4xl">
              Simplify AePS Registration
              <br />
              Process <span className="text-brand-purple">with Ezeepay</span>
            </h2>

            <p className="mt-6 max-w-xl leading-relaxed text-brand-grey">
              Join us today and say goodbye to complicated procedures and
              paperwork. With Ezeepay, registering for AEPS is a breeze. Our
              user-friendly interface and easy steps will guide you
              effortlessly through the entire registration process, giving you
              a hassle-free experience. Experience the convenience of
              simplified AEPS registration with Ezeepay. Join us now!
            </p>
          </div>

          {/* Right — YouTube embed */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-brand-purple/10">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
              title="AEPS Services with Ezeepay"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>

        {/* ── Purple sign-up strip — gradient tied to Footer's dark tone
             (#120B22) so it reads as the same brand, not a random purple ── */}
        <div className="relative mt-14 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-purple to-[#120B22] px-8 py-7 md:flex-row md:items-center md:px-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 right-10 h-48 w-48 rounded-full bg-brand-orange/20 blur-[90px]"
          />
          <div className="relative">
            <h3 className="text-xl font-bold text-white md:text-2xl">
              Become an AePS Agent With Ezeepay
            </h3>
            <p className="mt-1.5 text-sm text-white/80">
              Become a Retailer and Earn upto Rs.1 Lakh per month.
            </p>
          </div>

          <a
            href="#"
            className="relative inline-flex shrink-0 items-center gap-2.5 rounded-full bg-brand-orange px-7 py-3.5 text-[15px] font-semibold leading-none text-white shadow-lg shadow-black/15 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
          >
            Sign Up Now
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}