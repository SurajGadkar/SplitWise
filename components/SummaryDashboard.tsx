"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TripWithDetails } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SummaryDashboardProps {
  trip: TripWithDetails;
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export function SummaryDashboard({ trip }: SummaryDashboardProps) {
  // Category breakdown
  const categoryData = trip.expenses.reduce((acc, expense) => {
    const existing = acc.find((item) => item.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, [] as Array<{ name: string; value: number }>);

  // Participant spending
  const participantData = trip.participants.map((participant) => {
    const totalPaid = trip.expenses
      .filter((e) => e.paidBy === participant.id)
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      name: participant.name,
      amount: totalPaid,
    };
  });

  // Balance summary
  const balanceSummary = trip.balances
    .filter((b) => Math.abs(b.amount) > 0.01)
    .sort((a, b) => b.amount - a.amount);

  return (
    <Tabs defaultValue="balances" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="balances">Balances</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
        <TabsTrigger value="participants">Participants</TabsTrigger>
      </TabsList>

      <TabsContent value="balances" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Balance Summary</CardTitle>
            <CardDescription>Who owes whom</CardDescription>
          </CardHeader>
          <CardContent>
            {balanceSummary.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                All balances are settled!
              </p>
            ) : (
              <div className="space-y-3">
                {balanceSummary.map((balance) => (
                  <div
                    key={balance.participantId}
                    className="flex items-center justify-between p-4 rounded-xl border bg-card shadow-sm hover:shadow-md transition-all"
                  >
                    <div>
                      <p className="font-semibold text-base">{balance.participantName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {balance.amount > 0 ? "owes" : "is owed"}
                      </p>
                    </div>
                    <p
                      className={`text-lg font-bold ${
                        balance.amount > 0 ? "text-destructive" : "text-green-600"
                      }`}
                    >
                      {balance.amount > 0 ? "-" : "+"}
                      {formatCurrency(Math.abs(balance.amount))}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="categories" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Expense by Category</CardTitle>
            <CardDescription>Breakdown of spending categories</CardDescription>
          </CardHeader>
          <CardContent>
            {categoryData.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No expenses to display
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="participants" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Spending by Participant</CardTitle>
            <CardDescription>Total amount paid by each participant</CardDescription>
          </CardHeader>
          <CardContent>
            {participantData.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No data to display
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={participantData}>
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Bar dataKey="amount" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

