"use client";

import { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

const notifications = [
  { name: "John D.", city: "Tampa", action: "just got pre-approved" },
  { name: "Sarah M.", city: "St. Petersburg", action: "just closed on a new home" },
  { name: "Michael R.", city: "Clearwater", action: "just got pre-approved" },
  { name: "Jennifer L.", city: "Brandon", action: "just refinanced and saved $280/mo" },
  { name: "David K.", city: "Lakeland", action: "just got pre-approved" },
  { name: "Lisa P.", city: "Sarasota", action: "just closed on a new home" },
];

export function SocialProofToast() {
  const [current, setCurrent] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show first notification after 15 seconds
    const initialDelay = setTimeout(() => {
      setCurrent(0);
    }, 15000);

    return () => clearTimeout(initialDelay);
  }, [dismissed]);

  useEffect(() => {
    if (current === null || dismissed) return;

    // Auto-dismiss after 4 seconds
    const dismissTimer = setTimeout(() => {
      setCurrent(null);
    }, 4000);

    // Show next after 30 seconds
    const nextTimer = setTimeout(() => {
      setCurrent((c) => (c !== null ? (c + 1) % notifications.length : null));
    }, 30000);

    return () => {
      clearTimeout(dismissTimer);
      clearTimeout(nextTimer);
    };
  }, [current, dismissed]);

  if (current === null || dismissed) return null;

  const notification = notifications[current];

  return (
    <div className="fixed bottom-20 md:bottom-8 left-4 z-30 animate-slide-up">
      <div className="bg-white rounded-lg shadow-lg border p-4 pr-10 max-w-xs relative">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 cursor-pointer"
          aria-label="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {notification.name} from {notification.city}
            </p>
            <p className="text-xs text-gray-500">{notification.action}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
