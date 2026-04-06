'use client';

import { useState } from "react";
import { User, PlayCircle, AlertCircle } from "lucide-react";

export default function QuizEntryView({
  quiz,
  onStart
}: {
  quiz: any;
  onStart: (name: string) => void;
}) {

  const [name, setName] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen p-6">

      <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 space-y-6 shadow-sm animate-in slide-in-from-bottom-8 duration-500">

        {/* Header */}
        <div className="space-y-1 text-center">

          <h2 className="text-xl font-bold tracking-tight text-primary">
            Enter Your Name
          </h2>

          <p className="text-sm text-muted-foreground">
            Please enter your real name to record your result
          </p>

        </div>

        {/* Input */}
        <div className="relative group">

          <User
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition"
            size={18}
          />

          <input
            autoFocus
            placeholder="Your full name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-background border border-border rounded-xl py-3 pl-11 pr-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition font-medium"
          />

        </div>

        {/* Start Button */}
        <button
          disabled={name.length < 2}
          onClick={() => onStart(name)}
          className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold shadow-sm hover:opacity-90 active:scale-95 transition disabled:opacity-40 flex items-center justify-center gap-2 group"
        >

          Start Quiz

          <PlayCircle
            size={18}
            className="group-hover:translate-x-1 transition"
          />

        </button>

        {/* Warning */}
        <div className="bg-secondary border border-border p-4 rounded-xl flex gap-3">

          <AlertCircle
            className="text-primary shrink-0 mt-0.5"
            size={16}
          />

          <p className="text-xs text-muted-foreground leading-relaxed">

            Do not close the tab or refresh the page during the exam.
            The system may automatically submit your quiz if suspicious activity is detected.

          </p>

        </div>

      </div>

    </div>
  );
}