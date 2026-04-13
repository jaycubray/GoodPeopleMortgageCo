"use client";

import Script from "next/script";

export function GoogleReviews() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
            What People Are Saying
          </h2>
          <p className="text-gray-500">Real reviews from real clients on Google</p>
        </div>
        <div className="elfsight-app-0327ea91-452e-4d51-8aa0-2d9b2d971c68" data-elfsight-app-lazy />
        <Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" />
      </div>
    </section>
  );
}
