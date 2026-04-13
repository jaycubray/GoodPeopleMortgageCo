"use client";

import Image from "next/image";
import { Shield, Award, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function TrustBar() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-lg text-gray-600">
            Trusted by hundreds of Florida families
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
          <div className="flex flex-col items-center text-center">
            <Users className="h-8 w-8 text-primary mb-2" />
            <div className="text-3xl font-bold text-primary">
              <AnimatedCounter target={500} suffix="+" />
            </div>
            <p className="text-sm text-gray-500">Families Served</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Award className="h-8 w-8 text-primary mb-2" />
            <div className="text-3xl font-bold text-primary">
              <AnimatedCounter target={15} suffix="+" />
            </div>
            <p className="text-sm text-gray-500">Years Experience</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Shield className="h-8 w-8 text-primary mb-2" />
            <p className="text-sm text-gray-500 mt-1">NMLS: 2409276</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/eoh-logo.svg"
              alt="Equal Housing Lender"
              width={48}
              height={48}
              className="h-12 w-12 mb-1"
            />
            <p className="text-sm text-gray-500">Equal Housing Lender</p>
          </div>
        </div>
      </div>
    </section>
  );
}
