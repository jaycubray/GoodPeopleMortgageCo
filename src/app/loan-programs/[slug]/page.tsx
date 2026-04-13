import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { QuickQuoteForm } from "@/components/forms/QuickQuoteForm";
import { getLoanProgram, getLoanPrograms } from "@/lib/data";
import { CheckCircle } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export async function generateStaticParams() {
  const programs = await getLoanPrograms();
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = await getLoanProgram(slug);
  if (!program) return {};
  return {
    title: program.title,
    description: program.shortDescription,
  };
}

export default async function LoanProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await getLoanProgram(slug);
  if (!program) notFound();

  return (
    <>
      {/* Hero with program image */}
      <section className="relative bg-primary-darker text-white py-20 md:py-28 overflow-hidden">
        <Image
          src={program.image}
          alt={program.title}
          fill
          className="object-contain opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-darker via-primary-darker/90 to-primary-dark/80" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <Image
            src={program.image}
            alt={program.title}
            width={120}
            height={120}
            className="mx-auto mb-6 h-24 w-24 object-contain"
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{program.title}</h1>
          <p className="text-lg text-primary-lighter max-w-2xl mx-auto">{program.shortDescription}</p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              {program.fullContent.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("## ")) {
                  return <h2 key={i} className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">{paragraph.replace("## ", "")}</h2>;
                }
                if (paragraph.startsWith("- **")) {
                  const items = paragraph.split("\n").filter(Boolean);
                  return (
                    <ul key={i} className="space-y-2 my-4">
                      {items.map((item, j) => (
                        <li key={j} className="text-gray-600" dangerouslySetInnerHTML={{ __html: item.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                      ))}
                    </ul>
                  );
                }
                return <p key={i} className="text-gray-600 leading-relaxed mb-4">{paragraph}</p>;
              })}
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-3">
                {program.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Eligibility</h3>
              <ul className="space-y-3">
                {program.eligibility.map((e) => (
                  <li key={e} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary-dark shrink-0 mt-0.5" />
                    <span className="text-gray-700">{e}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <Button href={COMPANY.applyUrl} size="lg">Apply Now</Button>
            </div>
          </div>

          <div>
            <div className="sticky top-32 bg-white rounded-2xl shadow-lg border p-6">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 text-center">
                Get a Quick Quote
              </h3>
              <QuickQuoteForm variant="sidebar" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
