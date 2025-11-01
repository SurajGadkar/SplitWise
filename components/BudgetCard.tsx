"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { TripWithDetails } from "@/types";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Wallet } from "lucide-react";

interface BudgetCardProps {
  trip: TripWithDetails;
}

export function BudgetCard({ trip }: BudgetCardProps) {
  const totalSpent = trip.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const budgetPercentage = trip.budget > 0 ? Math.min((totalSpent / trip.budget) * 100, 100) : 0;
  const remaining = trip.budget - totalSpent;
  const isOverBudget = totalSpent > trip.budget;

  // Calculate circumference for circular progress (2 * π * r, r = 60)
  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference - (budgetPercentage / 100) * circumference;

  return (
    <Card className="overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent" />
      <CardHeader className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-primary/10">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Budget Overview</CardTitle>
            <CardDescription>Track your spending against your budget</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        {/* Circular Progress */}
        <div className="flex justify-center items-center relative">
          <svg className="transform -rotate-90 w-40 h-40">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r="60"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-muted/20"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r="60"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all duration-500 ${
                isOverBudget ? "text-destructive" : "text-primary"
              }`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold">{Math.round(budgetPercentage)}%</p>
            <p className="text-xs text-muted-foreground">used</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Budget</p>
            <p className="text-xl font-bold">{formatCurrency(trip.budget)}</p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Spent</p>
            <p className={`text-xl font-bold ${isOverBudget ? "text-destructive" : "text-primary"}`}>
              {formatCurrency(totalSpent)}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Remaining</p>
            <p className={`text-xl font-bold ${isOverBudget ? "text-destructive" : "text-green-600"}`}>
              {formatCurrency(remaining)}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Expenses</p>
            <p className="text-xl font-bold">{trip.expenses.length}</p>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{formatCurrency(totalSpent)} / {formatCurrency(trip.budget)}</span>
          </div>
          <Progress 
            value={Math.min(budgetPercentage, 100)} 
            className={`h-3 ${isOverBudget ? "bg-destructive/20" : ""}`}
          />
        </div>

        {isOverBudget && (
          <Alert variant="destructive" className="rounded-xl">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You have exceeded your budget by {formatCurrency(Math.abs(remaining))}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

