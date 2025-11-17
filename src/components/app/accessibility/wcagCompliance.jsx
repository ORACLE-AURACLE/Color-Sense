"use client";
import { CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function WCAGCompliance({ compliance }) {
  return (
    <Card className="rounded-2xl sm:rounded-3xl">
      <CardContent className="space-y-3 sm:space-y-4 py-4 sm:py-6 px-4 sm:px-6">
        <CardTitle className="text-base sm:text-lg">WCAG Compliance</CardTitle>
        
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-muted/50">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm sm:text-base">AAA Enhanced contrast</div>
              <div className="text-xs sm:text-sm text-muted-foreground">7:1</div>
            </div>
            {compliance.normal.AAA ? (
              <CheckCircle2 className="size-4 sm:size-5 text-green-600 shrink-0 ml-2" />
            ) : (
              <XCircle className="size-4 sm:size-5 text-muted-foreground shrink-0 ml-2" />
            )}
          </div>

          <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-muted/50">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm sm:text-base">AA Minimum for normal text</div>
              <div className="text-xs sm:text-sm text-muted-foreground">4.5:1</div>
            </div>
            {compliance.normal.AA ? (
              <CheckCircle2 className="size-4 sm:size-5 text-green-600 shrink-0 ml-2" />
            ) : (
              <XCircle className="size-4 sm:size-5 text-muted-foreground shrink-0 ml-2" />
            )}
          </div>

          <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-muted/50">
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm sm:text-base">AA Large</div>
              <div className="text-xs sm:text-sm text-muted-foreground">For large text (18pt+) - 3:1</div>
            </div>
            {compliance.large.AA ? (
              <CheckCircle2 className="size-4 sm:size-5 text-green-600 shrink-0 ml-2" />
            ) : (
              <XCircle className="size-4 sm:size-5 text-muted-foreground shrink-0 ml-2" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

