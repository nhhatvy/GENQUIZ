// app/(dashboard)/teacher/events/_components/ScheduleModal.tsx
'use client';

import { X, CalendarPlus, BookOpen, Check, Clock, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuizId?: string | null;
  quizzes: any[];
  editingEvent?: any; // Dữ liệu khi bấm Edit
}

export default function ScheduleModal({ 
  isOpen, 
  onClose, 
  initialQuizId, 
  quizzes, 
  editingEvent 
}: ScheduleModalProps) {
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    targetClass: "10A1",
    startDate: "",
    startTime: "",
    duration: "45"
  });

  // Kiểm tra xem đang ở chế độ Edit hay Create
  const isEditMode = !!editingEvent;

 useEffect(() => {
  if (isOpen) {
    if (editingEvent) {
      // Trường hợp EDIT
      const matchedQuiz = quizzes.find(q => q.title === editingEvent.quizName);
      if (matchedQuiz) {
        setSelectedQuizId(matchedQuiz.id);
      }

      setFormData({
        title: editingEvent.title || "",
        targetClass: editingEvent.targetClass || "10A1",
        startDate: "", 
        startTime: "",
        duration: editingEvent.duration || "45"
      });
    } else {
      // Trường hợp CREATE mới
      setSelectedQuizId(initialQuizId || null);
      setFormData({
        title: "",
        targetClass: "10A1",
        startDate: "",
        startTime: "",
        duration: "45"
      });
    }
  }
}, [isOpen, editingEvent, initialQuizId, quizzes]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card border border-border w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-border flex justify-between items-center bg-secondary/10">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
              <CalendarPlus className="text-primary" /> 
              {isEditMode ? "Edit Event Schedule" : "Schedule New Event"}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {isEditMode ? "Cập nhật lại thời gian làm bài" : "Thiết lập thời gian và đối tượng cho kỳ thi"}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* BƯỚC 1: CHỌN QUIZ - CHỈ HIỂN THỊ KHI KHÔNG PHẢI CHẾ ĐỘ EDIT */}
          {!isEditMode && (
            <div className="space-y-4">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">1. Select a Quiz</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizzes.map((quiz) => (
                  <div 
                    key={quiz.id}
                    onClick={() => setSelectedQuizId(quiz.id)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer group",
                      selectedQuizId === quiz.id 
                        ? "border-primary bg-primary/5 ring-1 ring-primary" 
                        : "border-border bg-background/50 hover:border-primary/40"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                        selectedQuizId === quiz.id ? "bg-primary text-white" : "bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                      )}>
                        <BookOpen size={20} />
                      </div>
                      <p className="font-bold text-sm truncate">{quiz.title}</p>
                    </div>
                    {selectedQuizId === quiz.id && <Check size={16} className="text-primary" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BƯỚC 2: CẤU HÌNH THỜI GIAN - LUÔN HIỂN THỊ */}
          <div className="space-y-6">
            {!isEditMode && <div className="h-px bg-border" />}
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
              {isEditMode ? "Update Timing" : "2. Event Configuration"}
            </label>
            
            {isEditMode && (
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-center gap-3 mb-4">
                <BookOpen className="text-primary" size={20} />
                <div>
                  <p className="text-[10px] font-bold text-primary uppercase">Editing Quiz</p>
                  <p className="text-sm font-bold">{editingEvent.title}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground ml-1">Event Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground ml-1">Target Class</label>
                <select className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none cursor-pointer">
                  <option>Class 10A1</option>
                  <option>Class 10A2</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground ml-1">Start Date & Time</label>
                <div className="flex gap-2">
                   <input type="date" className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none" />
                   <input type="time" className="w-32 bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground ml-1">Duration (Min)</label>
                <input type="number" defaultValue={formData.duration} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-secondary/5 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 text-sm font-bold hover:bg-secondary rounded-2xl transition-colors cursor-pointer">
            Cancel
          </button>
          <button 
            className="px-10 py-3 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:opacity-90 transition active:scale-95 cursor-pointer"
          >
            {isEditMode ? "Update Event" : "Create Event"}
          </button>
        </div>
      </div>
    </div>
  );
}