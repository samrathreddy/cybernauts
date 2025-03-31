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
    <div className="bg-white w-full">
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
          <div className="grid grid-cols-1 gap-6 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
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
        <Footer 
          siteConfig={siteConfig}
          socialLinks={[
            {
              name: "LinkedIn",
              url: "https://www.linkedin.com/company/cybernauts-cvr/",
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              )
            },
            {
              name: "Instagram",
              url: "https://www.instagram.com/cybernauts_cvr/",
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              )
            },
            {
              name: "Email",
              url: "mailto:cybernautscvr@gmail.com",
              className: "w-6 h-6",
              icon: (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              )
            }
          ]}
        />
      </div>
    </div>
  );
}; 