// Define registration form configuration types
export interface ContactPerson {
  name: string;
  phone: string;
  role?: string; // Optional role description
}

export interface RegistrationNote {
  text: string;
}

export interface ReferralInfo {
  title: string;
  description: string;
  note: string;
  rewards: {
    condition: string;
    reward: string;
  }[];
}

export interface TallyFormConfig {
  formId: string;
  title: string;
  description: string;
  hideHeaders: boolean;
  autoResize: boolean;
  transparentBackground: boolean;
}

export interface WhatsAppGroup {
  title: string;
  inviteLink: string;
}

export interface RegistrationConfig {
  eventName: string; // Name of the event (e.g., "Cypher 2K25", "Hackathon 2024", etc.)
  tallyForm: TallyFormConfig;
  registrationNotes: RegistrationNote[];
  referralProgram?: ReferralInfo; // Made optional
  contactPersons: ContactPerson[];
  whatsAppSupport: WhatsAppGroup;
  eventDate: string;
  registrationClosingDate: string;
  loadingTimeout: number; // Milliseconds to simulate loading in dev environment
  imageUploadEnabled: boolean;
  imageUploadConfig: {
    maxSizeMB: number;
    acceptedFormats: string[];
    uploadEndpoint?: string; // Optional: Use external upload service if provided
  };
  successMessage: string; // Message to show when registration is successful
  closedMessage: string; // Message to show when registration is closed
  contactSectionTitle?: string; // Title for the contact section (defaults to "Contact Information")
}

// Default registration configuration
export const registrationConfig: RegistrationConfig = {
  eventName: "Event Registration",
  tallyForm: {
    formId: "wA9Rey", // Default Tally form ID for registration
    title: "Event Registration",
    description: "Register for our upcoming event featuring workshops, competitions, and more.",
    hideHeaders: true,
    autoResize: true,
    transparentBackground: true
  },
  registrationNotes: [
    { text: "If the form is not loading, please reach out to cybernautscvr@gmail.com" },
    { text: "Registration closes on the specified closing date." },
    { text: "If the form is closed, it means the registration is over." }
  ],
  contactPersons: [
    { 
        name: "Sai kowluru", 
        phone: "8247056678", 
        role: "Lead"
      },
    { 
      name: "Samrath", 
      phone: "7981455290", 
      role: "Tech Support" 
    },
  ],
  whatsAppSupport: {
    title: "WhatsApp Support Desk",
    inviteLink: ""
  },
  eventDate: "TBD",
  registrationClosingDate: "TBD",
  loadingTimeout: 1500, // 1.5 seconds for simulating loading in development
  imageUploadEnabled: true,
  imageUploadConfig: {
    maxSizeMB: 2,
    acceptedFormats: ["image/jpeg", "image/png", "image/jpg"],
  },
  successMessage: "Thank you for registering. We've sent you a confirmation email with all the details.",
  closedMessage: "Registration for this event is currently closed. Please check back later or contact us for more information.",
  contactSectionTitle: "Event Contacts"
};

// Helper functions
export const getFormIdFromUrl = (): string | null => {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('form');
  }
  return null;
};

// Function to check if the form is still accepting submissions
// This could be replaced with an actual API call in production
export const isFormOpen = (): boolean => {
  // In a real implementation, you would:
  // 1. Check the current date against the closing date
  // 2. Potentially make an API call to check if the form is still open
  // 3. Or check Tally's API if they provide a way to check if a form is open

  const now = new Date();
  const closingDate = new Date(registrationConfig.registrationClosingDate);
  
  // If the closing date is "TBD", consider the form open
  if (registrationConfig.registrationClosingDate === "TBD") {
    return true;
  }
  
  // For actual dates, check if current date is before closing date
  return !isNaN(closingDate.getTime()) && now < closingDate;
}; 