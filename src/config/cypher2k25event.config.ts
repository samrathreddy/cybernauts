// Define event activity types
export interface EventActivity {
  id: string;
  title: string;
  description: string;
  category: "tech" | "non-tech";
  image: string;
  prize: string;
  registrationLink?: string; // Optional registration link field
}

// Event activities data
export const cypher2k25EventsConfig: EventActivity[] = [
  {
    id: "frontendblitz",
    title: "Frontend Blitz",
    description: "Participate in Frontend Blitz to build innovative UI solutions in teams of 1-4 members.",
    category: "tech",
    image: "/images/cypher-2k25/Frontend Blitz.png",
    prize: "₹1,500",
    registrationLink: "https://tally.so/r/wkz5ko"
  },
  {
    id: "promptcraft",
    title: "Prompt Craft",
    description: "Participate in Prompt Craft to test your ability to generate creative prompts and build things.",
    category: "tech",
    image: "/images/cypher-2k25/Prompt Craft.png",
    prize: "₹1,500",
    registrationLink: "https://tally.so/r/nrYVv2"
  },
  {
    id: "code&chaos2.0",
    title: "Code & Chaos 2.0",
    description: "Engage in Code & Chaos 2.0 to solve not only algorithmic challenges there is some more real life challenges to solve.",
    category: "tech",
    image: "/images/cypher-2k25/Code & Chaos 2.o.png",
    prize: "₹3,000",
    registrationLink: "https://tally.so/r/mVNVDM"
  },
  {
    id: "hackathon",
    title: "Hackathon",
    description: "Join the Hackathon to collaborate and innovate on real-world problems. No theme this time, No restrictions. You can build anything.",
    category: "tech",
    image: "/images/cypher-2k25/Hackathon - ICE.png",
    prize: "₹10,000",
    registrationLink: "https://tally.so/r/mRj4kp"
  },
  {
    id: "gamedevbattle",
    title: "Game Dev Battle",
    description: "Join Game Dev Battle to design and develop a game.",
    category: "tech",
    image: "/images/cypher-2k25/Game Dev Battle - ICE.png",
    prize: "₹5,000",
    registrationLink: "https://tally.so/r/wvz404"
  },
  {
    id: "paperpresentation",
    title: "Paper Presentation",
    description: "Take part in Paper Presentation and showcase your research and technical expertise.",
    category: "tech",
    image: "/images/cypher-2k25/Paper Presentation.png",
    prize: "₹3,000",
    registrationLink: "https://tally.so/r/mDa50E"
  },
  {
    id: "posterpresentation",
    title: "Poster Presentation",
    description: "Participate in Poster Presentation to visually communicate your ideas and research.",
    category: "tech",
    image: "/images/cypher-2k25/Poster Presentation - ICE.png",
    prize: "₹3,500",
    registrationLink: "https://tally.so/r/m6PRvo"
  },
  {
    id: "blindtyping",
    title: "Blind Typing",
    description: "Prove your speed and accuracy in Blind Typing challenges.",
    category: "tech",
    image: "/images/cypher-2k25/Blind Typing.png",
    prize: "₹1,500",
    registrationLink: "https://tally.so/r/3qzOvg"
  },
  {
    id: "fandomquiz",
    title: "Fandom Quiz",
    description: "Showcase your knowledge in music, dance, and pop culture in the Fandom Quiz.",
    category: "tech",
    image: "/images/cypher-2k25/fandom quiz.png",
    prize: "₹1,500",
    registrationLink: "https://tally.so/r/3lzLvN"
  },
  {
    id: "treasurehunt",
    title: "Treasure Hunt",
    description: "Join the Treasure Hunt to decipher clues and solve puzzles across campus",
    category: "tech",
    image: "/images/cypher-2k25/Treasure Hunt.png",
    prize: "₹3000",
    registrationLink: "https://tally.so/r/wMVL7k"
  },
  {
    id: "openmic",
    title: "Open Mic",
    description: "Express yourself at Open Mic where creativity meets performance.",
    category: "non-tech",
    image: "/images/cypher-2k25/Open Mic.png",
    prize: "NA",
    registrationLink: "free"
  },
  {
    id: "tugofwar",
    title: "Tug Of War",
    description: "Team up and test your strength in the competitive Tug Of War.",
    category: "non-tech",
    image: "/images/cypher-2k25/Tug of War.png",
    prize: "NA"
  },
  {
    id: "gamearcade",
    title: "Game Arcade",
    description: "Dive into the Game Arcade for a variety of fun and challenging games.",
    category: "non-tech",
    image: "/images/cypher-2k25/Game Arcade.png",
    prize: "NA"
  },
  {
    id: "memecontest",
    title: "Meme Contest",
    description: "Unleash your humor and wit at the Meme Contest.",
    category: "non-tech",
    image: "/images/cypher-2k25/MEME Contest.png",
    prize: "NA"
  },
  {
    id: "dedicateasong",
    title: "Dedicate a Song",
    description: "Dedicate a song and share your heartfelt message through music.",
    category: "non-tech",
    image: "/images/cypher-2k25/Dedicate a asong.png",
    prize: "NA"
  },
  {
    id: "iplauction",
    title: "IPL Auction",
    description: "Experience the thrill of bidding in the IPL Auction simulation.",
    category: "non-tech",
    image: "/images/cypher-2k25/IPL Auction.png",
    prize: "NA"
  }
];

// Helper function to get registration link for an event
export const getEventRegistrationLink = (eventId: string): string | null => {
  const event = cypher2k25EventsConfig.find(event => event.id === eventId);
  return event?.registrationLink || null;
};

// Define FAQ type
export interface FAQ {
  question: string;
  answer: string;
}

// FAQs data
export const cypher2k25FAQsConfig: FAQ[] = [
  {
    question: "Can I invite my friends to participate?",
    answer: "Yes, you can invite your friends to participate in the event. You can do this by sharing this website with them."
  },
  {
    question: "Since CVR college even has traditional day celebrations, won't dress code be a problem?",
    answer: "No, you can wear your traditional attire to the event. If you are from other colleges, we warmly welcome you to join us for our traditional day celebrations too."
  },
  {
    question: "What is the registration fee?",
    answer: "It varies based on the type of pass membership, and even pay per event basis."
  },
  {
    question: "Is this fest open to students from other colleges?",
    answer: "Yes, Cypher 2K25 is an inter-college event. Students from any college or university can participate."
  },
  {
    question: "What is the refund policy?",
    answer: "All registrations are non-refundable."
  },
  {
    question: "Is Transport provided for participants?",
    answer: "Yes, we will provide transport from the college to the venue and back."
  },
  {
    question: "Can I participate in multiple events?",
    answer: "Yes, you can participate in multiple events as long as there are no schedule conflicts. Make sure to check the event timings before registering."
  },
  {
    question: "Is on-spot registration available?",
    answer: "Yes, on-spot registrations will be available, but pre-registration is highly recommended as spots are limited and pre-registered participants will get priority."
  },
  {
    question: "What do I need to bring to the event?",
    answer: "You should bring your college ID, registration confirmation."
  },
  {
    question: "Will food be provided during the event?",
    answer: "Yes, lunch will be provided during the event. Exclusively based on the type of pass membership."
  }
]; 