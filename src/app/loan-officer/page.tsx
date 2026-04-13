import { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
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
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {officers.map((officer) => (
            <div key={officer.nmls} className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Top gradient accent */}
              <div className="h-32 bg-gradient-to-br from-primary to-primary-dark relative">
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={officer.image}
                      alt={officer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-20 pb-8 px-8 text-center">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-1">{officer.name}</h2>
                <p className="text-primary font-medium mb-1">{officer.title}</p>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mb-5">
                  <Shield className="h-3 w-3" />
                  NMLS: {officer.nmls}
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-6">{officer.bio}</p>

                <div className="flex flex-col gap-2 mb-6">
                  <a href={`tel:${officer.phone.replace(/\D/g, "")}`} className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" />
                    {officer.phone}
                  </a>
                  <a href={`mailto:${officer.email}`} className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" />
                    {officer.email}
                  </a>
                </div>

                <Button href={officer.applyUrl} className="w-full">
                  Apply with {officer.name.split(" ")[0]}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
