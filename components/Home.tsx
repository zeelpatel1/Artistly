import Link from "next/link";
import { Button } from "@/components/ui/button";
import CategorySection from "./CategoryCard";

export const Home = () => {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Connect with Amazing Performing Artists
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Artistly.com bridges event planners with talented performers. Discover, connect, and book the perfect artist for your next event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/artists">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 px-8 py-4 text-lg"
              >
                Explore Artists
              </Button>
            </Link>
            <Link href="/join">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-black hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:bg-zinc-800 px-8 py-4 text-lg"
              >
                Join as Artist
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <CategorySection />

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-black text-white dark:bg-zinc-800 dark:border-gray-600 dark:text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Artist?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of event planners who trust Artistly.com
          </p>
          <Link href="/artists">
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-black hover:bg-gray-100 border-white dark:bg-black dark:text-white dark:border-black dark:hover:bg-gray-200 px-8 py-4 text-lg"
            >
              Start Browsing
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
