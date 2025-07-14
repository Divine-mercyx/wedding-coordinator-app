
export interface Coordinator {
  _id: string;
  name: string;
  location: string;
  price: number;
  profilePhoto: string;
  bio: string;
  availability: Array<{
    date: string;
    isAvailable: boolean;
  }>;
  createdAt: string;
}


export interface BookingRequest {
  coordinatorId: number;
  clientName: string;
  clientEmail: string;
  weddingDate: string;
  guestCount: number;
}
