# Cybernauts CVR Website

This is the official website for the Cybernauts Club at CVR College of Engineering. The website is built with React, using modern web technologies to create an engaging experience for users.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Configuration](#configuration)
  - [Site Configuration](#site-configuration)
  - [Navigation](#navigation)
  - [Events](#events)
  - [Team Configuration](#team-configuration)
  - [Sponsors](#sponsors)
- [Adding New Content](#adding-new-content)
  - [Adding Events](#adding-events)
  - [Adding Team Members](#adding-team-members)
  - [Adding Sponsors](#adding-sponsors)
- [Assets Organization](#assets-organization)
- [Pages and Components](#pages-and-components)
- [Styling Guidelines](#styling-guidelines)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
  - [Git Workflow](#git-workflow)
  - [Creating a Branch](#creating-a-branch)
  - [Making Changes](#making-changes)
  - [Creating a Pull Request](#creating-a-pull-request)

## 🚀 Project Overview

The Cybernauts CVR website showcases the club's activities, events, team members, and sponsors. It features:

- Home page with upcoming events and club information
- Events page with filtering capabilities
- Team page showing the organizational structure
- Modern, responsive design with animations

## 💻 Getting Started

To run this project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/cybernauts-cvr.git
   cd cybernauts-cvr
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. The website should now be running at `http://localhost:3000`

## 📁 Directory Structure

The project follows a modular structure for easy maintenance:

```
/src
  /components         # Reusable UI components
    /layout           # Layout components like Header, Footer
    /sections         # Section components like HeroSection, TeamSection
    /ui               # UI components like buttons, cards, etc.
  /config             # Configuration files
  /screens            # Page components
  /styles             # Global styles

/public
  /images             # Static images organized by category
    /logos            # Logo images
    /team             # Team member profile images
    /sponsors         # Sponsor logos
    /events           # Event images organized by event
    /graphics         # Graphic elements and illustrations
```

## ⚙️ Configuration

### Site Configuration

The main site configuration is in `src/config/home.config.ts`. This controls global settings like:

```typescript
export const siteConfig: SiteConfig = {
  title: "Cypher 2K25 - Cybernauts Club",
  description: "CVR's largest tech fest in 2025",
  eventDate: "2025-04-03",
  eventDateDisplay: "03rd April, 2025",
  eventTitle: "Cypher 2K25",
  eventDescription: "Join Cypher ultimate fest of CVR, fun is guaranteed.",
  ctaText: "Enroll now",
  footerText: "© 2025 Cybernauts CVR. All rights reserved.",
  logoSrc: "/images/logos/cybernauts-logo.png",
  logoAlt: "Cybernauts logo",
};
```

To modify site-wide settings, update this file.

### Navigation

The navigation menu is configured in `src/config/navigation.config.ts`:

```typescript
export const navigationConfig: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Cypher 2K25", href: "#cypher" },
  { label: "Events", href: "/events" },
  { label: "Team", href: "/team" },
];
```

To add, remove, or modify navigation items, update this array.

### Events

Events are configured in `src/config/events.config.ts`. Each event follows this structure:

```typescript
{
  id: "cypher-2025",
  title: "Cypher 2025",
  description: "A national level hackathon...",
  longDescription: "Cypher 2025 was our flagship hackathon event...",
  date: "March 15-17, 2025",
  location: "CVR College of Engineering, Hyderabad",
  imageUrl: "/images/events/cypher-2025/main.jpg",
  galleryImages: [
    "/images/events/cypher-2025/gallery-1.jpg",
    "/images/events/cypher-2025/gallery-2.jpg",
    "/images/events/cypher-2025/gallery-3.jpg",
  ],
  tags: ["hackathon", "coding", "AI", "upcoming"],
  upcoming: true,
}
```

### Team Configuration

Team members are configured in `src/config/team.config.ts`. The file has two main parts:

1. `teamHierarchy` - Defines the hierarchical structure of the team
2. `teamConfig` - A flat list of main team members

Example for adding a team member:

```typescript
{
  id: 6,
  name: "New Member Name",
  role: "Technical Head",
  description: "Leads development team",
  imageUrl: "/images/team/new-member.png",
  linkedInUrl: "https://www.linkedin.com/in/member-profile",
}
```

### Sponsors

Sponsors are configured in `src/config/sponsors.config.ts`:

```typescript
{
  name: "Sponsor Name",
  image: "/images/sponsors/sponsor-name.png",
  width: "48px",
  height: "13px",
  mobileWidth: "40px",
  mobileHeight: "11px",
}
```

## 🆕 Adding New Content

### Adding Events

To add a new event:

1. Create a new directory for the event in `/public/images/events/[event-name]`
2. Add the main event image as `main.jpg` and any gallery images
3. Add the event to `eventsConfig` array in `src/config/events.config.ts`
4. Make sure to use the proper tags for filtering (hackathon, workshop, coding, tech, non-tech, fdp, social)

### Adding Team Members

To add a new team member:

1. Add the member's image to `/public/images/team/`
2. Add the member to the flat `teamConfig` array in `src/config/team.config.ts`
3. If needed, add them to the hierarchical structure as well

### Adding Sponsors

To add a new sponsor:

1. Add the sponsor's logo to `/public/images/sponsors/`
2. Add the sponsor to the `sponsorsConfig` array in `src/config/sponsors.config.ts`
3. Adjust width and height values as needed for proper display

## 🖼️ Assets Organization

Images are organized in a modular structure in the `/public/images` directory:

```
/public/images
  /logos      - Contains all logo images (e.g., cybernauts-logo.png)
  /team       - Contains all team member profile images
  /sponsors   - Contains all sponsor logos and related images
  /events     - Contains event-related images
    /[event-name]  - Directory for each event
      main.jpg     - Main event image
      gallery-1.jpg - Gallery images
    events-hero-bg.jpg - Hero background for events page
  /graphics   - Contains graphic elements and illustrations
```

When adding new images:

1. Place them in the appropriate directory
2. Use consistent naming conventions
3. For image references, always use the full path: `/images/[category]/[image-name].[extension]`

## 📄 Pages and Components

The website consists of these main pages:

1. **Home (`src/screens/Home/Home.tsx`)** - Landing page with hero section and highlights
2. **Events (`src/screens/Events/Events.tsx`)** - Lists all events with filtering
3. **Team (`src/screens/TeamPage/TeamPage.tsx`)** - Shows the team structure

Key components:

- **Header (`src/components/layout/Header.tsx`)** - Navigation and logo
- **Footer (`src/components/layout/Footer.tsx`)** - Copyright and additional links
- **HeroSection (`src/components/sections/HeroSection.tsx`)** - Main hero section on home page
- **EventCard** - Individual event card in the events grid
- **TeamSection (`src/components/sections/TeamSection.tsx`)** - Team display

## 🎨 Styling Guidelines

The project uses Tailwind CSS for styling. Follow these guidelines:

1. Use Tailwind classes for styling whenever possible
2. Maintain the color scheme (amber accents with dark backgrounds)
3. For animations, use the existing patterns from Framer Motion
4. Keep mobile responsiveness in mind for all components

## 🚢 Deployment

To deploy the website:

1. Build the project:

   ```bash
   npm run build
   ```

2. The build output will be in the `dist` directory, which can be deployed to any static hosting service.

## 🔧 Troubleshooting

Common issues:

1. **Images not displaying**: Check that the path is correct and follows the format `/images/[category]/[name].[ext]`

2. **New events not appearing**: Ensure the event object is properly formatted and has all required fields

3. **Styles not applying**: Make sure Tailwind classes are correct and not conflicting

For more help, check the project documentation or reach out to senior team members.

## 🤝 Contributing

This section is a beginner-friendly guide to contributing to the Cybernauts CVR website project.

### Git Workflow

Git is a version control system that helps track changes to the codebase. Here's a basic overview of how it works:

1. **Repository**: The central place where the codebase is stored
2. **Branch**: A separate version of the codebase where you can make changes without affecting the main code
3. **Commit**: A saved point in your changes with a message describing what you did
4. **Push**: Uploading your changes to the remote repository
5. **Pull Request (PR)**: A request to merge your changes into the main codebase

### Setting Up Git

If you haven't set up Git before, follow these steps:

1. Install Git from [git-scm.com](https://git-scm.com/)
2. Open a terminal/command prompt and set your identity:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

### Creating a Branch

When working on a new feature or fix, always create a new branch:

1. Make sure you have the latest version of the main branch:

   ```bash
   git checkout main
   git pull origin main
   ```

2. Create a new branch with a descriptive name:

   ```bash
   git checkout -b feature/add-new-event
   ```

   Use prefixes for branch names:

   - `feature/` for new features
   - `fix/` for bug fixes
   - `update/` for updates to existing features
   - `docs/` for documentation changes

### Making Changes

Once you're on your new branch, you can make changes to the codebase:

1. Edit files as needed for your feature or fix
2. Test your changes locally by running `npm run dev`
3. When you're satisfied with a set of related changes, commit them:

   ```bash
   git add .
   git commit -m "Add new event: TechFest 2025"
   ```

   Tips for good commit messages:

   - Be concise but descriptive
   - Use present tense ("Add feature" not "Added feature")
   - Mention what you changed and why

4. Push your branch to the remote repository:
   ```bash
   git push origin feature/add-new-event
   ```

### Creating a Pull Request

After pushing your changes, you need to create a Pull Request to get your changes reviewed and merged:

1. Go to the GitHub repository in your web browser
2. You'll typically see a banner suggesting to create a PR from your recently pushed branch
3. Click on "Compare & pull request"
4. Fill in the PR template:

   - **Title**: Brief description of what your PR does
   - **Description**: Detailed explanation of the changes, why they're needed, and how they work
   - **Screenshots**: If applicable, add screenshots showcasing the changes
   - **Testing**: Describe how you've tested the changes

5. Select reviewers: Usually senior team members who should review your code
6. Click "Create pull request"

### PR Review Process

After creating a PR, here's what happens:

1. Reviewers will examine your code and may leave comments
2. Address any feedback by making additional commits to your branch
3. Once approved, a team member will merge your PR
4. Your changes will become part of the main codebase
5. You can delete your branch after it's merged

### Common Git Commands

Here are some useful Git commands:

- `git status`: Check the status of your working directory
- `git log`: View commit history
- `git checkout [branch-name]`: Switch to a different branch
- `git pull`: Update your local branch with changes from the remote
- `git reset --hard HEAD`: Discard all local changes (be careful!)
- `git branch -d [branch-name]`: Delete a local branch after merging

### Example Workflow

Let's walk through an example workflow for adding a new event:

1. Create a new branch:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/add-workshop-event
   ```

2. Add event images to `/public/images/events/workshop-2025/`

3. Update `src/config/events.config.ts` to add the new event

4. Test your changes locally

5. Commit and push:

   ```bash
   git add .
   git commit -m "Add new Workshop 2025 event"
   git push origin feature/add-workshop-event
   ```

6. Create a PR on GitHub and wait for review

---

This README was last updated on March 30, 2025. For the most recent information, please ping Samrath / Hanok / Krishna Koushik.
