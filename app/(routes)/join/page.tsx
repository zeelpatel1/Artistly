import { JoinForm } from '@/components/JoiningForm'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata={
  title: "Join as an Artist | Artistly",
  description: "Create your artist profile on Artistly and start receiving booking requests.",
  keywords: ["join artist", "artist registration", "artistly", "bookings", "musician form", "event performer signup"],
  openGraph:{
    title: "Join Artistly - Get Discovered by Clients",
    description: "Register as an artist and get listed for gigs and events.",
    url: `${process.env.DOMAIN}/join`,
    siteName: "Artistly",
    type: "website",
  }
}

const page = () => {
  return (
    <div>
      <JoinForm/>
    </div>
  )
}

export default page