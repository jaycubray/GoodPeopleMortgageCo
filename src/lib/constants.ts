export const COMPANY = {
  name: "Good People Mortgage Company",
  nmls: "2409276",
  address: "2749 58th Ave N, St Petersburg, FL 33714",
  phone: "(727) 543-7398",
  phoneRaw: "7275437398",
  email: "info@goodpeoplemortgage.com",
  facebook: "https://www.facebook.com/profile.php?id=61576381862126",
  instagram: "https://www.instagram.com/goodpeoplemortgagecompany/",
  applyUrl: "https://www.blink.mortgage/app/signup/p/GPMC/matthewschafer",
  nmlsConsumerAccess: "https://www.nmlsconsumeraccess.org/",
  logo: "/images/logo.png",
  favicon: "/images/favicon.png",
} as const;

export const NAV_LINKS = [
  { label: "Purchase", href: "/home-purchase" },
  { label: "Refinance", href: "/home-refinance" },
  { label: "Calculators", href: "/mortgage-calculators" },
  {
    label: "Resources",
    href: "#",
    children: [
      { label: "Loan Programs", href: "/loan-programs" },
      { label: "Loan Process", href: "/loan-process" },
      { label: "Mortgage Basics", href: "/mortgage-basics" },
      { label: "Online Forms", href: "/online-forms" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "About",
    href: "#",
    children: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact", href: "/contact-us" },
    ],
  },
] as const;

export const LOAN_AMOUNTS = [
  { value: "", label: "Select Loan Amount" },
  { value: "under-100k", label: "Under $100,000" },
  { value: "100k-200k", label: "$100,000 - $200,000" },
  { value: "200k-300k", label: "$200,000 - $300,000" },
  { value: "300k-400k", label: "$300,000 - $400,000" },
  { value: "400k-500k", label: "$400,000 - $500,000" },
  { value: "500k-750k", label: "$500,000 - $750,000" },
  { value: "750k-1m", label: "$750,000 - $1,000,000" },
  { value: "over-1m", label: "Over $1,000,000" },
];

export const PROPERTY_VALUES = [
  { value: "", label: "Select Property Value" },
  { value: "under-100k", label: "Under $100,000" },
  { value: "100k-200k", label: "$100,000 - $200,000" },
  { value: "200k-300k", label: "$200,000 - $300,000" },
  { value: "300k-400k", label: "$300,000 - $400,000" },
  { value: "400k-500k", label: "$400,000 - $500,000" },
  { value: "500k-750k", label: "$500,000 - $750,000" },
  { value: "750k-1m", label: "$750,000 - $1,000,000" },
  { value: "over-1m", label: "Over $1,000,000" },
];

export const LOAN_TYPES = [
  { value: "", label: "Select Loan Type" },
  { value: "purchase", label: "Purchase" },
  { value: "refinance", label: "Refinance" },
  { value: "debt-consolidation", label: "Debt Consolidation" },
  { value: "home-equity", label: "Home Equity" },
];

export const CREDIT_SCORES = [
  { value: "", label: "Select Credit Score" },
  { value: "excellent", label: "Excellent (740+)" },
  { value: "good", label: "Good (700-739)" },
  { value: "fair", label: "Fair (640-699)" },
  { value: "poor", label: "Poor (Below 640)" },
];
