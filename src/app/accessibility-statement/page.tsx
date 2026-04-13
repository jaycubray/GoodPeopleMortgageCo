import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Accessibility statement for Good People Mortgage Company website.",
};

export default function AccessibilityStatementPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-darker to-primary text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Accessibility Statement</h1>
        </div>
      </section>
      <Section>
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Our Commitment</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {COMPANY.name} is committed to ensuring digital accessibility for people with disabilities. We continually work to improve the user experience for everyone and apply relevant accessibility standards.
          </p>

          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Accessibility Features</h2>
          <ul className="space-y-2 my-4 list-disc pl-6 text-gray-600">
            <li>Semantic HTML structure with proper heading hierarchy</li>
            <li>Alt text on all images</li>
            <li>Keyboard navigation support</li>
            <li>ARIA labels on interactive elements</li>
            <li>Sufficient color contrast ratios</li>
            <li>Skip-to-content navigation links</li>
            <li>Responsive design for all screen sizes</li>
          </ul>

          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Feedback</h2>
          <p className="text-gray-600 leading-relaxed">
            If you encounter any accessibility barriers on our website, please contact us at{" "}
            <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">{COMPANY.email}</a> or call{" "}
            <a href={`tel:${COMPANY.phoneRaw}`} className="text-primary hover:underline">{COMPANY.phone}</a>.
            We welcome your feedback and will work to address any issues.
          </p>
        </div>
      </Section>
    </>
  );
}
