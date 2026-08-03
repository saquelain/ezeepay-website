import Link from "next/link";

type Props = {
  href: string;
  label: string;
  variant?: "white" | "purple";
  onClick?: () => void;
};

export default function FlippyButton({ href, label, variant = "white", onClick }: Props) {
  const front =
  variant === "purple"
    ? "bg-brand-purple text-white"
    : "bg-brand-purple-light text-brand-purple-dark border border-brand-purple/15 shadow-md shadow-brand-purple/15";
  
    const back =
      variant === "purple"
        ? "bg-black text-white"
        : "bg-brand-purple text-white";
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative inline-block select-none overflow-visible"
    >
      {/* Invisible sizer — defines the button's width/height */}
      <span className="invisible inline-flex items-center justify-center whitespace-nowrap px-5 py-[17px] text-[16px] font-medium leading-none">
        {label}
      </span>

      {/* Front face: white, 5px radius, scales away upward on hover */}
      <span
        className={`absolute inset-0 z-10 flex items-center justify-center
            whitespace-nowrap rounded-[5px]
            text-[16px] font-medium leading-none
            origin-top will-change-transform
            transition-transform duration-300 ease-[cubic-bezier(0.44,0,0.56,1)]
            group-hover:scale-0 ${front}`}
      >
        {label}
      </span>

      {/* Back face: black pill, grows up from bottom on hover */}
      <span
        className={`absolute inset-0 z-0 flex items-center justify-center
            whitespace-nowrap rounded-full
            text-[16px] font-medium leading-none
            origin-bottom scale-0 will-change-transform
            transition-transform duration-300 ease-[cubic-bezier(0.44,0,0.56,1)]
            group-hover:scale-100 ${back}`}
      >
        {label}
      </span>
    </Link>
  );
}