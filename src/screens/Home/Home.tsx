import React from "react";
import { Header } from "../../components/layout/Header";
import { HeroSection } from "../../components/sections/HeroSection";
import { SponsorsSection } from "../../components/sections/SponsorsSection";
import { TeamSection } from "../../components/sections/TeamSection";
import { Footer } from "../../components/layout/Footer";

// Import configurations
import { navigationConfig } from "../../config/navigation.config";
import { teamConfig } from "../../config/team.config";
import { sponsorsConfig } from "../../config/sponsors.config";
import { siteConfig } from "../../config/home.config";

export const Home = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full [background:radial-gradient(50%_50%_at_50%_0%,rgba(104,82,66,1)_0%,rgba(23,35,51,1)_35%,rgba(0,0,0,1)_73%)] min-h-screen relative">
        {/* Header Component */}
        <Header 
          navigation={navigationConfig}
          siteConfig={siteConfig}
        />

        {/* Hero Section Component */}
        <HeroSection siteConfig={siteConfig} />

        {/* Sponsors Section Component */}
        <SponsorsSection sponsors={sponsorsConfig} />

        {/* Team Section Component */}
        <TeamSection team={teamConfig} title="Lead By" />

        {/* Footer Component */}
        <Footer siteConfig={siteConfig} />
      </div>
    </div>
  );
};