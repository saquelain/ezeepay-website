import Image from "next/image";
import Link from "next/link";

const POSTS = [
  {
    title: "The Future of Mobile Recharge Businesses in The Digital Era",
    image: "/images/blog/mobile-recharge.jpg",
    href: "#",
  },
  {
    title: "Advantages of Digital Bill Payments and Online Recharge",
    image: "/images/blog/bill-payments.jpg",
    href: "#",
  },
  {
    title:
      "Choosing the Perfect Money Transfer Business Franchise: Essential Tips and Factors",
    image: "/images/blog/money-transfer.jpg",
    href: "#",
  },
];

export default function AepsBlogStrip() {
  return (
    <section className="w-full bg-brand-purple-light/50 py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[90rem] px-6 lg:px-12">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-brand-purple-dark">
          Blog
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {POSTS.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group flex items-center gap-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-brand-purple/10 transition-shadow hover:shadow-md"
            >
              <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div>
                <h3 className="text-sm font-bold leading-snug text-brand-purple-dark">
                  {p.title}
                </h3>
                <span className="mt-2 inline-block text-xs font-semibold text-brand-orange">
                  Read More &gt;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}