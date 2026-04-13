import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { QuickQuoteForm } from "@/components/forms/QuickQuoteForm";
import { COMPANY } from "@/lib/constants";
import { TrendingDown, DollarSign, Clock, ShieldOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Home Refinance",
  description: "Refinance your mortgage with Good People Mortgage Company. Lower your rate, reduce payments, or access your home equity.",
};

const reasons = [
  { icon: TrendingDown, title: "Lower Your Payment", description: "Reduce your monthly mortgage payment by securing a lower interest rate." },
  { icon: DollarSign, title: "Cash Out Equity", description: "Access your home equity for renovations, debt consolidation, or other goals." },
  { icon: Clock, title: "Shorten Your Term", description: "Switch to a shorter loan term and save thousands in total interest." },
  { icon: ShieldOff, title: "Remove PMI", description: "Eliminate private mortgage insurance once you have 20% equity." },
];

const programs = [
  { title: "FHA Streamline", description: "Simplified refinance for existing FHA loan holders." },
  { title: "FHA Cash Out", description: "Access equity on your FHA-insured home." },
  { title: "FHA 203k", description: "Finance your refinance and home improvements together." },
  { title: "VA Streamline (IRRRL)", description: "Fast, easy refinance for VA loan holders." },
  { title: "VA Cash Out", description: "Tap into your home equity with VA benefits." },
  { title: "USDA Streamline", description: "Lower your rate on your existing USDA loan." },
  { title: "Conventional", description: "Competitive rates for standard refinancing needs." },
  { title: "Jumbo", description: "Refinance options for high-balance loans." },
];

export default function HomeRefinancePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-darker to-primary text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Refinance Your Mortgage</h1>
          <p className="text-lg text-primary-lighter max-w-2xl mx-auto mb-8">
            Lower your rate, reduce your payment, or access your home equity. Let us find the right refinance solution for you.
          </p>
          <Button href={COMPANY.applyUrl} variant="secondary" size="lg">
            Check Today&apos;s Rates
          </Button>
        </div>
      </section>

      <Section>
        <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
          Reasons to Refinance
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r) => (
            <Card key={r.title} className="text-center">
              <CardContent className="py-8">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <r.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">{r.title}</h3>
                <p className="text-sm text-gray-600">{r.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="light">
        <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
          Refinance Programs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {programs.map((p) => (
            <Card key={p.title}>
              <CardContent>
                <h3 className="font-bold text-gray-900 mb-1">{p.title}</h3>
                <p className="text-sm text-gray-600">{p.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-8">
            Get Your Refinance Quote
          </h2>
          <div className="bg-white rounded-2xl shadow-lg border p-6 md:p-8">
            <QuickQuoteForm />
          </div>
        </div>
      </Section>
    </>
  );
}
