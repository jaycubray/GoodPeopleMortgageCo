import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { CTACards } from "@/components/home/CTACards";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { BrokerComparison } from "@/components/home/BrokerComparison";
import { QuickQuoteForm } from "@/components/forms/QuickQuoteForm";
import { GoogleReviews } from "@/components/home/GoogleReviews";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Section } from "@/components/ui/Section";
import { getTestimonials } from "@/lib/data";

export default async function HomePage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <Hero />
      <TrustBar />
      <CTACards />
      <ServicesOverview />
      <ProcessTimeline />
      <BrokerComparison />

      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Get a Quick Quote
            </h2>
            <p className="text-gray-600">
              Fill out the form below and one of our loan experts will get back to you with a
              personalized quote.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border p-6 md:p-8">
            <QuickQuoteForm />
          </div>
        </div>
      </Section>

      <GoogleReviews />
      <TestimonialsCarousel testimonials={testimonials} />
      <FinalCTA />
    </>
  );
}
