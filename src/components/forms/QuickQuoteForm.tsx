"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { LOAN_AMOUNTS, PROPERTY_VALUES, LOAN_TYPES, CREDIT_SCORES } from "@/lib/constants";
import { CheckCircle } from "lucide-react";

interface QuickQuoteData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  loanAmount: string;
  propertyValue: string;
  loanType: string;
  creditScore: string;
  consent: boolean;
}

export function QuickQuoteForm({ variant = "default" }: { variant?: "default" | "sidebar" }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<QuickQuoteData>();

  const onSubmit = async (data: QuickQuoteData) => {
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">
          We&apos;ve received your request and will be in touch shortly.
        </p>
      </div>
    );
  }

  const isSidebar = variant === "sidebar";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className={isSidebar ? "space-y-4" : "grid md:grid-cols-2 gap-4"}>
        <Input
          label="First Name *"
          id="firstName"
          placeholder="First Name"
          {...register("firstName", { required: "First name is required" })}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name *"
          id="lastName"
          placeholder="Last Name"
          {...register("lastName", { required: "Last name is required" })}
          error={errors.lastName?.message}
        />
      </div>
      <div className={isSidebar ? "space-y-4" : "grid md:grid-cols-2 gap-4"}>
        <Input
          label="Email *"
          id="email"
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />
        <Input
          label="Phone *"
          id="phone"
          type="tel"
          placeholder="Phone"
          {...register("phone", { required: "Phone is required" })}
          error={errors.phone?.message}
        />
      </div>
      <div className={isSidebar ? "space-y-4" : "grid md:grid-cols-2 gap-4"}>
        <Select
          label="Loan Amount"
          id="loanAmount"
          options={LOAN_AMOUNTS}
          {...register("loanAmount")}
        />
        <Select
          label="Property Value"
          id="propertyValue"
          options={PROPERTY_VALUES}
          {...register("propertyValue")}
        />
      </div>
      <div className={isSidebar ? "space-y-4" : "grid md:grid-cols-2 gap-4"}>
        <Select
          label="Loan Type"
          id="loanType"
          options={LOAN_TYPES}
          {...register("loanType")}
        />
        <Select
          label="Credit Score"
          id="creditScore"
          options={CREDIT_SCORES}
          {...register("creditScore")}
        />
      </div>
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="consent"
          className="mt-1"
          {...register("consent", { required: "You must agree to the terms" })}
        />
        <label htmlFor="consent" className="text-xs text-gray-500">
          I agree to the{" "}
          <a href="/legal" className="text-primary underline">Terms of Service</a> and{" "}
          <a href="/privacy-policy" className="text-primary underline">Privacy Policy</a>.
          By submitting, I consent to being contacted about mortgage options.
        </label>
      </div>
      {errors.consent && (
        <p className="text-xs text-red-500">{errors.consent.message}</p>
      )}
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "Submitting..." : "Get a Quick Quote"}
      </Button>
    </form>
  );
}
