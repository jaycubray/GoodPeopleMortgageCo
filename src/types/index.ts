export interface LoanProgram {
  slug: string;
  title: string;
  shortDescription: string;
  fullContent: string;
  icon: string;
  image: string;
  features: string[];
  eligibility: string[];
}

export interface MortgageBasic {
  slug: string;
  title: string;
  description: string;
  image: string;
  content: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

export interface LoanOfficer {
  name: string;
  title: string;
  nmls: string;
  phone: string;
  email: string;
  image: string;
  bio: string;
  applyUrl: string;
}

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface Lead {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  loanAmount?: string;
  propertyValue?: string;
  loanType?: string;
  creditScore?: string;
  comments?: string;
  source?: string;
}
