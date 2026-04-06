'use client';

import { Clock, ShieldCheck, Lock } from "lucide-react";

export default function QuizWaitingView({
  quiz,
  timeLeft
}: {
  quiz: any;
  timeLeft: number;
}) {

  const seconds = timeLeft.toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-center min-h-screen p-6">

      <div className="max-w-md w-full space-y-6 text-center animate-in fade-in zoom-in duration-500">

        {/* Icon */}
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary/10 border border-primary/20">

          <Clock size={28} className="text-primary animate-pulse" />

          <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />

        </div>

        {/* Title */}
        <div className="space-y-1">

          <h1 className="text-xl font-bold tracking-tight">
            {quiz.title}
          </h1>

          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Quiz will start automatically
          </p>

        </div>

        {/* Countdown */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-3">

          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Starts In
          </p>

          <div className="text-4xl font-mono font-bold text-primary tabular-nums">
            00:{seconds}
          </div>

        </div>

        {/* Security info */}
        <div className="flex justify-center gap-6 text-xs text-muted-foreground font-medium">

          <span className="flex items-center gap-2">
            <ShieldCheck size={14} />
            Anti-Cheat
          </span>

          <span className="flex items-center gap-2">
            <Lock size={14} />
            Secure
          </span>

        </div>

      </div>

    </div>
  );
}