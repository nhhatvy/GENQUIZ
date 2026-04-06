'use client';
import { UserPlus, LogIn, Trophy, ChevronRight, Save } from "lucide-react";

export default function QuizResultView({ name, score }: { name: string, score: number }) {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="max-w-2xl w-full space-y-8 animate-in fade-in duration-1000">
        
        <div className="bg-[#18181b] border border-white/5 rounded-[4rem] p-16 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <Trophy size={60} className="text-yellow-500 mx-auto mb-6 animate-bounce" />
            <h2 className="text-4xl font-black italic uppercase tracking-tight"> Great job, {name}!</h2>
            <div className="flex justify-center items-baseline gap-2 my-4">
               <span className="text-8xl font-black text-primary italic tracking-tighter">{score}</span>
               <span className="text-3xl font-bold text-gray-600">/10</span>
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Successfully completed the quiz</p>
          </div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        </div>

        <div className="space-y-4">
          <div className="text-center">
             <span className="px-4 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
               Lưu lại thành tích để không bị mất
             </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex flex-col gap-4 p-8 bg-primary text-white rounded-[2.5rem] hover:opacity-90 transition-all group shadow-xl">
               <UserPlus size={32} className="group-hover:scale-110 transition-transform" />
               <div className="text-left">
                  <h4 className="font-black uppercase text-lg tracking-tighter">Create New Account</h4>
                  <p className="text-[10px] opacity-70 font-bold uppercase tracking-widest">Save and view analytics</p>
               </div>
            </button>

            <button className="flex flex-col gap-4 p-8 bg-[#18181b] border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all group">
               <LogIn size={32} className="text-primary group-hover:scale-110 transition-transform" />
               <div className="text-left">
                  <h4 className="font-black uppercase text-lg tracking-tighter text-white">Already have an account</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Sign in to sync now</p>
               </div>
            </button>
          </div>
        </div>

        <button className="w-full text-gray-600 hover:text-white transition text-[10px] font-black uppercase tracking-[0.3em]">
          Continue without saving results
        </button>
      </div>
    </div>
  );
}