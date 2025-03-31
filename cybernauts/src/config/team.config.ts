export interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  linkedInUrl?: string;
  children?: TeamMember[];
}

// Hierarchical team structure for organization chart
export const teamHierarchy: TeamMember = {
  id: 0,
  name: "Leadership",
  role: "Top Management",
  description: "CVR College Leadership",
  imageUrl: "",
  children: [
    // First row - Principal, Vice Principal, and HOD
    {
      id: 1,
      name: "Dr.K. Ramamohan Reddy",
      role: "Principal",
      description: "College Principal",
      imageUrl: "/images/team/Ramamohan.jpeg",
      linkedInUrl: "https://www.linkedin.com/in/principal-cvr",
    },
    {
      id: 2,
      name: "L.C. Siva Reddy",
      role: "Vice Principal",
      description: "College Vice Principal",
      imageUrl: "/images/team/shiva-reddy.png",
      linkedInUrl: "https://www.linkedin.com/in/viceprincipal-cvr",
    },
    {
      id: 3,
      name: "Dr.A. Vani Vathsala",
      role: "CSE HOD",
      description: "Head of Computer Science Department",
      imageUrl: "/images/team/vani-vathsala.png",
      linkedInUrl: "https://www.linkedin.com/in/csehod-cvr",
    },
  ],
};

// Second level - Chair
const chairMember: TeamMember = {
  id: 4,
  name: "Y.V. Sridhar",
  role: "Cybernauts Chair",
  description: "Cybernauts Chairperson",
  imageUrl: "/images/team/sridhar.png",
  linkedInUrl: "https://www.linkedin.com/in/cybernautschair",
  children: [],
};

// Third level - VC
const vcMember: TeamMember = {
  id: 5,
  name: "Y. Samrath Reddy",
  role: "Cybernauts VC",
  description: "Cybernauts Vice Chairperson",
  imageUrl: "/images/team/samrath.png",
  linkedInUrl: "https://www.linkedin.com/in/samrathreddy",
  children: [],
};

// Fourth level - Team Members
const teamMembers: TeamMember[] = [
  {
    id: 6,
    name: "Rishwika Mandla",
    role: "Vice Chairperson",
    description: "Leads development team",
    imageUrl: "..//team-member.png",
    linkedInUrl: "https://www.linkedin.com/in/tech-head",
  },
  {
    id: 7,
    name: "Koundinya Sarikonda",
    role: "Secretary",
    description: "Manages event initiatives",
    imageUrl: "..//team-member.png",
    linkedInUrl: "https://www.linkedin.com/in/creative-director",
  },
  {
    id: 8,
    name: "Shravya Adarapu",
    role: "Vice Secretary",
    description: "Manages events and logistics",
    imageUrl: "..//team-member.png",
    linkedInUrl: "https://www.linkedin.com/in/event-coord",
  },
  {
    id: 9,
    name: "MVSP Praneeth",
    role: "Finance Lead",
    description: "Manages financial operations",
    imageUrl: "..//team-member.png",
    linkedInUrl: "https://www.linkedin.com/in/marketing-head",
  },
  {
    id: 10,
    name: "Jasmitha Kunchakuri",
    role: "Finance Co-Lead",
    description: "Coordinates financial decisions",
    imageUrl: "..//team-member.png",
    linkedInUrl: "https://www.linkedin.com/in/content-manager",
  },
  {
    id: 11,
    name: "Srija Bharadwaj",
    role: "Documentation Lead",
    description: "Manage and organize documentation",
    imageUrl: "..//team-member.png",
    linkedInUrl: "https://www.linkedin.com/in/pr-coordinator",
  },
  {
    id: 12,
    name: "Sahithya",
    role: "Documentation Co-Lead",
    description: "Assist and support documentation",
    imageUrl: "..//team-member.png",
    linkedInUrl: "https://www.linkedin.com/in/finance-manager",
  },
  {
    id: 13,
    name: "Rajeevi Madhireddy",
    role: "Documentation Co-Lead",
    description: "Assist and support documentation",
    imageUrl: "..//team-member.png",
    linkedInUrl: "https://www.linkedin.com/in/sponsorship-coord",
  },
];

// Fifth level - Team Leads (now directly under VC)
const teamLeads: TeamMember[] = [
  {
    id: 14,
    name: "Krishna Koushik Reddy",
    role: "Technical Lead",
    description: "Web & App Development",
    imageUrl: "..//team-member.png",
    linkedInUrl: "https://www.linkedin.com/in/tech-lead",
  },
  {
    id: 15,
    name: "Mohana Harshitha",
    role: "Graphics Lead",
    description: "Graphics & UI Design",
    imageUrl: "..//team-member.png",
    linkedInUrl: "https://www.linkedin.com/in/design-lead",
  },
  {
    id: 16,
    name: "Vaishnavi Reddy",
    role: "Event Management Lead",
    description: "Event Planning & Execution",
    imageUrl: "..//team-member.png",
    linkedInUrl: "https://www.linkedin.com/in/event-lead",
  },
  {
    id: 17,
    name: "Rishika Reddy",
    role: "Outreach Lead",
    description: "Content Strategy & Creation",
    imageUrl: "..//team-member.png",
    linkedInUrl: "https://www.linkedin.com/in/content-lead",
  },
];

// Connect the team structure - organize it differently now
vcMember.children = [
  // First group will be the team members
  {
    id: 100,
    name: "Team Members",
    role: "Team Group",
    description: "Team Members Group",
    imageUrl: "",
    children: teamMembers
  },
  // Second group will be the leads
  {
    id: 101,
    name: "Team Leads",
    role: "Leads Group",
    description: "Team Leads Group",
    imageUrl: "",
    children: teamLeads
  }
];

chairMember.children = [vcMember];

// Add Chair to the main team hierarchy
if (teamHierarchy.children) {
  teamHierarchy.children.push(chairMember);
}

// Flat team list (keeping for backward compatibility)
export const teamConfig: TeamMember[] = [
  {
    id: 1,
    name: "Dr.K. Ramamohan Reddy",
    role: "Principal",
    description: "Principal",
    imageUrl: "/images/team/Ramamohan.jpeg",
    linkedInUrl: "https://www.linkedin.com/in/principal-cvr"
  },
  {
    id: 2,
    name: "Prof. L.C. Siva Reddy",
    role: "Vice Principal",
    description: "Vice Principal",
    imageUrl: "/images/team/shiva-reddy.png",
    linkedInUrl: "https://www.linkedin.com/in/viceprincipal-cvr"
  },
  {
    id: 3,
    name: "Dr.A. Vani Vathsala",
    role: "CSE HOD",
    description: "Head of Department - CSE",
    imageUrl: "/images/team/vani-vathsala.png",
    linkedInUrl: "https://www.linkedin.com/in/csehod-cvr"
  },
  {
    id: 4,
    name: "Y.V. Sridhar",
    role: "Cybernauts Chair",
    description: "Cybernauts Chairperson",
    imageUrl: "/images/team/sridhar.png",
    linkedInUrl: "https://www.linkedin.com/in/cybernautschair"
  },
  {
    id: 5,
    name: "Y. Samrath Reddy",
    role: "Cybernauts VC",
    description: "Cybernauts Vice Chairperson",
    imageUrl: "/images/team/samrath.png",
    linkedInUrl: "https://www.linkedin.com/in/samrath-reddy"
  },
]; 