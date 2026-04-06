'use client';

import {
  ArrowLeft,
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Send,
} from "lucide-react";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface QuizEngineProps {
  quiz: any;
  onExit: () => void;
}

export default function QuizEngine({ quiz, onExit }: QuizEngineProps) {
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isAllAnswered = Object.keys(selectedAnswers).length === TOTAL;

  const handleSubmit = useCallback(() => {
    const answered = Object.keys(selectedAnswers).length;

    if (answered < TOTAL) {
      alert(`Bạn chưa hoàn thành bài thi! Vui lòng trả lời tất cả ${TOTAL} câu hỏi trước khi nộp bài. (Hiện tại: ${answered}/${TOTAL})`);
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn nộp bài thi này không?")) {
      localStorage.removeItem(`quiz_progress_${quiz.id}`);
      onExit();
    }
  }, [selectedAnswers, TOTAL, quiz.id, onExit]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Hết giờ làm bài! Hệ thống sẽ tự động nộp bài.");
          localStorage.removeItem(`quiz_progress_${quiz.id}`);
          onExit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quiz.id, onExit]);

  useEffect(() => {
    const saved = localStorage.getItem(`quiz_progress_${quiz.id}`);
    if (saved) setSelectedAnswers(JSON.parse(saved));
  }, [quiz.id]);

  useEffect(() => {
    if (Object.keys(selectedAnswers).length > 0) {
      localStorage.setItem(`quiz_progress_${quiz.id}`, JSON.stringify(selectedAnswers));
    }
  }, [selectedAnswers, quiz.id]);

  const nextQuestion = () => {
    if (currentQuestion < TOTAL - 1) {
      setDirection("next");
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setDirection("prev");
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSelect = (optionId: string) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion]: optionId }));
  };

  const handleToggleFlag = (idx: number) => {
    setFlaggedQuestions(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const progress = (Object.keys(selectedAnswers).length / TOTAL) * 100;

  return (
    <div className="fixed inset-0 z-[100] bg-background text-foreground flex flex-col">
      {/* HEADER */}
      <header className="h-14 border-b border-border flex items-center justify-between px-5 bg-card">
        <div className="flex items-center gap-3">
          <button onClick={onExit} className="p-2 hover:bg-secondary rounded-lg transition">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-sm font-semibold">{quiz.title}</h2>
            <p className="text-xs text-muted-foreground">Question {currentQuestion + 1} / {TOTAL}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-medium">
          <div className={cn(
            "flex items-center gap-2 border px-3 py-1.5 rounded-lg tabular-nums",
            timeLeft < 60 ? "bg-red-500/10 border-red-500 text-red-500 animate-pulse" : "bg-secondary border-border"
          )}>
            <Clock size={14} />
            {formatTime(timeLeft)}
          </div>
          <div className={cn(
            "border px-3 py-1.5 rounded-lg font-bold transition-colors",
            isAllAnswered ? "bg-green-500/10 border-green-500 text-green-600" : "bg-primary/10 border-primary/20 text-primary"
          )}>
            {Object.keys(selectedAnswers).length}/{TOTAL} Answered
          </div>
        </div>
      </header>

      {/* PROGRESS BAR */}
      <div className="h-1 bg-secondary">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <main className="flex-1 flex gap-6 p-6 max-w-[1100px] mx-auto w-full overflow-hidden">
        {/* LEFT SIDE - QUESTION */}
        <div className="flex-1 flex flex-col gap-5">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex-1">
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-xs font-semibold uppercase italic tracking-wider">
                Question {currentQuestion + 1}
              </span>
              <button
                onClick={() => handleToggleFlag(currentQuestion)}
                className={cn(
                  "p-2 rounded-lg border transition",
                  flaggedQuestions.includes(currentQuestion)
                    ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                    : "bg-secondary border-border text-muted-foreground"
                )}
              >
                <Flag size={16} fill={flaggedQuestions.includes(currentQuestion) ? "currentColor" : "none"} />
              </button>
            </div>

            <h1 className="text-xl font-bold leading-relaxed mb-8 italic">
              Which cellular process produces ATP in the mitochondria?
            </h1>

            <div className="grid gap-3">
              {options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border transition-all text-left group",
                    selectedAnswers[currentQuestion] === opt.id
                      ? "bg-primary/5 border-primary shadow-sm"
                      : "bg-background border-border hover:border-primary/40"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-black transition-all",
                    selectedAnswers[currentQuestion] === opt.id
                      ? "bg-primary text-white border-primary rotate-3"
                      : "border-border group-hover:border-primary group-hover:text-primary"
                  )}>
                    {opt.id}
                  </div>
                  <span className={cn(
                    "flex-1 text-sm font-bold transition-colors",
                    selectedAnswers[currentQuestion] === opt.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )}>
                    {opt.text}
                  </span>
                  {selectedAnswers[currentQuestion] === opt.id && (
                    <CheckCircle2 size={20} className="text-primary animate-in zoom-in duration-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* NAV BUTTONS */}
          <div className="flex justify-between items-center px-2">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-6 py-3 bg-secondary border border-border rounded-xl text-sm font-black uppercase tracking-widest disabled:opacity-30 hover:bg-muted transition-all active:scale-95"
            >
              <ChevronLeft size={18} /> Prev
            </button>

            <button
              onClick={nextQuestion}
              disabled={currentQuestion === TOTAL - 1}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-black uppercase tracking-[0.2em] transition-all active:scale-95",
                currentQuestion === TOTAL - 1 
                  ? "bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed opacity-50" 
                  : "bg-primary text-primary-foreground hover:opacity-90"
              )}
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* NAVIGATOR SIDEBAR */}
        <aside className="w-72 hidden lg:block">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col h-full">
            <div className="text-center mb-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground italic underline underline-offset-8">Navigator</h3>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-8 overflow-y-auto pr-1">
              {questions.map((num, idx) => (
                <button
                  key={num}
                  onClick={() => setCurrentQuestion(idx)}
                  className={cn(
                    "aspect-square rounded-xl text-xs font-black border-2 flex items-center justify-center transition-all",
                    currentQuestion === idx
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/30 scale-110 z-10"
                      : selectedAnswers[idx]
                      ? "bg-green-500/10 text-green-600 border-green-500/40"
                      : flaggedQuestions.includes(idx)
                      ? "bg-orange-500/10 text-orange-500 border-orange-500/40"
                      : "bg-secondary border-transparent text-muted-foreground hover:border-primary/20"
                  )}
                >
                  {num}
                </button>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-border space-y-3">
               <div className="flex items-center gap-3 text-[9px] font-black uppercase text-gray-500">
                  <div className="w-3 h-3 rounded-sm bg-green-500" /> Answered
               </div>
               <div className="flex items-center gap-3 text-[9px] font-black uppercase text-gray-500">
                  <div className="w-3 h-3 rounded-sm bg-orange-500" /> Flagged
               </div>
            </div>

            {/* Chỉ nộp bài tại đây */}
            <button 
              onClick={handleSubmit}
              disabled={!isAllAnswered}
              className={cn(
                "w-full mt-6 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-2",
                isAllAnswered 
                  ? "bg-green-600 text-white shadow-xl shadow-green-500/20 hover:bg-green-700" 
                  : "bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed"
              )}
            >
              <Send size={16} />
              {!isAllAnswered ? `Finish Quiz` : `Submit Quiz`}
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}