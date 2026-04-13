"use client";

import { cn } from "@/lib/utils";

interface SliderInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}

export function SliderInput({ label, id, value, onChange, min, max, step, prefix = "", suffix = "" }: SliderInputProps) {
  const numValue = parseFloat(value) || 0;
  const pct = max > min ? ((numValue - min) / (max - min)) * 100 : 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="flex items-center gap-0.5">
          {prefix && <span className="text-sm text-gray-500">{prefix}</span>}
          <input
            id={id}
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-24 text-right text-sm font-semibold text-primary bg-primary/5 border border-primary/20 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {suffix && <span className="text-sm text-gray-500">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={numValue}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full h-2 rounded-full appearance-none cursor-pointer",
          "bg-gray-200",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110",
          "[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer",
        )}
        style={{
          background: `linear-gradient(to right, #41644C ${pct}%, #e5e7eb ${pct}%)`,
        }}
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-400">{prefix}{min.toLocaleString()}{suffix}</span>
        <span className="text-xs text-gray-400">{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  );
}
