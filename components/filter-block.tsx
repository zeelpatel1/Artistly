"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Filter, X } from "lucide-react"

type FilterBlockProps = {
  categories: string[]
  locations: string[]
  feeRanges: string[]
  selectedCategories: string[]
  selectedLocations: string[]
  selectedFeeRanges: string[]
  onCategoryChange: (categories: string[]) => void
  onLocationChange: (locations: string[]) => void
  onFeeRangeChange: (feeRanges: string[]) => void
  onClearFilters: () => void
}

export function FilterBlock({
  categories,
  locations,
  feeRanges,
  selectedCategories,
  selectedLocations,
  selectedFeeRanges,
  onCategoryChange,
  onLocationChange,
  onFeeRangeChange,
  onClearFilters,
}: FilterBlockProps) {

  const [isOpen, setIsOpen] = useState(false)

  const handleCategoryToggle = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]
    onCategoryChange(updated)
  }

  const handleLocationToggle = (location: string) => {
    const updated = selectedLocations.includes(location)
      ? selectedLocations.filter((l) => l !== location)
      : [...selectedLocations, location]
    onLocationChange(updated)
  }

  const handleFeeRangeToggle = (feeRange: string) => {
    console.log(feeRange)
    const updated = selectedFeeRanges.includes(feeRange)
      ? selectedFeeRanges.filter((f) => f !== feeRange)
      : [...selectedFeeRanges, feeRange]
    onFeeRangeChange(updated)
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedLocations.length > 0 || selectedFeeRanges.length > 0

  return (
    <div className="w-full">

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-full justify-between">
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                {selectedCategories.length + selectedLocations.length + selectedFeeRanges.length}
              </span>
            )}
          </div>
        </Button>
      </div>

      {/* Filter Content */}
      <Card className={`${isOpen ? "block" : "hidden"} md:block`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-purple-600 hover:text-purple-700"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Categories */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Categories</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Locations</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location}`}
                    checked={selectedLocations.includes(location)}
                    onCheckedChange={() => handleLocationToggle(location)}
                  />
                  <Label htmlFor={`location-${location}`} className="text-sm font-normal cursor-pointer">
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Fee Ranges */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Fee Range</Label>
            <div className="space-y-2">
              {feeRanges.map((feeRange) => (
                <div key={feeRange} className="flex items-center space-x-2">
                  <Checkbox
                    id={`fee-${feeRange}`}
                    checked={selectedFeeRanges.includes(feeRange)}
                    onCheckedChange={() => handleFeeRangeToggle(feeRange)}
                  />
                  <Label htmlFor={`fee-${feeRange}`} className="text-sm font-normal cursor-pointer">
                    {feeRange}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
