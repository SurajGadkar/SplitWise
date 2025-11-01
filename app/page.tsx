"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Wallet, ArrowUpRight } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6 text-foreground" />
          <h2 className="text-xl font-bold text-foreground">SplitWise</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#benefits" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Benefits
          </Link>
          <Link href="#specifications" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Specifications
          </Link>
          <Link href="#how-to" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            How-to
          </Link>
          <Link href="#contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Contact Us
          </Link>
        </nav>
        <Link href="/trips">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
            Get Started
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-20 pb-32">
          <h1 className="text-6xl md:text-8xl font-serif text-center text-foreground mb-32 max-w-4xl mx-auto leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
            Track everything.
          </h1>

          {/* Device Mockup Section */}
          <div className="relative max-w-6xl mx-auto">
            {/* Background Shape */}
            <div className="absolute left-0 bottom-0 w-[60%] h-[70%] bg-primary/10 rounded-3xl -z-10" />
            
            {/* Device Frame */}
            <div className="relative transform rotate-[-2deg] translate-x-8">
              <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                {/* Tablet Screen */}
                <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-50 rounded-[2rem] overflow-hidden aspect-[4/3] min-h-[500px] relative">
                  {/* Mock App Interface */}
                  <div className="p-6 h-full flex flex-col">
                    {/* Breadcrumbs */}
                    <div className="text-xs text-gray-500 mb-4">
                      Trips {'>'} Overview
                    </div>
                    
                    {/* Main Metric */}
                    <div className="text-center mb-8 mt-8">
                      <div className="text-7xl font-serif text-gray-700 mb-2" style={{ fontFamily: 'var(--font-serif)' }}>78%</div>
                      <div className="text-sm text-gray-500 uppercase tracking-wide">Budget Efficiency</div>
                    </div>

                    {/* Year Labels */}
                    <div className="flex justify-between text-xs text-gray-500 mb-4 px-4">
                      <span>2021</span>
                      <span>2022</span>
                      <span>2023</span>
                      <span>2024</span>
                    </div>

                    {/* Chart Area */}
                    <div className="flex-1 relative bg-white/50 rounded-xl p-4 backdrop-blur-sm">
                      {/* Chart Bars */}
                      <div className="h-full flex items-end justify-center gap-4 pb-4">
                        {[40, 55, 65, 78].map((height, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full bg-primary/60 rounded-t-lg transition-all duration-500"
                              style={{ height: `${height}%` }}
                            />
                            <div className="mt-2 w-1 h-1 bg-white rounded-full" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Selector */}
                    <div className="mt-4 flex justify-end">
                      <div className="px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full text-xs text-gray-600">
                        All Trips (12) ▼
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="benefits" className="bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-32">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 w-fit mb-4">
                    <Wallet className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">Budget Tracking</CardTitle>
                  <CardDescription className="text-base">
                    Set budgets for trips and events and monitor spending in real-time
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 w-fit mb-4">
                    <Wallet className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">Smart Splitting</CardTitle>
                  <CardDescription className="text-base">
                    Automatically split costs equally among all participants
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 w-fit mb-4">
                    <Wallet className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">Analytics</CardTitle>
                  <CardDescription className="text-base">
                    Visual insights into spending patterns and balances
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-950 border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>Built with Next.js 15, React 19, shadcn UI, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

