'use client'

import React, { useState, useEffect } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { siteConfig } from "../../config/home.config";
import { navigationConfig } from "../../config/navigation.config";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/button";
import { registrationConfig, getFormIdFromUrl, isFormOpen } from "../../config/registration.config";

interface TallyFormProps {
  formId: string;
  hideHeaders?: boolean;
  autoResize?: boolean;
  transparentBackground?: boolean;
}

export const Register = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [formId, setFormId] = useState<string>(registrationConfig.tallyForm.formId);
  
  // Handle form state
  const [formOpen, setFormOpen] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if the form is open and get the form ID from URL if available
    const checkFormStatus = async () => {
      try {
        setIsLoading(true);
        
        // Get form ID from URL if provided
        const urlFormId = getFormIdFromUrl();
        if (urlFormId) {
          setFormId(urlFormId);
        }
        
        // Check if the form is still open for submissions
        const formIsOpen = isFormOpen();
        setFormOpen(formIsOpen);
        
        // Simulate loading state for better UX
        setTimeout(() => {
          setIsLoading(false);
        }, registrationConfig.loadingTimeout);
      } catch (error) {
        setIsLoading(false);
        setFormError('Failed to load the registration form. Please try again later.');
        console.error('Error loading form:', error);
      }
    };
    
    checkFormStatus();
    
    // Handle message from Tally iframe
    const handleMessage = (event: MessageEvent) => {
      // Check if the message is from Tally
      if (event.data.type === 'tally-form-submit-success') {
        setIsFormSubmitted(true);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  
  const handleImageUploaded = (imageUrl: string) => {
    setUploadedImageUrl(imageUrl);
    
    // Optionally, you could send this image URL to Tally
    // via postMessage or another method to pre-fill a field
    if (window.frames[0]) {
      window.frames[0].postMessage({
        type: 'tally-set-field-value',
        key: 'profileImage', // This should match the field name in Tally
        value: imageUrl
      }, '*');
    }
  };
  
  const TallyEmbed: React.FC<TallyFormProps> = ({ 
    formId, 
    hideHeaders = registrationConfig.tallyForm.hideHeaders, 
    autoResize = registrationConfig.tallyForm.autoResize,
    transparentBackground = registrationConfig.tallyForm.transparentBackground
  }) => {
    return (
      <iframe
        src={`https://tally.so/embed/${formId}?hideHeaders=${hideHeaders}&transparentBackground=${transparentBackground ? 1 : 0}&autoResize=${autoResize ? 1 : 0}`}
        width="100%"
        height="800"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title={registrationConfig.tallyForm.title}
        style={{ 
          background: 'transparent',
          borderRadius: '12px'
        }}
      />
    );
  };

  return (
    <div className="bg-white w-full [background:radial-gradient(50%_50%_at_50%_0%,rgba(104,82,66,1)_0%,rgba(23,35,51,1)_35%,rgba(0,0,0,1)_73%)] min-h-screen relative overflow-hidden">
      {/* Header */}
      <Header 
        navigation={navigationConfig}
        siteConfig={siteConfig}
        logoLinkUrl="/"
      />
      
      {/* Registration Section */}
      <section className="relative pt-36 pb-20 z-20 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-r from-amber-900/20 to-black/40 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-amber-500/20 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <motion.h1 
                className="text-3xl md:text-5xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-amber-500">{registrationConfig.tallyForm.title}</span>
              </motion.h1>
              <motion.p 
                className="text-white/80 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {registrationConfig.tallyForm.description}
              </motion.p>
            </div>
            
            {/* Form container */}
            <div className="w-full max-w-4xl mx-auto">
              {isLoading ? (
                // Loading state
                <div className="bg-black/40 rounded-lg p-16 flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-16 h-16 border-t-4 border-amber-500 border-solid rounded-full animate-spin mb-4"></div>
                  <p className="text-white/80 text-lg">Loading registration form...</p>
                </div>
              ) : formError ? (
                // Error state
                <div className="bg-black/40 rounded-lg p-16 flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-white/80 text-lg text-center mb-6">{formError}</p>
                  <Button 
                    onClick={() => window.location.reload()}
                    className="bg-amber-500 hover:bg-amber-600 text-black"
                  >
                    Try Again
                  </Button>
                </div>
              ) : isFormSubmitted ? (
                // Success state after form submission
                <div className="bg-black/40 rounded-lg p-16 flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Registration Successful!</h3>
                  <p className="text-white/80 text-lg text-center mb-6">
                    {registrationConfig.successMessage}
                  </p>
                  <div className="flex gap-4">
                    <Button 
                      onClick={() => window.location.href = '/'}
                      className="bg-amber-500 hover:bg-amber-600 text-black"
                    >
                      Return Home
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => window.location.href = '/events'}
                      className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
                    >
                      Explore Events
                    </Button>
                  </div>
                </div>
              ) : !formOpen ? (
                // Form closed state
                <div className="bg-black/40 rounded-lg p-16 flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Registration Closed</h3>
                  <p className="text-white/80 text-lg text-center mb-6">
                    {registrationConfig.closedMessage}
                  </p>
                  <div className="flex gap-4">
                    <Button 
                      onClick={() => window.location.href = '/'}
                      className="bg-amber-500 hover:bg-amber-600 text-black"
                    >
                      Return Home
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setIsContactModalOpen(true)}
                      className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>
              ) : (
                // Actual form
                <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-amber-500/10">
                  <div className="h-[800px]">
                    <TallyEmbed formId={formId} />
                  </div>
                </div>
              )}
              
              {/* Info section below form */}
              {formOpen && !isFormSubmitted && !formError && !isLoading && (
                <motion.div 
                  className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="bg-gradient-to-br from-amber-900/10 to-black/60 p-6 rounded-lg border border-amber-500/10">
                    <h3 className="text-amber-400 font-bold text-lg mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Registration Notes
                    </h3>
                    <ul className="space-y-2 text-white/80">
                      {registrationConfig.registrationNotes.map((note, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-amber-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{note.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-900/10 to-black/60 p-6 rounded-lg border border-purple-500/10">
                    <h3 className="text-purple-400 font-bold text-lg mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {registrationConfig.contactSectionTitle || "Contact Information"}
                    </h3>
                    
                    {registrationConfig.contactPersons.length > 0 ? (
                      <div className="space-y-3">
                        {registrationConfig.contactPersons.map((contact, index) => (
                          <a 
                            href={`tel:${contact.phone}`}
                            key={index} 
                            className="bg-purple-900/20 p-3 rounded-lg flex items-center justify-between hover:bg-purple-900/30 transition-colors duration-300 group"
                          >
                            <div>
                              <p className="font-medium text-white group-hover:text-purple-200">{contact.name}</p>
                              {contact.role && (
                                <p className="text-purple-300/80 text-sm">{contact.role}</p>
                              )}
                              <span className="text-purple-200/80">
                                {contact.phone.replace(/(\d{5})(\d{5})/, '$1 $2')}
                              </span>
                            </div>
                            <div className="bg-purple-500/20 text-purple-400 p-2 rounded-full">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-white/70 italic">No contact information available.</p>
                    )}
                    
                    {registrationConfig.whatsAppSupport.inviteLink && (
                      <div className="mt-4 pt-4 border-t border-purple-500/20">
                        <a 
                          href={registrationConfig.whatsAppSupport.inviteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-2 px-3 rounded-lg w-full font-medium transition-colors duration-300 text-sm"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          {registrationConfig.whatsAppSupport.title}
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
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
                {registrationConfig.contactPersons.map((contact, index) => (
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
                    href={registrationConfig.whatsAppSupport.inviteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3 px-4 rounded-lg w-full font-medium transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {registrationConfig.whatsAppSupport.title}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <Footer siteConfig={siteConfig} />
    </div>
  );
}; 