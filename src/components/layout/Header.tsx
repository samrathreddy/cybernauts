import React, { useState } from "react";
import { NavigationItem } from "../../config/navigation.config";
import { SiteConfig } from "../../config/home.config";

interface HeaderProps {
  navigation: NavigationItem[];
  siteConfig: SiteConfig;
}

export const Header: React.FC<HeaderProps> = ({ navigation, siteConfig }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Header with Logo and Navigation */}
      <header className="fixed w-full top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4 md:py-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        {/* Logo */}
        <div className="flex items-center">
          <img
            className="w-[59px] h-[25px] object-cover"
            alt={siteConfig.logoAlt}
            src={siteConfig.logoSrc}
          />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 bg-transparent rounded-full"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-0.5 w-6 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`h-0.5 w-6 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-0.5 w-6 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/90 z-40 flex items-center justify-center transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <nav className="flex flex-col items-center gap-6">
          {navigation.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-white text-xl font-medium py-2 hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}; 