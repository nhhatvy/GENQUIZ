"use client";

import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Target
} from "lucide-react";

interface QuizDetailsProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function QuizDetail({ onNext, onBack }: QuizDetailsProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-4">

          <button
            onClick={onBack}
            className="cursor-pointer p-2 rounded-xl border border-border bg-card hover:bg-secondary transition"
          >
            <ChevronLeft size={20} />
          </button>

          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground tracking-tight">
              Create New Quiz
            </h2>

            <p className="text-muted-foreground text-sm">
              Add questions and configure quiz settings
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <button className="cursor-pointer px-5 py-2 text-sm font-semibold border border-border rounded-xl hover:bg-secondary transition">
            Save Draft
          </button>

        </div>

      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* LEFT */}

        <div className="lg:col-span-3 space-y-6">

          <div className="rounded-2xl border border-border bg-card p-6 space-y-6 shadow-sm">

            <div>
              <h3 className="font-semibold text-lg text-foreground">
                Quiz Details
              </h3>

              <p className="text-muted-foreground text-sm">
                Basic information about your quiz
              </p>
            </div>

            <div className="space-y-4">

              {/* TITLE */}

              <div className="space-y-2">

                <label className="text-xs font-semibold text-muted-foreground">
                  Quiz Title
                </label>

                <input
                  placeholder="Introduction to Environmental Science"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                />

              </div>

              {/* DESCRIPTION */}

              <div className="space-y-2">

                <label className="text-xs font-semibold text-muted-foreground">
                  Description
                </label>

                <textarea
                  rows={5}
                  placeholder="Test your knowledge about the basics..."
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none"
                />

              </div>

              {/* SELECTS */}

              <div className="grid grid-cols-2 gap-4">

                <div className="space-y-2">

                  <label className="text-xs font-semibold text-muted-foreground">
                    Category
                  </label>

                  <select className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer">
                    <option>Science</option>
                    <option>History</option>
                    <option>Mathematics</option>
                  </select>

                </div>

                <div className="space-y-2">

                  <label className="text-xs font-semibold text-muted-foreground">
                    Difficulty
                  </label>

                  <select className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer">
                    <option>Medium</option>
                    <option>Easy</option>
                    <option>Hard</option>
                  </select>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="lg:col-span-2">

          <div className="rounded-2xl border border-border bg-card p-6 space-y-6 shadow-sm">

            <div>
              <h3 className="font-semibold text-lg text-foreground">
                Quiz Settings
              </h3>

              <p className="text-muted-foreground text-sm">
                Configure how your quiz works
              </p>
            </div>

            <div className="space-y-5">

              {/* TIME */}

              <div className="space-y-2">

                <label className="text-xs font-semibold text-muted-foreground">
                  Time Limit
                </label>

                <div className="flex items-center gap-3 bg-background border border-border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary/20">

                  <Clock size={16} className="text-muted-foreground" />

                  <input
                    type="number"
                    defaultValue={15}
                    className="bg-transparent outline-none text-sm font-medium w-full"
                  />

                  <span className="text-xs text-muted-foreground">
                    minutes
                  </span>

                </div>

              </div>

              {/* PASSING SCORE */}

              <div className="space-y-2">

                <label className="text-xs font-semibold text-muted-foreground">
                  Passing Score
                </label>

                <div className="flex items-center gap-3 bg-background border border-border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary/20">

                  <Target size={16} className="text-muted-foreground" />

                  <input
                    type="number"
                    defaultValue={70}
                    className="bg-transparent outline-none text-sm font-medium w-full"
                  />

                  <span className="text-xs text-muted-foreground">%</span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}

      <div className="flex justify-end pt-4 gap-4">

        <button 
          onClick={onBack}
          className="cursor-pointer flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl border border-border bg-card hover:bg-secondary transition"
        >
          <ChevronLeft size={16} />
          Prev
        </button>

        <button
          onClick={() => onNext({})}
          className="cursor-pointer flex items-center gap-2 px-8 py-2.5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90 transition"
        >
          Next
          <ChevronRight size={16} />
        </button>

      </div>

    </div>
  );
}