'use client';

import {
  ArrowLeft,
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function QuizEngine({ quiz, onExit }: { quiz: any, onExit: () => void }) {

  const TOTAL = 10;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(1174);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const questions = Array.from({ length: TOTAL }, (_, i) => i + 1);

  const options = [
    { id: 'A', text: 'Photosynthesis' },
    { id: 'B', text: 'Cellular respiration' },
    { id: 'C', text: 'Protein synthesis' },
    { id: 'D', text: 'Cell division' },
  ];

  /* ---------------- TIMER ---------------- */

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  /* ---------------- AUTO SAVE ---------------- */

  useEffect(() => {
    const saved = localStorage.getItem("quiz_answers");

    if (saved) {
      setSelectedAnswers(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quiz_answers", JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  /* ---------------- KEYBOARD NAVIGATION ---------------- */

  useEffect(() => {

    const handler = (e: KeyboardEvent) => {

      const key = e.key.toUpperCase();

      if (["A", "B", "C", "D"].includes(key)) {

        setSelectedAnswers({
          ...selectedAnswers,
          [currentQuestion]: key
        });

      }

      if (e.key === "ArrowRight") nextQuestion();
      if (e.key === "ArrowLeft") prevQuestion();

    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);

  }, [currentQuestion, selectedAnswers]);

  /* ---------------- NAVIGATION ---------------- */

  const nextQuestion = () => {
    if (currentQuestion < TOTAL - 1) {
      setDirection("next");
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setDirection("prev");
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleToggleFlag = (idx: number) => {

    setFlaggedQuestions(prev =>
      prev.includes(idx)
        ? prev.filter(i => i !== idx)
        : [...prev, idx]
    );

  };

  const progress = (Object.keys(selectedAnswers).length / TOTAL) * 100;

  return (

    <div className="fixed inset-0 z-[100] bg-background text-foreground flex flex-col">

      {/* TOP BAR */}

      <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card">

        <div className="flex items-center gap-4">

          <button
            onClick={onExit}
            className="p-1.5 hover:bg-secondary rounded-lg"
          >
            <ArrowLeft size={18} />
          </button>

          <div>

            <h2 className="text-sm font-semibold">
              {quiz.title}
            </h2>

            <p className="text-[10px] text-muted-foreground uppercase">
              Question {currentQuestion + 1} of {TOTAL}
            </p>

          </div>

        </div>


        <div className="flex items-center gap-3">

          <div className="flex items-center gap-2 bg-secondary border border-border px-3 py-1.5 rounded-lg text-sm font-mono">

            <Clock size={16} className="text-muted-foreground" />

            <span>{formatTime(timeLeft)}</span>

          </div>

          <div className="bg-secondary border border-border px-3 py-1.5 rounded-lg text-xs text-muted-foreground">

            Answered
            <span className="ml-1 font-semibold text-foreground">
              {Object.keys(selectedAnswers).length}/{TOTAL}
            </span>

          </div>

        </div>

      </header>


      {/* PROGRESS BAR */}

      <div className="h-1 bg-secondary">

        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />

      </div>


      <main className="flex-1 flex gap-6 p-6 max-w-[1200px] mx-auto w-full">

        {/* LEFT SIDE */}

        <div className="flex-1 space-y-5">

          <div className="bg-card border border-border rounded-2xl p-7 shadow-sm overflow-hidden">

            {/* HEADER */}

            <div className="flex items-center justify-between mb-6">

              <div className="flex items-center gap-3">

                <span className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">

                  Q{currentQuestion + 1}

                </span>

                <span className="px-2 py-0.5 bg-secondary rounded text-[9px] uppercase text-muted-foreground border border-border">

                  Apply

                </span>

              </div>


              <button
                onClick={() => handleToggleFlag(currentQuestion)}
                className={cn(
                  "p-2 rounded-lg border",
                  flaggedQuestions.includes(currentQuestion)
                    ? "bg-orange-500/10 border-orange-500 text-orange-500"
                    : "bg-secondary border-border text-muted-foreground"
                )}
              >

                <Flag size={18} />

              </button>

            </div>


            {/* QUESTION */}

            <div
              key={currentQuestion}
              className={cn(
                "transition-all duration-300",
                direction === "next"
                  ? "animate-in slide-in-from-right-4 fade-in"
                  : "animate-in slide-in-from-left-4 fade-in"
              )}
            >

              <h1 className="text-lg font-semibold mb-7 leading-snug">

                Which cellular process produces ATP in the mitochondria?

              </h1>


              {/* OPTIONS */}

              <div className="space-y-3">

                {options.map((opt) => (

                  <button
                    key={opt.id}

                    onClick={() =>
                      setSelectedAnswers({
                        ...selectedAnswers,
                        [currentQuestion]: opt.id
                      })
                    }

                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-xl border transition text-left group",

                      selectedAnswers[currentQuestion] === opt.id
                        ? "bg-primary/10 border-primary"
                        : "bg-background border-border hover:border-primary/40"
                    )}

                  >

                    <div
                      className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center",

                        selectedAnswers[currentQuestion] === opt.id
                          ? "border-primary bg-primary"
                          : "border-border group-hover:border-primary"
                      )}
                    >

                      {selectedAnswers[currentQuestion] === opt.id && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}

                    </div>

                    <span className="text-sm font-medium">

                      {opt.id}. {opt.text}

                    </span>

                  </button>

                ))}

              </div>

            </div>

          </div>


          {/* NAVIGATION */}

          <div className="flex items-center justify-between">

            <button
              onClick={prevQuestion}
              className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border rounded-lg text-sm font-medium hover:bg-secondary"
            >

              <ChevronLeft size={16} />

              Previous

            </button>


            <button
              onClick={nextQuestion}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90"
            >

              Next

              <ChevronRight size={16} />

            </button>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <aside className="w-64">

          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">

            <h3 className="font-semibold text-xs mb-4 uppercase tracking-wider text-muted-foreground text-center">

              Question Navigator

            </h3>


            <div className="grid grid-cols-4 gap-2 mb-6">

              {questions.map((num, idx) => (

                <button
                  key={num}
                  onClick={() => setCurrentQuestion(idx)}
                  className={cn(
                    "w-full aspect-square rounded-lg text-[11px] font-semibold transition border",

                    currentQuestion === idx
                      ? "bg-primary border-primary text-primary-foreground"

                      : selectedAnswers[idx]
                      ? "bg-green-500/10 border-green-500/40 text-green-600"

                      : flaggedQuestions.includes(idx)
                      ? "bg-orange-500/10 border-orange-500/40 text-orange-500"

                      : "bg-secondary border-border text-muted-foreground"
                  )}
                >

                  {num}

                </button>

              ))}

            </div>


            <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-semibold uppercase hover:opacity-90">

              Submit Quiz

            </button>

          </div>

        </aside>

      </main>

    </div>

  );
}