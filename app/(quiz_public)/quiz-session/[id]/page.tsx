'use client';

import { useState, useEffect } from "react";
import QuizEngine from "../../components/Engine";
import QuizEntryView from "../../components/Entry";
import QuizResultView from "../../components/Result";
import QuizWaitingView from "../../components/Waiting";


export default function QuizSessionPage({ params }: { params: { id: string } }) {
  const [step, setStep] = useState<'waiting' | 'entry' | 'examining' | 'result'>('waiting');
  const [studentName, setStudentName] = useState("");
  const [timeLeft, setTimeLeft] = useState(15); // Giả lập 15s đếm ngược từ Server

  // Mock Data (Thực tế sẽ fetch từ API theo params.id)
  const quizData = {
    id: params.id,
    title: "Biology Fundamentals - Cell Structure",
    totalQuestions: 10,
    duration: 1200, // 20 phút
  };

  useEffect(() => {
    if (step === 'waiting') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setStep('entry');
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const handleStart = (name: string) => {
    setStudentName(name);
    setStep('examining');
  };

  const handleFinish = () => {
    setStep('result');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-primary/30">
      {step === 'waiting' && <QuizWaitingView quiz={quizData} timeLeft={timeLeft} />}
      {step === 'entry' && <QuizEntryView quiz={quizData} onStart={handleStart} />}
      {step === 'examining' && <QuizEngine quiz={quizData} onExit={handleFinish} />}
      {step === 'result' && <QuizResultView name={studentName} score={9.5} />}
    </div>
  );
}