import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { TeamMember } from "../../config/team.config";

interface TeamSectionProps {
  team: TeamMember[];
  title?: string;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ 
  team, 
  title = "Lead By" 
}) => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 mt-8 md:mt-12">
      <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-6 md:mb-8">
        {title}
      </h2>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5 pb-10">
        {team.map((member) => (
          <Card
            key={member.id}
            className="flex flex-col items-start gap-4 p-4 relative [background:linear-gradient(180deg,rgba(21,31,45,1)_0%,rgba(1,1,1,1)_100%)] border-none h-full overflow-hidden"
          >
            <div
              className="aspect-square sm:aspect-auto sm:h-[200px] md:h-[220px] relative w-full bg-[#121b27] overflow-hidden"
            >
              {/* Display member image */}
              {member.imageUrl ? (
                <img 
                  src={member.imageUrl} 
                  alt={`${member.name}`} 
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">
                  {member.name} Photo
                </div>
              )}
            </div>

            <CardContent className="flex flex-col items-start gap-2 p-0 w-full flex-grow">
              <h3 className="text-white text-lg font-semibold">
                {member.name}
              </h3>

              <p className="text-white/50 text-sm">
                {member.description}
              </p>

              <a
                href={member.linkedInUrl || "#"}
                target={member.linkedInUrl ? "_blank" : "_self"}
                rel={member.linkedInUrl ? "noopener noreferrer" : ""}
                className="mt-auto pt-3 text-white hover:text-blue-400 transition-colors text-sm inline-flex items-center gap-1 touch-manipulation"
              >
                Connect <span className="text-xs">→</span>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}; 