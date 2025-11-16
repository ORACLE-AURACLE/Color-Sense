"use client";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { getWCAGCompliance, getComplianceStatus } from "@/lib/utils/contrast";

export default function ContrastDisplay({ contrastRatio, compliance }) {
  const status = getComplianceStatus(compliance);

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <div className="text-5xl font-bold">{contrastRatio.toFixed(2)}:1</div>
        <div className="flex items-center justify-center gap-2">
          {compliance.normal.AAA ? (
            <CheckCircle2 className="size-5 text-green-600" />
          ) : compliance.normal.AA ? (
            <AlertCircle className="size-5 text-yellow-600" />
          ) : (
            <XCircle className="size-5 text-red-600" />
          )}
          <span className={`font-semibold ${status.color}`}>
            {status.level}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{status.text}</p>
      </div>
    </div>
  );
}

