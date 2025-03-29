import React from "react";
import { SiteConfig } from "../../config/home.config";

interface FooterProps {
  siteConfig: SiteConfig;
}

export const Footer: React.FC<FooterProps> = ({ siteConfig }) => {
  // Get the current year for copyright text
  const currentYear = new Date().getFullYear();
  
  // Replace hardcoded year with the current year
  const footerTextWithCurrentYear = siteConfig.footerText.replace(/\d{4}/, currentYear.toString());
  
  return (
    <footer className="w-full px-4 sm:px-6 lg:px-8 py-8 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center">
          <img
            className="w-[59px] h-[25px] object-cover"
            alt={siteConfig.logoAlt}
            src={siteConfig.logoSrc}
          />
        </div>
        
        <div className="text-center md:text-right">
          <p className="text-white/60 text-sm">
            {footerTextWithCurrentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}; 