"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Heart, Users } from "lucide-react";

const TESTIMONIALS = [
    {
      name: "Rajesh",
      role: "Retailer",
      state: "Patna",
      quote:
        "Earlier it was a hard to manage cash of my galla but ever since i became a ezeepay agent, it has changed things now i can utilize my cash to serve my customer with aeps services. The Cashflow is amazing and the commissions add up to a handsome amount of income each month.",
    },
    {
      name: "Vimal Kumar",
      role: "Agent",
      state: "Uttarakhand",
      quote:
        "Ezeepay, not only has my income increased, but the hassle of depositing money in bank has gone. With AePS and Money transfer services, the money in my galla is being utilized and cash is managed. Around 100-120 customers come to me daily for AePS. It is a very easy, convenient method. It has helped me to being self dependent.",
    },
    {
      name: "Vishnu",
      role: "Distributor",
      state: "Bihar",
      quote:
        "Ezeepay has not only helped me revive my passion to help people but being a retailer, i have earned more money than a lot of different jobs that my friends are doing. It feels great to be connected with such an amazing organization.",
    },
    {
      name: "Kamal",
      role: "Agent",
      state: "Uttar Pradesh",
      quote:
        "Ezeepay has helped me increase my income and has also relieved me from so many tensions. I had a two wheeler loan and now it is cleared. Since i am a retailer myself, My Cibil Score has increased and now i am looking to buy a flat for my family. All thanks to Ezeepay.",
    },
    {
      name: "Swapnil",
      role: "Master Distributor",
      state: "Madhya Pradesh",
      quote:
        "Ezeepay has helped me overcome my fear of a financial crisis ever since i have been a retailer with them. The best part is that cashflow is seamless and commissions are deposited instantly.",
    },
    {
      name: "Vishal",
      role: "District Franchise",
      state: "West Bengal",
      quote:
        "Ezeepay has made me a different person. I have seen days where even the basic needs were a luxury to me and i could not afford them. Ever since i have been connected with Ezeepay, my income has increased and being a retailer has exposed to more money making opportunities than ever.",
    },
  ];

export default function Testimonials() {
    return (
      <section className="relative overflow-hidden py-24">
        {/* Background image with fade to white top/bottom */}
        <div className="absolute inset-0">
          <Image
            src="/images/testimonials/bg.png"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/10 to-white" />
        </div>
  
        <div className="relative">
          {/* Header — constrained width */}
          <div className="mx-auto flex max-w-[90rem] flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-4xl font-semibold leading-tight text-brand-purple-dark md:text-5xl">
                What Our customers say
                <br />
                <span className="text-brand-purple">about the platform</span>
            </h2>

            {/* Stat badges */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] font-medium text-brand-purple-dark">
                <span className="flex items-center gap-2">
                <Star size={18} className="fill-amber-400 text-amber-400" />
                4.8/5 Rating
                </span>
                <span className="h-4 w-px bg-black/10" />
                <span className="flex items-center gap-2">
                <Heart size={18} className="fill-rose-400 text-rose-400" />
                500+ Testimonials
                </span>
                <span className="h-4 w-px bg-black/10" />
                <span className="flex items-center gap-2">
                <Users size={18} className="text-brand-purple" />
                5,00,000+ Agent Community
                </span>
            </div>
            </div>
  
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-brand-purple px-7 py-4 text-[16px] font-medium leading-none text-white shadow-lg shadow-brand-purple/30 transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
            >
              Become An Agent
              <ArrowRight size={18} />
            </Link>
          </div>
  
          {/* Full-width marquee — no max-width constraint */}
          <div className="mt-16">
            <div
              className="animate-marquee flex w-max gap-6"
              style={{ animationDuration: "40s" }}
            >
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div
                    key={`${t.name}-${i}`}
                    className="flex h-[340px] w-[300px] flex-shrink-0 flex-col justify-between rounded-3xl bg-white/90 p-6 shadow-lg shadow-black/5 backdrop-blur-sm"
                >
                    <div>
                    <div className="flex gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={16} fill="currentColor" strokeWidth={0} />
                        ))}
                    </div>
                
                    <p className="mt-3 text-sm leading-relaxed text-brand-purple-dark">
                        {t.quote}
                    </p>
                    </div>
                
                    <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-purple text-base font-bold text-white">
                        {t.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-brand-purple-dark">
                        {t.name}
                        </p>
                        <p className="text-xs text-brand-grey">
                        {t.role}, {t.state}
                        </p>
                    </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }