"use client";

interface DonutChartProps {
  principal: number;
  interest: number;
  size?: number;
}

export function DonutChart({ principal, interest, size = 180 }: DonutChartProps) {
  const total = principal + interest;
  if (total === 0) return null;

  const principalPct = principal / total;
  const r = size / 2;
  const strokeWidth = size * 0.18;
  const innerR = r - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerR;
  const principalArc = circumference * principalPct;
  const interestArc = circumference * (1 - principalPct);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Interest (secondary) */}
        <circle
          cx={r}
          cy={r}
          r={innerR}
          fill="none"
          stroke="#E1B77E"
          strokeWidth={strokeWidth}
          strokeDasharray={`${interestArc} ${circumference}`}
          strokeDashoffset={0}
          className="transition-all duration-500"
        />
        {/* Principal (primary) */}
        <circle
          cx={r}
          cy={r}
          r={innerR}
          fill="none"
          stroke="#41644C"
          strokeWidth={strokeWidth}
          strokeDasharray={`${principalArc} ${circumference}`}
          strokeDashoffset={-interestArc}
          className="transition-all duration-500"
        />
      </svg>
      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs text-gray-500">Principal ({(principalPct * 100).toFixed(0)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-xs text-gray-500">Interest ({((1 - principalPct) * 100).toFixed(0)}%)</span>
        </div>
      </div>
    </div>
  );
}
