"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import { BudgetCard } from "@/components/BudgetCard";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { ParticipantList } from "@/components/ParticipantList";
import { SummaryDashboard } from "@/components/SummaryDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TripWithDetails, Participant, Expense, ExpenseCategory } from "@/types";
import { ArrowLeft, Settings } from "lucide-react";
import Link from "next/link";

export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;
  const { getTripDetails, addParticipant, removeParticipant, addExpense, deleteExpense, updateTrip } = useApp();
  const [tripDetails, setTripDetails] = useState<TripWithDetails | null>(null);

  useEffect(() => {
    if (tripId) {
      const details = getTripDetails(tripId);
      setTripDetails(details);
      // Refresh details whenever data changes
      const interval = setInterval(() => {
        const updated = getTripDetails(tripId);
        if (updated) {
          setTripDetails(updated);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [tripId, getTripDetails]);

  const handleAddParticipant = (name: string, email?: string) => {
    if (!tripDetails) return;

    const newParticipant: Participant = {
      id: crypto.randomUUID(),
      userId: "current-user", // Replace with actual user ID
      tripId: tripDetails.id,
      name,
      email,
      role: "member",
    };

    addParticipant(tripDetails.id, newParticipant);
    const updated = getTripDetails(tripId);
    if (updated) setTripDetails(updated);
  };

  const handleRemoveParticipant = (participantId: string) => {
    if (!tripDetails) return;
    removeParticipant(tripDetails.id, participantId);
    const updated = getTripDetails(tripId);
    if (updated) setTripDetails(updated);
  };

  const handleAddExpense = (expenseData: {
    amount: number;
    description: string;
    category: ExpenseCategory;
    paidBy: string;
    date: string;
  }) => {
    if (!tripDetails) return;

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      tripId: tripDetails.id,
      amount: expenseData.amount,
      description: expenseData.description,
      category: expenseData.category,
      paidBy: expenseData.paidBy,
      date: expenseData.date,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addExpense(tripDetails.id, newExpense);
    const updated = getTripDetails(tripId);
    if (updated) setTripDetails(updated);
  };

  const handleDeleteExpense = (expenseId: string) => {
    if (!tripDetails) return;
    deleteExpense(tripDetails.id, expenseId);
    const updated = getTripDetails(tripId);
    if (updated) setTripDetails(updated);
  };

  if (!tripDetails) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <h2 className="text-2xl font-semibold mb-4">Trip not found</h2>
              <p className="text-muted-foreground mb-6">
                The trip you're looking for doesn't exist or has been deleted.
              </p>
              <Link href="/trips">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Trips
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/trips">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Trips
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{tripDetails.name}</h1>
              {tripDetails.description && (
                <p className="text-muted-foreground">{tripDetails.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <BudgetCard trip={tripDetails} />

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Expenses</h2>
              {tripDetails.participants.length > 0 && (
                <ExpenseForm
                  participants={tripDetails.participants}
                  onSubmit={handleAddExpense}
                />
              )}
            </div>

            {tripDetails.participants.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    Add participants before adding expenses
                  </p>
                </CardContent>
              </Card>
            ) : (
              <ExpenseList
                expenses={tripDetails.expenses}
                participants={tripDetails.participants}
                onDelete={handleDeleteExpense}
              />
            )}

            <SummaryDashboard trip={tripDetails} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ParticipantList
              participants={tripDetails.participants}
              onAdd={handleAddParticipant}
              onRemove={handleRemoveParticipant}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

