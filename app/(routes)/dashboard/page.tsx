import { Metadata } from "next";
import DashboardPage from "@/components/DashboardPage";

export const metadata: Metadata = {
  title: "Manager Dashboard | Artistly",
  description: "View and manage artist submissions and platform metrics.",
  openGraph: {
    title: "Artistly Admin Dashboard",
    description: "Monitor artist applications and platform performance.",
    url: `${process.env.DOMAIN}/dashboard`,
    siteName: "Artistly",
    type: "website",
  },
};

const page = () => {
  return (
    <DashboardPage/>
  )
}

export default page
