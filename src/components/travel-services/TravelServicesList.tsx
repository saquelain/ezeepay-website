import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Train,
  Plane,
  Bus,
  Hotel,
  Wallet,
  ShieldCheck,
  BadgeCheck,
  Armchair,
} from "lucide-react";

const SERVICES = [
  {
    title: "IRCTC Ticket Booking",
    description:
      "Ezeepay is happy to announce that we are among the few vendors who are authorised by IRCTC to book tickets. So, retailers can easily book tickets for different trains going to various places. They can choose the class of the berth as per the customer's need. Your customers don't need to worry about their bookings; our services are fast, safe, and secure. So, download our app and earn money.",
    image: "/images/services/travel-services/irctc-ticket-booking.png",
    href: "#",
    tags: [
      { icon: BadgeCheck, label: "IRCTC Authorised" },
      { icon: Train, label: "Choose Berth Class" },
      { icon: Wallet, label: "Earn Commission" },
    ],
  },
  {
    title: "Flight Booking",
    description:
      "We at Ezeepay know that people from rural areas have a dream to sit in an aeroplane. You, as a retailer, can fulfil their dream by booking a flight ticket for them using our application. Our application is quick and confirms the seat of the flight, be it domestic or international, both quickly and securely. Our dedicated team of agents and customer service take care of the bookings. So, you can relax.",
    image: "/images/services/travel-services/flight-booking.png",
    href: "#",
    tags: [
      { icon: Plane, label: "Domestic & International" },
      { icon: ShieldCheck, label: "Quick & Secure" },
      { icon: Wallet, label: "Earn Commission" },
    ],
  },
  {
    title: "Bus Booking",
    description:
      "Ezeepay knows that rural or village areas have less transportation and buses are mostly full. Hence, people do not get a seat and have to travel standing throughout the journey. So, you, as a retailer, can help them by booking a seat using the mobile phone application according to the time of arrival and departure. So, you can make their travel easier by providing them with a seat to sit in.",
    image: "/images/services/travel-services/bus-booking.png",
    href: "#",
    tags: [
      { icon: Bus, label: "Guaranteed Seating" },
      { icon: Armchair, label: "By Time of Travel" },
      { icon: Wallet, label: "Earn Commission" },
    ],
  },
  {
    title: "Hotel Booking",
    description:
      "Ezeepay has agreements and associations with many hotel chains in several places. So, by using our app, you can search for the best hotels, learn about their features, and know about their different plans before booking for clients. You can also learn about different travel agencies. Hence, do not forget to book a ticket for your customers through it and make money while you do so.",
    image: "/images/services/travel-services/hotel-booking.png",
    href: "#",
    tags: [
      { icon: Hotel, label: "Partner Hotel Chains" },
      { icon: ShieldCheck, label: "Compare Plans" },
      { icon: Wallet, label: "Earn Commission" },
    ],
  },
];

export default function TravelServicesList() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F7F5FB] py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[420px] max-w-4xl rounded-full bg-brand-purple-light blur-[130px] opacity-50"
      />

      <div className="relative mx-auto w-full max-w-[90rem] px-6 lg:px-12">
        {/* ── Section heading ── */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-brand-purple/15 bg-white px-5 py-2 text-sm font-medium text-brand-purple shadow-sm">
            Ezeepay Travel Services
          </span>

          <h2 className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-brand-purple-dark md:text-5xl">
            Serve All Travel{" "}
            <span className="relative inline-block text-brand-orange">
              Booking Services with Ezeepay
              <svg
                aria-hidden
                viewBox="0 0 160 18"
                className="absolute left-0 top-full mt-1 h-3 w-full text-brand-purple"
                fill="none"
              >
                <path
                  d="M2 12C40 2 110 2 158 12"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brand-grey">
            By using the Ezeepay merchant app, retailers can book tickets for
            their customers from any location. They also get a fast and easy
            transaction facility from their bank using the application.
          </p>
        </div>

        {/* ── Service cards ── */}
        <div className="relative mt-14 space-y-8">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="grid grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-brand-purple/10 transition-shadow hover:shadow-lg hover:shadow-brand-purple/10 md:grid-cols-[280px_1fr_auto]"
            >
              {/* Image */}
              <div className="relative flex items-center justify-center bg-gradient-to-br from-brand-purple-light to-[#EDE7F8] p-6">
                <div className="relative h-52 w-full md:h-full md:min-h-[220px]">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(min-width: 768px) 280px, 90vw"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center px-6 py-8 md:px-10">
                <h3 className="text-2xl font-bold text-brand-purple-dark">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-3xl leading-relaxed text-brand-grey">
                  {s.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {s.tags.map((t) => {
                    const Icon = t.icon;
                    return (
                      <span
                        key={t.label}
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-purple-light px-4 py-2.5 text-sm font-medium text-brand-purple-dark"
                      >
                        <Icon size={16} className="text-brand-purple" />
                        {t.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden items-center pr-10 md:flex">
                <Link
                  href={s.href}
                  aria-label={`Learn more about ${s.title}`}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-purple text-brand-purple transition-all hover:bg-brand-purple hover:text-white"
                >
                  <ArrowRight size={22} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}