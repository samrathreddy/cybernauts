import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { TeamMember } from "../../config/team.config";

interface TeamTreeProps {
  teamData: TeamMember;
  title?: string;
}

export const TeamTree: React.FC<TeamTreeProps> = ({ 
  teamData, 
  title = "Team Hierarchy" 
}) => {
  // Render a single team member card
  const renderTeamMemberCard = (member: TeamMember) => {
    // Don't render group container cards
    if (member.id === 100 || member.id === 101) {
      return null;
    }
    
    // Helper to check if image URL is valid and accessible
    const isValidImageUrl = (url: string): boolean => {
      // Check if path is relative and incorrect (starting with ../)
      if (url.startsWith('../')) return false;
      
      // Check if path is empty
      if (!url.trim()) return false;
      
      return true;
    };
    
    return (
      <Card key={member.id} className={`w-full h-100 sm:w-60 flex flex-col bg-gradient-to-b from-[rgba(21,31,45,1)] to-[rgba(1,1,1,1)] border-none shadow-md relative overflow-hidden ${member.id === 0 ? 'hidden' : ''}`}>
        <div className="h-40 sm:h-40 bg-gradient-to-r from-amber-500/30 to-amber-700/20 rounded-t-xl flex items-center justify-center overflow-hidden">
          {member.imageUrl && isValidImageUrl(member.imageUrl) ? (
            <img 
              src={member.imageUrl} 
              alt={`${member.name} - ${member.role}`}
              className="w-full h-full object-contain"
              onError={(e) => {
                // If image fails to load, replace with default avatar
                e.currentTarget.src = "/images/team/default-avatar.png";
                // If no default avatar exists, show role as text fallback
                e.currentTarget.onerror = () => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.parentElement) {
                    e.currentTarget.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-sm">
                      <div class="text-center text-white text-base sm:text-lg p-2">${member.role}</div>
                    </div>`;
                  }
                };
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <div className="text-center text-white text-base sm:text-lg p-2">
                {member.role}
              </div>
            </div>
          )}
        </div>
        
        <CardContent className="flex flex-col items-center text-center p-3 sm:p-4 gap-1 sm:gap-2">
          <h3 className="text-white text-base sm:text-lg font-semibold mt-1 sm:mt-2">{member.name}</h3>
          <p className="text-amber-100/60 text-xs">{member.role}</p>
          <p className="text-gray-400 text-xs line-clamp-2">{member.description}</p>
          
          {member.linkedInUrl && (
            <a 
              href={member.linkedInUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-1 sm:mt-2 text-white bg-[#0A66C2] hover:bg-[#0A66C2]/90 transition-colors rounded-md px-2 sm:px-3 py-1 text-xs flex items-center gap-1"
            >
              <svg className="w-3 h-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              
            </a>
          )}
        </CardContent>
      </Card>
    );
  };

  // Render the first level (Principal, VP, HOD) horizontally
  const renderFirstLevel = () => {
    if (!teamData.children || teamData.children.length === 0) return null;
    
    // Get the first 3 members - Principal, VP, HOD
    const topManagement = teamData.children.slice(0, 3);
    
    return (
      <div className="flex flex-col">
        {/* Mobile: Stack vertically, Desktop: Show horizontally */}
        <div className="flex  flex-col sm:flex-row justify-center items-center sm:items-start gap-6 sm:gap-8">
          {topManagement.map((member, index) => (
            <div key={member.id} className="w-64 sm:w-auto">
              {/* Show mobile connector lines between stacked cards */}
              {index > 0 && (
                <div className="flex justify-center my-2 sm:hidden">
                  <div className="w-2 h-6 bg-amber-500 rounded-full"></div>
                  <div className="absolute w-4 h-6 bg-amber-400/40 filter blur-sm rounded-full"></div>
                </div>
              )}
              {renderTeamMemberCard(member)}
            </div>
          ))}
        </div>
        
        {/* Enhanced connector line with glow effect */}
        <div className="flex justify-center mt-6 relative">
          {/* Main line */}
          <div className="w-2 h-12 bg-amber-500 rounded-full"></div>
          
          {/* Glow effect */}
          <div className="absolute w-4 h-12 bg-amber-400/40 filter blur-sm rounded-full"></div>
        </div>
      </div>
    );
  };

  // Render Chair level
  const renderChairLevel = () => {
    if (!teamData.children || teamData.children.length <= 3) return null;
    
    // Get Chair (4th member in the array)
    const chair = teamData.children[3];
    
    return (
      <div className="flex flex-col items-center">
        <div className="w-64 sm:w-auto">
          {renderTeamMemberCard(chair)}
        </div>
        
        {/* Enhanced connector line with glow */}
        {chair.children && chair.children.length > 0 && (
          <div className="flex justify-center mt-4 relative">
            {/* Main line */}
            <div className="w-2 h-100 bg-amber-500 rounded-full"></div>
            
            {/* Glow effect */}
            <div className="absolute w-4 h-12 bg-amber-400/40 filter blur-sm rounded-full"></div>
          </div>
        )}
      </div>
    );
  };

  // Render VC level
  const renderVCLevel = () => {
    if (!teamData.children || 
        teamData.children.length <= 3 || 
        !teamData.children[3].children || 
        teamData.children[3].children.length === 0) return null;
    
    // Get VC (first child of Chair)
    const vc = teamData.children[3].children[0];
    
    return (
      <div className="flex flex-col items-center relative">
        <div className="w-64 sm:w-auto">
          {renderTeamMemberCard(vc)}
        </div>
        
        {/* Enhanced central vertical connector with glow */}
        <div className="relative flex justify-center mt-4">
          {/* Main line */}
          <div className="w-2 h-16 sm:h-20 bg-amber-500 rounded-full"></div>
          
          {/* Glow effect */}
          <div className="absolute w-4 h-16 sm:h-20 bg-amber-400/50 filter blur-sm rounded-full"></div>
        </div>
        
        {/* Direct connector line to Team Leads (visible connecting VC to Leads) 
            Mobile: shorter line, Desktop: longer line */}
        <div className="absolute -z-10 w-3 bg-amber-500 rounded-full h-[200px] sm:h-[330px]" style={{ top: "170px" }}></div>
        
        {/* Glow effect for the long connector */}
        <div className="absolute -z-10 w-6 bg-amber-400/40 filter blur-sm rounded-full h-[200px] sm:h-[330px]" style={{ top: "170px" }}></div>
      </div>
    );
  };

  // Render Team Members
  const renderTeamMembers = () => {
    if (!teamData.children || 
        teamData.children.length <= 3 || 
        !teamData.children[3].children || 
        !teamData.children[3].children[0].children) return null;
    
    const vc = teamData.children[3].children[0];
    
    // Get the team members group (should be first child with id 100)
    const teamMembersGroup = vc.children?.find(child => child.id === 100);
    
    if (!teamMembersGroup || !teamMembersGroup.children) return null;
    
    const teamMembers = teamMembersGroup.children;
    
    // Split team members into 2 rows of 5 columns each
    // If there are more than 10 members, only the first 10 will be displayed
    const firstRow = teamMembers.slice(0, 5);
    const secondRow = teamMembers.slice(5, 10);
    
    return (
      <div className="flex flex-col w-fit">
        {/* Team members section title */}
        <div className="text-amber-400 text-center mb-6 font-medium text-lg">Core Team Members</div>
        
        {/* Mobile: Show one card per row */}
        <div className="flex flex-col items-center sm:hidden gap-6">
          {teamMembers.map((member, idx) => (
            <div key={member.id} className="w-64">
              {renderTeamMemberCard(member)}
              {/* Add connecting lines between cards except for last */}
              {idx < teamMembers.length - 1 && (
                <div className="flex justify-center my-2">
                  <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
                  <div className="absolute w-3 h-4 bg-amber-400/40 filter blur-sm rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Desktop: Team members cards - 5 per row, 2 rows */}
        <div className="hidden sm:block">
          {/* First row of 5 */}
          <div className="flex mb-8 justify-center gap-4">
            {firstRow.map(member => (
              <div key={member.id} className="flex flex-col items-center">
                {renderTeamMemberCard(member)}
              </div>
            ))}
          </div>
          
          {/* Second row of 5 */}
          <div className="flex mb-8 justify-center gap-4">
            {secondRow.map(member => (
              <div key={member.id} className="flex flex-col items-center">
                {renderTeamMemberCard(member)}
              </div>
            ))}
          </div>
        </div>
        
        {/* Enhanced connector to Leads section with glow */}
        <div className="relative flex justify-center mt-4">
          {/* Main line */}
          <div className="w-2 h-16 sm:h-24 bg-amber-500 rounded-full"></div>
          
          {/* Glow effect */}
          <div className="absolute w-4 h-16 sm:h-24 bg-amber-400/50 filter blur-sm rounded-full"></div>
          
          {/* Added horizontal line to emphasize connection - hidden on mobile */}
          <div className="absolute top-[50%] w-32 sm:w-64 h-2 bg-amber-500 rounded-full transform -translate-y-1/2"></div>
          
          {/* Horizontal glow */}
          <div className="absolute top-[50%] w-32 sm:w-64 h-4 bg-amber-400/30 filter blur-sm rounded-full transform -translate-y-1/2"></div>
        </div>
      </div>
    );
  };

  // Render Team Leads (directly connected to VC)
  const renderTeamLeads = () => {
    if (!teamData.children || 
        teamData.children.length <= 3 || 
        !teamData.children[3].children || 
        !teamData.children[3].children[0].children) return null;
    
    const vc = teamData.children[3].children[0];
    
    // Get the leads group (should be second child with id 101)
    const leadsGroup = vc.children?.find(child => child.id === 101);
    
    if (!leadsGroup || !leadsGroup.children) return null;
    
    return (
      <div className="flex flex-col mt-8 relative">
        {/* Bus-based network system for connecting leads - different for mobile and desktop */}
        <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[500px]">
          {/* Horizontal bus line - smaller on mobile */}
          <div className="absolute w-[90%] sm:w-[460px] h-3 bg-amber-500 left-1/2 transform -translate-x-1/2 rounded-full"></div>
          
          {/* Horizontal bus glow */}
          <div className="absolute w-[90%] sm:w-[460px] h-6 bg-amber-400/40 left-1/2 transform -translate-x-1/2 rounded-full filter blur-sm"></div>

          {/* Vertical connector from main line to horizontal bus */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-[26px] bg-amber-500 -top-[26px] rounded-full"></div>
          
          {/* Vertical connector glow */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-[26px] bg-amber-400/40 -top-[26px] rounded-full filter blur-sm"></div>
          
          {/* Connection dots at intersection points */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-amber-500 rounded-full -top-[14px]"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-400/40 rounded-full -top-[15px] filter blur-sm"></div>
        </div>
        
        {/* Team leads section title */}
        <div className="text-amber-400 text-center mb-8 font-medium text-lg">Team Leads</div>
        
        {/* Mobile: Show one card per row */}
        <div className="flex flex-col items-center sm:hidden gap-6">
          {leadsGroup.children.map((lead, idx) => (
            <div key={lead.id} className="w-64 relative">
              {/* Vertical connector to bus */}
              <div className="absolute w-2 h-[25px] bg-amber-500 -top-[25px] left-1/2 transform -translate-x-1/2 rounded-full"></div>
              <div className="absolute w-4 h-[25px] bg-amber-400/40 -top-[25px] left-1/2 transform -translate-x-1/2 rounded-full filter blur-sm"></div>
              
              {/* Connection dot */}
              <div className="absolute w-4 h-4 bg-amber-500 -top-[27px] left-1/2 transform -translate-x-1/2 rounded-full"></div>
              <div className="absolute w-6 h-6 bg-amber-400/40 -top-[28px] left-1/2 transform -translate-x-1/2 rounded-full filter blur-sm"></div>
              
              {renderTeamMemberCard(lead)}
              
              {/* Co-Lead section (if exists) */}
              {lead.children && lead.children.length > 0 && (
                <div className="flex flex-col items-center gap-6">
                  {lead.children.map((coLead, coLeadIdx) => (
                    <div key={coLead.id} className={`mt-6 relative ${coLeadIdx > 0 ? "mt-6" : ""}`}>
                      {/* Vertical connector from lead to co-lead or from previous co-lead */}
                      <div className="absolute w-2 h-[25px] bg-amber-500 -top-[25px] left-1/2 transform -translate-x-1/2 rounded-full"></div>
                      <div className="absolute w-4 h-[25px] bg-amber-400/40 -top-[25px] left-1/2 transform -translate-x-1/2 rounded-full filter blur-sm"></div>
                      
                      {/* Connection dot */}
                      <div className="absolute w-4 h-4 bg-amber-500 -top-[27px] left-1/2 transform -translate-x-1/2 rounded-full"></div>
                      <div className="absolute w-6 h-6 bg-amber-400/40 -top-[28px] left-1/2 transform -translate-x-1/2 rounded-full filter blur-sm"></div>
                      
                      {renderTeamMemberCard(coLead)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Desktop: Team leads cards - 2 on left, 2 on right with gap */}
        <div className="hidden sm:flex justify-center">
          {/* Left pair */}
          <div className="flex gap-6 mr-20 relative">
            {leadsGroup.children.slice(0, 2).map((lead, idx) => (
              <div key={lead.id} className="flex flex-col items-center relative">
                {/* Vertical connector line to bus */}
                <div className="absolute w-2 h-[25px] bg-amber-500 -top-[25px] rounded-full"></div>
                <div className="absolute w-4 h-[25px] bg-amber-400/40 -top-[25px] rounded-full filter blur-sm"></div>
                
                {/* Connection dot at intersection point */}
                <div className="absolute w-4 h-4 bg-amber-500 -top-[27px] rounded-full"></div>
                <div className="absolute w-6 h-6 bg-amber-400/40 -top-[28px] rounded-full filter blur-sm"></div>
                
                {renderTeamMemberCard(lead)}
                
                {/* Co-Lead section (if exists) */}
                {lead.children && lead.children.length > 0 && (
                  <div className="flex flex-col items-center">
                    {lead.children.map((coLead, coLeadIdx) => (
                      <div key={coLead.id} className={`mt-6 relative ${coLeadIdx > 0 ? "mt-6" : ""}`}>
                        {/* Vertical connector from lead to co-lead or from previous co-lead */}
                        <div className="absolute w-2 h-[25px] bg-amber-500 -top-[25px] left-1/2 transform -translate-x-1/2 rounded-full"></div>
                        <div className="absolute w-4 h-[25px] bg-amber-400/40 -top-[25px] left-1/2 transform -translate-x-1/2 rounded-full filter blur-sm"></div>
                        
                        {/* Connection dot */}
                        <div className="absolute w-4 h-4 bg-amber-500 -top-[27px] left-1/2 transform -translate-x-1/2 rounded-full"></div>
                        <div className="absolute w-6 h-6 bg-amber-400/40 -top-[28px] left-1/2 transform -translate-x-1/2 rounded-full filter blur-sm"></div>
                        
                        {renderTeamMemberCard(coLead)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Right pair */}
          <div className="flex gap-6 ml-20">
            {leadsGroup.children.slice(2, 4).map((lead, idx) => (
              <div key={lead.id} className="flex flex-col items-center relative">
                {/* Vertical connector line to bus */}
                <div className="absolute w-2 h-[25px] bg-amber-500 -top-[25px] rounded-full"></div>
                <div className="absolute w-4 h-[25px] bg-amber-400/40 -top-[25px] rounded-full filter blur-sm"></div>
                
                {/* Connection dot at intersection point */}
                <div className="absolute w-4 h-4 bg-amber-500 -top-[27px] rounded-full"></div>
                <div className="absolute w-6 h-6 bg-amber-400/40 -top-[28px] rounded-full filter blur-sm"></div>
                
                {renderTeamMemberCard(lead)}
                
                {/* Co-Lead section (if exists) */}
                {lead.children && lead.children.length > 0 && (
                  <div className="flex flex-col items-center">
                    {lead.children.map((coLead, coLeadIdx) => (
                      <div key={coLead.id} className={`mt-6 relative ${coLeadIdx > 0 ? "mt-6" : ""}`}>
                        {/* Vertical connector from lead to co-lead or from previous co-lead */}
                        <div className="absolute w-2 h-[25px] bg-amber-500 -top-[25px] left-1/2 transform -translate-x-1/2 rounded-full"></div>
                        <div className="absolute w-4 h-[25px] bg-amber-400/40 -top-[25px] left-1/2 transform -translate-x-1/2 rounded-full filter blur-sm"></div>
                        
                        {/* Connection dot */}
                        <div className="absolute w-4 h-4 bg-amber-500 -top-[27px] left-1/2 transform -translate-x-1/2 rounded-full"></div>
                        <div className="absolute w-6 h-6 bg-amber-400/40 -top-[28px] left-1/2 transform -translate-x-1/2 rounded-full filter blur-sm"></div>
                        
                        {renderTeamMemberCard(coLead)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full px-2 sm:px-4 md:px-6 lg:px-8 py-10 sm:py-16 mt-4 sm:mt-8 max-w-[1400px] mx-auto overflow-x-auto">
      <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold mb-8 sm:mb-12 text-center">
        {title}
      </h2>
      
      <div className="min-w-max pb-10 sm:pb-20 flex flex-col items-center">
        {renderFirstLevel()}
        {renderChairLevel()}
        {renderVCLevel()}
        {renderTeamMembers()}
        {renderTeamLeads()}
      </div>
    </section>
  );
}; 