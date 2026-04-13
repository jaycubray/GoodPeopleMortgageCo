"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  comments: string;
  consent: boolean;
}

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ContactData>();

  const onSubmit = async (data: ContactData) => {
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "contact" }),
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-gradient-to-br from-primary-darker to-primary text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Contact Us</h1>
          <p className="text-lg text-primary-lighter max-w-2xl mx-auto">
            Ready to get started? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Get in Touch</h2>
            <ul className="space-y-6 mb-8">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">{COMPANY.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <a href={`tel:${COMPANY.phoneRaw}`} className="text-primary hover:underline">
                    {COMPANY.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">
                    {COMPANY.email}
                  </a>
                </div>
              </li>
            </ul>

            <div className="rounded-xl overflow-hidden border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3529.1!2d-82.6569!3d27.8024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s2749+58th+Ave+N%2C+St+Petersburg%2C+FL+33714!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Good People Mortgage Company Location"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">
                  Thank you for reaching out. We&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">Send Us a Message</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name *"
                    id="firstName"
                    {...register("firstName", { required: "Required" })}
                    error={errors.firstName?.message}
                  />
                  <Input
                    label="Last Name *"
                    id="lastName"
                    {...register("lastName", { required: "Required" })}
                    error={errors.lastName?.message}
                  />
                </div>
                <Input
                  label="Email *"
                  id="email"
                  type="email"
                  {...register("email", { required: "Required" })}
                  error={errors.email?.message}
                />
                <Input
                  label="Phone *"
                  id="phone"
                  type="tel"
                  {...register("phone", { required: "Required" })}
                  error={errors.phone?.message}
                />
                <div>
                  <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                    Comments *
                  </label>
                  <textarea
                    id="comments"
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    {...register("comments", { required: "Required" })}
                  />
                  {errors.comments && <p className="mt-1 text-xs text-red-500">{errors.comments.message}</p>}
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="consent"
                    className="mt-1"
                    {...register("consent", { required: "You must agree" })}
                  />
                  <label htmlFor="consent" className="text-xs text-gray-500">
                    I consent to being contacted about mortgage options via phone, email, or text.
                  </label>
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
