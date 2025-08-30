import { BookingStatus } from "./enum";

export interface BookingAttributes {
  id: number;
  userId: number;
  providerId: number;
  offeringId: number;
  status: BookingStatus;
  date: Date;
  time: string;
}

export interface OfferingAttributes {
  id: number;
  providerId: number;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "customer" | "provider" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProviderAttributes {
  id: number;
  userId: number;
  bio: string;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}
