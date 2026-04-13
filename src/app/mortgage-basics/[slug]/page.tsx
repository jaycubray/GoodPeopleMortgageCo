import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getMortgageBasic, getMortgageBasics } from "@/lib/data";

export async function generateStaticParams() {
  const topics = await getMortgageBasics();
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getMortgageBasic(slug);
  if (!topic) return {};
  return { title: topic.title, description: topic.description };
}

export default async function MortgageBasicDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = await getMortgageBasic(slug);
  if (!topic) notFound();

  return (
    <>
      <section className="bg-gradient-to-br from-primary-darker to-primary text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{topic.title}</h1>
          <p className="text-lg text-primary-lighter max-w-2xl mx-auto">{topic.description}</p>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl mx-auto prose prose-lg">
          {topic.content.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return <h2 key={i} className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">{block.replace("## ", "")}</h2>;
            }
            if (block.startsWith("### ")) {
              return <h3 key={i} className="text-xl font-serif font-bold text-gray-900 mt-6 mb-3">{block.replace("### ", "")}</h3>;
            }
            if (block.startsWith("- **") || block.startsWith("- ")) {
              const items = block.split("\n").filter(Boolean);
              return (
                <ul key={i} className="space-y-2 my-4 list-disc pl-6">
                  {items.map((item, j) => (
                    <li key={j} className="text-gray-600" dangerouslySetInnerHTML={{ __html: item.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                  ))}
                </ul>
              );
            }
            if (block.startsWith("1. ") || block.startsWith("2. ")) {
              const items = block.split("\n").filter(Boolean);
              return (
                <ol key={i} className="space-y-2 my-4 list-decimal pl-6">
                  {items.map((item, j) => (
                    <li key={j} className="text-gray-600" dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                  ))}
                </ol>
              );
            }
            return <p key={i} className="text-gray-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />;
          })}
        </div>
      </Section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Have Questions?</h2>
          <p className="text-primary-lighter mb-8">Our mortgage experts are ready to help you understand your options.</p>
          <Button href="/contact-us" variant="secondary">Contact Us</Button>
        </div>
      </section>
    </>
  );
}
