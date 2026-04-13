import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getBlogPost, getBlogPosts } from "@/lib/data";
import { COMPANY } from "@/lib/constants";

export async function generateStaticParams() {
  const { posts } = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <section className="bg-gradient-to-br from-primary-darker to-primary text-white py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-sm text-secondary font-medium mb-4">
            {post.category} &middot; {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">{post.title}</h1>
          <p className="text-primary-lighter">By {post.author}</p>
        </div>
      </section>

      <Section>
        <article className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return <h2 key={i} className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">{block.replace("## ", "")}</h2>;
              }
              if (block.startsWith("### ")) {
                return <h3 key={i} className="text-xl font-serif font-bold text-gray-900 mt-6 mb-3">{block.replace("### ", "")}</h3>;
              }
              if (block.startsWith("- ") || block.startsWith("1. ")) {
                const items = block.split("\n").filter(Boolean);
                const isOrdered = block.startsWith("1. ");
                const Tag = isOrdered ? "ol" : "ul";
                return (
                  <Tag key={i} className={`space-y-2 my-4 ${isOrdered ? "list-decimal" : "list-disc"} pl-6`}>
                    {items.map((item, j) => (
                      <li key={j} className="text-gray-600" dangerouslySetInnerHTML={{ __html: item.replace(/^[-\d]+\.?\s/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                    ))}
                  </Tag>
                );
              }
              return <p key={i} className="text-gray-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />;
            })}
          </div>

          <div className="mt-12 p-8 bg-primary/5 rounded-2xl text-center">
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6">Take the first step toward your mortgage goals today.</p>
            <Button href={COMPANY.applyUrl}>Apply Now</Button>
          </div>
        </article>
      </Section>
    </>
  );
}
