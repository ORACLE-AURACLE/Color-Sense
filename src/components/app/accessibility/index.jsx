"use client";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ColorInput from "./colorInput";
import ContrastDisplay from "./contrastDisplay";
import WCAGCompliance from "./wcagCompliance";
import LivePreview from "./livePreview";
import AccessibilityControls from "./controls";
import { getContrastRatio, getWCAGCompliance } from "@/lib/utils/contrast";
import { useToken } from "@/hooks/useToken";

export default function AccessibilityChecker() {
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [selectedVisionMode, setSelectedVisionMode] = useState("normal");
  const [contrastRatio, setContrastRatio] = useState(21);
  const [compliance, setCompliance] = useState(null);
  const { earnTokens, updateStats } = useToken();
  const hasCheckedRef = useRef(false);
  const lastColorsRef = useRef({ fg: "", bg: "" });

  useEffect(() => {
    const ratio = getContrastRatio(foregroundColor, backgroundColor);
    setContrastRatio(ratio);
    const newCompliance = getWCAGCompliance(ratio);
    setCompliance(newCompliance);

    const colorsChanged = 
      lastColorsRef.current.fg !== foregroundColor || 
      lastColorsRef.current.bg !== backgroundColor;
    
    if (colorsChanged && (foregroundColor !== "#000000" || backgroundColor !== "#FFFFFF")) {
      const isFirstCheck = !hasCheckedRef.current;
      
      updateStats({ contrastChecks: 1 });
      
      if (newCompliance) {
        if (newCompliance.normal?.AAA) {
          earnTokens('WCAG_AAA_COMPLIANCE', { compliance: newCompliance });
        } else if (newCompliance.normal?.AA || newCompliance.large?.AA) {
          earnTokens('WCAG_AA_COMPLIANCE', { compliance: newCompliance });
        } else {
          earnTokens('CONTRAST_CHECK', { compliance: newCompliance, isFirstTime: isFirstCheck });
        }
      } else {
        earnTokens('CONTRAST_CHECK', { compliance: newCompliance, isFirstTime: isFirstCheck });
      }

      if (isFirstCheck) {
        hasCheckedRef.current = true;
      }

      lastColorsRef.current = { fg: foregroundColor, bg: backgroundColor };
    }
  }, [foregroundColor, backgroundColor, earnTokens, updateStats]);

  const handleSwapColors = () => {
    const temp = foregroundColor;
    setForegroundColor(backgroundColor);
    setBackgroundColor(temp);
  };

  const handleSaveReport = () => {
    if (!compliance) {
      toast.error("Cannot save report", {
        description: "Please wait for contrast calculation to complete.",
        duration: 3000,
      });
      return;
    }
    
    try {
      const report = {
        foreground: foregroundColor,
        background: backgroundColor,
        contrastRatio: contrastRatio.toFixed(2),
        compliance: {
          normalAA: compliance.normal.AA,
          normalAAA: compliance.normal.AAA,
          largeAA: compliance.large.AA,
        },
        visionMode: selectedVisionMode,
        timestamp: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `contrast-report-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast.success("Report saved", {
        description: "Contrast report has been downloaded.",
        duration: 3000,
      });

      updateStats({ reportsSaved: 1 });
      earnTokens('SAVE_REPORT');
    } catch (error) {
      console.error("Error saving report:", error);
      toast.error("Failed to save report", {
        description: "An error occurred while saving the report. Please try again.",
        duration: 5000,
      });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "Color Contrast Checker Report",
      text: `Contrast Ratio: ${contrastRatio.toFixed(2)}:1\nForeground: ${foregroundColor}\nBackground: ${backgroundColor}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Shared successfully", {
          description: "Report has been shared.",
          duration: 3000,
        });

        // Award tokens for sharing report
        updateStats({ imagesShared: 1 });
        earnTokens('SHARE_REPORT');
      } else {
        await navigator.clipboard.writeText(
          `Contrast Ratio: ${contrastRatio.toFixed(2)}:1\nForeground: ${foregroundColor}\nBackground: ${backgroundColor}`
        );
        toast.success("Copied to clipboard", {
          description: "Report has been copied to your clipboard.",
          duration: 3000,
        });

        updateStats({ imagesShared: 1 });
        earnTokens('SHARE_REPORT');
      }
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
      console.error("Error sharing:", error);
      toast.error("Failed to share", {
        description: "An error occurred while sharing. Please try again.",
        duration: 5000,
      });
    }
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Contrast Checker</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Evaluate color contrast for accessibility compliance and see how colors appear with different vision types.
        </p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="w-full lg:col-span-2 space-y-4 sm:space-y-6 order-1">
          <Card className="rounded-2xl sm:rounded-3xl">
            <CardContent className="space-y-4 sm:space-y-6 py-4 sm:py-6 px-4 sm:px-6">
              <CardTitle className="text-base sm:text-lg">Contrast Checker</CardTitle>
              
              <div className="space-y-3 sm:space-y-4">
                <ColorInput
                  label="Foreground (Text)"
                  value={foregroundColor}
                  onChange={setForegroundColor}
                />
                
                <ColorInput
                  label="Background"
                  value={backgroundColor}
                  onChange={setBackgroundColor}
                  onSwap={handleSwapColors}
                />
              </div>

              {compliance && (
                <div className="pt-4 border-t">
                  <ContrastDisplay contrastRatio={contrastRatio} compliance={compliance} />
                </div>
              )}
            </CardContent>
          </Card>

          <LivePreview
            foregroundColor={foregroundColor}
            backgroundColor={backgroundColor}
            visionMode={selectedVisionMode}
          />

          {compliance && <WCAGCompliance compliance={compliance} />}
        </div>

        <div className="w-full lg:col-span-1 order-2">
          <AccessibilityControls
            foregroundColor={foregroundColor}
            backgroundColor={backgroundColor}
            contrastRatio={contrastRatio}
            compliance={compliance}
            selectedVisionMode={selectedVisionMode}
            onVisionModeChange={setSelectedVisionMode}
            onSaveReport={handleSaveReport}
            onShare={handleShare}
          />
        </div>
      </div>
    </div>
  );
}

