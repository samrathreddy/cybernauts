'use client'

import React, { useState, useEffect } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { siteConfig } from "../../config/home.config";
import { navigationConfig } from "../../config/navigation.config";
import { motion } from "framer-motion";
import { renderCanvas } from "../../components/ui/canvas";
import { Button } from "../../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Badge } from "../../components/ui/badge";

// Define event activity types
interface EventActivity {
  id: string;
  title: string;
  description: string;
  category: "tech" | "non-tech";
  image: string;
  prize: string;
}

// Define FAQ type
interface FAQ {
  question: string;
  answer: string;
}

// Event activities data
const eventActivities: EventActivity[] = [
  {
    id: "hackathon",
    title: "36-Hour Hackathon",
    description: "Build innovative solutions to real-world problems in teams of 2-4 members.",
    category: "tech",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f59e0b'/%3E%3C/svg%3E",
    prize: "₹50,000"
  },
  {
    id: "ctf",
    title: "Capture The Flag",
    description: "Test your cybersecurity skills in this exciting challenge to find vulnerabilities.",
    category: "tech",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f59e0b'/%3E%3C/svg%3E",
    prize: "₹30,000"
  },
  {
    id: "coding",
    title: "Competitive Coding",
    description: "Solve complex algorithmic problems in the shortest time possible.",
    category: "tech",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f59e0b'/%3E%3C/svg%3E",
    prize: "₹25,000"
  },
  {
    id: "gamedev",
    title: "Game Development",
    description: "Design and build a game based on the surprise theme.",
    category: "tech",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f59e0b'/%3E%3C/svg%3E",
    prize: "₹35,000"
  },
  {
    id: "treasure",
    title: "Tech Treasure Hunt",
    description: "Find clues and solve technical puzzles in this exciting campus-wide game.",
    category: "non-tech",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f59e0b'/%3E%3C/svg%3E",
    prize: "₹15,000"
  },
  {
    id: "gaming",
    title: "eSports Tournament",
    description: "Compete in popular games like Valorant, CS:GO, and FIFA.",
    category: "non-tech",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f59e0b'/%3E%3C/svg%3E",
    prize: "₹20,000"
  },
  {
    id: "debate",
    title: "Tech Debate",
    description: "Debate on cutting-edge technology topics and their impact on society.",
    category: "non-tech",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f59e0b'/%3E%3C/svg%3E",
    prize: "₹10,000"
  },
  {
    id: "cultural",
    title: "Cultural Night",
    description: "Showcase your talent in music, dance, and other performing arts.",
    category: "non-tech",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f59e0b'/%3E%3C/svg%3E",
    prize: "₹20,000"
  }
];

// FAQs data
const faqs: FAQ[] = [
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

export const Cypher = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredActivities, setFilteredActivities] = useState(eventActivities);
  
  // Filter events by category
  useEffect(() => {
    if (selectedCategory) {
      setFilteredActivities(eventActivities.filter(
        activity => activity.category === selectedCategory
      ));
    } else {
      setFilteredActivities(eventActivities);
    }
  }, [selectedCategory]);
  
  // Initialize canvas animation
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <div className="bg-white w-full [background:radial-gradient(50%_50%_at_50%_0%,rgba(104,82,66,1)_0%,rgba(23,35,51,1)_35%,rgba(0,0,0,1)_73%)] min-h-screen relative overflow-hidden">
      {/* Canvas for cursor animation effect */}
      <canvas
        className="pointer-events-none fixed inset-0 w-full h-full z-[5]"
        id="canvas"
      />
      
      {/* Header */}
      <Header 
        navigation={navigationConfig}
        siteConfig={siteConfig}
      />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] overflow-hidden flex items-center">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black z-10"></div>
        <div className="absolute inset-0 w-full h-full bg-black/50 z-[1]"></div>
        
        {/* Animated background with gradient instead of image */}
        <motion.div 
          className="absolute inset-0 w-full h-[120%] bg-gradient-to-b from-amber-700 to-black z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Hero content */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Badge 
              variant="outline" 
              className="px-4 py-2 border-amber-500 text-amber-400"
            >
              03 April, 2025
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            CYPHER <span className="text-amber-500">2K25</span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-xl md:text-2xl text-white/90 max-w-3xl mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            CVR's flagship tech extravaganza featuring hackathons, coding competitions, 
            workshops, and cultural events. Join us for three days of innovation, learning, and fun!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Button 
              className="px-8 py-6 bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg rounded-full"
            >
              Pre-Register Now
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-6 border-amber-500/50 text-amber-400 hover:bg-amber-500/10 font-bold text-lg rounded-full"
            >
              Contact Us?
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 flex gap-6 items-center justify-center text-white/50"
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-amber-500">500+</span>
              <span className="text-sm mt-1">Participants</span>
            </div>
            <div className="h-12 w-px bg-white/20"></div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-amber-500">20+</span>
              <span className="text-sm mt-1">Events</span>
            </div>
            <div className="h-12 w-px bg-white/20"></div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-amber-500">₹2L+</span>
              <span className="text-sm mt-1">Prize Pool</span>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="relative py-20 container mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About <span className="text-amber-500">Cypher 2K25</span></h2>
            <p className="text-white/80 mb-4">
              Cypher is CVR College of Engineering's premier technical symposium, attracting 
              the brightest minds from colleges across India. In its 2025 edition, we're pushing the 
              boundaries of innovation and creativity.
            </p>
            <p className="text-white/80 mb-4">
              The event spans three action-packed days featuring hackathons, coding competitions, 
              technical workshops, and cultural activities. Whether you're a coding enthusiast, a 
              hardware hacker, or someone looking to network with industry professionals, Cypher 2K25 
              has something for everyone.
            </p>
            <p className="text-white/80">
              Join us for an unforgettable experience of learning, innovation, and fun!
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="text-amber-500 font-bold mb-2">When</h3>
                <p className="text-white">April 3, 2025</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="text-amber-500 font-bold mb-2">Where</h3>
                <p className="text-white">CVR College of Engineering, Hyderabad</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="text-amber-500 font-bold mb-2">Registration Type</h3>
                <p className="text-white">Pass entry / Pay as you play</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="text-amber-500 font-bold mb-2">Team Size</h3>
                <p className="text-white">Varies by event (1-4 members)</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-amber-500 to-amber-800">
              {/* Placeholder for the about image */}
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-black text-xl font-bold">Cypher 2K25</span>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-amber-500 p-6 rounded-lg">
              <p className="text-black font-bold text-xl">Early Bird Registrations Open!</p>
              <p className="text-black/80 text-sm mt-1">Limited spots available</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Event Catalog Section */}
      <section className="relative py-20 bg-black/30 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Event <span className="text-amber-500">Catalog</span></h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Explore our diverse range of technical and non-technical events. From coding challenges to cultural performances, Cypher 2K25 has something for everyone.
            </p>
            
            {/* Category filter */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === null 
                    ? 'bg-amber-500 text-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                All Events
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === "tech" 
                    ? 'bg-amber-500 text-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                onClick={() => setSelectedCategory("tech")}
              >
                Technical
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === "non-tech" 
                    ? 'bg-amber-500 text-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                onClick={() => setSelectedCategory("non-tech")}
              >
                Non-Technical
              </button>
            </div>
          </div>
          
          {/* Events grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredActivities.map((activity) => (
              <motion.div
                key={activity.id}
                className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-amber-500/50 transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={activity.image} 
                    alt={activity.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-0 right-0 bg-amber-500 text-black font-bold px-3 py-1 text-sm">
                    {activity.category === "tech" ? "Technical" : "Non-Technical"}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                    {activity.title}
                  </h3>
                  <p className="text-white/70 mt-2 h-20">
                    {activity.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-amber-500 font-bold">
                      Prize: {activity.prize}
                    </span>
                    <Button 
                      variant="outline" 
                      className="text-xs border-white/20 hover:bg-white/10 hover:border-amber-500/50"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Registration Section */}
      <section className="relative py-20 container mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="bg-gradient-to-r from-amber-900/20 to-black/40 backdrop-blur-sm rounded-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to <span className="text-amber-500">Join Us</span>?
              </h2>
              <p className="text-white/80 mb-6">
                Registration is open for individual events and complete packages. Pre-register now to secure your spot 
                and get exclusive early bird discounts! On-spot registrations will also be available, subject to availability.
              </p>
              <ul className="text-white/70 space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Early Bird (Until March 1): <span className="text-amber-400 font-medium ml-1">₹400 per person</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Regular Registration: <span className="text-amber-400 font-medium ml-1">₹500 per person</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  On-Spot Registration: <span className="text-amber-400 font-medium ml-1">₹600 per person</span>
                </li>
              </ul>
              <div className="mt-4">
                <Button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg rounded-full">
                  Register Now
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 bg-black/50 p-6 rounded-lg border border-amber-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Registration Includes</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/80">Access to all events</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/80">Lunch</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/80">Certificate of participation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/80">Transportation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/80">Networking opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQs Section */}
      <section className="relative py-20 bg-black/30 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked <span className="text-amber-500">Questions</span></h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Find answers to common questions about Cypher 2K25. If you can't find what you're looking for, feel free to contact us.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-amber-500/20 rounded-lg overflow-hidden bg-black/60 backdrop-blur-sm"
                >
                  <AccordionTrigger className="px-6 py-4 text-white hover:text-amber-400 text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 text-white/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-white/70 mb-4">Still have questions?</p>
            <Button variant="outline" className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="relative py-24 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-900/30 to-black/60 backdrop-blur-sm rounded-2xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to be part of <span className="text-amber-500">Cypher 2K25</span>?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
              Don't miss this opportunity to showcase your skills, learn from the best, and win exciting prizes!
            </p>
            <Button className="px-10 py-6 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xl rounded-full">
              Register Now
            </Button>
            <p className="text-white/50 mt-6">
              Limited spots available. Last date for registration: April 2, 2025.
            </p>
          </div>
        </div>
      </section>
      
      <Footer siteConfig={siteConfig} />
    </div>
  );
}; 