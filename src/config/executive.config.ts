import { TeamMember } from "./team.config";

// Define the executive team hierarchy
export const executiveTeamHierarchy: TeamMember = {
  id: 200,
  name: "Executive Team",
  role: "Executive Management",
  description: "Executive Team Leadership",
  imageUrl: "",
  children: [
    // Executive Lead
    {
      id: 201,
      name: "Dhruv Shaganti",
      role: "Executive Lead - Boys",
      description: "Executive Team Leader",
      imageUrl: "public/images/team/Dhruv Shaganti.jpg",
      linkedInUrl: "http://www.linkedin.com/in/dhruv-shaganti-125788290",
      children: [
        // First Row Group
        {
          id: 300,
          name: "First Row",
          role: "First Row Group",
          description: "First Row Group",
          imageUrl: "",
          children: [
            {
              id: 301,
              name: "Sowmith Bachu",
              role: "Executive Team Member",
              description: "Executive Team",
              imageUrl: "public/images/team/Sowmith Bachu.JPG",
              linkedInUrl: "https://www.linkedin.com/in/sowmith-bachu-1160492b3",
            },
            {
              id: 302,
              name: "M.Vignay Reddy",
              role: "Executive Team Member",
              description: "Executive Team",
              imageUrl: "public/images/team/Vignayreddy Muduganti.jpg",
              linkedInUrl: "https://www.linkedin.com/in/vignayreddy-muduganti",
            },
            {
              id: 303,
              name: "Nama Venkata Bhargav",
              role: "Executive Team Member",
              description: "Executive Team",
              imageUrl: "public/images/team/Bhargav Nama.jpg",
              linkedInUrl: "https://www.linkedin.com/in/bhargav-nama-243273322",
            },
            {
              id: 304,
              name: "Ajay Kumar",
              role: "Executive Team Member",
              description: "Executive Team",
              imageUrl: "public/images/team/Ajay.M.jpg",
              linkedInUrl: "https://www.linkedin.com/in/ajay-kumar-medaboina-1a0b18354",
            },
            {
              id: 305,
              name: "G.Rajesh",
              role: "Executive Team Member",
              description: "Executive Team",
              imageUrl: "public/images/team/ Raju Gajula.jpg",
              linkedInUrl: "https://www.linkedin.com/company/cybernauts-cvr/",
            }
          ]
        },
        // Second Row Group
        {
          id: 400,
          name: "Second Row",
          role: "Second Row Group",
          description: "Second Row Group",
          imageUrl: "",
          children: [
            {
              id: 401,
              name: "Gardas Akash",
              role: "Executive Team Member",
              description: "Executive Team",
              imageUrl: "public/images/team/Akash Gardas.jpg",
              linkedInUrl: "https://www.linkedin.com/in/gardas-akash-66102327b",
            },
            {
              id: 402,
              name: "Peddoju Yashwanth",
              role: "Executive Team Member",
              description: "Executive Team",
              imageUrl: "public/images/team/Yashwanth.jpeg",
              linkedInUrl: "https://www.linkedin.com/in/peddoju-yashwanth-b81220308",
            },
            {
              id: 403,
              name: "Abhiram Posham",
              role: "Executive Team Member",
              description: "Executive Team",
              imageUrl: "public/images/team/Abhiram Posham.jpg",
              linkedInUrl: "https://www.linkedin.com/in/abhiram-posham-9701402b9",
            },
            {
              id: 404,
              name: "Vrushank",
              role: "Executive Team Member",
              description: "Executive Team",
              imageUrl: "public/images/team/vrushank chettipally.jpg",
              linkedInUrl: "https://www.linkedin.com/in/vrushank-chettipally-802780266",
            },
            {
              id: 405,
              name: "S Dhanurdhar Yadav",
              role: "Executive Team Member",
              description: "Executive Team",
              imageUrl: "public/images/team/Dhanurdhar Yadav.jpg",
              linkedInUrl: "https://www.linkedin.com/in/dhanurdhar-yadav",
            },
            {
              id: 406,
              name: "Likki Prateek Reddy",
              role: "Executive Team Member",
              description: "Executive Team",
              imageUrl: "public/images/team/Prateek Reddy.jpeg",
              linkedInUrl: "https://www.linkedin.com/company/cybernauts-cvr/",
            }
          ]
        }
      ]
    }
  ]
}; 