"use client";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useRef, useState } from "react";

export default function SimulatorUpload({ onImageSelect, selectedImage }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect?.(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-medium mb-1 sm:mb-2">Color Vision Simulator</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Upload an image and see how it appears with different types of color blindness.
        </p>
      </div>

      <section className="w-full p-4 sm:p-6 md:p-8 bg-white rounded-2xl sm:rounded-3xl">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
          w-full border-2 border-dashed rounded-xl p-6 sm:p-8 md:p-12
          flex flex-col items-center justify-center gap-3 sm:gap-4
          transition-colors cursor-pointer
          ${isDragging ? "border-primary bg-accent" : "border-border"}
          ${selectedImage ? "min-h-[250px] sm:min-h-[300px] md:min-h-[400px]" : "min-h-[200px] sm:min-h-[250px] md:min-h-[300px]"}
          `}
          onClick={() => fileInputRef.current?.click()}
        >
          {selectedImage ? (
            <div className="relative w-full h-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Uploaded"
                className="max-w-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] object-contain rounded-lg"
              />
            </div>
          ) : (
            <>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted flex items-center justify-center">
                <Upload className="size-8 sm:size-10 text-muted-foreground" />
              </div>
              <div className="text-center space-y-1 sm:space-y-2">
                <p className="text-base sm:text-lg font-medium">Upload an image</p>
                <p className="text-xs sm:text-sm text-muted-foreground px-2">
                  Drag and drop or click to browse
                </p>
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:bg-primary/90 text-sm sm:text-base"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                <ImageIcon className="size-4" />
                Choose File
              </button>
            </>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />
      </section>
    </div>
  );
}

