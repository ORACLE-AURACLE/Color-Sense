"use client";
import { CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function WCAGCompliance({ compliance }) {
  return (
    <Card className="rounded-3xl">
      <CardContent className="space-y-4 py-6">
        <CardTitle>WCAG Compliance</CardTitle>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <div className="font-medium">AAA Enhanced contrast</div>
              <div className="text-sm text-muted-foreground">7:1</div>
            </div>
            {compliance.normal.AAA ? (
              <CheckCircle2 className="size-5 text-green-600" />
            ) : (
              <XCircle className="size-5 text-muted-foreground" />
            )}
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <div className="font-medium">AA Minimum for normal text</div>
              <div className="text-sm text-muted-foreground">4.5:1</div>
            </div>
            {compliance.normal.AA ? (
              <CheckCircle2 className="size-5 text-green-600" />
            ) : (
              <XCircle className="size-5 text-muted-foreground" />
            )}
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <div className="font-medium">AA Large</div>
              <div className="text-sm text-muted-foreground">For large text (18pt+) - 3:1</div>
            </div>
            {compliance.large.AA ? (
              <CheckCircle2 className="size-5 text-green-600" />
            ) : (
              <XCircle className="size-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

