import React from "react";
import { SplineScene } from "../ui/spline-scene";

interface ShowcaseSectionProps {
  title?: string;
  subtitle?: string;
  scene?: string;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ 
  title = "Interactive 3D Showcase",
  subtitle = "Experience immersive 3D technology with interactive models",
  scene = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
}) => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl">
            {subtitle}
          </p>
        </div>
        
        <div className="w-full">
          <SplineScene 
            scene={scene}
            className="w-full h-[500px]"
          />
        </div>
      </div>
    </section>
  );
}; 