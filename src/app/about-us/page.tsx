import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { QuickQuoteForm } from "@/components/forms/QuickQuoteForm";
import { getLoanOfficers } from "@/lib/data";
import { Heart, Shield, Users, Handshake, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Good People Mortgage Company — our mission, values, and commitment to helping Florida families achieve homeownership.",
};

const values = [
  { icon: Shield, title: "Integrity", description: "We conduct every transaction with complete honesty and transparency. No hidden fees, no surprises." },
  { icon: Users, title: "Competence", description: "Our team brings years of mortgage industry expertise to guide you through the lending process." },
  { icon: Heart, title: "Service", description: "We treat every client like family, providing personalized attention and going above and beyond." },
  { icon: Handshake, title: "Community", description: "We're proud to serve Saint Petersburg and the Tampa Bay area, helping our neighbors achieve their dreams." },
];

export default async function AboutUsPage() {
  const officers = await getLoanOfficers();
  return (
    <>
      <section className="bg-gradient-to-br from-primary-darker to-primary text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">About Us</h1>
          <p className="text-lg text-primary-lighter max-w-2xl mx-auto">
            Good people helping good people find their way home.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our mission is to serve our customers with honesty, integrity and competence. Our goal is to
              provide home loans to our clients while providing them with the lowest interest rates and
              closing costs possible.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Furthermore, we pledge to help borrowers overcome roadblocks that can arise while securing a
              loan. We understand that buying a home or refinancing your mortgage is one of the biggest
              financial decisions you&apos;ll make, and we&apos;re here to make it as smooth as possible.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We&apos;ve been helping customers afford the home of their dreams for many years and we love
              what we do. As a mortgage broker, we shop multiple lenders to find you the best rate and
              terms — something a single bank simply can&apos;t offer.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 text-center">
              Get a Quick Quote
            </h3>
            <QuickQuoteForm variant="sidebar" />
          </div>
        </div>
      </Section>

      {/* Team Section */}
      <Section variant="light">
        <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-8">
          {officers.map((officer) => (
            <Card key={officer.nmls} className="text-center">
              <CardContent className="py-8">
                <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                  <Image
                    src={officer.image}
                    alt={officer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900">{officer.name}</h3>
                <p className="text-primary font-medium text-sm mb-2">{officer.title}</p>
                <p className="text-xs text-gray-500 mb-3">NMLS: {officer.nmls}</p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <a href={`tel:${officer.phone.replace(/\D/g, "")}`} className="flex items-center gap-1 hover:text-primary">
                    <Phone className="h-3.5 w-3.5" /> {officer.phone}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Link href="/loan-officer" className="text-primary font-medium hover:underline">
            View full team profiles &rarr;
          </Link>
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <Card key={v.title} className="text-center">
              <CardContent className="py-8">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600">{v.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
