import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { QuickQuoteForm } from "@/components/forms/QuickQuoteForm";
import { COMPANY } from "@/lib/constants";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Home Purchase",
  description: "Buy your dream home with Good People Mortgage Company. FHA, VA, USDA, Conventional, and Jumbo purchase loans in Saint Petersburg, FL.",
};

const steps = [
  { title: "Get Pre-Approved", description: "Know your budget before you start shopping. We'll review your finances and give you a pre-approval letter." },
  { title: "Find Your Home", description: "Work with a real estate agent to find the perfect home within your approved price range." },
  { title: "Make an Offer", description: "Submit a competitive offer backed by your pre-approval. Negotiate terms with the seller." },
  { title: "Loan Processing", description: "We handle the paperwork — ordering the appraisal, verifying your documents, and preparing your loan file." },
  { title: "Underwriting", description: "Your loan file is reviewed for final approval. We'll work to clear any conditions quickly." },
  { title: "Closing", description: "Sign the final documents, get the keys, and move into your new home!" },
];

const programs = [
  { title: "FHA Loans", slug: "fha-loans", image: "/images/loan-programs/fha.png", description: "As low as 3.5% down with flexible credit requirements." },
  { title: "VA Loans", slug: "va-loans", image: "/images/loan-programs/va.png", description: "Zero down payment for eligible veterans and military." },
  { title: "USDA Loans", slug: "usda-loans", image: "/images/loan-programs/loan-programs.png", description: "100% financing for eligible rural and suburban areas." },
  { title: "Jumbo Loans", slug: "jumbo-loans", image: "/images/loan-programs/jumbo.png", description: "Finance homes above conforming loan limits." },
  { title: "Conventional", slug: "conventional-loans", image: "/images/loan-programs/conventional.png", description: "Competitive rates with as little as 3% down." },
];

export default function HomePurchasePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary-darker text-white py-20 md:py-28 overflow-hidden">
        <Image
          src="/images/hero-purchase.jpg"
          alt="Beautiful home exterior"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-darker/90 to-primary-dark/70" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Buy Your Dream Home</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
            Whether you&apos;re a first-time buyer or upgrading to your forever home, we&apos;ll guide you every step of the way.
          </p>
          <Button href={COMPANY.applyUrl} variant="secondary" size="lg">
            Get Pre-Approved Today
          </Button>
        </div>
      </section>

      {/* Steps */}
      <Section>
        <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
          The Home Buying Process
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                {i + 1}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Programs */}
      <Section variant="light">
        <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
          Purchase Loan Programs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p) => (
            <Card key={p.slug}>
              <div className="p-4 pb-0 flex justify-center">
                <Image src={p.image} alt={p.title} width={200} height={120} className="h-24 w-auto object-contain" />
              </div>
              <CardContent>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-600 mb-4">{p.description}</p>
                <Link href={`/loan-programs/${p.slug}`} className="text-primary font-medium text-sm hover:underline">
                  Learn More &rarr;
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              Why Choose Good People Mortgage?
            </h2>
            <ul className="space-y-4">
              {[
                "Competitive rates from multiple lenders",
                "Personalized guidance from application to closing",
                "Fast pre-approvals to strengthen your offer",
                "Local expertise in the Tampa Bay market",
                "Transparent process with no hidden fees",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 text-center">
              Get a Quick Quote
            </h3>
            <QuickQuoteForm variant="sidebar" />
          </div>
        </div>
      </Section>
    </>
  );
}
