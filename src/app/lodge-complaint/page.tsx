import type { Metadata } from "next";
import ComplaintForm from "@/components/forms/ComplaintForm";

export const metadata: Metadata = {
  title: "Lodge a Complaint | Ezeepay",
  description:
    "File a grievance with Ezeepay's Grievance Redressal team — transaction issues, service complaints, and more.",
};

export default function LodgeComplaintPage() {
  return (
    <section className="bg-[#F7F5FB] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-purple">
          Grievance Redressal
        </span>
        <h1 className="mt-5 text-4xl font-semibold leading-tight text-brand-purple-dark md:text-5xl">
          Lodge a Complaint
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-brand-grey">
          Facing an issue with a transaction, service, or partner? Tell us
          what happened — our Grievance Redressal team reviews every
          complaint and gets back to you.
        </p>
      </div>

      <div className="mt-14">
        <ComplaintForm />
      </div>
    </section>
  );
}