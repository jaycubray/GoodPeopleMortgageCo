"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { COMPANY } from "@/lib/constants";
import { motion } from "framer-motion";
import {
  FileText, Upload, MessageSquare, ShieldCheck,
  Clock, Smartphone, CheckCircle, Star, ArrowRight,
  Zap, Lock, Users,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Easy 1003 Application",
    tagline: "Complete your application in under 15 minutes",
    bullets: [
      "Guided step-by-step questionnaire — no mortgage jargon",
      "Auto-save so you can start and finish on your schedule",
      "Smart fields that pre-fill and skip irrelevant sections",
      "Real-time validation catches errors before submission",
    ],
    color: "from-primary to-primary-dark",
  },
  {
    icon: Upload,
    title: "Document Upload Portal",
    tagline: "Securely share documents from anywhere",
    bullets: [
      "Drag-and-drop or snap photos of documents with your phone",
      "Automated checklist tells you exactly what's needed",
      "Real-time status updates — know when docs are reviewed",
      "Bank-grade 256-bit encryption protects your data",
    ],
    color: "from-secondary-dark to-secondary",
  },
  {
    icon: MessageSquare,
    title: "Direct Communication",
    tagline: "Stay connected with your loan team",
    bullets: [
      "In-app messaging with your dedicated loan officer",
      "Real-time notifications when updates are available",
      "Share files, ask questions, and get fast answers",
      "No more phone tag or lost emails",
    ],
    color: "from-primary-dark to-primary-darker",
  },
  {
    icon: ShieldCheck,
    title: "Instant Pre-Approval",
    tagline: "Get your pre-approval letter on demand",
    bullets: [
      "Generate pre-approval letters instantly after qualification",
      "Customize the letter for specific properties",
      "Share directly with your real estate agent",
      "Strengthen your offer in competitive markets",
    ],
    color: "from-primary to-primary-light",
  },
  {
    icon: Clock,
    title: "Real-Time Loan Tracking",
    tagline: "Know exactly where your loan stands — always",
    bullets: [
      "Visual milestone tracker from application to closing",
      "Push notifications at every stage of the process",
      "See outstanding conditions and what's been cleared",
      "Estimated closing date updated in real-time",
    ],
    color: "from-secondary to-secondary-light",
  },
  {
    icon: Smartphone,
    title: "Works on Any Device",
    tagline: "Apply from your couch, office, or on the go",
    bullets: [
      "Fully responsive — phone, tablet, or desktop",
      "Native mobile experience without downloading an app",
      "Switch devices mid-application without losing progress",
      "Touch-friendly interface optimized for mobile",
    ],
    color: "from-primary-darker to-primary-dark",
  },
];

const stats = [
  { value: "15", label: "Minutes to Apply", suffix: "min" },
  { value: "24/7", label: "Access Anytime", suffix: "" },
  { value: "256", label: "Bit Encryption", suffix: "-bit" },
  { value: "100", label: "Digital Process", suffix: "%" },
];

const faqs = [
  {
    question: "How does the digital mortgage application work?",
    answer: "Our digital platform guides you through a simple, step-by-step questionnaire that covers everything needed for your mortgage application. You can complete it in under 15 minutes from any device, and your progress is saved automatically so you can return anytime.",
  },
  {
    question: "Is my personal information secure?",
    answer: "Absolutely. Our platform uses bank-grade 256-bit SSL encryption to protect all data in transit and at rest. Your information is never shared with unauthorized third parties, and we follow strict security protocols to safeguard your privacy.",
  },
  {
    question: "Can I upload documents from my phone?",
    answer: "Yes! You can snap photos of documents directly from your phone's camera or upload files from your device. The system accepts all common formats including PDF, JPG, and PNG. Our automated checklist tells you exactly which documents are needed.",
  },
  {
    question: "How long does the entire process take?",
    answer: "The application itself takes about 15 minutes. From there, the typical timeline from application to closing is 30-45 days, depending on the complexity of your loan. Our digital process helps speed things up by eliminating paper-based bottlenecks.",
  },
  {
    question: "Can I track my loan status online?",
    answer: "Yes, our platform includes a real-time loan tracker that shows you exactly where your application stands. You'll receive push notifications at each milestone, and you can see outstanding conditions and estimated closing dates at any time.",
  },
  {
    question: "What if I need help during the application?",
    answer: "You're never alone in the process. You can message your dedicated loan officer directly through the platform, call us at (727) 543-7398, or email us anytime. We typically respond to messages within minutes during business hours.",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: 0.1 }}
      className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center py-16 ${
        index > 0 ? "border-t border-gray-100" : ""
      }`}
    >
      {/* Text side */}
      <div className={isEven ? "md:order-1" : "md:order-2"}>
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
          <feature.icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
          {feature.title}
        </h3>
        <p className="text-lg text-gray-500 mb-6">{feature.tagline}</p>
        <ul className="space-y-3">
          {feature.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-gray-600">{bullet}</span>
            </li>
          ))}
        </ul>
        <a
          href={COMPANY.applyUrl}
          className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-primary hover:gap-3 transition-all"
        >
          Try It Now <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Visual side — styled mockup */}
      <div className={isEven ? "md:order-2" : "md:order-1"}>
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-5 scale-105`} />
          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 bg-gray-100 rounded-full h-6 ml-2 flex items-center px-3">
                <Lock className="h-3 w-3 text-gray-400 mr-1" />
                <span className="text-xs text-gray-400">blink.mortgage/app/GPMC</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className={`h-3 rounded-full bg-gradient-to-r ${feature.color} opacity-20 w-3/4`} />
              <div className="h-3 rounded-full bg-gray-100 w-full" />
              <div className="h-3 rounded-full bg-gray-100 w-5/6" />
              <div className="h-10 rounded-lg bg-gray-50 border border-gray-200 mt-4" />
              <div className="h-10 rounded-lg bg-gray-50 border border-gray-200" />
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="h-10 rounded-lg bg-gray-50 border border-gray-200" />
                <div className="h-10 rounded-lg bg-gray-50 border border-gray-200" />
              </div>
              <div className={`h-10 rounded-lg bg-gradient-to-r ${feature.color} mt-4 flex items-center justify-center`}>
                <span className="text-white text-sm font-semibold">Continue</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DigitalMortgagePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-darker via-primary-dark to-primary text-white">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
                <Zap className="h-4 w-4 text-secondary" />
                <span className="text-gray-200">Powered by Blink Mortgage</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
                Close More Loans —{" "}
                <span className="text-secondary">With Less Hassle</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                Our digital mortgage platform makes applying easy, fast, and secure.
                Complete your application in minutes — from any device, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href={COMPANY.applyUrl} variant="secondary" size="lg">
                  Start Your Application
                </Button>
                <Button href="/contact-us" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Talk to a Loan Officer
                </Button>
              </div>
            </motion.div>

            {/* App mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-secondary/10 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 md:p-8">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="flex-1 bg-gray-100 rounded-full h-7 ml-3 flex items-center px-3">
                    <Lock className="h-3 w-3 text-green-500 mr-2" />
                    <span className="text-xs text-gray-500">blink.mortgage/app/signup/p/GPMC</span>
                  </div>
                </div>

                {/* App content mockup */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <Image src={COMPANY.logo} alt="Logo" width={120} height={55} className="h-8 w-auto" />
                  </div>
                  <div className="h-2 bg-primary/20 rounded-full">
                    <div className="h-2 bg-primary rounded-full w-1/3" />
                  </div>
                  <p className="text-xs text-gray-400">Step 1 of 3</p>
                  <h3 className="text-lg font-bold text-gray-900">What are you looking for?</h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="border-2 border-primary bg-primary/5 rounded-xl p-4 text-center">
                      <div className="text-2xl mb-1">🏠</div>
                      <p className="text-sm font-medium text-primary">Purchase</p>
                    </div>
                    <div className="border-2 border-gray-200 rounded-xl p-4 text-center hover:border-gray-300">
                      <div className="text-2xl mb-1">🔄</div>
                      <p className="text-sm font-medium text-gray-600">Refinance</p>
                    </div>
                  </div>

                  <div className="bg-primary rounded-xl py-3 text-center mt-4">
                    <span className="text-white font-semibold text-sm">Continue</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}<span className="text-lg text-primary-light">{stat.suffix && stat.suffix !== stat.value ? "" : ""}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4">
        {features.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </section>

      {/* Testimonial */}
      <section className="bg-primary-darker text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-6 w-6 fill-secondary text-secondary" />
            ))}
          </div>
          <blockquote className="text-xl md:text-2xl font-light leading-relaxed mb-8 italic">
            &ldquo;The online application was so easy — I did the whole thing on my phone during lunch.
            Matt and the team kept me updated the entire way. Best mortgage experience I&apos;ve ever had.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary-dark flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div className="text-left">
              <p className="font-semibold">James T.</p>
              <p className="text-sm text-primary-lighter">Refinance Client, Tampa</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500">Everything you need to know about our digital mortgage process.</p>
          </div>
          <Accordion items={faqs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="/images/hero-home.jpg"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-primary-darker/85" />
        <div className="relative max-w-3xl mx-auto px-4 text-center text-white">
          <Users className="h-10 w-10 text-secondary mx-auto mb-4" />
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
            Apply in minutes, track your progress 24/7, and close faster than ever.
            Your dream home is just a few clicks away.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={COMPANY.applyUrl} variant="secondary" size="lg">
              Start Your Application
            </Button>
            <Button href={`tel:${COMPANY.phoneRaw}`} variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-dark">
              Call {COMPANY.phone}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
