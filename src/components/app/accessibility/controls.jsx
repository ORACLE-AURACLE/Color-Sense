"use client";
import { useState, useEffect } from "react";
import { Download, Share2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Select, SelectItem } from "@/components/ui/select";
import { vision_modes } from "../simulator/_data";
import { getColorGuidance } from "@/lib/services/colorGuidance";
import { formatVisionInfo } from "@/lib/utils/formatVisionInfo";
import { parseAPIError, APIError } from "@/lib/utils/errorHandler";

export default function AccessibilityControls({
  foregroundColor,
  backgroundColor,
  contrastRatio,
  compliance,
  selectedVisionMode,
  onVisionModeChange,
  onSaveReport,
  onShare
}) {
  const [guidance, setGuidance] = useState(null);
  const [loadingGuidance, setLoadingGuidance] = useState(false);
  const [visionInfo, setVisionInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(false);

  useEffect(() => {
    if (selectedVisionMode && selectedVisionMode !== "normal") {
      loadVisionInfo(selectedVisionMode);
    } else {
      setVisionInfo(null);
    }
  }, [selectedVisionMode]);

  useEffect(() => {
    if (foregroundColor && backgroundColor && compliance) {
      loadColorGuidance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foregroundColor, backgroundColor, contrastRatio, selectedVisionMode, compliance]);

  const loadColorGuidance = async () => {
    if (!compliance) return;
    
    setLoadingGuidance(true);
    try {
      const info = await getColorGuidance(
        foregroundColor,
        backgroundColor,
        contrastRatio,
        selectedVisionMode,
        compliance
      );
      const formattedInfo = formatVisionInfo(info);
      setGuidance(formattedInfo);
    } catch (error) {
      console.error("Failed to load color guidance:", error);
      const errorInfo = parseAPIError(error);
      
      // Don't show toast for config errors (user might not have API set up)
      if (errorInfo.type === "CONFIG_ERROR") {
        setGuidance(null);
        return;
      }
      
      toast.error("Failed to load color guidance", {
        description: errorInfo.message,
        duration: 5000,
      });
      setGuidance(null);
    } finally {
      setLoadingGuidance(false);
    }
  };

  const loadVisionInfo = async (modeId) => {
    setLoadingInfo(true);
    try {
      const { getVisionModeInfo } = await import("@/lib/services/groq");
      const info = await getVisionModeInfo(modeId);
      const formattedInfo = formatVisionInfo(info);
      setVisionInfo(formattedInfo);
    } catch (error) {
      console.error("Failed to load vision info:", error);
      const errorInfo = parseAPIError(error);
      const mode = vision_modes.find(m => m.id === modeId);
      
      // Fallback to default description
      setVisionInfo(mode?.description || "Information unavailable.");
      
      // Don't show toast for config errors (user might not have API set up)
      if (errorInfo.type !== "CONFIG_ERROR") {
        toast.error("Failed to load vision information", {
          description: errorInfo.message,
          duration: 5000,
        });
      }
    } finally {
      setLoadingInfo(false);
    }
  };

  const selectedMode = vision_modes.find(m => m.id === selectedVisionMode);

  const formatTextContent = (text) => {
    if (!text) return null;

    const paragraphs = text.split("\n\n").filter(p => p.trim());
    
    return paragraphs.map((paragraph, idx) => {
      const trimmed = paragraph.trim();
      
      const isSectionTitle = trimmed.length < 100 && 
        !trimmed.startsWith("•") && 
        !trimmed.match(/^\d+\./) &&
        !trimmed.includes("\n") &&
        trimmed.split(" ").length < 15;
      
      const isList = trimmed.startsWith("•") || trimmed.includes("\n•");
      
      if (isSectionTitle) {
        return (
          <h4 key={idx} className="font-semibold text-foreground mt-4 mb-2 first:mt-0">
            {trimmed}
          </h4>
        );
      }
      
      if (isList) {
        return (
          <ul key={idx} className="space-y-1.5 mt-2 mb-3 list-none">
            {trimmed.split("\n").map((line, lineIdx) => {
              const trimmedLine = line.trim();
              if (!trimmedLine || !trimmedLine.startsWith("•")) return null;
              
              const isNested = trimmedLine.startsWith("  •");
              const content = trimmedLine.replace(/^[•\s]+/, "");
              
              return (
                <li key={lineIdx} className={isNested ? "ml-4" : ""}>
                  <span className="mr-2">•</span>
                  {content}
                </li>
              );
            })}
          </ul>
        );
      }
      
      return (
        <p key={idx} className="mb-3 last:mb-0">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="rounded-2xl sm:rounded-3xl">
        <CardContent className="space-y-4 sm:space-y-6 py-4 sm:py-6 px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg">Controls</CardTitle>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium">Vision Mode</label>
            <Select
              value={selectedVisionMode || "normal"}
              onValueChange={onVisionModeChange}
            >
              {vision_modes.map((mode) => (
                <SelectItem key={mode.id} value={mode.id}>
                  {mode.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="space-y-2 sm:space-y-3 pt-2">
            <Button
              variant="default"
              className="w-full text-sm sm:text-base"
              onClick={onSaveReport}
            >
              <Download className="size-4" />
              Save Report
            </Button>

            <Button
              variant="outline"
              className="w-full text-sm sm:text-base"
              onClick={onShare}
            >
              <Share2 className="size-4" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedMode && (
        <Card className="rounded-2xl sm:rounded-3xl h-full max-h-64 sm:max-h-96 overflow-y-auto">
          <CardContent className="space-y-3 sm:space-y-4 py-4 sm:py-6 px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg">About {selectedMode.label}</CardTitle>
            {loadingInfo ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                <span>Loading information...</span>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground leading-relaxed">
                {formatTextContent(visionInfo || selectedMode.description)}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {guidance && (
        <Card className="rounded-2xl sm:rounded-3xl">
          <CardContent className="space-y-3 sm:space-y-4 py-4 sm:py-6 px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg">Color Guidance</CardTitle>
            {loadingGuidance ? (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <Loader2 className="size-3.5 sm:size-4 animate-spin" />
                <span>Loading guidance...</span>
              </div>
            ) : (
              <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-h-64 sm:max-h-96 overflow-y-auto">
                {formatTextContent(guidance)}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="rounded-2xl sm:rounded-3xl">
        <CardContent className="space-y-3 sm:space-y-4 py-4 sm:py-6 px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg">Quick Tips</CardTitle>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 sm:mt-1 shrink-0">•</span>
              <span>Aim for 4.5:1 minimum contrast ratio</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 sm:mt-1 shrink-0">•</span>
              <span>Use high contrast for better readability</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 sm:mt-1 shrink-0">•</span>
              <span>Test with different color blindness types</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

