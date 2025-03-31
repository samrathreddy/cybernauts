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
  upcoming?: boolean;
  link?: string;
}

export const eventsConfig: EventItem[] = [
  {
    id: "cypher-2025",
    title: "Cypher 2025",
    description: "Our annual flagship event with participation from other colleges.",
    longDescription: "CVR's flagship tech extravaganza featuring hackathons, coding competitions, workshops, and cultural events. Join us for an unforgettable experience of innovation, learning, and fun!.",
    date: "April 3, 2025",
    location: "CVR College of Engineering, Hyderabad",
    imageUrl: "/images/events/cypher-2025/poster.png",
    tags: ["hackathon", "coding", "upcoming", "non-tech"],
    upcoming: true,
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
    id: "Alumni Meet",
    title: "Alumni Meet",
    description: "CVR alumni reunited with students, sharing career insights, experiences, and fond college memories, inspiring the next generation.",
    longDescription: "CVR alumni spent a day engaging with students, sharing their career journeys, industry experiences, and college memories. They provided valuable guidance on career growth, industry trends, and skill development. The interactive session fostered connections, inspiring students to navigate their future paths with confidence.",
    date: "March 1, 2025",
    location: "CVR College of Engineering, Hyderabad",
    imageUrl: "/images/events/Alumni/alumni1.jpg",
    galleryImages: [
      "/images/events/Alumni/alumni2.jpg",
      "/images/events/Alumni/alumni3.jpg",
      "/images/events/Alumni/alumni4.jpg",
    ],
    tags: ["social", "tech"]
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
    id: "Cyber Hygiene and Security",
    title: "Tech Talk on Cyber Hygiene and Security",
    description: "A tech talk on Cyber Hygiene and Security covered best practices for online safety, data protection, and preventing cyber threats.",
    longDescription: "The session focused on essential cybersecurity practices like password management, phishing awareness, and secure browsing. Experts shared insights on emerging cyber threats and practical steps to enhance digital security, helping participants stay safe online.",
    date: "Febuary 5, 2025",
    location: "CVR College of Engineering, Hyderabad",
    imageUrl: "/images/events/Cyber_Hygiene/tech1.jpg",
    tags: ["tech"],
  }
]; 