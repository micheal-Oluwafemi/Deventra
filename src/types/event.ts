export interface SocialMedia {
  icon: string; // Path to the social media icon
  path: string; // URL or path to the social media profile
}

export interface Organizer {
  img_avatar: string; // Path to the organizer's avatar image
  name: string; // Name of the organizer
  job: string; // Job title of the organizer
  social: SocialMedia[]; // Array of social media links
}

export interface Seat {
  seat: string; // Seat type (e.g., 'frontseat', 'backseat', 'vip')
  price: number; // Price of the seat
}

export interface Event {
  id: string; // Unique identifier for the event
  type: string; // Type of the event (e.g., 'music')
  img_sm: string; // Small image path
  img_lg: string; // Large image path
  date: string; // Date of the event (e.g., '2025-01-15')
  hour: string; // Time of the event (e.g., '20:00')
  title: string; // Title of the event
  location: string; // Location of the event
  description: string; // Description of the event
  seats: Seat[]; // Array of available seats
  organizers: Organizer[]; // Array of event organizers
  recommended: boolean; // Recommendation status
}

export type Category = "All" | "sport" | "music" | "food" | "art";
