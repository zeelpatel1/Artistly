"use client";

import type { Artist } from "@/lib/type";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";

type ArtistCardProps = {
  artist: Artist;
  onQuoteRequest?: (artistId: string) => void;
  layout?: "grid" | "list";
};

export function ArtistCard({
  artist,
  onQuoteRequest,
  layout = "grid",
}: ArtistCardProps) {
  if (layout === "list") {
    return (
      <Card className="w-full bg-white dark:bg-zinc-900 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-32 sm:h-32 flex-shrink-0">
            <Image
              src={artist.profileImage || "/placeholder.svg"}
              alt={artist.name}
              fill
              className="object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
              sizes="(max-width: 640px) 100vw, 128px"
            />
          </div>
          <div className="flex-1 p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {artist.name}
            </h3>
            <div className="flex flex-wrap gap-1 mt-1 mb-2">
              {artist.category.map((cat) => (
                <Badge key={cat} variant="secondary" className="text-xs">
                  {cat}
                </Badge>
              ))}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-1">
              <MapPin className="h-4 w-4 mr-1" />
              {artist.location}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {artist.feeRange}
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-4">
              <Button
                onClick={() => onQuoteRequest?.(artist.id)}
                className="w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Ask for Quote
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full flex flex-col bg-white dark:bg-zinc-900 dark:border-gray-700">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={artist.profileImage || "/placeholder.svg"}
            alt={artist.name}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {artist.name}
        </h3>
        <div className="flex flex-wrap gap-1 mb-3">
          {artist.category.map((cat) => (
            <Badge key={cat} variant="secondary" className="text-xs">
              {cat}
            </Badge>
          ))}
        </div>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            {artist.location}
          </div>
          <div>{artist.feeRange}</div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={() => onQuoteRequest?.(artist.id)} className="w-full">
          <MessageCircle className="h-4 w-4 mr-2" />
          Ask for Quote
        </Button>
      </CardFooter>
    </Card>
  );
}
