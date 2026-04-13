import { z } from "zod";

export const leadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  loanAmount: z.string().optional(),
  propertyValue: z.string().optional(),
  loanType: z.string().optional(),
  creditScore: z.string().optional(),
  comments: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, "You must agree to the terms"),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  comments: z.string().min(1, "Please enter a message"),
  consent: z.boolean().refine((v) => v === true, "You must agree to the terms"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
