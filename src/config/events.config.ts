export interface EventItem {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  date: string;
  location: string;
  imageUrl: string;
  galleryImages?: string[];
  tags: string[];
  featured?: boolean;
  link?: string;
}

export const eventsConfig: EventItem[] = [
  {
    id: "Alumni Meet",
    title: "Alumni Meet",
    description: "CVR alumni reunited with students, sharing career insights, experiences, and fond college memories, inspiring the next generation.",
    longDescription: "CVR alumni spent a day engaging with students, sharing their career journeys, industry experiences, and college memories. They provided valuable guidance on career growth, industry trends, and skill development. The interactive session fostered connections, inspiring students to navigate their future paths with confidence.",
    date: "March 1 , 2025",
    location: "CVR College of Engineering, Hyderabad",
    imageUrl: "/images/events/Alumni/alumni1.jpg",
    galleryImages: [
      "/images/events/Alumni/alumni2.jpg",
      "/images/events/Alumni/alumni3.jpg",
      "/images/events/Alumni/alumni4.jpg",
    ],
    tags: ["social", "tech"],
    featured: true,
  },
  {
    id: "Cyber Hygiene and Security",
    title: "Tech Talk on Cyber Hygiene and Security",
    description: "A tech talk on Cyber Hygiene and Security covered best practices for online safety, data protection, and preventing cyber threats.",
    longDescription: "The session focused on essential cybersecurity practices like password management, phishing awareness, and secure browsing. Experts shared insights on emerging cyber threats and practical steps to enhance digital security, helping participants stay safe online.",
    date: "Febuary 5, 2025",
    location: "CVR College of Engineering, Hyderabad",
    imageUrl: "/images/events/Cyber_Hygiene/tech1.jpg",
    galleryImages: [
      "/images/events/Cyber_Hygiene/tech2.jpg",
      "/images/events/Cyber_Hygiene/tech3.jpg"
    ],
    tags: ["tech"],
  },
  {
    id: "Ideathon-2025",
    title: "Ideathon 2025",
    description: "Ideathon 2K25 is a platform for innovators to brainstorm, develop, and pitch creative solutions to real-world challenges.",
    longDescription: "A high-energy event where participants collaborate, refine ideas, and present groundbreaking solutions. With expert mentorship and a focus on innovation, Ideathon 2K25 fosters creativity and problem-solving to drive meaningful change.",
    date: "February 7, 2025",
    location: "CVR College of Engineering, Hyderabad",
    imageUrl: "/images/events/Ideathon2K25/ideathon1.jpg",
    galleryImages: [
      "/images/events/Ideathon2K25/ideathon2.jpg",
      "/images/events/Ideathon2K25/ideathon3.jpg",
      "/images/events/Ideathon2K25/ideathon4.jpg",
      "/images/events/Ideathon2K25/ideathon5.jpg"
    ],
    tags: ["hackathon", "tech", "social"],
  },
  {
    id: "Social Outreach Program 2K25",
    title: "Social Outreach Program",
    description: "Government high school students learned basic computer skills, MS Office, and HTML through an outreach program by CVR.",
    longDescription: "As part of our Social Outreach Program, CVR students conducted an interactive session for government high school students, introducing them to fundamental computer concepts and essential digital tools. The session covered MS Word, Excel, PowerPoint, and basic HTML, equipping students with practical skills for academics and future career opportunities. Through hands-on activities and engaging demonstrations, the initiative aimed to bridge the digital gap, making technology more accessible and fostering confidence in using computers for learning and productivity.",
    date: "February 22- March 30, 2025",
    location: "CVR College of Engineering, Hyderabad",
    imageUrl: "/images/events/SocialOutreach/social1.jpg",
    galleryImages: [
      "/images/events/SocialOutreach/social2.jpg",
      "/images/events/SocialOutreach/social3.jpg",
      "/images/events/SocialOutreach/social4.jpg",
      "/images/events/SocialOutreach/social5.jpg",
      "/images/events/SocialOutreach/social6.jpg",
      "/images/events/SocialOutreach/social7.jpg",
      "/images/events/SocialOutreach/social8.jpg"
    ],
    tags: ["social", "tech", "workshop"],
  },
  {
    id: "gamedev-jam-2025",
    title: "GameDev Jam 2025",
    description: "A 48-hour game development marathon for aspiring game designers and developers.",
    longDescription: "GameDev Jam 2025 brought together aspiring game designers and developers for a 48-hour game development marathon. Participants worked in teams to create original games based on a surprise theme, using engines like Unity and Unreal.",
    date: "April 8-10, 2025",
    location: "CVR College of Engineering, Hyderabad",
    imageUrl: "/images/events/gamedev-2025/main.jpg",
    tags: ["coding", "game development", "design", "creative"],
  },
  {
    id: "cypher-2025",
    title: "Cypher 2025",
    description: "Our annual flagship hackathon with participation from colleges across India.",
    longDescription: "Cypher 2025 was our annual flagship hackathon that attracted participants from colleges across India. The event featured challenging problem statements from industry partners, mentorship opportunities, and substantial prizes for winning teams.",
    date: "March 12-14, 2025",
    location: "CVR College of Engineering, Hyderabad",
    imageUrl: "/images/events/cypher-2025/main.jpg",
    tags: ["hackathon", "coding", "featured"],
    featured: true,
  }
]; 