import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { QuickQuoteForm } from "@/components/forms/QuickQuoteForm";
import { FileText, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Online Forms",
  description: "Download mortgage application forms including the Uniform Residential Loan Application.",
};

const forms = [
  {
    title: "Uniform Residential Loan Application",
    description: "The standard form used to apply for a residential mortgage loan (Form 1003/65).",
    filename: "urla.pdf",
  },
  {
    title: "Unmarried Addendum",
    description: "Additional form required for unmarried co-borrowers.",
    filename: "urla-unmarried.pdf",
  },
  {
    title: "Additional Borrower",
    description: "Form for adding additional borrowers to a mortgage application.",
    filename: "urla-additional.pdf",
  },
];

export default function OnlineFormsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-darker to-primary text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Online Forms</h1>
          <p className="text-lg text-primary-lighter max-w-2xl mx-auto">
            Download the forms you need to get started on your mortgage application.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="text-gray-600 mb-8">
              Below you&apos;ll find downloadable forms commonly used in the mortgage application process.
              If you have any questions about which forms you need, please contact us.
            </p>
            <div className="space-y-4">
              {forms.map((form) => (
                <Card key={form.filename} hover={false}>
                  <CardContent className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{form.title}</h3>
                      <p className="text-sm text-gray-600">{form.description}</p>
                    </div>
                    <a
                      href={`/forms/${form.filename}`}
                      className="flex items-center gap-1 text-sm text-primary font-medium hover:underline shrink-0"
                      download
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  </CardContent>
                </Card>
              ))}
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
