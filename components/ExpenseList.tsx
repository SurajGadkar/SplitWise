"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Expense, Participant } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Trash2, Edit, DollarSign } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ExpenseListProps {
  expenses: Expense[];
  participants: Participant[];
  onDelete: (expenseId: string) => void;
}

const categoryIcons: Record<string, string> = {
  food: "🍔",
  transportation: "🚗",
  accommodation: "🏨",
  entertainment: "🎬",
  shopping: "🛍️",
  other: "💼",
};

export function ExpenseList({ expenses, participants, onDelete }: ExpenseListProps) {
  const getParticipantName = (participantId: string) => {
    return participants.find((p) => p.id === participantId)?.name || "Unknown";
  };

  if (expenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
          <CardDescription>No expenses added yet</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Add your first expense to start tracking.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
        <CardDescription>
          {expenses.length} {expenses.length === 1 ? "expense" : "expenses"} recorded
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-start justify-between p-5 rounded-xl border bg-card hover:bg-accent/50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="text-3xl p-2 rounded-xl bg-muted/50">{categoryIcons[expense.category] || "💼"}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold text-base">{expense.description}</p>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {expense.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5 font-medium">
                      <DollarSign className="h-3.5 w-3.5" />
                      <span className="text-sm font-bold text-primary">{formatCurrency(expense.amount)}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-muted/50">Paid by {getParticipantName(expense.paidBy)}</span>
                    <span>{formatDate(expense.date)}</span>
                  </div>
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="shrink-0 rounded-xl hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete this expense and recalculate all splits.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(expense.id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

