'use client';
import { useState } from "react";
import { Sparkles, MousePointer2, X } from "lucide-react";
import AICreateQuiz from "./ai-flow/AICreateQuiz";
import QuizDetail from "./manual-flow/QuizDetail";
import QuizQuestion from "./manual-flow/QuizQuestion";
interface QuizCreatorProps {
  onClose: () => void;
  onFinish: (data: any) => void;
}

export default function QuizCreator({ onClose, onFinish }: QuizCreatorProps) {
  const [mode, setMode] = useState<'SELECT' | 'AI' | 'MANUAL'>('SELECT');
  const [manualStep, setManualStep] = useState(1);

  // 1. MÀN HÌNH CHỌN PHƯƠNG THỨC
  if (mode === 'SELECT') {
    return (
      <div className="max-w-4xl mx-auto py-20 animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Create New Quiz</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full"><X /></button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button onClick={() => setMode('AI')} className="group p-8 border-2 border-border rounded-3xl bg-card hover:border-primary transition-all text-left space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform"><Sparkles /></div>
            <h3 className="text-xl font-bold">AI Generator</h3>
            <p className="text-sm text-muted-foreground">Tạo quiz từ tài liệu, video hoặc văn bản có sẵn.</p>
          </button>

          <button onClick={() => setMode('MANUAL')} className="group p-8 border-2 border-border rounded-3xl bg-card hover:border-primary transition-all text-left space-y-4">
            <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-muted-foreground group-hover:scale-110 transition-transform"><MousePointer2 /></div>
            <h3 className="text-xl font-bold">Manual Creation</h3>
            <p className="text-sm text-muted-foreground">Tự soạn thảo câu hỏi và đáp án theo cách thủ công.</p>
          </button>
        </div>
      </div>
    );
  }

  // 2. LUỒNG AI
  if (mode === 'AI') {
    return <AICreateQuiz onBack={() => setMode('SELECT')} onFinish={onFinish} />;
  }

  // 3. LUỒNG THỦ CÔNG
  return (
    <>
      {manualStep === 1 && (
        <QuizDetail onNext={() => setManualStep(2)} onBack={() => setMode('SELECT')} />
      )}
      {manualStep === 2 && (
        <QuizQuestion onBack={() => setManualStep(1)} onPublish={onFinish} />
      )}
    </>
  );
}