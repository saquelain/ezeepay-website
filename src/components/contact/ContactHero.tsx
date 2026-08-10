"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ChevronRight, Check } from "lucide-react";
import MascotBuddy from "./MascotBuddy";

const ASSURANCES = [
  "Bank-grade security on every transaction",
  "12x7 help desk, in your language",
  "Trusted by 10 Lakhs+ retailers across India",
  "RBI-regulated lending partners",
];

const inputClasses =
  "w-full rounded-2xl border border-black/10 bg-white px-4 py-3.5 text-brand-purple-dark shadow-sm outline-none transition-colors placeholder:text-brand-grey/50 focus:border-brand-purple";

export default function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key as "name" | "email"]) {
      setErrors((er) => ({ ...er, [key]: undefined }));
    }
  };

  const handleSubmit = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email.";
    setErrors(next);
    if (Object.keys(next).length) return;

    // TODO: send `form` to your API here
    setSent(true);
  };

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".contact-copy > *", {
          y: 24,
          opacity: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.1,
        });
        gsap.from(".contact-form-card", {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.2,
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-6 pb-24 pt-36">
      {/* ── Cloud background — add your image at /public/images/contact/clouds.png ── */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/images/contact/contact-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        {/* Fade into white toward the bottom so the page continues cleanly */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="mx-auto grid max-w-6xl items-start gap-14 lg:grid-cols-[1fr_1.1fr]">
        {/* ── Left: copy + assurances ── */}
        <div className="contact-copy lg:pt-10">
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-[#1D1D1D] md:text-6xl">
            Get in touch
            <br />
            with our team
          </h1>

          <p className="mt-7 max-w-md text-lg leading-relaxed text-brand-grey">
            Questions about services, commissions, or becoming an agent? Our
            team is ready to help you grow your business with Ezeepay.
          </p>

          <ul className="mt-9 space-y-4">
            {ASSURANCES.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[#1D1D1D]">
                <ChevronRight size={18} className="flex-shrink-0 text-brand-orange" />
                {item}
              </li>
            ))}
          </ul>
          <MascotBuddy />
        </div>

        {/* ── Right: form card ── */}
        <div className="contact-form-card overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#F6F2FC] via-[#EAE3F9] to-[#DCD3F5] shadow-xl shadow-brand-purple/10 ring-1 ring-black/5">
          {sent ? (
            /* Success state */
            <div className="flex flex-col items-center px-8 py-24 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Check size={26} strokeWidth={2.5} />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-brand-purple-dark">
                Message sent!
              </h3>
              <p className="mt-2 max-w-sm leading-relaxed text-brand-grey">
                Thanks, {form.name.split(" ")[0]}. Our team will get back to you
                within one working day.
              </p>
            </div>
          ) : (
            <div className="p-8 md:p-10">
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Full name */}
                <div>
                  <label htmlFor="c-name" className="font-medium text-[#1D1D1D]">
                    Full name*
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={set("name")}
                    className={`mt-2.5 ${inputClasses} ${
                      errors.name ? "border-red-400" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="c-email" className="font-medium text-[#1D1D1D]">
                    Email address*
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    autoComplete="email"
                    placeholder="hello@yourshop.com"
                    value={form.email}
                    onChange={set("email")}
                    className={`mt-2.5 ${inputClasses} ${
                      errors.email ? "border-red-400" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="c-phone" className="font-medium text-[#1D1D1D]">
                    Phone number
                  </label>
                  <input
                    id="c-phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="Your contact number"
                    value={form.phone}
                    onChange={set("phone")}
                    className={`mt-2.5 ${inputClasses}`}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="c-subject" className="font-medium text-[#1D1D1D]">
                    Subject
                  </label>
                  <input
                    id="c-subject"
                    type="text"
                    placeholder="How can we help you?"
                    value={form.subject}
                    onChange={set("subject")}
                    className={`mt-2.5 ${inputClasses}`}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mt-6">
                <label htmlFor="c-message" className="font-medium text-[#1D1D1D]">
                  Message
                </label>
                <textarea
                  id="c-message"
                  rows={6}
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={set("message")}
                  className={`mt-2.5 resize-y ${inputClasses}`}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="mt-7 rounded-full bg-brand-purple px-9 py-3.5 font-semibold text-white transition-colors duration-300 hover:bg-brand-purple-dark"
              >
                Send message
              </button>
            </div>
          )}

          {/* ── Landscape footer image inside the card ── */}
          {/* mix-blend-multiply turns any white in the PNG into the sky color behind it */}
          <div className="relative h-40 w-full md:h-48">
            <Image
              src="/images/contact/form-footer.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover object-bottom mix-blend-multiply"
            />
          </div>
        </div>
      </div>
    </section>
  );
}