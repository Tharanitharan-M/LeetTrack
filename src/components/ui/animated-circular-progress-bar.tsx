"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCircularProgressBarProps {
  className?: string;
  max?: number;
  min?: number;
  value?: number;
  gaugePrimaryColor?: string;
  gaugeSecondaryColor?: string;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
}

export function AnimatedCircularProgressBar({
  className,
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor = "#3b82f6",
  gaugeSecondaryColor = "#1e293b",
  size = 120,
  strokeWidth = 8,
  showPercentage = true,
}: AnimatedCircularProgressBarProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.strokeDashoffset = offset.toString();
    }
  }, [offset]);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={gaugeSecondaryColor}
          strokeWidth={strokeWidth}
          fill="none"
          className="opacity-20"
        />
        {/* Progress circle */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={gaugePrimaryColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          className="transition-all duration-500 ease-in-out"
          strokeLinecap="round"
        />
      </svg>
      {showPercentage && (
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{Math.round(percentage)}%</span>
          <span className="text-xs text-gray-400">Solved</span>
        </div>
      )}
    </div>
  );
} 