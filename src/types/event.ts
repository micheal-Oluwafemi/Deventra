import { Eip1193Provider } from "ethers"


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
  id: number; // Unique identifier for the event,
  title: string; // Title of the event,
  date: Date; // Date of the event
  participantsIds: string[] | null,
  data: {
    type: string | null; // Type of the event (e.g., 'music')
    img_sm: string | null; // Small image path
    img_lg: string | null; // Large image path
    date: string | null; // Date of the event (e.g., '2025-01-15')
    hour: string | null; // Time of the event (e.g., '20:00')
    location: string | null; // Location of the event
    description: string | null; // Description of the event
    seats: Seat[] | null; // Array of available seats
    organizers: Organizer[] | null; // Array of event organizers
    public: boolean; //Weather or not it shud be publically
  }
}


export type Global = typeof globalThis & {
  ethereum: Eip1193Provider
}

export type Category = "All" | "Sport" | "Music" | "Food" | "Art";

export type User = {
  id: string | number | null;
  name: string;
  email: string;
  phone: string;
  address: string;
}
