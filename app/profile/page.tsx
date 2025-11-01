"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  // In a real app, this would come from authentication context
  const [name, setName] = useState("User Name");
  const [email, setEmail] = useState("user@example.com");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile changes
    alert("Profile updated! (In a real app, this would sync with Supabase)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/trips">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Trips
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Update your profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Future Integrations Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Future Integrations</CardTitle>
            <CardDescription>
              The app is ready for the following integrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg border bg-muted/50">
              <h3 className="font-semibold mb-1">Supabase</h3>
              <p className="text-sm text-muted-foreground">
                Replace React Context with Supabase queries for persistent data
                storage and user authentication
              </p>
            </div>
            <div className="p-3 rounded-lg border bg-muted/50">
              <h3 className="font-semibold mb-1">Stripe</h3>
              <p className="text-sm text-muted-foreground">
                Add payment settlement feature for users to pay each other
                directly through the app
              </p>
            </div>
            <div className="p-3 rounded-lg border bg-muted/50">
              <h3 className="font-semibold mb-1">PostHog</h3>
              <p className="text-sm text-muted-foreground">
                Implement analytics tracking for user behavior insights
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

