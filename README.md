# SplitWise - Budget & Group Expense Splitter

A modern, responsive web application built with Next.js 15, React 19, TypeScript, shadcn UI, and Tailwind CSS for tracking trip budgets and splitting expenses among group members.

## Features

- ✅ **Budget Tracking**: Set budgets for trips and events and monitor spending in real-time
- ✅ **Group Management**: Add participants and manage group members with ease
- ✅ **Smart Expense Splitting**: Automatically split costs equally among participants
- ✅ **Balance Tracking**: See who owes whom with automatic balance calculations
- ✅ **Expense Categorization**: Categorize expenses (food, transportation, accommodation, etc.)
- ✅ **Visual Analytics**: Charts and dashboards showing spending by category and participant
- ✅ **Fully Responsive**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **shadcn UI** - Accessible component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Context** - State management (ready to be replaced with Supabase)
- **Recharts** - Data visualization library

## Future Integrations

The app is structured and ready for these future integrations:

- **Supabase**: Replace React Context with Supabase queries for persistent data storage and user authentication
- **Stripe**: Add payment settlement feature for users to pay each other directly through the app
- **PostHog**: Implement analytics tracking for user behavior insights

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd "Z:\Jarus Builds\SplitWise"
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure

```
SplitWise/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with AppProvider
│   ├── page.tsx           # Landing page
│   ├── trips/             # Trips list page
│   ├── trip/[id]/         # Trip detail page
│   └── profile/            # Profile settings page
├── components/             # React components
│   ├── ui/                # shadcn UI base components
│   ├── BudgetCard.tsx     # Budget overview card
│   ├── ExpenseForm.tsx    # Add expense form
│   ├── ExpenseList.tsx    # List of expenses
│   ├── ParticipantList.tsx # Manage participants
│   └── SummaryDashboard.tsx # Analytics dashboard
├── contexts/               # React Context providers
│   └── AppContext.tsx     # Global state management
├── lib/                    # Utility functions
│   ├── utils.ts           # General utilities
│   └── expense-calculator.ts # Expense splitting logic
├── types/                  # TypeScript type definitions
│   └── index.ts           # Data models
└── public/                 # Static assets
```

## Usage

1. **Create a Trip**: Click "Create New Trip" on the landing page or from the trips page
2. **Add Participants**: Add group members to your trip
3. **Add Expenses**: Record expenses with amount, description, category, and who paid
4. **Track Budget**: Monitor spending against your budget
5. **View Balances**: See who owes whom in the summary dashboard
6. **View Analytics**: Check spending breakdowns by category and participant

## Build for Production

```bash
npm run build
npm start
```

## License

This project is open source and available under the MIT License.

