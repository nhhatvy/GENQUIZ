'use client';
import { ArrowLeft, Edit3, Share2, Play, Users, Clock, Target, BarChart3, Book } from "lucide-react";
import { useState } from "react";
import QuizShare from "./QuizShare";
import QuizPreviewEngine from "./QuizPreview";

interface QuizAnalyticsProps {
  quiz: any;
  onBack: () => void;
}
const quiz = {
  questions: [
    {
      question: "Which energy source is non-renewable?",
      difficulty: "Medium",
      points: 100,
      options: [
        { id: "A", text: "Solar Power" },
        { id: "B", text: "Wind Power" },
        { id: "C", text: "Natural Gas" },
        { id: "D", text: "Hydroelectric Power" }
      ]
    }
  ]
}
export default function QuizAnalytics({ quiz, onBack }: QuizAnalyticsProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  if (isPreviewing) {
    return <QuizPreviewEngine quiz={quiz} onExit={() => setIsPreviewing(false)} />;
  }
  if (isSharing) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
       <QuizShare 
         quizTitle={quiz?.title || "Quiz"} 
         onBack={() => setIsSharing(false)} 
       />
    </div>
  );
} 
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-secondary rounded-lg border border-border transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{quiz.title}</h2>
            <p className="text-muted-foreground text-sm">Basic concepts of biology for beginners</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition">
            <Edit3 size={16} /> Edit
          </button>
          <button 
            onClick={() => setIsPreviewing(true)}
            className="cursor-pointer flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 shadow-lg shadow-primary/20 transition"
          >
            <Play size={16} fill="currentColor" /> Preview
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Completions", value: "28", icon: Book, color: "text-purple-500", bg: "bg-purple-500/10" },
          { label: "Completion Time", value: "12:45", icon: Clock, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Average Score", value: "78.5%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Top Score", value: "95%", icon: Target, color: "text-orange-500", bg: "bg-orange-500/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border p-5 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Completions Table */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Recent Completions</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Students who recently completed this quiz</p>
            </div>
            <button className="text-xs font-medium px-3 py-1.5 border border-border rounded-md hover:bg-secondary transition">View All Results</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/50 text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-medium">Student</th>
                  <th className="px-5 py-3 font-medium">Score</th>
                  <th className="px-5 py-3 font-medium">Time Spent</th>
                  <th className="px-5 py-3 font-medium">Completed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: "Alex Johnson", score: "85%", time: "15:24", ago: "2 hours ago" },
                  { name: "Emma Wilson", score: "92%", time: "18:24", ago: "2 hours ago" },
                  { name: "Michael Cohen", score: "92%", time: "18:24", ago: "2 hours ago" },
                  { name: "Sophia Garcia", score: "92%", time: "18:24", ago: "2 hours ago" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-5 py-4 font-medium">{row.name}</td>
                    <td className="px-5 py-4">{row.score}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.time}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.ago}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Question Performance */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold">Question Performance</h3>
          <p className="text-xs text-muted-foreground mt-0.5 mb-6">How students performed on each question</p>
          <div className="space-y-6">
            {[
              "What is the basic unit of life?",
              "Which organelle is responsible for...?",
              "What is the process of cell division...?",
              "Which of the following is NOT a...?",
              "What is the main function of mito...?",
            ].map((q, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="truncate pr-4 text-foreground/80">{i+1}. {q}</span>
                  <span className="text-primary">92%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="bg-card border border-border p-6 rounded-xl flex items-center justify-between bg-gradient-to-r from-card to-secondary/20">
        <div>
          <h3 className="font-semibold text-lg">Share This Quiz</h3>
          <p className="text-sm text-muted-foreground">Share this quiz with students or colleagues</p>
        </div>
        <button onClick={() => setIsSharing(true)} className=" cursor-pointer flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition">
          <Share2 size={18} /> Share Quiz
        </button>
      </div>
    </div>
  );
}