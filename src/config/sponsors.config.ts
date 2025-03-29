export interface Sponsor {
  name: string;
  image: string;
  width: string;
  height: string;
  mobileWidth: string;
  mobileHeight: string;
}

export const sponsorsConfig: Sponsor[] = [
  {
    name: "Sponsored by",
    image: "/sponsored-by.png",
    width: "78.43px", 
    height: "11.3px",
    mobileWidth: "60px",
    mobileHeight: "9px",
  },
  { 
    name: "Algorana", 
    image: "/algorana.png", 
    width: "48px", 
    height: "13px",
    mobileWidth: "40px",
    mobileHeight: "11px",
  },
  {
    name: "Cloudfare",
    image: "/cloudfare.png",
    width: "43px",
    height: "15px",
    mobileWidth: "35px",
    mobileHeight: "12px",
  },
  { 
    name: "Loops", 
    image: "/loops.png", 
    width: "53px", 
    height: "12px",
    mobileWidth: "45px",
    mobileHeight: "10px",
  },
  { 
    name: "Netlify", 
    image: "/netlify.png", 
    width: "46px", 
    height: "14px",
    mobileWidth: "38px",
    mobileHeight: "12px",
  },
  { 
    name: "Sentry", 
    image: "/sentry.png", 
    width: "47px", 
    height: "17px",
    mobileWidth: "39px",
    mobileHeight: "14px",
  },
  { 
    name: "Supabase", 
    image: "/supabase.png", 
    width: "57px", 
    height: "11px",
    mobileWidth: "45px",
    mobileHeight: "9px",
  },
]; 