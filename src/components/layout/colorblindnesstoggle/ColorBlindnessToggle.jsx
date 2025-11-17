"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ✅ IMPORT ALL IMAGES
import DeuteranopiaImg from "../../../../public/asset/colorblindness1.png";
import ProtanopiaImg from "../../../../public/asset/colorblindness2.png";
import TritanopiaImg from "../../../../public/asset/colorblindness3.png";
import AchromatopsiaImg from "../../../../public/asset/achromatopsia.png";

const DEFECTS = [
  {
    id: "deuteranopia",
    label: "Deuteranopia",
colorType: "Red-Green",
    color: "bg-green-500",
    description: {
      prevalence: "~6% of males, 0.4% of females",
      text: "Green cone cells are missing or non-functional. Difficulty distinguishing between red and green hues.",
      affected: [
        "Traffic lights",
        "Vegetation in photos",
        "Red text on green backgrounds",
      ],
    },
    image: DeuteranopiaImg,
  },
  {
    id: "protanopia",
    colorType: "Red-Green",
    label: "Protanopia",
    color: "bg-red-500",
    description: {
      prevalence: "~1% of males, rare in females",
      text: "Absence of red cone cells causes confusion between red, orange, and green tones.",
      affected: ["Brake lights", "Skin tone perception", "Sunset colors"],
    },
    image: ProtanopiaImg,
  },
  {
    id: "tritanopia",
    colorType: "Blue-Yellow",
    label: "Tritanopia",
    color: "bg-blue-500",
    description: {
      prevalence: "0.001% of population",
      text: "Missing blue cones. Blue appears greenish, yellow looks pinkish.",
      affected: [
        "Blue/yellow traffic signs",
        "Ocean/sky distinction",
        "Reading blue text",
      ],
    },
    image: TritanopiaImg,
  },
  {
    id: "achromatopsia",
    colorType: "Total Color Blindness",
    label: "Achromatopsia",
    color: "bg-gray-800",
    description: {
      prevalence: "1 in 30,000",
      text: "Complete color blindness. World appears in shades of gray, often with light sensitivity.",
      affected: [
        "Color-coded charts",
        "Outdoor visibility",
        "Screens with bright contrast",
      ],
    },
    image: AchromatopsiaImg,
  },
];

export default function ColorBlindnessViewer() {
  const [active, setActive] = useState("deuteranopia");
  const defect = DEFECTS.find((d) => d.id === active);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-white flex flex-col items-center py-10">
      {/* TOGGLE BAR */}
      <div className="flex justify-center gap-8 px-6 py-6 text-black rounded-full border border-gray-700 bg-[#ECECF0] mb-8">
        {DEFECTS.map((d) => (
          <button
            key={d.id}
            onClick={() => setActive(d.id)}
            className={`flex items-center gap-2 px-5 py-2.5 text-black rounded-full text-sm font-medium transition-all duration-300
${
  active === d.id
    ? "bg-white text-black shadow-lg"
    : "text-gray-300 hover:text-white"
}
`}
          >
            <span className={`w-3 h-3 rounded-full ${d.color}`}></span>
            {d.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="bg-white text-black grid md:grid-cols-2 gap-10 p-14 rounded-3xl max-w-6xl shadow-2xl">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-xl font-semibold opacity-70">{defect.colorType}</h2>
          <h1 className="text-4xl font-bold mb-3">{defect.label}</h1>

          <p className="opacity-70 mb-4">
            <strong>Prevalence:</strong> {defect.description.prevalence}
          </p>

          <p className="opacity-80 mb-5">{defect.description.text}</p>

          <h3 className="font-semibold text-lg mb-2">Commonly Affected:</h3>

          <ul className="space-y-2">
            {defect.description.affected.map((a, i) => (
              <li key={i} className="flex items-center gap-3 text-[15px]">
  <span className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center">
  </span>
  {a}
</li>

            ))}
          </ul>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={defect.image.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Image
  src={defect.image}
  alt={defect.label}
  className="rounded-2xl w-full h-[400px] object-cover shadow-md"
/>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
