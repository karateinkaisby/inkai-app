"use client";

import React from "react";
import clsx from "clsx";

interface WizardStepperProps {
  step: number;
  maxStep: number;
}

export default function WizardStepper({ step, maxStep }: WizardStepperProps) {
  const steps = Array.from({ length: maxStep }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-4 py-2">
      {steps.map((s) => {
        const active = s === step;
        const completed = s < step;

        return (
          <div key={s} className="flex items-center gap-2">
            {/* Node */}
            <div
              className={clsx(
                "w-4 h-4 rounded-full border transition",
                completed &&
                  "bg-cyan-400 border-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.7)]",
                active &&
                  "bg-cyan-300 border-cyan-200 shadow-[0_0_15px_rgba(0,255,255,1)] animate-pulse",
                !active && !completed && "border-cyan-800 bg-cyan-950/40"
              )}
            />

            {/* Line */}
            {s !== maxStep && (
              <div
                className={clsx(
                  "h-[2px] w-10 transition",
                  completed
                    ? "bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.5)]"
                    : "bg-cyan-900"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
