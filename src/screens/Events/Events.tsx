'use client'

import React, { useState, useEffect, useRef } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { siteConfig } from "../../config/home.config";
import { navigationConfig } from "../../config/navigation.config";
import { eventsConfig, EventItem } from "../../config/events.config";
import { motion } from "framer-motion";


export const Events = (): JSX.Element => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredEvents, setFilteredEvents] = useState(eventsConfig);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [eventLoaded, setEventLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Main filter categories
  const mainCategories = ["hackathon", "workshop", "coding", "tech", "non-tech", "fdp", "social"];
  
  // Filter events by tag
  useEffect(() => {
    if (selectedTag) {
      // For main categories, we need to check if the event has any tag that includes the selected category
      setFilteredEvents(eventsConfig.filter(event => 
        event.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase()))
      ));
    } else {
      setFilteredEvents(eventsConfig);
    }
  }, [selectedTag]);
  
  // Initialize canvas animation
  useEffect(() => {
    setEventLoaded(true);
  }, []);

  return (
    <div className="bg-white w-full [background:radial-gradient(50%_50%_at_50%_0%,rgba(104,82,66,1)_0%,rgba(23,35,51,1)_35%,rgba(0,0,0,1)_73%)] min-h-screen relative overflow-hidden">
      
      {/* Header */}
      <Header 
        navigation={navigationConfig}
        siteConfig={siteConfig}
      />
      
      {/* Hero Section with elegant design */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-black z-10"></div>
        <div className="absolute inset-0 w-full h-full bg-black/50 z-[1]"></div>
        
        {/* Subtle parallax background */}
        <motion.div 
          className="absolute inset-0 w-full h-[120%] bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/events/events-hero-bg.jpg')",
            backgroundSize: "cover",
          }}
          initial={{ y: 0 }}
          animate={{ y: -20 }}
          transition={{ 
            y: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 30,
              ease: "linear"
            }
          }}
        />
        
        {/* Text content */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Events
          </motion.h1>
          
          <motion.div
            className="w-20 h-1 bg-amber-500 my-6"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          
          <motion.p 
            className="mt-4 text-xl md:text-2xl text-white/80 max-w-3xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore our past tech events, hackathons, and workshops that have inspired innovation and creativity.
          </motion.p>
        </div>
      </section>
      
      {/* Simplified Filter tags */}
      <section className="relative py-10 container mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <motion.div 
          className="flex flex-wrap gap-2 justify-center" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              selectedTag === null 
                ? 'bg-amber-500 text-black' 
                : 'bg-gray-800/70 text-amber-300 hover:bg-amber-500/20'
            }`}
            onClick={() => setSelectedTag(null)}
          >
            All Events
          </button>
          
          {mainCategories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all duration-300 ${
                selectedTag === category 
                  ? 'bg-amber-500 text-black' 
                  : 'bg-gray-800/70 text-amber-300 hover:bg-amber-500/20'
              }`}
              onClick={() => setSelectedTag(category)}
            >
              {category === "fdp" ? "FDP" : category}
            </button>
          ))}
        </motion.div>
      </section>
      
      {/* Main events grid */}
      <section 
        ref={containerRef}
        className="relative py-8 container mx-auto px-4 sm:px-6 lg:px-8 z-20"
      >
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredEvents.map((event, index) => (
            <motion.div
              layout
              key={event.id}
              className="event-card group relative overflow-hidden rounded-lg bg-black/80 backdrop-blur-sm border border-amber-900/20"
              initial={{ opacity: 0, y: 50 }}
              animate={eventLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                layout: { duration: 0.6, type: "spring" }
              }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedEvent(event)}
            >
              {/* upcoming tag */}
              {event.upcoming && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-md z-10">
                  upcoming
                </div>
              )}
              
              {/* Image container with zoom effect */}
              <div className="h-48 sm:h-56 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center transform duration-700 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${event.imageUrl})` }}
                ></div>
              </div>
              
              {/* Content */}
              <div className="p-5 flex flex-col gap-2">
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors duration-300">
                  {event.title}
                </h3>
                
                <div className="flex items-center text-amber-500/80 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                  </svg>
                  {event.date}
                </div>
                
                <div className="flex items-center text-amber-500/80 text-sm mt-1">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  {event.location}
                </div>
                
                <p className="text-white/70 mt-2">{event.description}</p>
                
                {/* Tags - show only up to 3 tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {event.tags.filter(tag => tag !== "upcoming").slice(0, 3).map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-amber-900/30 text-amber-300 text-xs rounded-md capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Elegant button */}
                <button className="mt-4 py-2 px-4 bg-transparent border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500 transition-all duration-300 text-sm rounded-md w-full">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* Event detail modal */}
      {selectedEvent && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          ></div>
          
          <motion.div 
            className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto bg-black/95 border border-amber-900/20 rounded-lg z-10"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <button 
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white/80 hover:text-white z-10"
              onClick={() => setSelectedEvent(null)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <div className="relative h-60 sm:h-80 overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedEvent.imageUrl})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {selectedEvent.title}
                </h2>
                
                <div className="flex flex-wrap items-center mt-2 text-amber-400">
                  <div className="flex items-center mr-4">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                    </svg>
                    {selectedEvent.date}
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                    {selectedEvent.location}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-white/90 text-lg">
                {selectedEvent.longDescription || selectedEvent.description}
              </p>
              
              {/* Gallery images */}
              {selectedEvent.galleryImages && selectedEvent.galleryImages.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedEvent.galleryImages.map((img, idx) => (
                      <div key={idx} className="rounded-lg overflow-hidden h-40 bg-gray-800">
                        <img 
                          src={img} 
                          alt={`${selectedEvent.title} gallery ${idx+1}`} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {selectedEvent.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-amber-900/30 text-amber-300 text-sm rounded-md capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      <Footer siteConfig={siteConfig} />
    </div>
  );
}; 