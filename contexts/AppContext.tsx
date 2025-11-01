"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  Trip,
  Expense,
  Participant,
  ExpenseSplit,
  TripWithDetails,
} from "@/types";
import { calculateBalances, calculateEqualSplit } from "@/lib/expense-calculator";

interface AppContextType {
  trips: Trip[];
  currentTrip: TripWithDetails | null;
  setCurrentTrip: (trip: TripWithDetails | null) => void;
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  addParticipant: (tripId: string, participant: Participant) => void;
  removeParticipant: (tripId: string, participantId: string) => void;
  addExpense: (tripId: string, expense: Expense) => void;
  updateExpense: (tripId: string, expenseId: string, updates: Partial<Expense>) => void;
  deleteExpense: (tripId: string, expenseId: string) => void;
  getTripDetails: (tripId: string) => TripWithDetails | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [splits, setSplits] = useState<ExpenseSplit[]>([]);
  const [currentTrip, setCurrentTrip] = useState<TripWithDetails | null>(null);

  const addTrip = useCallback((trip: Trip) => {
    setTrips((prev) => [...prev, trip]);
  }, []);

  const updateTrip = useCallback((id: string, updates: Partial<Trip>) => {
    setTrips((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  const deleteTrip = useCallback((id: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== id));
    setParticipants((prev) => prev.filter((p) => p.tripId !== id));
    setExpenses((prev) => prev.filter((e) => e.tripId !== id));
    setSplits((prev) =>
      prev.filter((s) => !expenses.some((e) => e.id === s.expenseId && e.tripId === id))
    );
    if (currentTrip?.id === id) {
      setCurrentTrip(null);
    }
  }, [currentTrip, expenses]);

  const addParticipant = useCallback(
    (tripId: string, participant: Participant) => {
      setParticipants((prev) => [...prev, participant]);
    },
    []
  );

  const removeParticipant = useCallback(
    (tripId: string, participantId: string) => {
      setParticipants((prev) => prev.filter((p) => p.id !== participantId));
      // Remove associated splits
      const expenseIds = expenses
        .filter((e) => e.tripId === tripId)
        .map((e) => e.id);
      setSplits((prev) =>
        prev.filter(
          (s) =>
            !expenseIds.includes(s.expenseId) || s.participantId !== participantId
        )
      );
    },
    [expenses]
  );

  const addExpense = useCallback(
    (tripId: string, expense: Expense) => {
      setExpenses((prev) => [...prev, expense]);
      // Calculate equal splits for all participants
      const tripParticipants = participants.filter((p) => p.tripId === tripId);
      if (tripParticipants.length > 0) {
        const newSplits = calculateEqualSplit(expense, tripParticipants);
        setSplits((prev) => [...prev, ...newSplits]);
      }
    },
    [participants]
  );

  const updateExpense = useCallback(
    (tripId: string, expenseId: string, updates: Partial<Expense>) => {
      setExpenses((prev) =>
        prev.map((e) =>
          e.id === expenseId && e.tripId === tripId ? { ...e, ...updates } : e
        )
      );
      // Recalculate splits if amount or participants changed
      if (updates.amount !== undefined || updates.paidBy !== undefined) {
        const expense = expenses.find((e) => e.id === expenseId);
        if (expense) {
          const updatedExpense = { ...expense, ...updates };
          setSplits((prev) =>
            prev.filter((s) => s.expenseId !== expenseId)
          );
          const tripParticipants = participants.filter((p) => p.tripId === tripId);
          if (tripParticipants.length > 0) {
            const newSplits = calculateEqualSplit(updatedExpense, tripParticipants);
            setSplits((prev) => [...prev, ...newSplits]);
          }
        }
      }
    },
    [expenses, participants]
  );

  const deleteExpense = useCallback((tripId: string, expenseId: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
    setSplits((prev) => prev.filter((s) => s.expenseId !== expenseId));
  }, []);

  const getTripDetails = useCallback(
    (tripId: string): TripWithDetails | null => {
      const trip = trips.find((t) => t.id === tripId);
      if (!trip) return null;

      const tripParticipants = participants.filter((p) => p.tripId === tripId);
      const tripExpenses = expenses.filter((e) => e.tripId === tripId);
      const tripSplits = splits.filter((s) =>
        tripExpenses.some((e) => e.id === s.expenseId)
      );
      const balances = calculateBalances(
        tripExpenses,
        tripSplits,
        tripParticipants
      );

      return {
        ...trip,
        participants: tripParticipants,
        expenses: tripExpenses,
        splits: tripSplits,
        balances,
      };
    },
    [trips, participants, expenses, splits]
  );

  return (
    <AppContext.Provider
      value={{
        trips,
        currentTrip,
        setCurrentTrip,
        addTrip,
        updateTrip,
        deleteTrip,
        addParticipant,
        removeParticipant,
        addExpense,
        updateExpense,
        deleteExpense,
        getTripDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

