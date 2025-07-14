
export interface Coordinator {
  id: number;
  name: string;
  location: string;
  price: number;
  profilePhotoUrl: string;
  bio: string;
  unavailableDates: string[]; // Dates in "YYYY-MM-DD" format
}

export interface BookingRequest {
  coordinatorId: number;
  clientName: string;
  clientEmail: string;
  weddingDate: string;
  guestCount: number;
}
