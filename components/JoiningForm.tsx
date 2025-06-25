"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useForm, FieldValues, Controller } from "react-hook-form";
import { useArtistContext } from "@/lib/context";
import { toast } from "sonner";

const categories = ["Singer", "Dancer", "DJ", "Speaker"];
const languages = [
  "English",
  "Hindi",
  "Gujarati",
  "Spanish",
  "French",
  "German",
];

export const JoinForm = () => {
  const { addArtist } = useArtistContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    
    try {
      await addArtist({
        name: data.name,
        bio: data.bio,
        location: data.location,
        category: data.categories,
        languages: data.languages,
        feeRange: data.feeRange,
        profileImage: "data:image/png;base64,...", 
        status: "pending",
      });

      toast.success("Artist submitted successfully", {
        description: `${data.name}'s application is now pending review.`,
      });

      reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        description: "Unable to submit the artist. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 shadow-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                Join as an Artist
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Create your profile and start receiving booking requests
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Basic Information
                  </h3>

                  <div>
                    <Label className="text-gray-700 dark:text-gray-300" htmlFor="name">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      placeholder="Enter your full name"
                      className="dark:bg-zinc-900 dark:text-white dark:border-gray-700"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{`${errors.name.message}`}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-gray-700 dark:text-gray-300" htmlFor="bio">
                      Bio
                    </Label>
                    <textarea
                      id="bio"
                      {...register("bio")}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-zinc-900 dark:text-white"
                      rows={4}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 dark:text-gray-300" htmlFor="location">
                      Location
                    </Label>
                    <Input
                      id="location"
                      {...register("location")}
                      placeholder="City, State/Country"
                      className="dark:bg-zinc-900 dark:text-white dark:border-gray-700"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Categories
                  </h3>
                  <Controller
                    control={control}
                    name="categories"
                    defaultValue={[]}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-3">
                        {categories.map((cat) => (
                          <div key={cat} className="flex items-center space-x-2">
                            <Checkbox
                              id={cat}
                              checked={field.value.includes(cat)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, cat]);
                                } else {
                                  field.onChange(field.value.filter((c: string) => c !== cat));
                                }
                              }}
                            />
                            <Label htmlFor={cat} className="text-gray-700 dark:text-gray-300">
                              {cat}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </div>

                {/* Languages */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Languages Spoken
                  </h3>
                  <Controller
                    control={control}
                    name="languages"
                    defaultValue={[]}
                    render={({ field }) => (
                      <div className="grid grid-cols-2 gap-3">
                        {languages.map((lang) => (
                          <div key={lang} className="flex items-center space-x-2">
                            <Checkbox
                              id={lang}
                              checked={field.value.includes(lang)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, lang]);
                                } else {
                                  field.onChange(field.value.filter((l: string) => l !== lang));
                                }
                              }}
                            />
                            <Label htmlFor={lang} className="text-gray-700 dark:text-gray-300">
                              {lang}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </div>

                {/* Fee Range */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Fee Range
                  </h3>
                  <Input
                    {...register("feeRange", {
                      required: "Fee range is required",
                    })}
                    placeholder="e.g. ₹2000 - ₹8000"
                    className="dark:bg-zinc-900 dark:text-white dark:border-gray-700"
                  />
                  {errors.feeRange && (
                    <p className="text-red-500 text-sm mt-1">{`${errors.feeRange.message}`}</p>
                  )}
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <Label
                    className="text-lg font-semibold text-gray-900 dark:text-white"
                    htmlFor="image"
                  >
                    Profile Image
                  </Label>
                  <Input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="border-gray-300 dark:border-gray-700 dark:bg-zinc-900 dark:text-white"
                    disabled
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  Submit Profile
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
