import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { getFAQs } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about mortgages, home buying, refinancing, and the loan process.",
};

export default async function FAQPage() {
  const faqs = await getFAQs();

  return (
    <>
      <section className="bg-gradient-to-br from-primary-darker to-primary text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-primary-lighter max-w-2xl mx-auto">
            Get answers to the most common questions about mortgages and the home buying process.
          </p>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqs} />
        </div>
      </Section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Our loan experts are here to help. Contact us for personalized answers to your mortgage questions.
          </p>
          <Button href="/contact-us">Contact Us</Button>
        </div>
      </section>
    </>
  );
}
