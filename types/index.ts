export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Participant {
  id: string;
  userId: string;
  tripId: string;
  name: string;
  email?: string;
  role?: "admin" | "member";
}

export interface Trip {
  id: string;
  name: string;
  description?: string;
  budget: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  id: string;
  tripId: string;
  amount: number;
  description: string;
  category: ExpenseCategory;
  paidBy: string; // participantId
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseSplit {
  id: string;
  expenseId: string;
  participantId: string;
  amountOwed: number;
}

export type ExpenseCategory =
  | "food"
  | "transportation"
  | "accommodation"
  | "entertainment"
  | "shopping"
  | "other";

export interface Balance {
  participantId: string;
  participantName: string;
  amount: number; // positive = owes, negative = is owed
}

export interface TripWithDetails extends Trip {
  participants: Participant[];
  expenses: Expense[];
  splits: ExpenseSplit[];
  balances: Balance[];
}

