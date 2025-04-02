'use client'

import React, { useState, useEffect } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { siteConfig } from "../../config/home.config";
import { navigationConfig } from "../../config/navigation.config";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/button";
import { cypher2k25EventsConfig, cypher2k25FAQsConfig, getEventRegistrationLink } from "../../config/cypher2k25event.config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Badge } from "../../components/ui/badge";

export const Cypher = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredActivities, setFilteredActivities] = useState(cypher2k25EventsConfig);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);
  const [currentEventTitle, setCurrentEventTitle] = useState<string>("Cypher 2K25 Passes");
  const [registrationLink, setRegistrationLink] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  // Counter animation states
  const [participantsCount, setParticipantsCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [prizeCount, setPrizeCount] = useState(0);
  const [showCounters, setShowCounters] = useState(false);
  
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Start counter animations after component mounts
  useEffect(() => {
    // Wait for the initial load and hero animations
    const timer = setTimeout(() => {
      setShowCounters(true);
      
      // Start the participant counter with sequential animation
      let currentParticipants = 0;
      const participantsTarget = 550;
      const participantsIncrement = 50; // Increment by 5 for faster animation
      const participantsInterval = setInterval(() => {
        if (currentParticipants < participantsTarget) {
          currentParticipants = Math.min(currentParticipants + participantsIncrement, participantsTarget);
          setParticipantsCount(currentParticipants);
        } else {
          clearInterval(participantsInterval);
        }
      }, 50); // Update every 30ms for smooth animation
      
      // Start the events counter with sequential animation after a delay
      let eventsInterval: ReturnType<typeof setInterval>;
      const eventsTimer = setTimeout(() => {
        let currentEvents = 0;
        const eventsTarget = 15;
        eventsInterval = setInterval(() => {
          if (currentEvents < eventsTarget) {
            currentEvents++;
            setEventsCount(currentEvents);
          } else {
            clearInterval(eventsInterval);
          }
        }, 50); // Update every 100ms for events counter
      }, 100);
      
      // Start the prize counter with sequential animation after a delay
      let prizeInterval: ReturnType<typeof setInterval>;
      const prizeTimer = setTimeout(() => {
        let currentPrize = 0;
        const prizeTarget = 30;
        prizeInterval = setInterval(() => {
          if (currentPrize < prizeTarget) {
            currentPrize++;
            setPrizeCount(currentPrize);
          } else {
            clearInterval(prizeInterval);
          }
        }, 10); // Slower update for prize counter
      }, 300);
      
      // Cleanup function
      return () => {
        clearInterval(participantsInterval);
        clearTimeout(eventsTimer);
        clearInterval(eventsInterval);
        clearTimeout(prizeTimer);
        clearInterval(prizeInterval);
      };
      
    }, 500); // Reduced from 2000ms to 500ms for quicker appearance
    
    // Cleanup the main timer
    return () => clearTimeout(timer);
  }, []);
  
  // Countdown timer effect
  useEffect(() => {
    // Set target date to April 3, 2025, 7:00 PM IST
    const targetDate = new Date('2025-04-03T19:00:00+05:30');
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        // If past the date, set all to 0
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeRemaining({ days, hours, minutes, seconds });
    };
    
    // Initial update
    updateCountdown();
    
    // Update every second
    const interval = setInterval(updateCountdown, 1000);
    
    // Cleanup
    return () => clearInterval(interval);
  }, []);
  
  // Filter events by category
  useEffect(() => {
    if (selectedCategory) {
      setFilteredActivities(cypher2k25EventsConfig.filter(
        activity => activity.category === selectedCategory
      ));
    } else {
      setFilteredActivities(cypher2k25EventsConfig);
    }
  }, [selectedCategory]);
  
  // Function to handle event registration
  const handleEventRegistration = (eventId: string, eventTitle: string) => {
    // For the general event or any button in the main page that should go to the Tally form
    if (eventId === "general") {
      // Directly redirect to the Tally.so form
      window.open("https://tally.so/r/npzkJ8", '_blank');
      return;
    }
    
    // For other events, keep the existing logic
    const link = getEventRegistrationLink(eventId);
    setCurrentEventId(eventId);
    setCurrentEventTitle(eventTitle);
    setRegistrationLink(link);
    
    if (link === "free") {
      // Show modal for free events
      setIsRegistrationOpen(true);
    } else if (link) {
      // Open the registration link in a new tab
      window.open(link, '_blank');
    } else {
      // Open the modal to show the "On Spot Registrations / Pass registrations only" message
      setIsRegistrationOpen(true);
    }
  };

  return (
    <div className="bg-white w-full [background:radial-gradient(50%_50%_at_50%_0%,rgba(104,82,66,1)_0%,rgba(23,35,51,1)_35%,rgba(0,0,0,1)_73%)] min-h-screen relative overflow-hidden">
      
      {/* Header */}
      <Header 
        navigation={navigationConfig}
        siteConfig={siteConfig}
        logoLinkUrl="/"
      />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center pt-28 pb-16 md:pt-32 md:pb-12">
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
        <div className="relative z-20 w-full container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-8 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 mt-8 md:mt-4"
          >
            <Badge 
              variant="outline" 
              className="px-4 py-2 border-amber-500 text-amber-400"
            >
              04 April, 2025
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
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-purple-900/40 border border-purple-500/40 rounded-lg px-4 py-2 backdrop-blur-sm max-w-xl mx-auto"
          >
            <p className="text-purple-200 font-medium text-center flex items-center justify-center">
              Referral Rewards Available! Earn up to ₹2000 or Free Passes
            </p>
          </motion.div>
          
          <motion.p 
            className="mt-6 text-xl md:text-2xl text-white/90 max-w-3xl mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            CVR's flagship tech extravaganza featuring hackathons, coding competitions, 
            workshops, and cultural events. Join us for an unforgettable experience of innovation, learning, and fun!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Button 
              className="px-8 py-6 bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg rounded-full"
              onClick={() => handleEventRegistration("general", "Cypher 2K25 Passes")}
            >
              Grab Passes Now
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-6 border-amber-500/50 text-amber-400 hover:bg-amber-500/10 font-bold text-lg rounded-full"
              onClick={() => setIsContactModalOpen(true)}
            >
              Contact Us?
            </Button>
          </motion.div>
          
          {/* Registration countdown timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 bg-red-900/30 border border-red-500/30 rounded-lg px-6 py-3 backdrop-blur-sm"
          >
            <div className="flex items-center justify-center mb-2">
              <svg className="h-5 w-5 text-red-500 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <p className="text-red-400 font-bold text-lg">REGISTRATION CLOSES SOON!</p>
            </div>
            <p className="text-white/80 text-sm text-center mb-2">Don't miss out! Register before <span className="text-red-400 font-semibold">April 3, 2025, 7PM IST</span></p>
            <div className="flex justify-center items-center gap-4 text-white">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-red-500">{timeRemaining.days}</span>
                <span className="text-xs text-red-400/80">DAYS</span>
              </div>
              <span className="text-xl text-red-500 mb-3">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-red-500">{timeRemaining.hours}</span>
                <span className="text-xs text-red-400/80">HOURS</span>
              </div>
              <span className="text-xl text-red-500 mb-3">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-red-500">{timeRemaining.minutes}</span>
                <span className="text-xs text-red-400/80">MINS</span>
              </div>
              <span className="text-xl text-red-500 mb-3">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-red-500">{timeRemaining.seconds}</span>
                <span className="text-xs text-red-400/80">SECS</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showCounters ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="mt-8 md:mt-12 lg:mt-16 flex gap-6 items-center justify-center text-white/50"
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-amber-500 flex">
                {participantsCount}+
              </span>
              <span className="text-sm mt-1">Participants</span>
            </div>
            <div className="h-12 w-px bg-white/20"></div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-amber-500 list flex">
                {eventsCount}+
              </span>
              <span className="text-sm mt-1">Events</span>
            </div>
            <div className="h-12 w-px bg-white/20"></div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-amber-500 flex">
                ₹{prizeCount}K+
              </span>
              <span className="text-sm mt-1">Prize Pool</span>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="relative py-20 z-20 bg-gradient-to-b from-black/50 to-black/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">About <span className="text-amber-500">Cypher 2K25</span></h2>
            <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full mb-8"></div>
            <p className="text-white/80 max-w-3xl mx-auto text-lg">
              CVR's flagship tech extravaganza that brings together the brightest minds for an unforgettable experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gradient-to-br from-amber-900/20 to-black/60 backdrop-blur-sm p-6 rounded-xl border border-amber-500/20 transform transition-all duration-300 hover:-translate-y-2 hover:border-amber-500/40">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">What is Cypher?</h3>
              <p className="text-white/80">
              Cypher, the flagship technical symposium of CVR College of Engineering's Computer Science and Engineering Department, brings together the brightest minds from colleges across India. The 2025 edition promises to push the boundaries of innovation, creativity, and excitement like never before!
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-900/20 to-black/60 backdrop-blur-sm p-6 rounded-xl border border-amber-500/20 transform transition-all duration-300 hover:-translate-y-2 hover:border-amber-500/40">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">What to Expect?</h3>
              <p className="text-white/80">
                The event features action-packed hackathons, coding competitions, 
                technical workshops, cultural and fun activities. Whether you're a coding enthusiast, or someone looking to have fun and network, Cypher 2K25 
                has something for everyone.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-900/20 to-black/60 backdrop-blur-sm p-6 rounded-xl border border-amber-500/20 transform transition-all duration-300 hover:-translate-y-2 hover:border-amber-500/40">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Why Participate?</h3>
              <p className="text-white/80">
                Join us for an unforgettable experience of learning, innovation, and fun! Network with other college students, showcase your talents, win exciting prizes, and build lasting connections with like-minded tech enthusiasts.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-amber-900/10 to-black/60 p-8 rounded-lg border border-amber-500/10 text-center">
              <h3 className="text-amber-500 font-bold text-lg mb-3">When</h3>
              <p className="text-white text-lg">April 4, 2025</p>
            </div>
            <div className="bg-gradient-to-br from-amber-900/10 to-black/60 p-8 rounded-lg border border-amber-500/10 text-center">
              <h3 className="text-amber-500 font-bold text-lg mb-3">Where</h3>
              <p className="text-white text-lg">CVR College of Engineering, Hyderabad</p>
            </div>
            <div className="bg-gradient-to-br from-amber-900/10 to-black/60 p-8 rounded-lg border border-amber-500/10 text-center">
              <h3 className="text-amber-500 font-bold text-lg mb-3">Registration</h3>
              <p className="text-white text-lg">Pass entry / Pay per event</p>
            </div>
            <div className="bg-gradient-to-br from-amber-900/10 to-black/60 p-8 rounded-lg border border-amber-500/10 text-center">
              <h3 className="text-amber-500 font-bold text-lg mb-3">Team Size</h3>
              <p className="text-white text-lg">Varies by event (1-4 members)</p>
            </div>
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
                Get your passes now for a hassle-free Cypher 2K25 experience! Skip payment queues, enjoy a seamless entry, and relish a queue-free lunch while immersing yourself in the excitement of the event.
              </p>
              <ul className="text-white/70 space-y-2 mb-6">                
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Solo Pass: <span className="text-amber-400 font-medium ml-1">₹410 per person</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Duo Pass: <span className="text-amber-400 font-medium ml-1">₹775 per person</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Trio Pass: <span className="text-amber-400 font-medium ml-1">₹1165 per person</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-amber-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Quadro Pass: <span className="text-amber-400 font-medium ml-1">₹1550 per person</span>
                </li>
              </ul>
              
              {/* Pay Per Event Section */}
              <div className="mt-6 mb-6 p-5 bg-gradient-to-r from-indigo-900/40 to-black/60 rounded-lg border border-indigo-500/40">
                <h3 className="text-indigo-300 font-bold text-xl mb-3 flex items-center">
                  <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  Pay Per Event Registration
                </h3>
                <div className="bg-indigo-900/20 p-3 rounded-lg mb-3">
                  <p className="text-white/90 text-base">
                    Don't want to purchase a pass? You can register for <span className="text-indigo-300 font-medium">individual events</span> by paying the registration fee for each specific event you want to attend.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start bg-indigo-900/10 p-2 rounded">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white/80 text-sm">Choose only the events you're interested in</span>
                  </div>
                  <div className="flex items-start bg-indigo-900/10 p-2 rounded">
                    <svg className="h-5 w-5 text-indigo-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white/80 text-sm">Pay only for what you attend</span>
                  </div>
                </div>
              </div>
              
              {/* Referral Program Section */}
              <div className="mt-6 p-5 bg-gradient-to-r from-purple-900/30 to-black/60 rounded-lg border border-purple-500/30">
                <h3 className="text-purple-300 font-bold text-lg mb-3 flex items-center">
                  Referral Rewards Program
                </h3>
                <p className="text-white/80 mb-3">
                  Refer your friends and earn rewards! Ask your friends to enter <span className="text-purple-300 font-medium">YOUR phone number</span> in the referral field when they register.
                </p>
                <div className="space-y-2 text-white/90">
                  <div className="flex justify-between items-center text-sm">
                    <span>Refer <span className="text-purple-300 font-medium">10 Quadra Passes</span></span>
                    <span className="text-purple-300">₹2000 or Free Pass</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Refer <span className="text-purple-300 font-medium">20 Trio Passes</span></span>
                    <span className="text-purple-300">₹1500 or Free Pass</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Refer <span className="text-purple-300 font-medium">20 Duo Passes</span></span>
                    <span className="text-purple-300">₹1000 or Free Pass</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Refer <span className="text-purple-300 font-medium">10 Single Passes</span></span>
                    <span className="text-purple-300">₹500 or Free Pass</span>
                  </div>
                </div>
                <p className="text-white/60 text-xs mt-3">
                  *IMPORTANT: When your friends register, they must enter <span className="text-purple-300 font-medium">YOUR phone number</span> in the <span className="text-purple-300 font-medium">"referred phone no"</span> field to credit you with the referral.
                </p>
              </div>
              
              <div className="mt-4">
                <Button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg rounded-full"
                onClick={() => handleEventRegistration("general", "Cypher 2K25 Passes")}>
                  Register Now
                </Button>
                <p className="text-white/50 mt-3 text-sm">
                  Registration closes: April 3, 2025, 7PM IST
                </p>
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
                  <span className="text-white/80">Lunch provided</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/80">Be a part of out Traditional Event too</span>
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
                <div className="overflow-hidden relative">
                  <img 
                    src={activity.image} 
                    alt={activity.title} 
                    className="w-full transition-transform duration-500 group-hover:scale-105"
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
                    {activity.prize !== "NA" && (
                      <span className="text-amber-500 font-bold">
                        Prize Pool: {activity.prize}
                      </span>
                    )}
                    {activity.prize === "NA" && <span></span>}
                    <Button 
                      variant="outline" 
                      className="text-xs border-white/20 hover:bg-white/10 hover:border-amber-500/50"
                      onClick={() => handleEventRegistration(activity.id, activity.title)}
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      
      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="relative bg-gradient-to-br from-amber-900/30 to-black/90 backdrop-blur-md border border-amber-500/30 rounded-xl shadow-[0_0_25px_rgba(234,179,8,0.3)] p-6 w-full max-w-md overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="absolute top-4 right-4 text-amber-400 hover:text-amber-300 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-amber-500">Contact Us</h2>
                <p className="text-white/70 mt-2">Reach out to our team for any queries or assistance</p>
              </div>
              
              <div className="space-y-5">
                {[
                  { name: "Prateek", phone: "7075182829" },
                  { name: "Kruthin", phone: "9032150299" },
                  { name: "Mokshagna", phone: "7095662277" },
                  { name: "Meghana", phone: "8179790099" }
                ].map((contact, index) => (
                  <a 
                    href={`tel:${contact.phone}`}
                    key={index} 
                    className="bg-white/5 border border-amber-500/10 rounded-lg p-4 flex items-center justify-between hover:bg-amber-500/10 transition-colors duration-300 block"
                  >
                    <div>
                      <p className="font-medium text-white">{contact.name}</p>
                      <span className="text-amber-400/80">
                        {contact.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}
                      </span>
                    </div>
                    <div className="bg-amber-500/20 text-amber-400 p-2 rounded-full">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </a>
                ))}
                
                <div className="mt-6 pt-6 border-t border-amber-500/20">
                  <p className="text-white text-center font-medium mb-3">Join our WhatsApp Support Group</p>
                  <a 
                    href="https://chat.whatsapp.com/IEChCiBD9L27YTsSxKKVgV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3 px-4 rounded-lg w-full font-medium transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Support Desk
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isRegistrationOpen && !registrationLink && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative bg-black/90 backdrop-blur-md rounded-xl shadow-2xl p-6 w-full max-w-md overflow-y-auto max-h-full">
            <button
              onClick={() => setIsRegistrationOpen(false)}
              className="absolute top-2 right-2 text-white text-2xl leading-none focus:outline-none"
            >
              &times;
            </button>
            <h2 className="text-2xl text-amber-500 font-bold mb-4 text-center">
              {currentEventTitle} Registration
            </h2>
            <div className="text-center p-6">
              <svg className="mx-auto h-16 w-16 text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-white text-lg mb-6">On Spot Registrations / Pass registrations only</p>
              <p className="text-white/70 mb-6">
                This event doesn't have online registration. Please register on-spot at the event or purchase a Cypher 2K25 pass.
              </p>
              <Button
                onClick={() => setIsRegistrationOpen(false)}
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {isRegistrationOpen && registrationLink === "free" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative bg-black/90 backdrop-blur-md rounded-xl shadow-2xl p-6 w-full max-w-md overflow-y-auto max-h-full">
            <button
              onClick={() => setIsRegistrationOpen(false)}
              className="absolute top-2 right-2 text-white text-2xl leading-none focus:outline-none"
            >
              &times;
            </button>
            <h2 className="text-2xl text-amber-500 font-bold mb-4 text-center">
              {currentEventTitle}
            </h2>
            <div className="text-center p-6">
              <svg className="mx-auto h-16 w-16 text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-white text-lg mb-6">Feel free to come!</p>
              <p className="text-white/70 mb-6">
                This is a free event. No registration required. Just show up and enjoy!
              </p>
              <Button
                onClick={() => setIsRegistrationOpen(false)}
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
              >
                Awesome!
              </Button>
            </div>
          </div>
        </div>
      )}

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
              {cypher2k25FAQsConfig.map((faq, index) => (
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
            <Button 
              variant="outline" 
              className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
              onClick={() => setIsContactModalOpen(true)}
            >
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
            <Button className="px-10 py-6 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xl rounded-full"
              onClick={() => handleEventRegistration("general", "Cypher 2K25 Passes")}>
              Register Now
            </Button>
            <p className="text-white/50 mt-6">
              Limited spots available. Last date for registration: April 3, 2025, 7PM IST.
            </p>
          </div>
        </div>
      </section>
      
      <Footer 
        siteConfig={siteConfig} 
        socialLinks={[
          {
            name: "LinkedIn",
            url: "https://www.linkedin.com/company/cybernauts-cvr/",
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            )
          },
          {
            name: "Instagram",
            url: "https://www.instagram.com/cybernauts_cvr/",
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.772-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            )
          },
          {
            name: "Email",
            url: "mailto:cybernautscvr@gmail.com",
            className: "w-6 h-6",
            icon: (
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            )
          }
        ]}
      />
    </div>
  );
};