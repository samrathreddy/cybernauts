# Cybernauts CVR Website Assets

This directory contains all the static assets for the Cybernauts CVR website.

## Directory Structure

The assets are organized into a modular structure:

```
/public
  /images
    /logos      - Contains all logo images (e.g., cybernauts-logo.png)
    /team       - Contains all team member profile images
    /sponsors   - Contains all sponsor logos and related images
    /events     - Contains event-related images
      /cypher-2025       - Cypher 2025 event images
      /cypher-2025       - Cypher 2025 event images
      /techvista-2025    - TechVista 2025 event images
      /devcon-2025       - DevCon 2025 event images
      /ai-nexus-2025     - AI Nexus 2025 event images
      /blockchain-2025   - Blockchain Summit 2025 event images
      /gamedev-2025      - GameDev Jam 2025 event images
      /robofest-2025     - RoboFest 2025 event images
      events-hero-bg.jpg - Hero background image for the events page
    /graphics   - Contains graphic elements and illustrations
```

## Usage

When referencing images in the codebase, use the following format:

```
/images/[category]/[image-name].[extension]
```

For event-specific images:

```
/images/events/[event-name]/[image-name].[extension]
```

## Examples

- Logo: `/images/logos/cybernauts-logo.png`
- Team member: `/images/team/samrath.png`
- Sponsor: `/images/sponsors/supabase.png`
- Event image: `/images/events/cypher-2025/main.jpg`
- Event gallery: `/images/events/cypher-2025/gallery-1.jpg`
