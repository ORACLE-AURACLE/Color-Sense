"use client";
import { useState, useEffect } from "react";
import { Upload, Camera, Download, Share2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Select, SelectItem } from "@/components/ui/select";
import { vision_modes } from "./_data";
import { getVisionModeInfo } from "@/lib/services/groq";
import { formatVisionInfo } from "@/lib/utils/formatVisionInfo";
import { parseAPIError } from "@/lib/utils/errorHandler";

export default function SimulatorControls({
  onImageUpload,
  onCameraCapture,
  selectedVisionMode,
  onVisionModeChange,
  onSaveImage,
  onShare,
  imageUrl
}) {
  const [visionInfo, setVisionInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(false);

  useEffect(() => {
    if (selectedVisionMode && selectedVisionMode !== "normal") {
      loadVisionInfo(selectedVisionMode);
    } else {
      setVisionInfo(null);
    }
  }, [selectedVisionMode]);

  const loadVisionInfo = async (modeId) => {
    setLoadingInfo(true);
    try {
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

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageUpload?.(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // For simplicity, we'll use a file input with capture attribute
      // In a full implementation, you'd create a camera modal
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.capture = "environment";
      input.onchange = handleFileSelect;
      input.click();
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error("Camera access denied:", error);
      toast.error("Camera access denied", {
        description: "Please allow camera permissions to use this feature.",
        duration: 5000,
      });
    }
  };

  const selectedMode = vision_modes.find(m => m.id === selectedVisionMode);

  const formatTextContent = (text) => {
    if (!text) return null;

    const paragraphs = text.split("\n\n").filter(p => p.trim());
    
    return paragraphs.map((paragraph, idx) => {
      const trimmed = paragraph.trim();
      
      // Check if it's a section title (short, no bullets, no numbers, single line)
      const isSectionTitle = trimmed.length < 100 && 
        !trimmed.startsWith("•") && 
        !trimmed.match(/^\d+\./) &&
        !trimmed.includes("\n") &&
        trimmed.split(" ").length < 15;
      
      // Check if it's a list (starts with bullet)
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
    <Card className="rounded-3xl">
      <CardContent className="space-y-6 py-6">
        <CardTitle>Controls</CardTitle>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "image/*";
              input.onchange = handleFileSelect;
              input.click();
            }}
          >
            <Upload className="size-4" />
            Upload Image
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleCameraClick}
          >
            <Camera className="size-4" />
            Use Camera
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Vision Mode</label>
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

        <div className="space-y-3 pt-2">
          <Button
            variant="default"
            className="w-full"
            onClick={onSaveImage}
            disabled={!imageUrl}
          >
            <Download className="size-4" />
            Save Image
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={onShare}
            disabled={!imageUrl}
          >
            <Share2 className="size-4" />
            Share
          </Button>
        </div>

        {selectedMode && (
          <div className="w-full max-h-96 overflow-y-auto overflow-x-hidden cyan-gradient rounded-lg p-4 space-y-3 scrollbar-thin">
            <h3 className="font-semibold text-base">About {selectedMode.label}</h3>
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}

