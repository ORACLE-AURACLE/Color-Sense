"use client";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { getWCAGCompliance, getComplianceStatus } from "@/lib/utils/contrast";

export default function ContrastDisplay({ contrastRatio, compliance }) {
  const status = getComplianceStatus(compliance);

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="text-center space-y-1 sm:space-y-2">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold">{contrastRatio.toFixed(2)}:1</div>
        <div className="flex items-center justify-center gap-2">
          {compliance.normal.AAA ? (
            <CheckCircle2 className="size-4 sm:size-5 text-green-600" />
          ) : compliance.normal.AA ? (
            <AlertCircle className="size-4 sm:size-5 text-yellow-600" />
          ) : (
            <XCircle className="size-4 sm:size-5 text-red-600" />
          )}
          <span className={`text-sm sm:text-base font-semibold ${status.color}`}>
            {status.level}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground px-2">{status.text}</p>
      </div>
    </div>
  );
}

