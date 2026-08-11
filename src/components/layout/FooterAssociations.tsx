"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Certifications & Associations strip for the footer.
 * Heading now sits above the dark card (not inside it), and the card's
 * vertical padding is tightened to hug the logos closely — logo size
 * itself (h-24 / md:h-28) is untouched.
 *
 * Logo files live at /public/images/associations/ — the `file` field below
 * must match each file's actual name + extension.
 *
 * Until a logo file exists, a clean text badge is shown automatically.
 */
const ASSOCIATIONS = [
  { file: "bcfi.png", name: "BCFI", full: "Business Correspondent Federation of India" },
  { file: "iamai.png", name: "IAMAI", full: "Internet and Mobile Association of India" },
  { file: "npci.png", name: "NPCI", full: "National Payments Corporation of India" },
  { file: "duns.png", name: "D-U-N-S", full: "Dun & Bradstreet D-U-N-S Registered" },
];

export default function FooterAssociations() {
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  return (
    <div className="mt-[-50]">
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Certifications &amp; Associations
      </p>

      <div className="mt-3 rounded-2xl bg-[#000000] px-10 py-4">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
          {ASSOCIATIONS.map((a) => (
            <div
              key={a.file}
              title={a.full}
              className="flex h-24 items-center justify-center opacity-95 transition-opacity duration-300 hover:opacity-100 md:h-28"
            >
              {failed[a.file] ? (
                /* Text badge until the official logo file is added */
                <span className="inline-flex items-center whitespace-nowrap rounded-xl border border-white/15 px-6 py-4 text-lg font-bold tracking-wide text-white/85">
                  {a.name}
                </span>
              ) : (
                <Image
                  src={`/images/associations/${a.file}`}
                  alt={a.full}
                  width={360}
                  height={140}
                  className="h-full w-auto max-w-full object-contain"
                  onError={() => setFailed((s) => ({ ...s, [a.file]: true }))}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}