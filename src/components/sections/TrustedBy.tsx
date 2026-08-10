import Image from "next/image";
import fs from "fs";
import path from "path";
import { imageSize } from "image-size";

const LOGO_HEIGHT = 32; // all logos render at this height; width scales proportionally

// Manual size overrides — keyed by exact filename in public/logos/partners/
const SCALE_OVERRIDES: Record<string, number> = {
  "azmarq.png": 1.3,
  "bharat-billpay.svg": 1.8,
  "decentro.svg": 1.3,
  "mobikwik.svg": 2.9,
  "nsdl-payments-bank.png": 0.8
};

// Logos with white/light text or marks that disappear on a white background —
// these get a small dark chip behind them instead of sitting bare.
const DARK_CHIP_LOGOS = new Set<string>([
  "SABPAISA.png",
  "inrdeals.png"
]);

// Row scroll speed (seconds per full loop). Lower = faster.
const ROW_DURATION_SECONDS = 28;

type Partner = {
  name: string;
  src: string;
  width: number;
  height: number;
  needsDarkChip: boolean;
};

function getPartnerLogos(): Partner[] {
  const dir = path.join(process.cwd(), "public", "logos", "partners");

  let files: string[] = [];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return [];
  }

  const imageExtensions = [".png", ".jpg", ".jpeg", ".svg", ".webp"];

  return files
    .filter((file) => imageExtensions.includes(path.extname(file).toLowerCase()))
    .sort()
    .map((file) => {
      const name = path
        .basename(file, path.extname(file))
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      const filePath = path.join(dir, file);
      let width = 120;
      let height = 40;

      try {
        const buffer = fs.readFileSync(filePath);
        const dimensions = imageSize(buffer);
        if (dimensions.width && dimensions.height) {
          width = dimensions.width;
          height = dimensions.height;
        }
      } catch {
        // fall back to defaults above
      }

      const scale = SCALE_OVERRIDES[file] || 1;
      const displayHeight = Math.round(LOGO_HEIGHT * scale);
      const displayWidth = Math.round((width / height) * displayHeight);

      return {
        name,
        src: `/logos/partners/${file}`,
        width: displayWidth,
        height: displayHeight,
        needsDarkChip: DARK_CHIP_LOGOS.has(file),
      };
    });
}

// Split into two roughly-equal, non-overlapping sets by alternating logos
// between rows (keeps each row's total width balanced rather than just
// slicing the array in half).
function splitIntoRows(partners: Partner[]): [Partner[], Partner[]] {
  const rowA: Partner[] = [];
  const rowB: Partner[] = [];
  partners.forEach((partner, i) => {
    (i % 2 === 0 ? rowA : rowB).push(partner);
  });
  return [rowA, rowB];
}

function LogoItem({ partner }: { partner: Partner }) {
  if (partner.needsDarkChip) {
    return (
      <div className="flex flex-shrink-0 items-center rounded-lg bg-[#120B22] px-4 py-2 opacity-70 transition-all duration-300 hover:opacity-100">
        <div className="relative" style={{ height: partner.height, width: partner.width }}>
          <Image src={partner.src} alt={partner.name} fill className="object-contain" />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ height: LOGO_HEIGHT, width: partner.width }}
      className="relative flex flex-shrink-0 items-center transition-all duration-300 hover:grayscale-0 hover:opacity-100"
    >
      <div className="relative w-full" style={{ height: partner.height }}>
        <Image src={partner.src} alt={partner.name} fill className="object-contain" />
      </div>
    </div>
  );
}

function MarqueeRow({
  partners,
  direction,
}: {
  partners: Partner[];
  direction: "left" | "right";
}) {
  if (partners.length === 0) return null;

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

      <div
        className={`flex w-max items-center gap-16 ${
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
        }`}
        style={{ animationDuration: `${ROW_DURATION_SECONDS}s` }}
      >
        {[...partners, ...partners].map((partner, i) => (
          <LogoItem key={`${partner.name}-${i}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}

export default function TrustedBy() {
  const partners = getPartnerLogos();

  if (partners.length === 0) return null;

  const [rowA, rowB] = splitIntoRows(partners);

  return (
    <section className="relative bg-white px-6 py-16 mb-0">
      <div className="mx-auto max-w-6xl">
        {/* Badge + divider line */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-x-0 top-1/2 h-px bg-black/10" />
          <span className="relative rounded-full border border-black/10 bg-white px-6 py-2.5 text-sm font-medium text-brand-purple-dark">
            Trusted by Partners across India
          </span>
        </div>

        {/* Two independent marquee rows, different logos, opposite directions */}
        <div className="mt-12 flex flex-col gap-8">
          <MarqueeRow partners={rowA} direction="left" />
          <MarqueeRow partners={rowB} direction="right" />
        </div>
      </div>
    </section>
  );
}