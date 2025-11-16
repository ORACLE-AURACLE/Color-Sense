"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { applyColorVisionFilter } from "@/lib/utils/colorTransform";

export default function LivePreview({ foregroundColor, backgroundColor, visionMode }) {
  const transformedForeground = visionMode !== "normal" 
    ? applyColorVisionFilter(foregroundColor, visionMode)
    : foregroundColor;
  
  const transformedBackground = visionMode !== "normal"
    ? applyColorVisionFilter(backgroundColor, visionMode)
    : backgroundColor;

  return (
    <Card className="rounded-3xl">
      <CardContent className="space-y-4 py-6">
        <CardTitle>Live Preview</CardTitle>
        
        <div 
          className="rounded-lg p-6 space-y-4"
          style={{ backgroundColor: transformedBackground }}
        >
          <h2 
            className="text-2xl font-bold"
            style={{ color: transformedForeground }}
          >
            Sample Heading
          </h2>
          
          <p 
            className="text-base leading-relaxed"
            style={{ color: transformedForeground }}
          >
            This is how your text will appear with the selected color combination. 
            The quick brown fox jumps over the lazy dog.
          </p>
          
          <Button
            style={{ 
              backgroundColor: transformedForeground,
              color: transformedBackground
            }}
            className="mt-4"
          >
            Button Text
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

