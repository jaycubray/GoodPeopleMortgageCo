import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getMortgageBasics } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mortgage Basics",
  description: "Learn the fundamentals of mortgages — from credit and closing costs to appraisals and refinancing.",
};

export default async function MortgageBasicsPage() {
  const topics = await getMortgageBasics();

  return (
    <>
      <section className="bg-gradient-to-br from-primary-darker to-primary text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Mortgage Basics</h1>
          <p className="text-lg text-primary-lighter max-w-2xl mx-auto">
            Everything you need to know about the mortgage process, from application to closing.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic) => (
            <Link key={topic.slug} href={`/mortgage-basics/${topic.slug}`}>
              <Card className="h-full">
                <CardContent className="py-8 text-center">
                  <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">{topic.title}</h3>
                  <p className="text-sm text-gray-600">{topic.description}</p>
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
            Our expert loan officers are ready to help you navigate the mortgage process.
          </p>
          <Button href="/contact-us" variant="secondary">Contact Us</Button>
        </div>
      </section>
    </>
  );
}
