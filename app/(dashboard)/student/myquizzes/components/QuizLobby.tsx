'use client';

import {
  ArrowLeft,
  Book,
  HelpCircle,
  Timer,
  Target,
  Zap,
  Info,
  Play
} from "lucide-react";

interface QuizStartLobbyProps {
  quiz: any;
  onBack: () => void;
  onStart: () => void;
}

export default function QuizStartLobby({ quiz, onBack, onStart }: QuizStartLobbyProps) {

  const infoCards = [
    { label: "Total Questions", value: quiz.questions || 10, icon: HelpCircle },
    { label: "Time Limit", value: "20 mins", icon: Timer },
    { label: "Passing Score", value: "70%", icon: Target },
    { label: "Quiz Mode", value: "Practice", icon: Zap },
  ];

  const instructions = [
    "Read each question carefully before selecting your answer",
    "You can flag questions to review later",
    "In Practice Mode you'll see instant feedback",
    "Timer starts when you click Start Quiz",
    "Use navigation buttons to move between questions"
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to My Quizzes
      </button>

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white shadow-md">

        <div className="relative z-10 flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <Book size={22} strokeWidth={2.5} />
          </div>

          <div>
            <h1 className="text-xl font-bold leading-tight">
              {quiz.title}
            </h1>

            <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mt-1">
              {quiz.category}
            </p>
          </div>

        </div>

        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-black/10 rounded-full blur-3xl" />

      </div>

      {/* Main Card */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">

        <h3 className="text-lg font-semibold flex items-center gap-2">
          Quiz Information
        </h3>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">

          {infoCards.map((card, i) => (

            <div
              key={i}
              className="bg-secondary border border-border rounded-xl p-4 group hover:border-primary/40 transition"
            >

              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                {card.label}
              </p>

              <div className="flex items-center justify-between">

                <p className="text-lg font-bold">
                  {card.value}
                </p>

                <card.icon
                  size={18}
                  className="text-muted-foreground/50 group-hover:text-primary transition"
                />

              </div>

            </div>

          ))}

        </div>

        {/* Instructions */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 space-y-3">

          <h4 className="text-xs font-bold text-primary flex items-center gap-2 uppercase tracking-widest">
            <Info size={14} />
            Instructions
          </h4>

          <ul className="space-y-2">

            {instructions.map((text, i) => (

              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >

                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />

                {text}

              </li>

            ))}

          </ul>

        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold shadow-sm hover:opacity-90 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 group"
        >

          <Play
            size={18}
            fill="currentColor"
            className="group-hover:translate-x-1 transition-transform"
          />

          Start Quiz

        </button>

      </div>

    </div>
  );
}