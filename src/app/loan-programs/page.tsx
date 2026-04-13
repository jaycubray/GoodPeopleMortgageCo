import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Lock, SlidersHorizontal, Percent, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Loan Programs",
  description: "Explore our mortgage loan programs including Fixed Rate, ARM, FHA, VA, Conventional, and Jumbo loans.",
};

const rateOptions = [
  { icon: Lock, title: "Fixed Rate", slug: "fixed-rate-mortgage", description: "Lock in your rate for the life of the loan. Predictable payments every month." },
  { icon: SlidersHorizontal, title: "Adjustable (ARM)", slug: "adjustable-rate-mortgage", description: "Start with a lower rate that adjusts periodically. Great for short-term ownership." },
  { icon: Percent, title: "Interest Only", slug: "interest-only-mortgage", description: "Pay only interest initially for maximum cash flow flexibility." },
  { icon: TrendingUp, title: "Graduated Payments", slug: "graduated-payment-mortgage", description: "Payments start low and increase over time. Ideal for growing incomes." },
];

const loanPrograms = [
  { title: "Conventional Loans", slug: "conventional-loans", image: "/images/loan-programs/conventional.png", description: "Traditional mortgage options with competitive rates and flexible terms." },
  { title: "FHA Home Loans", slug: "fha-loans", image: "/images/loan-programs/fha.png", description: "Government-insured loans with low down payments and flexible credit." },
  { title: "VA Loans", slug: "va-loans", image: "/images/loan-programs/va.png", description: "Exclusive benefits for veterans with zero down payment." },
  { title: "Jumbo Loans", slug: "jumbo-loans", image: "/images/loan-programs/jumbo.png", description: "Finance luxury homes that exceed conforming loan limits." },
];

export default function LoanProgramsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-darker to-primary text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Loan Programs</h1>
          <p className="text-lg text-primary-lighter max-w-2xl mx-auto">
            Find the perfect mortgage solution for your needs. We offer a wide range of loan programs to fit every situation.
          </p>
        </div>
      </section>

      <Section>
        <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
          Mortgage Rate Options
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rateOptions.map((opt) => (
            <Link key={opt.slug} href={`/loan-programs/${opt.slug}`}>
              <Card className="h-full text-center">
                <CardContent className="py-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <opt.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">{opt.title}</h3>
                  <p className="text-sm text-gray-600">{opt.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section variant="light">
        <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
          Loan Program Options
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loanPrograms.map((prog) => (
            <Link key={prog.slug} href={`/loan-programs/${prog.slug}`}>
              <Card className="h-full">
                <div className="p-4">
                  <Image
                    src={prog.image}
                    alt={prog.title}
                    width={400}
                    height={250}
                    className="w-full h-40 object-contain rounded-lg"
                  />
                </div>
                <CardContent className="pt-0">
                  <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">{prog.title}</h3>
                  <p className="text-sm text-gray-600">{prog.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Get Your Mortgage Questions Answered Today!
          </h2>
          <p className="text-primary-lighter mb-8">
            Our loan experts are ready to help you find the right program.
          </p>
          <Button href="/contact-us" variant="secondary">
            Contact Us
          </Button>
        </div>
      </section>
    </>
  );
}
