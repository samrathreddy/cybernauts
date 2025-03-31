import React from "react";
import { Header } from "../../components/layout/Header";
import { TeamTree } from "../../components/sections/TeamTree";
import { ExecutiveTree } from "../../components/sections/ExecutiveTree";
import { Footer } from "../../components/layout/Footer";

// Import configurations
import { navigationConfig } from "../../config/navigation.config";
import { teamHierarchy } from "../../config/team.config";
import { executiveTeamHierarchy } from "../../config/executive.config";
import { executiveGirlsTeamHierarchy } from "../../config/executiveGirls.config";
import { siteConfig } from "../../config/home.config";

export const TeamPage = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-row justify-center w-fit overflow-x-scroll">
      <div className="bg-white w-fit [background:radial-gradient(50%_50%_at_50%_0%,rgba(104,82,66,1)_0%,rgba(23,35,51,1)_35%,rgba(0,0,0,1)_73%)] min-h-screen relative">
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
        
        {/* Executive Teams Container */}
        <div className="mt-20">
          {/* Executive Teams Title */}
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold">
              Executive Teams
            </h2>
            <div className="mt-4 w-40 h-1 bg-amber-500 mx-auto rounded-full"></div>
          </div>
          
          {/* Executive Teams Grid Container - Updated to ensure alignment */}
          <div className="grid grid-cols-1 gap-6 max-w-[1400px] mx-auto">
            {/* Executive Team Boys Component */}
            <div>
              <ExecutiveTree 
                teamData={executiveTeamHierarchy}
                title="Boys Team" 
              />
            </div>

            {/* Executive Team Girls Component */}
            <div>
              <ExecutiveTree 
                teamData={executiveGirlsTeamHierarchy}
                title="Girls Team" 
              />
            </div>
          </div>
        </div>

        {/* Footer Component */}
        <Footer siteConfig={siteConfig} />
      </div>
    </div>
  );
}; 