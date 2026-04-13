import type { LoanProgram, MortgageBasic, FAQ, BlogPost, LoanOfficer, Testimonial } from "@/types";

import loanProgramsData from "@/data/loan-programs.json";
import mortgageBasicsData from "@/data/mortgage-basics.json";
import faqsData from "@/data/faqs.json";
import blogPostsData from "@/data/blog-posts.json";
import loanOfficersData from "@/data/loan-officers.json";
import testimonialsData from "@/data/testimonials.json";

const POSTS_PER_PAGE = 9;

export async function getLoanPrograms(): Promise<LoanProgram[]> {
  return loanProgramsData as LoanProgram[];
}

export async function getLoanProgram(slug: string): Promise<LoanProgram | undefined> {
  return (loanProgramsData as LoanProgram[]).find((p) => p.slug === slug);
}

export async function getMortgageBasics(): Promise<MortgageBasic[]> {
  return mortgageBasicsData as MortgageBasic[];
}

export async function getMortgageBasic(slug: string): Promise<MortgageBasic | undefined> {
  return (mortgageBasicsData as MortgageBasic[]).find((m) => m.slug === slug);
}

export async function getFAQs(): Promise<FAQ[]> {
  return faqsData as FAQ[];
}

export async function getBlogPosts(page: number = 1): Promise<{ posts: BlogPost[]; totalPages: number }> {
  const all = blogPostsData as BlogPost[];
  const sorted = [...all].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const totalPages = Math.ceil(sorted.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  const posts = sorted.slice(start, start + POSTS_PER_PAGE);
  return { posts, totalPages };
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  return (blogPostsData as BlogPost[]).find((p) => p.slug === slug);
}

export async function getLoanOfficers(): Promise<LoanOfficer[]> {
  return loanOfficersData as LoanOfficer[];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonialsData as Testimonial[];
}
