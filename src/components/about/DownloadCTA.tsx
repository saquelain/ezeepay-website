"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquareText, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* Official brand marks (Simple Icons paths), inherit currentColor */
function GooglePlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
    </svg>
  );
}

function AppleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.03 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

export default function DownloadCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    // TODO: call your API here to send the SMS download link
    setSent(true);
  };

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".cta-left > *", {
          y: 24,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        });

        gsap.from(".cta-form-card", {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-4 my-8 overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#FAFAFA] to-white px-6 py-20 md:px-12 md:py-24"
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        {/* ── Left: copy + store buttons ── */}
        <div className="cta-left">
          <h2 className="text-4xl font-bold leading-tight text-brand-purple-dark md:text-5xl">
            Download Ezeepay now
          </h2>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-brand-grey">
            Download our apps to get all kinds of banking benefits from
            anywhere.
          </p>
          <p className="mt-3 max-w-md leading-relaxed text-brand-grey/80">
            Use the Ezeepay app &amp; take charge of all your transactions to
            grow your business.
          </p>

          {/* Store buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#"
              className="flex items-center gap-3 rounded-2xl bg-brand-purple px-5 py-3 text-white transition-colors duration-300 hover:bg-brand-purple-dark"
            >
              <GooglePlayIcon className="h-6 w-6" />
              <span className="text-left leading-tight">
                <span className="block text-[10px] font-medium uppercase tracking-wide text-white/60">
                  Get it on
                </span>
                <span className="block text-base font-bold">Google Play</span>
              </span>
            </a>

            <a
              href="#"
              className="flex items-center gap-3 rounded-2xl border border-brand-purple/25 px-5 py-3 text-brand-purple-dark transition-colors duration-300 hover:bg-brand-purple-light"
            >
              <AppleIcon className="h-6 w-6" />
              <span className="text-left leading-tight">
                <span className="block text-[10px] font-medium uppercase tracking-wide text-brand-grey">
                  Download on the
                </span>
                <span className="block text-base font-bold">App Store</span>
              </span>
            </a>
          </div>
        </div>

        {/* ── Right: get the link by SMS ── */}
        <div className="cta-form-card rounded-3xl bg-white p-8 shadow-xl shadow-brand-purple/10 ring-1 ring-black/5 md:p-10">
          {sent ? (
            /* Success state */
            <div className="flex flex-col items-center py-6 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Check size={26} strokeWidth={2.5} />
              </span>
              <h3 className="mt-5 text-xl font-bold text-brand-purple-dark">
                Link sent!
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-brand-grey">
                Check your messages — the Ezeepay download link is on its way to
                +91 {phone}.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setPhone("");
                }}
                className="mt-6 text-sm font-semibold text-brand-purple hover:text-brand-purple-dark"
              >
                Use a different number
              </button>
            </div>
          ) : (
            /* Form state */
            <>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-purple-light text-brand-purple">
                  <MessageSquareText size={20} />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-brand-purple-dark">
                    Get the download link
                  </h3>
                  <p className="text-sm text-brand-grey">
                    We&apos;ll text it to your phone
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <label
                  htmlFor="cta-phone"
                  className="text-xs font-semibold uppercase tracking-wide text-brand-grey"
                >
                  Mobile number
                </label>
                <div
                  className={`mt-2 flex items-center overflow-hidden rounded-2xl border bg-[#F7F5FB] transition-colors focus-within:border-brand-purple ${
                    error ? "border-red-400" : "border-black/10"
                  }`}
                >
                  <span className="border-r border-black/10 px-4 py-3.5 text-sm font-semibold text-brand-purple-dark">
                    +91
                  </span>
                  <input
                    id="cta-phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/[^\d\s]/g, "").slice(0, 11));
                      if (error) setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    className="w-full bg-transparent px-4 py-3.5 text-brand-purple-dark outline-none placeholder:text-brand-grey/50"
                  />
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-500">{error}</p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="mt-5 w-full rounded-2xl bg-brand-purple py-3.5 font-semibold text-white transition-colors duration-300 hover:bg-brand-purple-dark"
              >
                Send me the link
              </button>

              <p className="mt-4 text-center text-xs text-brand-grey/70">
                Free SMS. No spam — just the app link.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}