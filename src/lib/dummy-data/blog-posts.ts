export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string; // matches BLOG_CATEGORIES slug
  categoryLabel: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTimeMinutes: number;
  views: number;
};

const DEFAULT_AUTHOR = {
  name: "Rakesh Kumar",
  role: "Senior Content Writer at Ezeepay",
  avatar: "/images/services/travel-services/hero-image.png",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "aeps-complete-guide-for-retailers",
    title: "AePS Complete Guide for Retailers",
    excerpt:
      "Everything you need to know about AePS services, benefits, transactions, and how to get started.",
    image: "/images/services/banking-service/aeps.png",
    category: "banking-aeps",
    categoryLabel: "AePS",
    date: "2026-05-20",
    author: DEFAULT_AUTHOR,
    readTimeMinutes: 8,
    views: 12400,
  },
  {
    slug: "what-is-aeps-aadhaar-banking",
    title: "What Is AePS? How Aadhaar Banking Works",
    excerpt:
      "A simple breakdown of Aadhaar Enabled Payment Systems and how retailers can earn with them.",
    image: "/images/services/aeps-registration/what-is-aeps.png",
    category: "banking-aeps",
    categoryLabel: "AePS",
    date: "2026-05-12",
    author: DEFAULT_AUTHOR,
    readTimeMinutes: 6,
    views: 8900,
  },
  {
    slug: "upi-payments-future-of-digital-bharat",
    title: "UPI Payments: The Future of Digital Bharat",
    excerpt:
      "Explore how UPI is transforming the way India pays and why it's the backbone of digital transactions.",
    image: "/images/services/neo-banking/upi-payment.png",
    category: "upi-payments",
    categoryLabel: "UPI & Payments",
    date: "2026-05-18",
    author: DEFAULT_AUTHOR,
    readTimeMinutes: 7,
    views: 15200,
  },
  {
    slug: "money-transfer-services-your-customers-trust",
    title: "Money Transfer Services Your Customers Trust",
    excerpt:
      "Offer fast, secure and reliable domestic money transfer services with Ezeepay.",
    image: "/images/services/money-transfer-business/agent-transfer.png",
    category: "upi-payments",
    categoryLabel: "UPI & Payments",
    date: "2026-05-14",
    author: DEFAULT_AUTHOR,
    readTimeMinutes: 5,
    views: 6700,
  },
  {
    slug: "shop-insurance-plans-every-retailer-should-know",
    title: "Shop Insurance Plans Every Retailer Should Know",
    excerpt:
      "Protect your shop from fire, theft, and natural disasters with the right insurance plan.",
    image: "/images/services/insurance/shop-insurance.png",
    category: "insurance",
    categoryLabel: "Insurance",
    date: "2026-05-16",
    author: DEFAULT_AUTHOR,
    readTimeMinutes: 6,
    views: 5400,
  },
  {
    slug: "health-insurance-for-retail-agents",
    title: "Health Insurance Options for Retail Agents",
    excerpt:
      "Compare health insurance plans and find the right coverage for you and your family.",
    image: "/images/services/insurance/health-insurance.png",
    category: "insurance",
    categoryLabel: "Insurance",
    date: "2026-05-09",
    author: DEFAULT_AUTHOR,
    readTimeMinutes: 6,
    views: 4300,
  },
  {
    slug: "irctc-ticket-booking-guide",
    title: "How to Offer IRCTC Ticket Booking as a Retailer",
    excerpt:
      "Add train ticket booking to your services and earn commission on every booking.",
    image: "/images/services/travel-services/irctc-ticket-booking.png",
    category: "travel-services",
    categoryLabel: "Travel Services",
    date: "2026-05-08",
    author: DEFAULT_AUTHOR,
    readTimeMinutes: 5,
    views: 3900,
  },
  {
    slug: "flight-booking-business-guide",
    title: "Flight Booking: A New Revenue Stream for Retailers",
    excerpt:
      "Learn how to set up flight booking services and grow your travel business vertical.",
    image: "/images/services/travel-services/flight-booking.png",
    category: "travel-services",
    categoryLabel: "Travel Services",
    date: "2026-05-05",
    author: DEFAULT_AUTHOR,
    readTimeMinutes: 5,
    views: 3100,
  },
  {
    slug: "pan-card-registration-guide",
    title: "PAN Card Registration: A Step-by-Step Guide",
    excerpt:
      "Help your customers apply for a PAN card quickly and earn commission on every application.",
    image: "/images/services/egovernment-services/pan-card.png",
    category: "government-schemes",
    categoryLabel: "Government Schemes",
    date: "2026-05-03",
    author: DEFAULT_AUTHOR,
    readTimeMinutes: 4,
    views: 2800,
  },
  {
    slug: "gst-registration-for-small-businesses",
    title: "GST Registration for Small Businesses",
    excerpt:
      "Everything retailers need to know about offering GST registration services.",
    image: "/images/services/egovernment-services/gst-registration.png",
    category: "government-schemes",
    categoryLabel: "Government Schemes",
    date: "2026-05-01",
    author: DEFAULT_AUTHOR,
    readTimeMinutes: 5,
    views: 2200,
  },
];