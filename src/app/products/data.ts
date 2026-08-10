export type Product = {
    id: string;
    index: string;
    name: string;
    tagline: string;
    description: string;
    specs: string[];
    image: string;
  };
  
  export const PRODUCTS: Product[] = [
    {
      id: "biometric-device",
      index: "01",
      name: "Biometric Device",
      tagline: "Mantra & Morpho",
      description:
        "High-quality USB fingerprint scanner built on optical sensing technology — reads even poor-quality fingerprints with ease.",
      specs: [
        "500 dpi optical fingerprint sensor",
        "Plug & play USB 2.0 high-speed interface",
        "Scratch-free sensor surface",
      ],
      image: "/products/biometric-device.png",
    },
    {
      id: "bluetooth-printer",
      index: "02",
      name: "Bluetooth Printer",
      tagline: "Mentation & Vriddhi",
      description:
        "All-in-one Aadhaar-enabled biometric device with an integrated thermal printer — built for on-the-spot receipting in banking, eKYC, and e-governance.",
      specs: [
        "STQC-qualified fingerprint module",
        "Rugged — tolerant of dust, grease & heat",
        "UIDAI Level-0 registered device",
      ],
      image: "/products/bluetooth-printer.png",
    },
    {
      id: "micro-atm",
      index: "03",
      name: "Micro ATM",
      tagline: "Banking at every doorstep",
      description:
        "Turns any kirana shop into a mini bank — instant deposits, withdrawals, fund transfers, and balance enquiry with Aadhaar authentication.",
      specs: [
        "Deposit, withdrawal, transfer & balance enquiry",
        "Works across all banks",
        "Runs on a simple mobile connection",
      ],
      image: "/products/micro-atm.png",
    },
    {
      id: "mpos-device",
      index: "04",
      name: "mPOS Device",
      tagline: "Accept every card, anywhere",
      description:
        "Lightweight portable payment terminal for credit and debit cards — secure, certified, and ready for modern payment methods.",
      specs: [
        "EMV chip, PIN, magstripe, Apple/Samsung Pay",
        "PCI, EMV & PBOC certified",
        "Pocket-sized and portable",
      ],
      image: "/products/mpos-device.png",
    },
  ];