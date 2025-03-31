import React from "react";
import { SiteConfig } from "../../config/home.config";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  className?: string; // Add optional custom class for icon sizing
}

interface FooterProps {
  siteConfig: SiteConfig;
  socialLinks?: SocialLink[];
}

export const Footer: React.FC<FooterProps> = ({ siteConfig, socialLinks = [] }) => {
  // Get the current year for copyright text
  const currentYear = new Date().getFullYear();
  
  // Replace hardcoded year with the current year
  const footerTextWithCurrentYear = siteConfig.footerText.replace(/\d{4}/, currentYear.toString());
  
  return (
    <footer className="w-full px-4 sm:px-6 lg:px-8 py-8 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <img
            className="w-[59px] h-[25px] object-cover"
            alt={siteConfig.logoAlt}
            src={siteConfig.logoSrc}
          />
          
          {/* Social Links - Now positioned right next to the logo */}
          {socialLinks.length > 0 && (
            <div className="flex items-center space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-amber-500 transition-colors duration-300 flex items-center justify-center"
                  aria-label={link.name}
                >
                  <div className={link.className || "w-5 h-5"}>
                    {link.icon}
                  </div>
                </a>
              ))}
            </div>
          )}
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