import type { LucideIcon } from "lucide-react";
import { BadgeCheck, Clock, Users, Lock } from "lucide-react";

export type ArticleSection =
  | { type: "intro"; id: string; heading: string; body: string }
  | {
      type: "steps";
      id: string;
      heading: string;
      steps: { title: string; description: string }[];
    }
  | {
      type: "grid";
      id: string;
      heading: string;
      items: { icon: LucideIcon; title: string; description: string }[];
    }
  | { type: "checklist"; id: string; heading: string; items: string[] }
  | { type: "text"; id: string; heading: string; body: string };

export const BLOG_CONTENT: Record<string, ArticleSection[]> = {
  "aeps-complete-guide-for-retailers": [
    {
      type: "intro",
      id: "what-is-aeps",
      heading: "What is AePS?",
      body: "AePS (Aadhaar Enabled Payment System) is a bank-led model that allows customers to perform basic banking transactions using their Aadhaar number and biometric authentication. It is interoperable, secure, and available 24/7 through Micro ATMs.",
    },
    {
      type: "steps",
      id: "how-aeps-works",
      heading: "How AePS Works",
      steps: [
        { title: "Step 1", description: "Customer provides Aadhaar number" },
        { title: "Step 2", description: "Biometric authentication" },
        { title: "Step 3", description: "Bank verification through NPCI" },
        { title: "Step 4", description: "Transaction processed" },
        { title: "Step 5", description: "Confirmation & receipt generated" },
      ],
    },
    {
      type: "grid",
      id: "benefits-for-retailers",
      heading: "Benefits for Retailers",
      items: [
        {
          icon: BadgeCheck,
          title: "High Commission",
          description: "Earn attractive commissions on every successful transaction.",
        },
        {
          icon: Clock,
          title: "24/7 Availability",
          description: "Offer round-the-clock banking services to your customers.",
        },
        {
          icon: Users,
          title: "Wide Reach",
          description: "Serve customers in rural and remote areas with ease.",
        },
        {
          icon: Lock,
          title: "Secure & Reliable",
          description: "Biometric authentication ensures safe and fraud-free transactions.",
        },
      ],
    },
    {
      type: "checklist",
      id: "best-practices",
      heading: "Best Practices for Safe Transactions",
      items: [
        "Always verify the customer's Aadhaar number before initiating the transaction.",
        "Ensure the customer's fingerprint is captured clearly.",
        "Keep your Micro ATM device and app updated.",
        "Never share your device or credentials with anyone.",
        "Provide a receipt to customers for every transaction.",
      ],
    },
    {
      type: "text",
      id: "final-thoughts",
      heading: "Final Thoughts",
      body: "AePS is a game-changer for retailers, bringing banking closer to every doorstep. By offering secure, instant, and convenient services, you not only grow your business but also empower your community.",
    },
  ],
};