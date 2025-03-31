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
      linkedInUrl: "mailto:principal@cvr.ac.in",
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
    name: "Koundinya Sarikonda",
    role: "Secretary",
    description: "Handles administrative duties",
    imageUrl: "/images/team/koundinya.jpg",
    linkedInUrl: "https://www.linkedin.com/in/koundinya-sarikonda",
  },
  {
    id: 7,
    name: "Shravya Adarapu",
    role: "Vice-Secretary",
    description: "Assists secretary in administration",
    imageUrl: "/images/team/Shravya Adarapu.jpg",
    linkedInUrl: "https://www.linkedin.com/in/shravya-adarapu-a09651276",
  },
  {
    id: 8,
    name: "MVSP Praneeth",
    role: "Finance Lead",
    description: "Manages financial operations",
    imageUrl: "/images/team/Praneeth MVSP.jpg",
    linkedInUrl: "https://www.linkedin.com/in/praneeth-mvsp-42042b197",
  },
  {
    id: 9,
    name: "Kunchakuri Jasmitha",
    role: "Finance Co-Lead",
    description: "Assists in financial management",
    imageUrl: "images/team/Jasmitha Kunchakuri.jpg",
    linkedInUrl: "https://www.linkedin.com/in/jasmitha-kunchakuri",
  },
  {
    id: 10,
    name: "M. Srija Bharadwaj",
    role: "Documentation Lead",
    description: "Manages documentation process",
    imageUrl: "images/team/Srija Bharadwaj2004.jpeg",
    linkedInUrl: "https://www.linkedin.com/in/srija-bharadwaj-725036294",
  },
  {
    id: 11,
    name: "Prodduturi Sahithya",
    role: "Documentation Co-Lead",
    description: "Assists in documentation",
    imageUrl: "images/team/Sahithya Prodduturi.jpg",
    linkedInUrl: "https://www.linkedin.com/in/sahithya-prodduturi-319274301",
  },
  {
    id: 12,
    name: "Rajeevi Madhireddy",
    role: "Documentation Co-Lead",
    description: "Assists in documentation",
    imageUrl: "images/team/Rajeevi Madhireddy.jpg",
    linkedInUrl: "https://www.linkedin.com/in/rajeevi-madhireddy",
  },
  {
    id: 13,
    name: "Erugurala Hanok",
    role: "Algo Designer",
    description: "Designs coding problems",
    imageUrl: "images/team/Hanok Erugurala.png",
    linkedInUrl: "https://www.linkedin.com/in/hanok-erugurala",
  },
  {
    id: 38,
    name: "Ram Aravind",
    role: "Digital Content Curator",
    description: "Manages digital content",
    imageUrl: "images/team/Passport size photo - Aravind Ram.jpeg",
    linkedInUrl: "https://www.linkedin.com/company/cybernauts-cvr/",
  },
  {
    id: 39,
    name: "M Aasritha",
    role: "Event Management Team Aid",
    description: "Supports event management team",
    imageUrl: "/images/team/aashritha.JPG",
    linkedInUrl: "https://www.linkedin.com/in/aashritha-krishna-811041278",
  },
];

// Fifth level - Team Leads (now directly under VC)
const teamLeads: TeamMember[] = [
  {
    id: 14,
    name: "Krishna Koushik Reddy",
    role: "Technical S&D Team Lead",
    description: "Software & Development Team Lead",
    imageUrl: "images/team/IMG-20240807-WA0013 - Koushik Reddy.jpg",
    linkedInUrl: "https://www.linkedin.com/in/koushik-reddy-ab7b5a251",
    children: [
      {
        id: 18,
        name: "Kruthin Reddy",
        role: "Technical S&D Team Co-Lead",
        description: "Software & Development Co-Lead",
        imageUrl: "images/team/Kruthin Reddy.jpg",
        linkedInUrl: "https://www.linkedin.com/in/kruthin-reddy",
      },
      {
        id: 22,
        name: "Thota Gayathri",
        role: "Technical S&D Team Member",
        description: "Software & Development Team",
        imageUrl: "public/images/team/Gayathri Thota.jpg",
        linkedInUrl: "https://www.linkedin.com/in/gayathri-thota-552920300",
      },
      {
        id: 23,
        name: "Busetty Namruth",
        role: "Technical S&D Team Member",
        description: "Software & Development Team",
        imageUrl: "public/images/team/Busetty Namruth.jpg",
        linkedInUrl: "https://www.linkedin.com/in/busetty-namruth-054859300",
      },
      {
        id: 24,
        name: "Parimi Sai Charan",
        role: "Technical S&D Team Member",
        description: "Software & Development Team",
        imageUrl: "public/images/team/Sai Charan Parimi.jpg",
        linkedInUrl: "https://www.linkedin.com/in/sai-charan-parimi-845298286",
      },
      {
        id: 34,
        name: "Sreeshanth Soma",
        role: "Technical S&D Team Member",
        description: "Software & Development Team",
        imageUrl: "public/images/team/sreeshanth.jpg",
        linkedInUrl: "https://www.linkedin.com/in/sreeshanth-soma-9b5bb12b3",
      }
    ]
  },
  {
    id: 15,
    name: "Mohana Harshita",
    role: "Graphics Lead",
    description: "Graphics & UI Design",
    imageUrl: "public/images/team/Mohana Harshita.jpeg",
    linkedInUrl: "https://www.linkedin.com/in/mohana-harshita",
    children: [
      {
        id: 19,
        name: "Kowluru Sai",
        role: "Graphics Co-Lead",
        description: "Graphics & UI Design",
        imageUrl: "public/images/team/Sai Kowluru.jpg",
        linkedInUrl: "https://www.linkedin.com/in/kowluru-sai",
      },
      {
        id: 25,
        name: "Mani Yadla",
        role: "Graphics Team Member",
        description: "Graphics & Design",
        imageUrl: "public/images/team/Mani Yadla.jpg",
        linkedInUrl: "https://www.linkedin.com/in/yadla-mani",
      },
      {
        id: 26,
        name: "Arasada Lakshmi Meghana",
        role: "Graphics Team Member",
        description: "Graphics & Design",
        imageUrl: "public/images/team/Lakshmi Meghana arasada.jpg",
        linkedInUrl: "https://www.linkedin.com/in/lakshmi-meghana-arasada-140798290",
      },
      {
        id: 27,
        name: "Deekshasri Bachu",
        role: "Graphics Team Member",
        description: "Graphics & Design",
        imageUrl: "public/images/team/Deeksha Bachu.png",
        linkedInUrl: "https://www.linkedin.com/in/deeksha-bachu-466868290",
      },
      {
        id: 35,
        name: "T. Yashaswini",
        role: "Graphics Team Member",
        description: "Graphics & Design",
        imageUrl: "public/images/team/tipirishetti yashaswini.jpg",
        linkedInUrl: "https://www.linkedin.com/in/tipirishetti-yashaswini-b4986b280",
      }
    ]
  },
  {
    id: 16,
    name: "Vaishnavi Reddy",
    role: "Event Management Team Lead",
    description: "Event Planning & Execution",
    imageUrl: "..//team-member.png",
    linkedInUrl: "https://www.linkedin.com/in/vaishnavi-reddy-373919300",
    children: [
      {
        id: 20,
        name: "Annavarapu Rohith",
        role: "Event Management Team Co-Lead",
        description: "Event Planning & Execution",
        imageUrl: "..//team-member.png",
        linkedInUrl: "https://www.linkedin.com/in/annavarapu-rohith-6a5711277",
      },
      {
        id: 28,
        name: "P. Sai Prasad",
        role: "Event Management Team Member",
        description: "Event Operations",
        imageUrl: "..//team-member.png",
        linkedInUrl: "https://www.linkedin.com/in/paloju-sai-prasad-83a8542b3",
      },
      {
        id: 29,
        name: "Shreya Anna Mathew",
        role: "Event Management Team Member",
        description: "Event Operations",
        imageUrl: "public/images/team/Shreya Anna Mathew.jpeg",
        linkedInUrl: "https://www.linkedin.com/in/shreya-anna-mathew",
      },
      {
        id: 30,
        name: "Bitla Nihan Reddy",
        role: "Event Management Team Member",
        description: "Event Operations",
        imageUrl: "public/images/team/bitla nihan reddy.jpg",
        linkedInUrl: "https://www.linkedin.com/company/cybernauts-cvr/",
      },
      {
        id: 36,
        name: "Sushruta",
        role: "Event Management Team Member",
        description: "Event Operations",
        imageUrl: "public/images/team/SUSHRUTA.jpg",
        linkedInUrl: "https://www.linkedin.com/in/sushrutarapolu",
      }
    ]
  },
  {
    id: 17,
    name: "M Rishika Reddy",
    role: "Outreach Team Lead",
    description: "Content Strategy & Communication",
    imageUrl: "..//team-member.png",
    linkedInUrl: "https://www.linkedin.com/in/m-rishika-reddy-780966253/",
    children: [
      {
        id: 21,
        name: "Mokshagna Malineni",
        role: "Outreach Team Co-Lead",
        description: "Content Strategy & Communication",
        imageUrl: "public/images/team/mokshagna malineni.jpg",
        linkedInUrl: "https://www.linkedin.com/in/mokshagnamalineni",
      },
      {
        id: 31,
        name: "Shaik Sana",
        role: "Outreach Team Member",
        description: "Content & Communication",
        imageUrl: "public/images/team/Shaik Sana.jpg",
        linkedInUrl: "https://www.linkedin.com/in/shaik-sana-205467256",
      },
      {
        id: 32,
        name: "M. Aadarsh Goud",
        role: "Outreach Team Member",
        description: "Content & Communication",
        imageUrl: "public/images/team/M.Aadarsh goud.jpg",
        linkedInUrl: "https://www.linkedin.com/in/m-aadarsh-goud-a52a89246",
      },
      {
        id: 33,
        name: "Raksha Vishwanath",
        role: "Outreach Team Member",
        description: "Content & Communication",
        imageUrl: "public/images/team/V_ Raksha.jpg",
        linkedInUrl: "https://www.linkedin.com/in/raksha-vishwanath-29bab92a8",
      },
      {
        id: 37,
        name: "Sreeja Sadhu",
        role: "Outreach Team Member",
        description: "Content & Communication",
        imageUrl: "public/images/team/Sreeja Sadhu.jpg",
        linkedInUrl: "https://www.linkedin.com/in/sreejasadhu",
      }
    ]
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
      linkedInUrl: "mailto:principal@cvr.ac.in"
    },
    {
      id: 2,
      name: "Prof. L.C. Siva Reddy",
      role: "Vice Principal",
      description: "Vice Principal",
      imageUrl: "/images/team/shiva-reddy.png",
      linkedInUrl: "mailto:siva_reddy@cvr.ac.in"
    },
    {
      id: 3,
      name: "Dr.A. Vani Vathsala",
      role: "CSE HOD",
      description: "Head of Department - CSE",
      imageUrl: "/images/team/vani-vathsala.png",
      linkedInUrl: "https://www.linkedin.com/in/vani-vathsala-30a4641b"
    },
    {
      id: 4,
      name: "Y.V. Sridhar",
      role: "Cybernauts Chair",
      description: "Cybernauts Chairperson",
      imageUrl: "/images/team/sridhar.png",
      linkedInUrl: "https://www.linkedin.com/in/yalamanchili-venkata-sridhar-137674230"
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