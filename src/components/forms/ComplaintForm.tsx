"use client";

import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  ClipboardList,
  Calendar,
  IndianRupee,
  MessageSquare,
  Loader2,
  Check,
} from "lucide-react";

const GRIEVANCE_CATEGORIES = [
  "Transaction Issue",
  "AEPS / Banking Service",
  "App / Technical Issue",
  "Agent or Distributor Behaviour",
  "Refund Request",
  "Other",
];

const initialState = {
  name: "",
  mobile: "",
  email: "",
  category: "",
  date: new Date().toISOString().split("T")[0],
  amount: "",
  details: "",
};

export default function ComplaintForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [ticketId, setTicketId] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Dummy submit — no backend yet. Replace this block with a real
    // API call (e.g. POST to /api/complaints) once the backend exists.
    setTimeout(() => {
      const id = `EZP-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(id);
      setStatus("success");
    }, 1400);
  };

  const handleReset = () => {
    setForm(initialState);
    setStatus("idle");
    setTicketId("");
  };

  if (status === "success") {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center rounded-[2rem] bg-white px-8 py-16 text-center shadow-sm ring-1 ring-black/5">
        <div className="checkmark-wrap flex h-20 w-20 items-center justify-center rounded-full bg-[#E8FBEF]">
          <svg viewBox="0 0 52 52" className="h-10 w-10">
            <circle
              className="checkmark-circle"
              cx="26"
              cy="26"
              r="23"
              fill="none"
              stroke="#22C55E"
              strokeWidth="3"
            />
            <path
              className="checkmark-check"
              fill="none"
              stroke="#22C55E"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 27l7 7 17-17"
            />
          </svg>
        </div>

        <h3 className="mt-6 text-2xl font-bold text-brand-purple-dark">
          Complaint Submitted
        </h3>
        <p className="mt-3 max-w-sm text-brand-grey">
          Your complaint has been recorded and forwarded to our Grievance
          Redressal team. We'll look into it and reach out to you on the
          mobile number or email you provided.
        </p>

        <div className="mt-6 rounded-xl bg-[#F7F5FB] px-5 py-3 text-sm font-medium text-brand-purple-dark">
          Reference ID: <span className="font-bold">{ticketId}</span>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="mt-8 rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-brand-purple-dark transition-colors hover:bg-[#F7F5FB]"
        >
          File another complaint
        </button>

        <style jsx>{`
          .checkmark-circle {
            stroke-dasharray: 145;
            stroke-dashoffset: 145;
            animation: draw-circle 0.5s ease-out forwards;
          }
          .checkmark-check {
            stroke-dasharray: 36;
            stroke-dashoffset: 36;
            animation: draw-check 0.35s ease-out 0.45s forwards;
          }
          @keyframes draw-circle {
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes draw-check {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-10"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Customer Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-purple-dark">
            Customer Name
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3 focus-within:border-brand-purple">
            <User size={18} className="text-brand-grey" />
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full bg-transparent text-sm text-brand-purple-dark outline-none placeholder:text-brand-grey/60"
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-purple-dark">
            Mobile Number
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3 focus-within:border-brand-purple">
            <Phone size={18} className="text-brand-grey" />
            <input
              required
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              pattern="[0-9]{10}"
              className="w-full bg-transparent text-sm text-brand-purple-dark outline-none placeholder:text-brand-grey/60"
            />
          </div>
        </div>

        {/* Email ID */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-purple-dark">
            Email ID
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3 focus-within:border-brand-purple">
            <Mail size={18} className="text-brand-grey" />
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-transparent text-sm text-brand-purple-dark outline-none placeholder:text-brand-grey/60"
            />
          </div>
        </div>

        {/* Grievance Category */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-purple-dark">
            Grievance Category
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3 focus-within:border-brand-purple">
            <ClipboardList size={18} className="text-brand-grey" />
            <select
              required
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-transparent text-sm text-brand-purple-dark outline-none"
            >
              <option value="" disabled>
                Select a category
              </option>
              {GRIEVANCE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Complaint Date */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-purple-dark">
            Complaint Date
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3 focus-within:border-brand-purple">
            <Calendar size={18} className="text-brand-grey" />
            <input
              required
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full bg-transparent text-sm text-brand-purple-dark outline-none"
            />
          </div>
        </div>

        {/* Transaction Amount */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-purple-dark">
            Transaction Amount{" "}
            <span className="font-normal text-brand-grey">(if applicable)</span>
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3 focus-within:border-brand-purple">
            <IndianRupee size={18} className="text-brand-grey" />
            <input
              type="number"
              min="0"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="e.g. 2500"
              className="w-full bg-transparent text-sm text-brand-purple-dark outline-none placeholder:text-brand-grey/60"
            />
          </div>
        </div>

        {/* Complaint Details */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-brand-purple-dark">
            Complaint Details
          </label>
          <div className="flex gap-3 rounded-xl border border-black/10 px-4 py-3 focus-within:border-brand-purple">
            <MessageSquare size={18} className="mt-0.5 flex-shrink-0 text-brand-grey" />
            <textarea
              required
              rows={5}
              name="details"
              value={form.details}
              onChange={handleChange}
              placeholder="Describe your issue in detail — what happened, when, and any reference IDs you have."
              className="w-full resize-none bg-transparent text-sm text-brand-purple-dark outline-none placeholder:text-brand-grey/60"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#FF9142] to-brand-orange px-8 py-4 text-[16px] font-medium leading-none text-white shadow-lg shadow-brand-orange/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-xl hover:shadow-brand-orange/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:scale-100 md:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Check size={18} />
            Submit Complaint
          </>
        )}
      </button>

      <p className="mt-4 text-xs text-brand-grey">
        By submitting, your complaint is sent to our Grievance Redressal team
        and logged for admin records. You'll be contacted at the mobile
        number or email provided above.
      </p>
    </form>
  );
}