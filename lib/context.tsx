"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Artist, BookingRequest } from "./type";

type ArtistContextType ={
  artists: Artist[];
  addArtist: (artist: Omit<Artist, "id" | "createdAt">) => void;
  bookingRequests: BookingRequest[];
  addBookingRequest: (
    request: Omit<BookingRequest, "id" | "createdAt">
  ) => void;
  updateArtistStatus: (artistId: string, status: Artist["status"]) => void;
  loading: boolean;
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

export function ArtistProvider({ children }: { children: ReactNode }) {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/artists");
        const data = await res.json();
        setArtists(data);
      } catch (error) {
        console.error("Failed to fetch artists", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  const addArtist = async (artistData: Omit<Artist, "id" | "createdAt">) => {
    try {
      setLoading(true);
      const res = await fetch("/api/artists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(artistData),
      });
      const newArtist = await res.json();
      setArtists((prev) => [...prev, newArtist]);
    } catch (error) {
      console.error("Error adding artist:", error);
    } finally {
      setLoading(false);
    }
  };

  const addBookingRequest = async (
    requestData: Omit<BookingRequest, "id" | "createdAt">
  ) => {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });
    const newRequest = await res.json();
    setBookingRequests((prev) => [...prev, newRequest]);
  };

  const updateArtistStatus = async (
    artistId: string,
    status: Artist["status"]
  ) => {

    try {
      setLoading(true);
      const res = await fetch(`/api/artists/${artistId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const updatedArtist = await res.json();
      setArtists((prev) =>
        prev.map((artist) =>
          artist.id === updatedArtist.id ? updatedArtist : artist
        )
      );
    } catch (error) {
      console.error("Error updating artist status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ArtistContext.Provider
      value={{
        artists,
        loading,
        addArtist,
        bookingRequests,
        addBookingRequest,
        updateArtistStatus,
      }}
    >
      {children}
    </ArtistContext.Provider>
  );
}

// ✅ Hook with clear name
export function useArtistContext() {
  const context = useContext(ArtistContext);
  if (context === undefined) {
    throw new Error("useArtistContext must be used within an ArtistProvider");
  }
  return context;
}
