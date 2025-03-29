import React from "react";
import { Header } from "../../components/layout/Header";
import { TeamTree } from "../../components/sections/TeamTree";
import { Footer } from "../../components/layout/Footer";

// Import configurations
import { navigationConfig } from "../../config/navigation.config";
import { teamHierarchy } from "../../config/team.config";
import { siteConfig } from "../../config/home.config";

export const TeamPage = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full [background:radial-gradient(50%_50%_at_50%_0%,rgba(104,82,66,1)_0%,rgba(23,35,51,1)_35%,rgba(0,0,0,1)_73%)] min-h-screen relative">
        {/* Header Component */}
        <Header 
          navigation={navigationConfig}
          siteConfig={siteConfig}
        />

        {/* Page Title Section */}
        <section className="w-full px-4 sm:px-6 lg:px-8 pt-28 md:pt-32">
          <div className="max-w-4xl mx-auto text-center pt-16 pb-8">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Our Leadership & Team
            </h1>
            <p className="text-gray-300 md:text-lg">
              Meet the dedicated individuals who make Cybernauts CVR possible. Our team brings together diverse skills and experiences to create exceptional events and opportunities.
            </p>
          </div>
        </section>

        {/* Team Tree Component */}
        <TeamTree 
          teamData={teamHierarchy} 
          title="Organization Structure" 
        />

        {/* Footer Component */}
        <Footer siteConfig={siteConfig} />
      </div>
    </div>
  );
}; 