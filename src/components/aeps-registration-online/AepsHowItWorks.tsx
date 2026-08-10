import Image from "next/image";
import { CheckSquare } from "lucide-react";

const STEPS = [
  {
    title: "Connect & Install Biometric Device:",
    description:
      "As an AEPS Agent, you will connect and install a biometric device to your computer or smartphone.",
  },
  {
    title: "Input Customer Aadhaar Details:",
    description:
      "Choose between Cash Withdrawal or Balance Inquiry, depending on the customer's needs.",
  },
  {
    title: "Select Transaction Type:",
    description:
      "Choose between Cash Withdrawal or Balance Inquiry, depending on the customer's needs.",
  },
  {
    title: "Customer Authentication:",
    description:
      "You will input the customer's Aadhaar number and select the bank name associated with their account.",
  },
  {
    title: "Real-Time Transaction Processing:",
    description:
      "The customer's bank account will be debited for the withdrawal amount, while your Ezeepay wallet account will be credited in real-time. Additionally, you will receive an additional commission amount.",
  },
  {
    title: "Transaction Receipt & SMS Confirmation:",
    description:
      "As an AEPS Agent, you will receive a transaction receipt, and the customer will receive an SMS confirmation from their bank, ensuring transparency and peace of mind.",
  },
];

const FEATURES = [
  {
    title: "Real-Time Transaction Settlement with Commission:",
    description:
      "Enjoy the benefit of real-time transaction settlement, ensuring that your commissions are credited promptly.",
  },
  {
    title: "Safe & Secure System:",
    description:
      "Our AEPS platform employs robust security measures to protect your sensitive data and provide a safe environment for financial transactions.",
  },
  {
    title: "Convenient Aadhaar Authentication:",
    description:
      "No need to carry debit or credit cards anymore. With Ezeepay AEPS, all you need is the customer's Aadhaar number and their fingerprint authentication for seamless and secure transactions.",
  },
  {
    title: "Easy Money Withdrawal:",
    description:
      "Say goodbye to long queues at banks or ATMs. Our AEPS services allow you to easily withdraw money without the hassle of waiting in lines.",
  },
  {
    title: "Quick Transactions:",
    description:
      "Completing a transaction takes less than a minute, allowing you to serve more customers efficiently.",
  },
];

export default function AepsHowItWorks() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F7F5FB] py-16 lg:py-20">
      {/* Ambient purple wash for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-[420px] max-w-5xl rounded-full bg-brand-purple-light blur-[140px] opacity-40"
      />

      <div className="relative mx-auto w-full max-w-[90rem] px-6 lg:px-12">
        {/* ── What is AePS Service ── */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — illustration */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative aspect-square w-full">
              <Image
                src="/images/services/aeps-registration/what-is-aeps.png"
                alt="AePS service — Aadhaar authentication with biometric device"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain"
              />
            </div>
          </div>

          {/* Right — copy */}
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-purple-dark md:text-4xl">
              What is <span className="text-brand-purple">AePS Service</span>
            </h2>

            <p className="mt-6 leading-relaxed text-brand-grey">
              AEPS (Aadhaar Enabled Payment System) is a revolutionary banking
              service that aims to provide inclusive and accessible financial
              transactions to individuals across various segments of society.
              It leverages the Aadhaar Enabled Payment System (AEPS) to enable
              secure and convenient banking services for all users, regardless
              of their location or access to traditional banking facilities.
            </p>

            <p className="mt-5 leading-relaxed text-brand-grey">
              Join the Ezeepay network as an AEPS Agent or AEPS Distributor and
              unlock a world of earning potential. We are dedicated to not only
              adding you to our network but also providing guidance on how to
              maximize your earnings. Getting started is easy — simply fill out
              our straightforward AEPS Agent registration form and you&apos;ll
              be on your way.
            </p>
          </div>
        </div>

        {/* ── How does it work? ── */}
        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          {/* Left — numbered steps */}
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-purple-dark md:text-4xl">
              How does it work?
            </h2>

            <ol className="mt-8 space-y-5">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-brand-purple/10">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-purple text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold leading-snug text-brand-purple-dark">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-grey">
                      {s.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right — hand tapping phone */}
          <div className="relative mx-auto w-full max-w-3xl self-start pt-40">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/services/aeps-registration/how-it-works.png"
                alt="Using the Ezeepay app for an AePS transaction"
                fill
                sizes="(min-width: 1024px) 50vw, 92vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* ── Top Features ── */}
        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          {/* Left — illustration */}
          <div className="relative order-2 mx-auto w-full max-w-lg lg:order-1">
            <div className="relative aspect-square w-full">
              <Image
                src="/images/services/aeps-registration/top-features.png"
                alt="Ezeepay AePS services — cash withdrawal, balance inquiry, mini statement"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain"
              />
            </div>
          </div>

          {/* Right — features checklist */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-purple-dark md:text-4xl">
              Top <span className="text-brand-purple">Features</span> Of
              Services
            </h2>

            <ul className="mt-8 space-y-5">
              {FEATURES.map((f) => (
                <li key={f.title} className="flex gap-3.5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-brand-purple/10">
                  <CheckSquare
                    size={20}
                    className="mt-0.5 shrink-0 text-brand-orange"
                  />
                  <div>
                    <h3 className="font-bold leading-snug text-brand-purple-dark">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-grey">
                      {f.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}