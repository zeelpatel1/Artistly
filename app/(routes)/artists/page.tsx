import ArtistsPage from '@/components/ArtistPage'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata={
  title: "Browse Artists | Artistly",
  description: "Discover and book top-rated artists for your next event.",
  keywords: ["artists", "event", "booking", "musicians", "performers"],
  openGraph:{
    title: "Find & Book Talented Artists | Artistly",
    description: "Browse verified performers available for hire.",
    url: `${process.env.DOMAIN}/artist`,
    siteName: "Artistly",
    type:"website"
  }
}

const page = () => {
  return (
    <div>
      <ArtistsPage/>
    </div>
  )
}

export default page