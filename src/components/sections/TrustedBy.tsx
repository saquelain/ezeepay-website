import Image from "next/image";
import fs from "fs";
import path from "path";
import { imageSize } from "image-size";

const LOGO_HEIGHT = 32; // all logos render at this height; width scales proportionally

function getPartnerLogos() {
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

      const displayWidth = Math.round((width / height) * LOGO_HEIGHT);

      return {
        name,
        src: `/logos/partners/${file}`,
        width: displayWidth,
      };
    });
}

export default function TrustedBy() {
  const partners = getPartnerLogos();

  if (partners.length === 0) return null;

  return (
    <section className="relative bg-white px-6 py-16 mb-30">
      <div className="mx-auto max-w-6xl">
        {/* Badge + divider line */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-x-0 top-1/2 h-px bg-black/10" />
          <span className="relative rounded-full border border-black/10 bg-white px-6 py-2.5 text-sm font-medium text-brand-purple-dark">
            Trusted by Partners across India
          </span>
        </div>

        {/* Marquee logo row */}
        <div className="relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

          <div
            className="animate-marquee flex w-max items-center gap-16"
            style={{ animationDuration: "30s" }}
          >
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                style={{ height: LOGO_HEIGHT, width: partner.width }}
                className="relative flex-shrink-0 grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}