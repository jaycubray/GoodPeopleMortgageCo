"use client";

import { useState } from "react";
import { X, TrendingDown } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export function RateTicker() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-secondary/20 border-b border-secondary/30">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm">
          <TrendingDown className="h-4 w-4 text-primary shrink-0" />
          <span className="text-gray-700">
            <span className="hidden sm:inline">Today&apos;s Rates: </span>
            <strong>30yr Fixed ~6.5%</strong>
            <span className="hidden md:inline"> | <strong>15yr Fixed ~5.8%</strong></span>
            {" "}&middot;{" "}
            <a href={`tel:${COMPANY.phoneRaw}`} className="text-primary font-medium hover:underline">
              Call for your personalized rate
            </a>
          </span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-gray-400 hover:text-gray-600 shrink-0 cursor-pointer"
          aria-label="Dismiss rate banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
