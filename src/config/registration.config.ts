// Define registration form configuration types
export interface ContactPerson {
  name: string;
  phone: string;
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
  tallyForm: TallyFormConfig;
  registrationNotes: RegistrationNote[];
  referralProgram: ReferralInfo;
  contactPersons: ContactPerson[];
  eventDate: string;
  registrationClosingDate: string;
  loadingTimeout: number; // Milliseconds to simulate loading in dev environment
  imageUploadEnabled: boolean;
  imageUploadConfig: {
    maxSizeMB: number;
    acceptedFormats: string[];
    uploadEndpoint?: string; // Optional: Use external upload service if provided
  };
}

// Default registration configuration
export const registrationConfig: RegistrationConfig = {
  tallyForm: {
    formId: "npzkJ8", // Default Tally form ID for Cypher 2K25 registration
    title: "Cypher 2K25 Registration",
    description: "Join us for CVR's flagship tech extravaganza featuring hackathons, coding competitions, workshops, and cultural events.",
    hideHeaders: true,
    autoResize: true,
    transparentBackground: true
  },
  registrationNotes: [
    { text: "You'll receive a confirmation email after registration" },
    { text: "Registration closes on April 4, 2025, 12PM IST" },
    { text: "For team events, only one member needs to register the team" }
  ],
  referralProgram: {
    title: "Referral Program",
    description: "Enter a friend's phone number who referred you to get them rewards! They can earn up to ₹2000 or a Free Pass.",
    note: "Refer others using your phone number and earn rewards when they register!",
    rewards: [
      { condition: "", reward: "" },
    ]
  },
  contactPersons: [
   
  ],
  whatsAppSupport: {
    title: "WhatsApp Support Desk",
    inviteLink: ""
  },
  eventDate: "April 4, 2025",
  registrationClosingDate: "April 4, 2025, 12PM IST",
  loadingTimeout: 1500, // 1.5 seconds for simulating loading in development
  imageUploadEnabled: true,
  imageUploadConfig: {
    maxSizeMB: 2,
    acceptedFormats: ["image/jpeg", "image/png", "image/jpg"],
    // Optional: External upload service - to be implemented if needed
    // uploadEndpoint: "https://your-upload-service.com/api/upload"
  }
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
  const closingDate = new Date("2025-04-04T12:00:00+05:30");
  
  // For demo purposes, returning true if current date is before closing date
  return now < closingDate;
}; 