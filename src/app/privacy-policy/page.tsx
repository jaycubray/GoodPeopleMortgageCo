import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Good People Mortgage Company.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-darker to-primary text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Privacy Policy</h1>
        </div>
      </section>
      <Section>
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {COMPANY.name} collects personal information that you voluntarily provide when filling out forms on our website, including your name, email address, phone number, and financial information related to loan inquiries.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We use the information collected to respond to your inquiries, process loan applications, provide mortgage-related services, and communicate with you about products and services that may interest you.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Information Sharing</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We do not sell your personal information to third parties. We may share your information with service providers who assist in processing your loan application, as required by law, or with your express consent.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            For questions about our privacy practices, contact us at{" "}
            <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a> or call{" "}
            <a href={`tel:${COMPANY.phoneRaw}`} className="text-primary hover:underline">{COMPANY.phone}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
