'use client';

import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  BarChart3, 
  Search, 
  Filter, 
  ChevronDown,
  Plus,
  ChevronRight,
  RotateCcw,
  PlayCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import QuizCreator from "@/app/_components/quiz-creator";
import QuizEngine from "./components/QuizEngine";
import QuizStartLobby from "./components/quizlobby";

export default function MyQuizzesPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any | null>(null);
  const [isStartQuiz, setIsStart] = useState(false);

  const stats = [
    { label: "Total Quizzes", value: "4", icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Completed", value: "2", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "In Progress", value: "1", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Average Score", value: "90%", icon: BarChart3, color: "text-blue-500", bg: "bg-blue-500/10" },
  ];

  const quizzes = [
    { id: 1, title: "Biology Fundamentals", category: "Science", status: "In Progress", questions: 20, difficulty: "Medium", difficultyColor: "text-orange-500", created: "20/3/2026", action: "Continue", actionBg: "bg-primary" },
    { id: 2, title: "World War II History", category: "History", status: "Completed", questions: 15, difficulty: "Medium", difficultyColor: "text-orange-500", score: "92%", created: "18/3/2026", lastAttempt: "25/3/2026", action: "Retake", actionBg: "bg-purple-600" },
    { id: 3, title: "Algebra Basics", category: "Mathematics", status: "Not Started", questions: 25, difficulty: "Hard", difficultyColor: "text-red-500", created: "15/3/2026", action: "Start", actionBg: "bg-primary" },
    { id: 4, title: "English Grammar", category: "English", status: "Completed", questions: 18, difficulty: "Easy", difficultyColor: "text-green-500", score: "88%", created: "12/3/2026", lastAttempt: "24/3/2026", action: "Retake", actionBg: "bg-purple-600" }
  ];

  const handleFinish = (quizData: any) => {
    console.log("Saving quiz...", quizData);
    setIsCreating(false);
  };

  if (isCreating) {
    return (
      <div className="container py-10">
        <QuizCreator onClose={() => setIsCreating(false)} onFinish={handleFinish} />
      </div>
    );
  }

  if (isStartQuiz && selectedQuiz) {
    return (
      <QuizEngine 
        quiz={selectedQuiz} 
        onExit={() => {
          setIsStart(false);
          setSelectedQuiz(null);
        }} 
      />
    );
  }

  if (selectedQuiz) {
    return (
      <div className="container py-10">
        <QuizStartLobby 
          quiz={selectedQuiz}
          onBack={() => setSelectedQuiz(null)}
          onStart={() => setIsStart(true)} 
        />
      </div>
    );
  }
  return (
    <div className="space-y-8 pb-10">
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">My Quizzes</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Track and manage your personal quizzes
          </p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition active:scale-95"
        >
          <Plus size={18} />
          Create Quiz
        </button>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card border border-border p-5 rounded-xl shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <stat.icon size={18} className={stat.color} />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
            <p className="text-3xl font-bold text-foreground leading-none">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 3. FILTERS */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            placeholder="Search quizzes..."
            className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition"
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
           <div className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl text-sm font-medium cursor-pointer hover:bg-secondary/50 transition">
              <Filter size={16} />
              <span className="hidden sm:inline">Filter</span>
           </div>
           <select className="flex-1 lg:w-32 bg-card border border-border rounded-xl px-4 py-2.5 text-sm font-medium outline-none cursor-pointer">
              <option>All Status</option>
              <option>Completed</option>
              <option>In Progress</option>
           </select>
           <select className="flex-1 lg:w-32 bg-card border border-border rounded-xl px-4 py-2.5 text-sm font-medium outline-none cursor-pointer">
              <option>All Difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
           </select>
        </div>
      </div>

      {/* 4. QUIZ LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-all shadow-sm flex flex-col justify-between relative overflow-hidden">
            
            <div className="space-y-4">
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition">
                      {quiz.title}
                    </h3>
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter",
                      quiz.status === "In Progress" ? "bg-orange-500/10 text-orange-500" : 
                      quiz.status === "Completed" ? "bg-green-500/10 text-green-500" : 
                      "bg-blue-500/10 text-blue-500"
                    )}>
                      {quiz.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{quiz.category}</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground/50 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Quiz Meta */}
              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <FileText size={14} />
                  {quiz.questions} questions
                </div>
                <div className={cn("flex items-center gap-1.5 font-bold", quiz.difficultyColor)}>
                  {quiz.difficulty}
                </div>
                {quiz.score && (
                  <div className="flex items-center gap-1.5 text-orange-500 font-bold">
                     <BarChart3 size={14} /> {quiz.score}
                  </div>
                )}
              </div>

              {/* Dates */}
              <div className="pt-2 space-y-1">
                <p className="text-[10px] text-muted-foreground font-medium uppercase">
                  Created {quiz.created}
                </p>
                {quiz.lastAttempt && (
                  <p className="text-[10px] text-muted-foreground font-medium uppercase italic">
                    Last attempt: {quiz.lastAttempt}
                  </p>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6">
               <button onClick={() => setSelectedQuiz(quiz)} className={cn(
                 "w-full py-2 rounded-xl text-xs font-bold text-white transition flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98]",
                 quiz.actionBg
               )}>
                 {quiz.action === "Continue" && <Clock size={14} />}
                 {quiz.action === "Retake" && <RotateCcw size={14} />}
                 {quiz.action === "Start" && <PlayCircle size={14} />}
                 {quiz.action}
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}