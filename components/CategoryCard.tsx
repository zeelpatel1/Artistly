import Link from "next/link";
import { Mic, Users, Headphones, MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const categories = [
  { id: 1, name: "Singers", description: "Professional vocalists for all types of events", icon: Mic, count: "150+ Artists" },
  { id: 2, name: "Dancers", description: "Choreographers and performers for entertainment", icon: Users, count: "80+ Artists" },
  { id: 3, name: "DJs", description: "Music professionals for parties and events", icon: Headphones, count: "200+ Artists" },
  { id: 4, name: "Speakers", description: "Motivational and keynote speakers", icon: MessageSquare, count: "60+ Artists" }
];

const CategorySection = () => (

  <section className="container mx-auto px-4 py-16">
    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
      Browse by Category
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map(({ id, name, description, icon: Icon, count }) => (

        <Link key={id} href={`/artists?category=${name.toLowerCase()}`}>
          <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-gray-200 bg-white">
            <CardHeader className="text-center">

              <div className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 text-white" />
              </div>

              <CardTitle className="text-xl font-semibold text-gray-800">{name}</CardTitle>

              <CardDescription className="text-sm text-black font-medium">{count}</CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-gray-600 text-center">{description}</p>
            </CardContent>
            
          </Card>
        </Link>
      ))}
    </div>
  </section>
);

export default CategorySection;
