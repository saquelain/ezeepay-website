export const SERVICES_MENU = [
    {
      category: "Banking Services",
      slug: "banking",
      items: [
        { label: "AePS", slug: "aeps" },
        { label: "Money Transfer (DMT)", slug: "money-transfer" },
        { label: "Micro ATM Withdrawal", slug: "micro-atm" },
      ],
    },
    {
      category: "Utility and Bill Payment",
      slug: "utility",
      items: [
        { label: "Mobile and DTH Recharge", slug: "mobile-dth-recharge" },
        { label: "BBPS", slug: "bbps" },
        { label: "OTT Recharge", slug: "ott-recharge" },
      ],
    },
    {
      category: "Insurance",
      slug: "insurance",
      items: [
        { label: "Health Insurance", slug: "health-insurance" },
        { label: "Motor Insurance", slug: "motor-insurance" },
        { label: "Shop Insurance", slug: "shop-insurance" },
        { label: "Device Insurance", slug: "device-insurance" },
      ],
    },
    {
      category: "Travel Services",
      slug: "travel",
      items: [
        { label: "IRCTC Ticket Booking", slug: "irctc-booking" },
        { label: "Flight Booking", slug: "flight-booking" },
        { label: "Bus Booking", slug: "bus-booking" },
        { label: "Hotel Booking", slug: "hotel-booking" },
      ],
    },
    {
      category: "E-Governance Services",
      slug: "e-governance",
      items: [
        { label: "PAN Card", slug: "pan-card" },
        { label: "ITR", slug: "itr" },
        { label: "GST Registration", slug: "gst-registration" },
        { label: "MSME Registration", slug: "msme-registration" },
      ],
    },
    {
      category: "Account Opening Services",
      slug: "account-opening",
      items: [
        { label: "Digital Bank Account", slug: "digital-bank-account" },
        { label: "Physical Card", slug: "physical-card" },
        { label: "UPI Payment", slug: "upi-payment" },
        { label: "Loan", slug: "loan" },
        { label: "Investment", slug: "investment" },
      ],
    },
  ];
  
  export const NAV_LINKS = [
    { label: "Services", href: "/services", hasMegaMenu: true },
    { label: "Products", href: "/products" },
    { label: "Resources", href: "/blog", hasMegaMenu: true },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  export const RESOURCES_MENU = [
    { label: "Blog", href: "/blog", icon: "blog" },
    { label: "New Updates", href: "/updates", icon: "updates" },
    { label: "Certificates", href: "/certificates", icon: "certificates" },
  ];
  
  export const FEATURED_BLOG = {
    href: "https://blog.ezeepay.app/best-upi-cash-point-service-provider-india-ezeepay/",
    image: "/images/featured/bestupicashpoint.jpeg",
    title: "What is AEPS? How Aadhaar Banking Is Changing Rural India",
    description:
      "Everything agents need to know about Aadhaar Enabled Payment Systems and how to earn with them.",
  };
  
  export const FEATURED_UPDATE = {
    href: "https://blog.ezeepay.app/ezeepay-upi-cash-point-cash-withdrawal/",
    image: "/images/featured/upicashpoint.png",
    title: "New: Shop Insurance Plans — Earn Up To ₹127 Commission Per Policy",
    description:
      "Silver and Gold plans now live for all agents. Protect shops from fire, theft, and natural disasters.",
  };

  export const FOOTER_LINKS = {
    services: [
      { label: "Banking Services", href: "/services/banking" },
      { label: "Utility Bill Payments", href: "/services/utility" },
      { label: "Insurance Services", href: "/services/insurance" },
      { label: "E-Governance Services", href: "/services/e-governance" },
      { label: "Account Opening Services", href: "/services/account-opening" },
    ],
    company: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Blog", href: "/blog" },
      { label: "Certificate", href: "/certificates" },
      { label: "Contact Us", href: "/contact" },
    ],
    joinUs: [
      { label: "Become An Agent", href: "/join/agent" },
      { label: "Become A Distributor", href: "/join/distributor" },
      { label: "Master Distributor", href: "/join/master-distributor" },
      { label: "District Franchise", href: "/join/district-franchise" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  };
  
  export const OFFICES = [
    {
      name: "Registered Office — Delhi",
      address: "D-19, A.F.E - 1, Okhla Vihar, NFC New Delhi, 110025",
    },
    {
      name: "Corporate Office — Noida",
      address: "7th Floor, Bhutani Technopark, Tower D, Sector 127, Noida, UP 201313",
    },
    {
      name: "Regional Office — Kolkata",
      address: "PS Abacus Tower, 3rd Floor, Office No. 342, Action Area IIE, New Town, Kolkata 700157",
    },
  ];
  
  export const SOCIALS = [
    { label: "Facebook", href: "https://facebook.com/ezeepay" },
    { label: "LinkedIn", href: "https://linkedin.com/company/ezeepay" },
    { label: "Twitter", href: "https://twitter.com/ezeepay" },
    { label: "Instagram", href: "https://instagram.com/ezeepay" },
    { label: "YouTube", href: "https://youtube.com/@ezeepay" },
  ];