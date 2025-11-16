"use client";
import { useState, useEffect } from "react";
import SimulatorUpload from "./upload";
import SimulatorControls from "./controls";
import { applyVisionFilter } from "@/lib/utils/visionTransform";

export default function Simulator() {
  const [originalImage, setOriginalImage] = useState(null);
  const [transformedImage, setTransformedImage] = useState(null);
  const [selectedVisionMode, setSelectedVisionMode] = useState("normal");
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (originalImage && selectedVisionMode) {
      transformImage(originalImage, selectedVisionMode);
    }
  }, [originalImage, selectedVisionMode]);

  const transformImage = (imageSrc, visionMode) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = applyVisionFilter(img, visionMode);
        const transformedUrl = canvas.toDataURL("image/png");
        setTransformedImage(transformedUrl);
        setImageUrl(transformedUrl);
      } catch (error) {
        console.error("Error transforming image:", error);
        setTransformedImage(imageSrc);
        setImageUrl(imageSrc);
      }
    };
    img.onerror = () => {
      console.error("Error loading image");
      setTransformedImage(imageSrc);
      setImageUrl(imageSrc);
    };
    img.src = imageSrc;
  };

  const handleImageSelect = (imageSrc) => {
    setOriginalImage(imageSrc);
    if (selectedVisionMode === "normal") {
      setTransformedImage(imageSrc);
      setImageUrl(imageSrc);
    }
  };

  const handleVisionModeChange = (mode) => {
    setSelectedVisionMode(mode);
  };

  const handleSaveImage = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.download = `color-vision-${selectedVisionMode}-${Date.now()}.png`;
      link.href = imageUrl;
      link.click();
    }
  };

  const handleShare = async () => {
    if (imageUrl) {
      try {
        const blob = await fetch(imageUrl).then(r => r.blob());
        const file = new File([blob], `color-vision-${selectedVisionMode}.png`, { type: "image/png" });
        
        if (navigator.share) {
          await navigator.share({
            title: "Color Vision Simulator",
            text: `View of image with ${selectedVisionMode} color vision`,
            files: [file]
          });
        } else {
          // Fallback: copy to clipboard or show download
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob })
          ]);
          alert("Image copied to clipboard!");
        }
      } catch (error) {
        console.error("Error sharing:", error);
        handleSaveImage(); // Fallback to download
      }
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <SimulatorUpload
          onImageSelect={handleImageSelect}
          selectedImage={transformedImage || originalImage}
        />
      </div>

      <div className="lg:col-span-1">
        <SimulatorControls
          onImageUpload={handleImageSelect}
          onCameraCapture={handleImageSelect}
          selectedVisionMode={selectedVisionMode}
          onVisionModeChange={handleVisionModeChange}
          onSaveImage={handleSaveImage}
          onShare={handleShare}
          imageUrl={imageUrl}
        />
      </div>
    </div>
  );
}

