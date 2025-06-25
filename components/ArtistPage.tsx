"use client";

import { useState, useMemo, useCallback } from "react";
import { useArtistContext } from "@/lib/context";
import { ArtistCard } from "@/components/artist-card";
import { FilterBlock } from "@/components/filter-block";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, locations, feeRanges } from "@/lib/mock-data";
import { Search, Grid, List, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ArtistsPage() {
  const {
    artists,
    loading,
  } = useArtistContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedFeeRanges, setSelectedFeeRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("name");
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const handleQuoteRequest = useCallback(
    (artistId: string) => {
      const artist = artists.find((a) => a.id === artistId);
      if (!artist) return;

      toast(`Quote request sent to ${artist.name}`, {
        description: "They will respond within 24 hours.",
      });
    },
    [artists]
  );

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedFeeRanges([]);
    setSearchTerm("");
  }, []);

  const filteredArtists = useMemo(() => {
    let filtered = artists.filter((artist) => artist.status === "approved");

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (artist) =>
          artist.name.toLowerCase().includes(lower) ||
          artist.bio.toLowerCase().includes(lower) ||
          artist.category.some((cat) => cat.toLowerCase().includes(lower))
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((artist) =>
        artist.category.some((cat) => selectedCategories.includes(cat))
      );
    }

    if (selectedLocations.length > 0) {
      filtered = filtered.filter((artist) =>
        selectedLocations.includes(artist.location)
      );
    }

    if (selectedFeeRanges.length > 0) {
      filtered = filtered.filter((artist) =>
        selectedFeeRanges.includes(artist.feeRange)
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "location":
          return a.location.localeCompare(b.location);
        case "fee":
          return a.feeRange.localeCompare(b.feeRange);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    artists,
    searchTerm,
    selectedCategories,
    selectedLocations,
    selectedFeeRanges,
    sortBy,
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Head */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Browse Artists
        </h1>
        <p className="text-lg text-gray-600">
          Discover talented performers for your next event
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <FilterBlock
            categories={categories}
            locations={locations}
            feeRanges={feeRanges}
            selectedCategories={selectedCategories}
            selectedLocations={selectedLocations}
            selectedFeeRanges={selectedFeeRanges}
            onCategoryChange={setSelectedCategories}
            onLocationChange={setSelectedLocations}
            onFeeRangeChange={setSelectedFeeRanges}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Artist List */}
        <div className="lg:col-span-3">
          <div className="mb-6 space-y-4">
            {/* SearchBar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search artists by name, category, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Sort and Layout */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                    <SelectItem value="fee">Fee Range</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center border rounded-md">
                  <Button
                    variant={layout === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setLayout("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={layout === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setLayout("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                {filteredArtists.length} artist
                {filteredArtists.length !== 1 ? "s" : ""} found
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-500">Loading artists...</span>
            </div>
          ) : filteredArtists.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No artists found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredArtists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  onQuoteRequest={handleQuoteRequest}
                  layout={layout}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
