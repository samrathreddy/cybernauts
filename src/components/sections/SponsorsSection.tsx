import React from "react";
import { Sponsor } from "../../config/sponsors.config";

interface SponsorsSectionProps {
  sponsors: Sponsor[];
}

export const SponsorsSection: React.FC<SponsorsSectionProps> = ({ sponsors }) => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 border-t border-white/5">
      <div className="flex items-center space-x-6 md:space-x-10 lg:space-x-14 overflow-x-auto pb-4 scrollbar-hide opacity-50">
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
    </section>
  );
}; 