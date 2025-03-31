import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { TeamMember } from "../../config/team.config";

interface ExecutiveTreeProps {
  teamData: TeamMember;
  title?: string;
}

export const ExecutiveTree: React.FC<ExecutiveTreeProps> = ({ 
  teamData, 
  title = "Executive Team" 
}) => {
  // Render a single team member card
  const renderTeamMemberCard = (member: TeamMember) => {
    // Don't render group container cards
    if (member.id === 300 || member.id === 400) {
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
      <Card key={member.id} className={`w-full sm:w-52 flex flex-col bg-gradient-to-b from-[rgba(21,31,45,1)] to-[rgba(1,1,1,1)] border-none shadow-md relative overflow-hidden ${member.id === 200 ? 'hidden' : ''}`}>
        <div className="h-28 sm:h-32 bg-gradient-to-r from-amber-500/30 to-amber-700/20 rounded-t-xl flex items-center justify-center overflow-hidden">
          {member.imageUrl && isValidImageUrl(member.imageUrl) ? (
            <img 
              src={member.imageUrl} 
              alt={`${member.name} - ${member.role}`}
              className="w-full h-full object-cover"
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
        
        <CardContent className="flex flex-col items-center text-center p-2 sm:p-3 gap-1 sm:gap-1">
          <h3 className="text-white text-sm sm:text-base font-semibold mt-1">{member.name}</h3>
          <p className="text-amber-100/60 text-xs">{member.role}</p>
          <p className="text-gray-400 text-xs line-clamp-1">{member.description}</p>
          
          {member.linkedInUrl && (
            <a 
              href={member.linkedInUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-1 text-white bg-[#0A66C2] hover:bg-[#0A66C2]/90 transition-colors rounded-md px-2 py-0.5 text-xs flex items-center gap-1"
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

  // Get the executive lead
  const renderExecutiveLead = () => {
    if (!teamData.children || teamData.children.length === 0) return null;
    
    const executiveLead = teamData.children[0];
    
    return (
      <div className="flex justify-center w-full">
        <div className="w-60 sm:w-64 mb-10 flex justify-center mx-auto">
          {renderTeamMemberCard(executiveLead)}
        </div>
      </div>
    );
  };

  // Render first row of executives (6 boxes)
  const renderFirstRow = () => {
    if (!teamData.children || 
        !teamData.children[0].children || 
        teamData.children[0].children.length === 0) return null;
    
    // Get first row group's children
    const firstRowGroup = teamData.children[0].children[0];
    if (!firstRowGroup || !firstRowGroup.children) return null;
    
    const firstRowMembers = firstRowGroup.children;
    
    return (
      <div className="flex flex-col items-center mb-10 ">
        {/* Mobile: Stack vertically in 2 columns */}
        <div className="flex flex-wrap justify-center gap-4 sm:hidden">
          {firstRowMembers.map(member => (
            <div key={member.id} className="w-[45%]">
              {renderTeamMemberCard(member)}
            </div>
          ))}
        </div>
        
        {/* Desktop: Show in a single row with proper sizing */}
        <div className="hidden sm:flex justify-center gap-4 max-w-6xl px-4">
          {firstRowMembers.map(member => (
            <div key={member.id} className="flex flex-col items-center">
              {renderTeamMemberCard(member)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render second row of executives (6 boxes)
  const renderSecondRow = () => {
    if (!teamData.children || 
        !teamData.children[0].children || 
        teamData.children[0].children.length <= 1) return null;
    
    // Get second row group's children
    const secondRowGroup = teamData.children[0].children[1];
    if (!secondRowGroup || !secondRowGroup.children) return null;
    
    const secondRowMembers = secondRowGroup.children;
    
    return (
      <div className="flex flex-col items-center">
        {/* Mobile: Stack vertically in 2 columns */}
        <div className="flex flex-wrap justify-center gap-4 sm:hidden">
          {secondRowMembers.map(member => (
            <div key={member.id} className="w-[45%]">
              {renderTeamMemberCard(member)}
            </div>
          ))}
        </div>
        
        {/* Desktop: Show in a single row with proper sizing */}
        <div className="hidden sm:flex justify-center gap-4 w-fit px-4">
          {secondRowMembers.map(member => (
            <div key={member.id} className="flex flex-col items-center">
              {renderTeamMemberCard(member)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="w-full px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 mx-auto">
      <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-center">
        {title}
      </h2>
      <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full mb-6"></div>
      
      <div className="w-full flex flex-col items-center">
        {renderExecutiveLead()}
        <div className="w-full  mx-auto">
          {renderFirstRow()}
          {renderSecondRow()}
        </div>
      </div>
    </section>
  );
}; 