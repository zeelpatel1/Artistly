export interface Artist {
    id: string
    name: string
    bio: string
    category: string[]
    languages: string[]
    feeRange: string
    location: string
    profileImage?: string
    status: "pending" | "approved" | "rejected"
    createdAt: string
  }
  
  export interface BookingRequest {
    id: string
    artistId: string
    eventPlannerName: string
    eventDate: string
    eventType: string
    budget: string
    location: string
    status: "pending" | "accepted" | "declined"
    createdAt: string
  }
  