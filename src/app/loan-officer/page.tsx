import { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getLoanOfficers } from "@/lib/data";
import { Phone, Mail, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Loan Officers",
  description: "Meet the experienced loan officers at Good People Mortgage Company.",
};

export default async function LoanOfficerPage() {
  const officers = await getLoanOfficers();

  return (
    <>
      <section className="bg-gradient-to-br from-primary-darker to-primary text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Loan Officers</h1>
          <p className="text-lg text-primary-lighter max-w-2xl mx-auto">
            Meet the experienced professionals ready to guide you through your mortgage journey.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {officers.map((officer) => (
            <Card key={officer.nmls}>
              <CardContent className="p-8 text-center">
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20">
                  <Image
                    src={officer.image}
                    alt={officer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-1">{officer.name}</h2>
                <p className="text-primary font-medium mb-2">{officer.title}</p>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-4">
                  <Shield className="h-3.5 w-3.5" />
                  NMLS: {officer.nmls}
                </div>
                <p className="text-gray-600 text-sm mb-6">{officer.bio}</p>
                <div className="space-y-2 mb-6">
                  <a href={`tel:${officer.phone.replace(/\D/g, "")}`} className="flex items-center justify-center gap-2 text-sm text-gray-700 hover:text-primary">
                    <Phone className="h-4 w-4" />
                    {officer.phone}
                  </a>
                  <a href={`mailto:${officer.email}`} className="flex items-center justify-center gap-2 text-sm text-gray-700 hover:text-primary">
                    <Mail className="h-4 w-4" />
                    {officer.email}
                  </a>
                </div>
                <Button href={officer.applyUrl} className="w-full">Apply with {officer.name.split(" ")[0]}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
