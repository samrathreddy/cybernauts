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
    image: "/images/sponsors/sponsored-by.png",
    width: "78.43px", 
    height: "11.3px",
    mobileWidth: "60px",
    mobileHeight: "9px",
  },
  { 
    name: "Algorana", 
    image: "/images/sponsors/algorana.png", 
    width: "48px", 
    height: "13px",
    mobileWidth: "40px",
    mobileHeight: "11px",
  },
  {
    name: "Cloudfare",
    image: "/images/sponsors/cloudfare.png",
    width: "43px",
    height: "15px",
    mobileWidth: "35px",
    mobileHeight: "12px",
  },
  { 
    name: "Loops", 
    image: "/images/sponsors/loops.png", 
    width: "53px", 
    height: "12px",
    mobileWidth: "45px",
    mobileHeight: "10px",
  },
  { 
    name: "Netlify", 
    image: "/images/sponsors/netlify.png", 
    width: "46px", 
    height: "14px",
    mobileWidth: "38px",
    mobileHeight: "12px",
  },
  { 
    name: "Sentry", 
    image: "/images/sponsors/sentry.png", 
    width: "47px", 
    height: "17px",
    mobileWidth: "39px",
    mobileHeight: "14px",
  },
  { 
    name: "Supabase", 
    image: "/images/sponsors/supabase.png", 
    width: "57px", 
    height: "11px",
    mobileWidth: "45px",
    mobileHeight: "9px",
  },
]; 