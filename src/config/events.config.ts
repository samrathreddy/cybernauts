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
    id: "cypher-2025",
    title: "Cypher 2025",
    description: "A national level hackathon that brought together over 500 participants from across the country.",
    longDescription: "Cypher 2025 was our flagship hackathon event that hosted over 500 participants from across the country. The event featured 36-hour non-stop coding, mentorship sessions, and workshops by industry experts. Participants worked on challenges across AI, Blockchain, and Sustainable Tech categories.",
    date: "March 15-17, 2025",
    location: "CVR College of Engineering, Hyderabad",
    imageUrl: "/images/events/cypher-2025/main.jpg",
    galleryImages: [
      "/images/events/cypher-2025/gallery-1.jpg",
      "/images/events/cypher-2025/gallery-2.jpg",
      "/images/events/cypher-2025/gallery-3.jpg",
    ],
    tags: ["hackathon", "coding", "AI", "featured"],
    featured: true,
  },
  {
    id: "techvista-2025",
    title: "TechVista 2025",
    description: "A technical symposium showcasing the latest in emerging technologies and research.",
    longDescription: "TechVista 2025 was a two-day technical symposium that showcased cutting-edge research and innovation in emerging technologies. The event featured keynote speeches, panel discussions, and interactive exhibitions on topics ranging from Quantum Computing to Extended Reality.",
    date: "November 10-11, 2025",
    location: "Virtual & CVR College of Engineering",
    imageUrl: "/images/events/techvista-2025/main.jpg",
    tags: ["symposium", "research", "tech", "innovation"],
  },
  {
    id: "devcon-2025",
    title: "DevCon 2025",
    description: "A developer conference focused on web technologies and cloud computing.",
    longDescription: "DevCon 2025 brought together web developers, cloud architects, and tech enthusiasts for a day of learning and networking. The conference included hands-on workshops on modern web frameworks, cloud deployment strategies, and microservices architecture.",
    date: "September 5, 2025",
    location: "CVR College of Engineering, Hyderabad",
    imageUrl: "/images/events/devcon-2025/main.jpg",
    tags: ["conference", "tech", "web", "cloud"],
  },
  {
    id: "ai-nexus-2025",
    title: "AI Nexus 2025",
    description: "An intensive workshop series on artificial intelligence and machine learning.",
    longDescription: "AI Nexus 2025 was a series of intensive workshops designed to help students and professionals dive deep into artificial intelligence and machine learning. Participants worked on real-world projects and gained hands-on experience with tools like TensorFlow, PyTorch, and Hugging Face.",
    date: "July 20-22, 2025",
    location: "CVR College of Engineering, Hyderabad",
    imageUrl: "/images/events/ai-nexus-2025/main.jpg",
    tags: ["workshop", "AI", "tech", "machine learning"],
  },
  {
    id: "blockchain-summit-2025",
    title: "Blockchain Summit 2025",
    description: "A deep dive into blockchain technology, cryptocurrencies, and decentralized applications.",
    longDescription: "The Blockchain Summit 2025 was a comprehensive exploration of blockchain technology, cryptocurrencies, and decentralized applications. Industry experts shared insights on topics like smart contracts, DeFi, and Web3, while participants engaged in hands-on sessions building simple dApps.",
    date: "May 15, 2025",
    location: "Virtual Event",
    imageUrl: "/images/events/blockchain-2025/main.jpg",
    tags: ["tech", "blockchain", "crypto", "web3"],
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
  },
  {
    id: "robofest-2025",
    title: "RoboFest 2025",
    description: "A robotics competition featuring autonomous robots and remote-controlled challenges.",
    longDescription: "RoboFest 2025 was an exciting robotics competition that featured autonomous robots and remote-controlled challenges. Teams competed in categories like line following, maze solving, and robotic arms, showcasing their engineering and programming skills.",
    date: "February 18-19, 2025",
    location: "CVR College of Engineering, Hyderabad",
    imageUrl: "/images/events/robofest-2025/main.jpg",
    tags: ["tech", "robotics", "engineering", "competition"],
  }
]; 