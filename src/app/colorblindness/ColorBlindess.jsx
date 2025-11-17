"use client";

import NavBarComponent from "../../components/layout/navbar/Navbar";
import FooterComponent from "@/components/layout/footer/Footer";
import ColorBlindnessViewer from "../../components/layout/colorblindnesstoggle/ColorBlindnessToggle";

import Image from "next/image";

// Images
import Tryoursimulator from "../../../public/asset/tryoursimulator.png";
import BlindnessComparison from "../../../public/asset/blindnesscomparisonpair.png";
import GeneticConditions from "../../../public/asset/geneticconditions.png";
import CellDeficiency from "../../../public/asset/celldeficiency.png";
import AffectMillions from "../../../public/asset/affectmillions.png";
import DesigningForColorBlindess1 from "../../../public/asset/designingforcolorblindness1.png";
import DesigningForColorBlindess2 from "../../../public/asset/designingforcolorblindnes2.png";
import DesigningForColorBlindess3 from "../../../public/asset/designingforcolorblindness3.png";
import DesigningForColorBlindess4 from "../../../public/asset/designingforcolorblindness4.png";
import DesigningForColorBlindess5 from "../../../public/asset/designingforcolorblindness5.png";
import DesigningForColorBlindess6 from "../../../public/asset/designingforcolorblindness6.png";
import Misconception1 from "../../../public/asset/misconception1.png";
import Misconception2 from "../../../public/asset/misconception2.png";
import Misconception3 from "../../../public/asset/misconception3.png";
import Misconception4 from "../../../public/asset/misconception4.png";
import PaintIcon from "../../../public/asset/painticon.png";
import SheildIcom from "../../../public/asset/sheildicon.png";
import BuldIcon from "../../../public/asset/bulbicon.png";

import styles from "./ColorBlindness.module.css";

const ColorBlindnessComponent = () => {
  return (
    <>
      <NavBarComponent/>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-pink-50 via-gray-50 to-pink-50 flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-12 md:py-20">
        <div className="md:w-1/2 text-left">
          <h1 className="font-sora text-4xl md:text-6xl font-bold text-gray-900">
            Understanding Color <br /> Blindness
          </h1>
          <p className="mt-4 text-gray-600 text-base md:text-lg max-w-md">
            Color blindness affects how millions of people perceive the world. Learn
            about different types, how they impact daily life, and how to design
            inclusively.
          </p>
          <Image
            src={Tryoursimulator}
            alt="Try Simulator"
            className="mt-6 w-44 md:w-52 h-11 md:h-12 cursor-pointer"
          />
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <Image
            src={BlindnessComparison}
            alt="Comparison"
            className="w-72 md:w-80 h-auto"
          />
        </div>
      </div>

      {/* Progress Section */}
      <div className="flex flex-col sm:flex-row justify-around items-center border-2 border-gray-200 text-center py-12 px-6 gap-6">
        <div>
          <h1 className="font-sora text-3xl md:text-4xl text-blue-400">300M+</h1>
          <p className="text-gray-600">People affected worldwide</p>
        </div>
        <div>
          <h1 className="font-sora text-3xl md:text-4xl text-blue-400">1 in 12</h1>
          <p className="text-gray-600">Males have color blindness</p>
        </div>
        <div>
          <h1 className="font-sora text-3xl md:text-4xl text-blue-400">1 of 200</h1>
          <p className="text-gray-600">Females suffer from color blindness</p>
        </div>
        <div>
          <h1 className="font-sora text-3xl md:text-4xl text-blue-400">8%</h1>
          <p className="text-gray-600">Have red-green deficiency</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-6 md:px-24 py-12">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <h1 className="font-sora text-4xl md:text-5xl text-gray-900 mb-4">
            What is Color Blindness?
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
            Color blindness, or color vision deficiency (CVD), is a condition
            where a person has difficulty distinguishing certain colors. It's
            usually inherited and affects the cone cells in the retina that are
            responsible for color perception.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-8">
          <Image src={GeneticConditions} alt="Genetic Conditions" className="w-full sm:w-1/3 h-auto rounded-lg" />
          <Image src={CellDeficiency} alt="Cell Deficiency" className="w-full sm:w-1/3 h-auto rounded-lg" />
          <Image src={AffectMillions} alt="Affect Millions" className="w-full sm:w-1/3 h-auto rounded-lg" />
        </div>
      </div>

      {/* Types Section */}
      <div className="bg-gray-50 py-12 px-6 md:px-24 text-center">
        <h1 className="font-sora text-4xl md:text-5xl text-gray-900 mb-4">Types of Color Blindness</h1>
        <p className="text-gray-600 text-base md:text-lg mb-8">
          There are several types of color blindness, each affecting color
          perception differently.
        </p>
        <ColorBlindnessViewer />
      </div>

      {/* Designing Section with gradient */}
      <div className="px-6 md:px-24 py-12 relative">
        <div className="max-w-4xl mx-auto mb-12 text-center md:text-left">
          <h1 className="font-sora text-4xl md:text-5xl text-gray-900 mb-4">
            Designing for Color Blindness
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Creating accessible designs doesn't mean sacrificing aesthetics. Follow
            these principles to make your designs inclusive for everyone.
          </p>
        </div>

        <div className="gridWrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative">
          <div className="gradientLayer absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-0" />
          {[DesigningForColorBlindess1,
            DesigningForColorBlindess2,
            DesigningForColorBlindess3,
            DesigningForColorBlindess4,
            DesigningForColorBlindess5,
            DesigningForColorBlindess6
          ].map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Design ${i + 1}`}
              className="design_image w-full h-auto rounded-lg relative z-10 cursor-pointer transition-transform hover:scale-105"
            />
          ))}
        </div>
      </div>

      {/* Common Misconceptions */}
     <div className="bg-gray-100 py-12 px-6 md:px-24 text-center">
  <h1 className="font-sora text-4xl md:text-5xl text-gray-900 mb-4">
    Common Misconceptions
  </h1>
  <p className="text-gray-600 text-base md:text-lg mb-8">
    Let's clear up some common myths about color blindness
  </p>
  
  <div className="flex flex-col items-center gap-6">
    {[Misconception1, Misconception2, Misconception3, Misconception4].map((img, i) => (
      <Image
        key={i}
        src={img}
        alt={`Misconception ${i + 1}`}
        className="w-full sm:w-3/4 md:w-2/3 h-auto rounded-lg cursor-pointer transition-transform hover:scale-102"
      />
    ))}
  </div>
</div>


      {/* Tools & Resources Section with Cards */}
      <div className="py-12 px-6 md:px-24 text-center">
        <h1 className="font-sora text-4xl md:text-5xl text-gray-900 mb-4">
          Tools and Resources
        </h1>
        <p className="text-gray-600 text-base md:text-lg mb-8 max-w-xl mx-auto">
          Use these tools to test and improve accessibility in your designs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col">
            <Image src={PaintIcon} alt="" className="w-14 h-14 mb-4" />
            <h3 className="text-left text-xl font-semibold text-gray-900 mb-2">ColorSense Simulator</h3>
            <p className="text-left text-gray-600 mb-6">
              Experience lightning-fast performance with our optimized systems and tools.
            </p>
            <div className="flex justify-center">
              <button className="w-48 px-5 py-2 bg-[#FCFCFD] border border-[#E5E5E5] rounded-2xl text-gray-900 hover:bg-gray-200 cursor-pointer transition">
                Try Now
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col">
            <Image src={SheildIcom} alt="" className="w-14 h-14 mb-4" />
            <h3 className="text-left text-xl font-semibold text-gray-900 mb-2">Accessibility Checker</h3>
            <p className="text-left text-gray-600 mb-6">
              Automate repetitive tasks and focus on what truly matters.
            </p>
            <div className="flex justify-center">
              <button className="w-48 px-5 py-2 bg-[#FCFCFD] border border-[#E5E5E5] rounded-2xl text-gray-900 hover:bg-gray-200 cursor-pointer transition">
                Check Colors
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-2xl rounded-2xl p-6 flex flex-col">
            <Image src={BuldIcon} alt="" className="w-14 h-14 mb-4" />
            <h3 className="text-left text-xl font-semibold text-gray-900 mb-2">Learning Resources</h3>
            <p className="text-left text-gray-600 mb-6">
              Unlock powerful design & creativity features built for modern creators.
            </p>
            <div className="flex justify-center">
              <button className="w-48 px-5 py-2 bg-[#FCFCFD] border border-[#E5E5E5] rounded-2xl text-gray-900 hover:bg-gray-200 cursor-pointer transition">
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </div>

      <FooterComponent />
    </>
  );
};

export default ColorBlindnessComponent;
