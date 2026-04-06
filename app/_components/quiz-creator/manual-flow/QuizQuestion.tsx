"use client";

import { 
  ChevronLeft, 
  Trash2, 
  Plus, 
  GripVertical,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface QuizQuestionsProps {
  onBack: () => void;
  onPublish: (questions: any[]) => void;
}

export default function QuizQuestion({ onBack, onPublish }: QuizQuestionsProps) {
    const [questions, setQuestions] = useState([
    { id: 1, text: "", options: [], correct: null }
  ]);
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-xl border border-border bg-card hover:bg-secondary transition-all active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">Create New Quiz</h2>
            <p className="text-sm text-muted-foreground">
              Add questions and configure answers
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 text-sm font-medium border border-border rounded-xl hover:bg-secondary transition-all">
            Save Draft
          </button>

          <button className="px-5 py-2 text-sm font-medium bg-primary/20 text-primary rounded-xl border border-primary/20 hover:bg-primary/30 transition-all">
            Preview
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-6 shadow-sm">
        
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quiz Questions</h3>
          <p className="text-sm text-muted-foreground">
            Create and manage your quiz questions
          </p>
        </div>

        {/* QUESTION CARD */}
        <div className="rounded-2xl border border-border bg-background/50 p-6 space-y-6 relative group overflow-hidden">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-4">

            <div className="flex items-center gap-3">
              <GripVertical size={18} className="text-muted-foreground/40 cursor-grab" />
              <span className="text-sm font-medium text-foreground">
                Question 1
              </span>
            </div>

            <div className="flex items-center gap-4">

              {/* Points */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-muted-foreground">Points</label>

                <input 
                  type="number" 
                  defaultValue={10}
                  className="w-16 bg-background border border-border rounded-lg px-2 py-1 text-sm text-center outline-none focus:border-primary"
                />
              </div>

              {/* Type */}
              <select className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm outline-none cursor-pointer hover:border-primary">
                <option>Multiple Choice</option>
                <option>True/False</option>
                <option>Short Answer</option>
              </select>

              {/* Delete */}
              <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>

            </div>
          </div>

          {/* Question */}
          <div className="space-y-4">

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Question Text
              </label>

              <textarea 
                rows={3}
                placeholder="Which of the following is NOT a renewable energy source?"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>

            {/* Answers */}
            <div className="space-y-3">

              <label className="text-xs font-medium text-muted-foreground">
                Answer Options
              </label>
              
              <div className="grid gap-3">

                {[
                  { text: "Solar Power", correct: false },
                  { text: "Wind Power", correct: false },
                  { text: "Natural Gas", correct: true },
                  { text: "Hydroelectric Power", correct: false }
                ].map((option, idx) => (

                  <div 
                    key={idx}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl border transition-all group/option",
                      option.correct 
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                        : "border-border bg-background/50 hover:border-primary/40"
                    )}
                  >

                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                      option.correct
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    )}>
                      {option.correct && (
                        <CheckCircle2 size={12} className="text-white" />
                      )}
                    </div>

                    <input 
                      defaultValue={option.text}
                      className="bg-transparent border-none outline-none text-sm flex-1 text-foreground"
                    />

                    <button className="opacity-0 group-hover/option:opacity-100 p-1 text-muted-foreground hover:text-red-500 transition-all">
                      <Trash2 size={14} />
                    </button>

                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* ADD QUESTION */}
        <button className="w-full py-4 border-2 border-dashed border-border rounded-2xl flex items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all group text-sm font-medium">
          <Plus size={18} className="group-hover:scale-110 transition-transform" />
          Add Question
        </button>

      </div>

      {/* FOOTER */}
      <div className="flex justify-end pt-4 gap-4">

        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-8 py-2.5 text-sm font-medium rounded-xl border border-border bg-card hover:bg-secondary transition-all"
        >
          <ChevronLeft size={16} /> Prev
        </button>

        <button 
          onClick={() => onPublish(questions)}
          className="flex items-center gap-2 px-8 py-2.5 text-sm font-medium rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
        >
          Preview & Publish
        </button>

      </div>
    </div>
  );
}