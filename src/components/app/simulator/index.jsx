"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
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
        toast.error("Image transformation failed", {
          description: "An error occurred while applying the vision filter. Showing original image.",
          duration: 5000,
        });
        setTransformedImage(imageSrc);
        setImageUrl(imageSrc);
      }
    };
    img.onerror = () => {
      console.error("Error loading image");
      toast.error("Failed to load image", {
        description: "The image could not be loaded. Please try a different image.",
        duration: 5000,
      });
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
    if (!imageUrl) {
      toast.error("No image to save", {
        description: "Please upload an image first.",
        duration: 3000,
      });
      return;
    }

    try {
      const link = document.createElement("a");
      link.download = `color-vision-${selectedVisionMode}-${Date.now()}.png`;
      link.href = imageUrl;
      link.click();
      toast.success("Image saved", {
        description: "The image has been downloaded.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error saving image:", error);
      toast.error("Failed to save image", {
        description: "An error occurred while saving the image. Please try again.",
        duration: 5000,
      });
    }
  };

  const handleShare = async () => {
    if (!imageUrl) {
      toast.error("No image to share", {
        description: "Please upload an image first.",
        duration: 3000,
      });
      return;
    }

    try {
      const blob = await fetch(imageUrl).then(r => r.blob());
      const file = new File([blob], `color-vision-${selectedVisionMode}.png`, { type: "image/png" });
      
      if (navigator.share) {
        await navigator.share({
          title: "Color Vision Simulator",
          text: `View of image with ${selectedVisionMode} color vision`,
          files: [file]
        });
        toast.success("Shared successfully", {
          description: "Image has been shared.",
          duration: 3000,
        });
      } else {
        // Fallback: copy to clipboard or show download
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob })
        ]);
        toast.success("Copied to clipboard", {
          description: "Image has been copied to your clipboard.",
          duration: 3000,
        });
      }
    } catch (error) {
      // User cancelled sharing - don't show error
      if (error.name === "AbortError") {
        return;
      }
      console.error("Error sharing:", error);
      toast.warning("Sharing not available", {
        description: "Falling back to download.",
        duration: 3000,
      });
      handleSaveImage(); // Fallback to download
    }
  };

  return (
    <div className="w-full flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6">
      <div className="w-full lg:col-span-2 order-1">
        <SimulatorUpload
          onImageSelect={handleImageSelect}
          selectedImage={transformedImage || originalImage}
        />
      </div>

      <div className="w-full lg:col-span-1 order-2">
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

