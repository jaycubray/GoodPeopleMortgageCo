import { COMPANY } from "@/lib/constants";

export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY.name,
    image: `https://www.goodpeoplemortgage.com${COMPANY.logo}`,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "2749 58th Ave N",
      addressLocality: "St Petersburg",
      addressRegion: "FL",
      postalCode: "33714",
      addressCountry: "US",
    },
    url: "https://www.goodpeoplemortgage.com",
    sameAs: [COMPANY.facebook, COMPANY.instagram],
    priceRange: "$$",
    description:
      "Good People Mortgage Company — home loan experts in Saint Petersburg, FL. FHA, VA, USDA, Conventional, and Jumbo loans.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
