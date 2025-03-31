export interface NavigationItem {
  label: string;
  href: string;
}

export const navigationConfig: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Cypher 2K25", href: "/cypher" },
  { label: "Events", href: "/events" },
  { label: "Team", href: "/team" },
]; 