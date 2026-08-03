import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
};

export default function BouncyButton({ href, children, variant = "solid" }: Props) {
  const base =
    "inline-block rounded-full px-6 py-2.5 font-semibold " +
    "transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] " +
    "hover:scale-110 active:scale-90";

  const styles =
    variant === "solid"
      ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/30"
      : "border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}