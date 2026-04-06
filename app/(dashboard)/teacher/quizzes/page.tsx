"use client";

import {
  BookOpen,
  ChevronDown,
  Copy,
  Edit2,
  Eye,
  Funnel,
  MoreVertical,
  Search,
  Trash2,
  Plus,
  CheckCircle2,
  CalendarClock,
} from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";

import QuizAnalytics from "./components/QuizAnalytics";
import QuizCreator from "@/app/_components/quiz-creator";
import QuizPreviewEngine from "./components/QuizPreview";

export default function QuizPage() {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [viewingQuiz, setViewingQuiz] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showSuccessBridge, setShowSuccessBridge] = useState(false);

  const [activeTab, setActiveTab] = useState("All Quizzes");
  const [searchQuery, setSearchQuery] = useState("");

  const [lastCreatedQuizId] = useState<string | null>("q123");
  const [previewQuiz, setPreviewQuiz] = useState<any | null>(null);

function openPreview(quiz:any){
  setPreviewQuiz(quiz);
}

function closePreview(){
  setPreviewQuiz(null);
}

{previewQuiz && (
  <QuizPreviewEngine
     quiz={previewQuiz}
     onExit={closePreview}
  />
)}
  const handleFinish = async () => {
    setIsCreating(false);
    setShowSuccessBridge(true);
  };

  if (viewingQuiz) {
    return <QuizAnalytics quiz={viewingQuiz} onBack={() => setViewingQuiz(null)} />;
  }

  if (showSuccessBridge) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
          <CheckCircle2 size={40} />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            Quiz Created Successfully!
          </h2>
          <p className="text-muted-foreground">
            What would you like to do next with this quiz?
          </p>
        </div>

        <div className="grid gap-4 pt-4 text-left">
          <button
            onClick={() =>
              router.push(`/teacher/events?quizId=${lastCreatedQuizId}`)
            }
            className="flex items-center gap-4 p-6 border-2 border-primary bg-primary/5 rounded-2xl hover:bg-primary/10 transition group"
          >
            <CalendarClock
              className="text-primary group-hover:scale-110 transition"
              size={32}
            />

            <div>
              <p className="font-bold text-lg text-foreground">
                Assign as Test (Schedule)
              </p>
              <p className="text-xs text-muted-foreground">
                Schedule quiz for students
              </p>
            </div>
          </button>

          <button
            onClick={() => setShowSuccessBridge(false)}
            className="p-4 text-muted-foreground hover:text-foreground text-sm font-medium transition"
          >
            Just save to My Library for now
          </button>
        </div>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div className="container py-10">
        <QuizCreator
          onClose={() => setIsCreating(false)}
          onFinish={handleFinish}
        />
      </div>
    );
  }

  const quizzes = [
    {
      title: "Introduction to Biology",
      status: "Published",
      statusColor: "bg-green-500/10 text-green-500",
    },
    {
      title: "Advanced Mathematics",
      status: "Published",
      statusColor: "bg-green-500/10 text-green-500",
    },
    {
      title: "Chemistry Fundamentals",
      status: "Draft",
      statusColor: "bg-yellow-500/10 text-yellow-500",
    },
  ];

  const statusMap: any = {
    Published: "Published",
    Drafts: "Draft",
  };

  const filteredQuizzes = quizzes
    .filter((quiz) => {
      if (activeTab === "All Quizzes") return true;
      return quiz.status === statusMap[activeTab];
    })
    .filter((quiz) =>
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-6 relative">
      {activeMenu !== null && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveMenu(null)}
        />
      )}

      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Quizzes</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Create, manage and analyze your quizzes
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-[1px] transition"
        >
          <Plus size={16} />
          Create New Quiz
        </button>
      </div>

      {/* Quiz Library */}

      <div className="rounded-sm border border-border bg-card p-6 space-y-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Quiz Library
          </h2>
          <p className="text-muted-foreground text-sm">
            Browse and manage all your quizzes
          </p>
        </div>

        {/* Filters */}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-2">
            {["All Quizzes", "Published", "Drafts"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium border transition-all
                ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "text-muted-foreground border-transparent hover:bg-secondary hover:text-foreground hover:border-border"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search quizzes..."
                className="bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-full md:w-64"
              />
            </div>

            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition">
              <Funnel size={16} />
              Categories
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Quiz List */}

        <div className="space-y-4">
          {filteredQuizzes.map((quiz, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-border bg-background p-4 hover:border-primary hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 group"
            >
              {/* Left */}

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition">
                  <BookOpen size={18} />
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {quiz.title}
                    </h3>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${quiz.statusColor}`}
                    >
                      {quiz.status}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    Basic concepts for beginners
                  </p>

                  <div className="flex gap-4 text-muted-foreground text-xs mt-1 font-medium">
                    <span>15 questions</span>
                    <span>20 min</span>
                    <span>32 completions</span>
                  </div>
                </div>
              </div>

              {/* Right */}

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewingQuiz(quiz)}
                  className="px-4 py-1.5 text-sm border border-border rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition"
                >
                  View
                </button>

                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === i ? null : i)
                    }
                    className={`w-8 h-8 flex items-center justify-center border border-border rounded-md transition
                    ${
                      activeMenu === i
                        ? "bg-primary text-primary-foreground border-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <MoreVertical size={16} />
                  </button>

                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-xl border border-border bg-popover shadow-xl z-50 overflow-hidden transition-all duration-200
                    ${
                      activeMenu === i
                        ? "opacity-100 scale-100 visible"
                        : "opacity-0 scale-95 invisible"
                    }`}
                  >
                    <div className="p-1.5 flex flex-col">
                      <button className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition">
                        <Edit2 size={14} />
                        Edit Quiz
                      </button>

                      <button className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition">
                        <Copy size={14} />
                        Duplicate
                      </button>

                      <div className="my-1 border-t border-border" />

                      <button className="flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition">
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredQuizzes.length === 0 && (
            <div className="text-center py-10 text-muted-foreground text-sm">
              No quizzes found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}