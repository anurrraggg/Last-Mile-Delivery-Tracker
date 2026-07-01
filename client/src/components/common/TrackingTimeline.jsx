/* eslint-disable react/prop-types */

import { Check } from "lucide-react";

import Card from "../ui/Card";

const STATUS_ORDER = [
  "Order Created",
  "Agent Assigned",
  "Picked Up",
  "In Transit",
  "Out For Delivery",
  "Delivered",
];

const TrackingTimeline = ({ steps = STATUS_ORDER, currentIndex = 3 }) => {
  return (
    <Card>
      <h2 className="mb-6 text-base font-semibold text-zinc-900">
        Tracking timeline
      </h2>

      <div className="relative">
        {steps.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isLast = index === steps.length - 1;

          return (
            <div key={step} className="relative flex gap-4 pb-8 last:pb-0">
              {!isLast && (
                <span
                  className={`absolute left-[11px] top-6 h-[calc(100%-12px)] w-px ${
                    isComplete ? "bg-zinc-900" : "bg-zinc-200"
                  }`}
                />
              )}

              <div
                className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                  isComplete
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : isCurrent
                      ? "border-zinc-900 bg-white"
                      : "border-zinc-200 bg-white"
                }`}
              >
                {isComplete && <Check className="h-3 w-3" strokeWidth={3} />}
                {isCurrent && (
                  <span className="h-2 w-2 rounded-full bg-zinc-900" />
                )}
              </div>

              <div className="min-w-0 pt-0.5">
                <p
                  className={`text-sm font-medium ${
                    isComplete || isCurrent ? "text-zinc-900" : "text-zinc-400"
                  }`}
                >
                  {step}
                </p>
                {isCurrent && (
                  <p className="mt-0.5 text-xs text-zinc-500">In progress</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default TrackingTimeline;
