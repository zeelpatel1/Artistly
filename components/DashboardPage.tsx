"use client";

import { useArtistContext } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Calendar,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
    const { artists, updateArtistStatus, loading } = useArtistContext();
  
    const handleStatusUpdate = (
      artistId: string,
      status: "approved" | "rejected"
    ) => {
      updateArtistStatus(artistId, status);
      const artist = artists.find((a) => a.id === artistId);
      if (!artist) {
        toast("Artist not found", {
          description: "They will respond within 24 hours.",
        });
        return;
      }
      toast(`Artist ${status.charAt(0).toUpperCase() + status.slice(1)}`, {
        description: `${artist.name} has been ${status}.`,
      });
    };
  
    const stats = [
      {
        title: "Total Artists",
        value: artists.length,
        icon: Users,
        color: "text-blue-600",
      },
      {
        title: "Pending Reviews",
        value: artists.filter((a) => a.status === "pending").length,
        icon: Clock,
        color: "text-yellow-600",
      },
      {
        title: "Approved Artists",
        value: artists.filter((a) => a.status === "approved").length,
        icon: CheckCircle,
        color: "text-green-600",
      },
      {
        title: "Active Bookings",
        value: 12,
        icon: Calendar,
        color: "text-purple-600",
      },
    ];
  
    const getStatusBadge = (status: string) => {
      switch (status) {
        case "pending":
          return (
            <Badge
              variant="outline"
              className="text-yellow-600 border-yellow-600"
            >
              Pending
            </Badge>
          );
        case "approved":
          return (
            <Badge variant="outline" className="text-green-600 border-green-600">
              Approved
            </Badge>
          );
        case "rejected":
          return (
            <Badge variant="outline" className="text-red-600 border-red-600">
              Rejected
            </Badge>
          );
        default:
          return <Badge variant="outline">Unknown</Badge>;
      }
    };
  
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Manager Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage artist applications and monitor platform activity
          </p>
        </div>
  
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
  
        {/* Artist Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Artist Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
              </div>
            ) : artists.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No applications yet
                </h3>
                <p className="text-gray-600">
                  Artist applications will appear here once submitted.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Fee Range</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {artists.map((artist) => (
                      <TableRow key={artist.id}>
                        <TableCell className="font-medium">
                          {artist.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {artist.category.slice(0, 2).map((cat) => (
                              <Badge
                                key={cat}
                                variant="secondary"
                                className="text-xs"
                              >
                                {cat}
                              </Badge>
                            ))}
                            {artist.category.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{artist.category.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{artist.location}</TableCell>
                        <TableCell>{artist.feeRange}</TableCell>
                        <TableCell>{getStatusBadge(artist.status)}</TableCell>
                        <TableCell>
                          {new Date(artist.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {artist.status === "pending" ? (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() =>
                                  handleStatusUpdate(artist.id, "approved")
                                }
                                className="bg-green-600 hover:bg-green-700"
                                disabled={loading}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleStatusUpdate(artist.id, "rejected")
                                }
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">
                              No actions
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }