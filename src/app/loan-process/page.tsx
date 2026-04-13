import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { ClipboardCheck, FileText, Settings, Search, CheckCircle, FileCheck, KeyRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Loan Process",
  description: "Understand the mortgage process step by step — from pre-qualification to closing day.",
};

const steps = [
  { icon: ClipboardCheck, title: "Pre-Qualification", description: "We review your basic financial information to estimate how much you can borrow. This informal process helps you understand your budget before house hunting." },
  { icon: FileText, title: "Loan Application", description: "Complete a formal mortgage application with detailed financial documentation. We'll guide you through every form and answer all your questions." },
  { icon: Settings, title: "Processing", description: "Our processing team verifies your information, orders the appraisal, and compiles your loan file. We keep you updated throughout." },
  { icon: Search, title: "Underwriting", description: "An underwriter reviews your complete file to assess risk and ensure all guidelines are met. This is where final lending decisions are made." },
  { icon: CheckCircle, title: "Conditional Approval", description: "You receive approval with a list of conditions to satisfy. We help you clear each condition quickly and efficiently." },
  { icon: FileCheck, title: "Clear to Close", description: "All conditions are met and your loan is fully approved. We prepare your closing documents and schedule the closing date." },
  { icon: KeyRound, title: "Closing", description: "Sign your final documents, receive the keys to your new home, and celebrate! The entire process typically takes 30-45 days." },
];

export default function LoanProcessPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-darker to-primary text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">The Loan Process</h1>
          <p className="text-lg text-primary-lighter max-w-2xl mx-auto">
            Understanding each step of the mortgage process helps reduce anxiety and keeps you informed from start to finish.
          </p>
        </div>
      </section>

      <Section>
        <div className="max-w-4xl mx-auto">
          {/* Desktop: horizontal timeline visual */}
          <div className="hidden md:block relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20" />
            <div className="space-y-12">
              {steps.map((step, i) => (
                <div key={step.title} className="relative flex gap-8">
                  <div className="relative z-10 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shrink-0">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <div className="pt-2">
                    <div className="text-sm text-primary font-semibold mb-1">Step {i + 1}</div>
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: simple cards */}
          <div className="md:hidden space-y-6">
            {steps.map((step, i) => (
              <div key={step.title} className="bg-white rounded-xl border p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-primary-lighter mb-8">Begin your mortgage journey today with a free pre-qualification.</p>
          <Button href={COMPANY.applyUrl} variant="secondary" size="lg">Apply Now</Button>
        </div>
      </section>
    </>
  );
}
