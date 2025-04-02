import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { SiteConfig } from "../../config/home.config";
import { SplineSceneCanvas } from "../ui/spline-scene-canvas";
import { Sponsor } from "../../config/sponsors.config";
import { renderCanvas } from "../ui/canvas";
import { Columns } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  siteConfig: SiteConfig;
  sponsors?: Sponsor[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ siteConfig, sponsors = []}) => {
  // Countdown timer state and logic
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    // Initialize the canvas animation when the component mounts
    renderCanvas();

    // Set your event date here
    const eventDate = new Date("2025-04-04T00:00:00"); // Example date, adjust as needed
    
    const calculateTimeLeft = () => {
      const difference = +eventDate - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pb-10 pt-16 md:pt-20 relative">
      {/* Canvas for cursor animation - added at the section level */}
     <canvas
        className="pointer-events-none absolute inset-0 w-full h-full z-10"
        id="canvas"
      />
      
      <div className="flex flex-col lg:flex-row items-start gap-8 justify-between">
        {/* Content Column - Restored to original vertical positioning */}
        <div className="flex flex-col items-start gap-6 md:gap-8 pt-12 md:pt-32 lg:pt-[200px] max-w-[500px]">
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

          {/* Countdown Timer */}
          <div className="w-full max-w-[330px] mt-1 mb-1">
            <div className="flex items-center justify-between">
              {/* Days */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-black/40 backdrop-blur-sm rounded-lg flex items-center justify-center border border-amber-500/30">
                  <span className="font-bold text-2xl text-white">{timeLeft.days}</span>
                </div>
                <span className="text-amber-200 text-xs mt-1">Days</span>
              </div>
              
              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-black/40 backdrop-blur-sm rounded-lg flex items-center justify-center border border-amber-500/30">
                  <span className="font-bold text-2xl text-white">{timeLeft.hours}</span>
                </div>
                <span className="text-amber-200 text-xs mt-1">Hours</span>
              </div>
              
              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-black/40 backdrop-blur-sm rounded-lg flex items-center justify-center border border-amber-500/30">
                  <span className="font-bold text-2xl text-white">{timeLeft.minutes}</span>
                </div>
                <span className="text-amber-200 text-xs mt-1">Mins</span>
              </div>
              
              {/* Seconds */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-black/40 backdrop-blur-sm rounded-lg flex items-center justify-center border border-amber-500/30">
                  <span className="font-bold text-2xl text-white">{timeLeft.seconds}</span>
                </div>
                <span className="text-amber-200 text-xs mt-1">Secs</span>
              </div>
            </div>
          </div>

          <Button className="inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:py-2.5 relative flex-[0_0_auto] bg-white rounded-[70px] hover:bg-white/90 mt-1 w-full sm:w-auto max-w-[220px]" asChild>
            <Link to="/cypher">
              <span className="relative w-fit [font-family:'Inter',Helvetica] font-semibold text-[#010101] text-sm text-center tracking-[0] leading-[19.6px] whitespace-nowrap">
                {siteConfig.ctaText}
              </span>
            </Link>
          </Button>
          
          {/* Sponsors placed right after the button */}
          {/* {sponsors && sponsors.length > 0 && (
            <div className="w-full mt-6">
              <div className="flex items-center space-x-6 md:space-x-10 overflow-x-auto pb-2 scrollbar-hide opacity-50">
                {sponsors.map((sponsor, index) => (
                  <div key={index} className="flex-shrink-0 flex items-center">
                    <img
                      className="object-contain"
                      style={{ 
                        maxWidth: sponsor.width,
                        maxHeight: sponsor.height,
                        width: `clamp(${sponsor.mobileWidth}, 5vw, ${sponsor.width})`,
                        height: `clamp(${sponsor.mobileHeight}, 3vw, ${sponsor.height})`,
                      }}
                      alt={sponsor.name}
                      src={sponsor.image}
                    />
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>

        {/* SplineSceneCanvas with cursor effect - Positioned higher up beside the content */}
        <div className="flex-1 relative h-[500px] lg:h-[700px] w-full max-w-full lg:max-w-[60%] mt-0 lg:mt-24">
          <SplineSceneCanvas 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}; 