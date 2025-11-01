import { Expense, ExpenseSplit, Participant, Balance } from "@/types";

export function calculateEqualSplit(
  expense: Expense,
  participants: Participant[]
): ExpenseSplit[] {
  const amountPerPerson = expense.amount / participants.length;
  return participants.map((participant) => ({
    id: `${expense.id}-${participant.id}`,
    expenseId: expense.id,
    participantId: participant.id,
    amountOwed: Math.round(amountPerPerson * 100) / 100,
  }));
}

export function calculateBalances(
  expenses: Expense[],
  splits: ExpenseSplit[],
  participants: Participant[]
): Balance[] {
  const balances: Map<string, number> = new Map();

  // Initialize balances for all participants
  participants.forEach((p) => {
    balances.set(p.id, 0);
  });

  // Process each expense
  expenses.forEach((expense) => {
    const expenseSplits = splits.filter((s) => s.expenseId === expense.id);
    const payerId = expense.paidBy;

    // Add what the payer paid
    balances.set(
      payerId,
      (balances.get(payerId) || 0) - expense.amount
    );

    // Subtract what each participant owes
    expenseSplits.forEach((split) => {
      balances.set(
        split.participantId,
        (balances.get(split.participantId) || 0) + split.amountOwed
      );
    });
  });

  // Convert to Balance array
  return Array.from(balances.entries()).map(([participantId, amount]) => {
    const participant = participants.find((p) => p.id === participantId);
    return {
      participantId,
      participantName: participant?.name || "Unknown",
      amount: Math.round(amount * 100) / 100,
    };
  });
}

export function getOwedBy(toParticipantId: string, balances: Balance[]): Balance[] {
  return balances
    .filter((b) => b.participantId !== toParticipantId && b.amount > 0)
    .map((b) => ({
      ...b,
      amount: b.amount,
    }));
}

export function getOwesTo(fromParticipantId: string, balances: Balance[]): Balance[] {
  const balance = balances.find((b) => b.participantId === fromParticipantId);
  if (!balance || balance.amount <= 0) return [];

  return balances
    .filter((b) => b.participantId !== fromParticipantId && b.amount < 0)
    .map((b) => ({
      ...b,
      amount: Math.abs(b.amount),
    }));
}

