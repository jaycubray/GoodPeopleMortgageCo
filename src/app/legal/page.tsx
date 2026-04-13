import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Legal",
  description: "Legal terms and conditions for Good People Mortgage Company.",
};

export default function LegalPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-darker to-primary text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Legal</h1>
        </div>
      </section>
      <Section>
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Terms of Service</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            By accessing and using the {COMPANY.name} website, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            The content on this website is for informational purposes only and does not constitute a loan commitment or guarantee. All loan applications are subject to credit approval and verification. Interest rates, fees, and terms are subject to change without notice.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            {COMPANY.name} is an equal housing lender. NMLS #{COMPANY.nmls}. Licensed in the state of Florida.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For questions about these terms, please contact us at{" "}
            <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
