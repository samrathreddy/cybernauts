import React from "react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { SiteConfig } from "../../config/home.config";

interface HeroSectionProps {
  siteConfig: SiteConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ siteConfig }) => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pb-10 pt-28 md:pt-32 relative">
      <div className="flex flex-col items-start gap-6 md:gap-8 pt-20 md:pt-48 lg:pt-[280px]">
        {/* Date Badge with Golden Fluid Border Flow */}
        <div className="relative inline-flex group">
          {/* Animation container */}
          <div className="absolute w-full h-full rounded-[35px] overflow-hidden">
            {/* Anticlockwise golden border animation */}
            <div 
              className="absolute inset-0 p-[1.5px]"
              style={{
                background: 'conic-gradient(from 0deg at 50% 50%, #B45309, #F59E0B, #FBBF24, #FCD34D, #FBBF24, #F59E0B, #B45309)',
                animation: 'golden-flow 8s linear infinite reverse',
              }}
            ></div>
          </div>
          
          {/* Subtle glow effect - also anticlockwise */}
          <div 
            className="absolute -inset-[1px] rounded-[35px] opacity-50 blur-[2px] pointer-events-none"
            style={{
              background: 'linear-gradient(270deg, #B45309, #F59E0B, #FBBF24, #FCD34D)',
              backgroundSize: '200% 100%',
              animation: 'golden-flow 5s linear infinite reverse',
            }}
          ></div>
          
          {/* Badge content with slight padding to show border */}
          <div className="relative z-10 rounded-[33px] bg-black/70 backdrop-blur-sm p-[2px]">
            <Badge
              variant="outline"
              className="px-4 py-1.5 border-none bg-black/80 rounded-[32px]"
            >
              <span className="relative w-fit [font-family:'Inter',Helvetica] font-medium text-amber-100 text-xs text-center tracking-[0] leading-[16.8px] whitespace-nowrap">
                {siteConfig.eventDateDisplay}
              </span>
            </Badge>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 md:gap-4 w-full">
          <h1 className="relative w-full max-w-[435px] [font-family:'Inter',Helvetica] font-semibold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0] leading-tight">
            {siteConfig.eventTitle}
          </h1>

          <p className="relative w-full max-w-[330px] [font-family:'Inter',Helvetica] font-normal text-white text-sm sm:text-base tracking-[0] leading-relaxed">
            {siteConfig.eventDescription}
          </p>
        </div>

        <Button className="inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:py-2.5 relative flex-[0_0_auto] bg-white rounded-[70px] hover:bg-white/90 mt-2 w-full sm:w-auto max-w-[220px]">
          <span className="relative w-fit [font-family:'Inter',Helvetica] font-semibold text-[#010101] text-sm text-center tracking-[0] leading-[19.6px] whitespace-nowrap">
            {siteConfig.ctaText}
          </span>
        </Button>
      </div>
    </section>
  );
}; 