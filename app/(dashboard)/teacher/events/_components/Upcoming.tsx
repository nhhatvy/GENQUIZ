// Upcoming.tsx
'use client';
import { cn } from "@/lib/utils";
import { 
  ArrowLeft, 
  Settings, 
  Copy, 
  Globe, 
  ShieldCheck, 
  ExternalLink,
  Timer,
  Check,
  Download,
  QrCode
} from "lucide-react";
import { useState } from "react";

export default function QuizWaitingView({ event, onBack }: { event: any, onBack: () => void }) {
  const [isCopied, setIsCopied] = useState(false);
  
  // Link dành cho học sinh (Giả lập)
  const studentLink = `https://genquiz.com/join/${event.id || 'QUIZ-ID-123'}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(studentLink)}&color=6366f1`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(studentLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. HEADER & NAVIGATION */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all active:scale-95 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="font-medium">Back to Events</span>
        </button>
        <div className="flex gap-2">
          <button className="p-2.5 hover:bg-secondary rounded-xl border border-border transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT: ACCESS & SHARING (Trọng tâm nghiệp vụ) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-[2rem] p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase border border-blue-500/20">
                  Upcoming Test
                </span>
              </div>
              <h2 className="text-4xl font-black text-foreground tracking-tight italic uppercase">{event.title}</h2>
              <p className="text-muted-foreground font-medium">{event.quizName}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {/* Cột trái: Link Copy */}
                <div className="space-y-4">
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <Globe size={14} /> Student Access Link
                    </p>
                    <div className="flex flex-col gap-3">
                        <div className="bg-secondary/50 border border-border rounded-xl px-4 py-3 font-mono text-sm truncate text-muted-foreground">
                        {studentLink}
                        </div>
                        <button 
                        onClick={handleCopyLink}
                        className={cn(
                            "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 cursor-pointer",
                            isCopied ? "bg-green-500 text-white" : "bg-primary text-primary-foreground hover:opacity-90"
                        )}
                        >
                        {isCopied ? <Check size={18}/> : <Copy size={18} />}
                        {isCopied ? "Copied!" : "Copy Link"}
                        </button>
                    </div>
                </div>

                {/* Cột phải: QR Code - MỚI THÊM */}
                <div className="bg-background border border-border p-4 rounded-2xl flex flex-col items-center gap-3">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        <QrCode size={12} /> Scan to Join
                    </p>
                    <div className="bg-white p-2 rounded-xl shadow-inner border border-border">
                        <img 
                            src={qrCodeUrl} 
                            alt="Student QR Code" 
                            className="w-32 h-32 object-contain"
                        />
                    </div>
                    <button className="flex items-center gap-1.5 text-[10px] font-bold text-primary hover:underline cursor-pointer">
                        <Download size={12} /> Download QR Image
                    </button>
                </div>
            </div>

            <p className="text-[10px] text-muted-foreground italic text-center md:text-left">
                * Students can use the link or scan the QR code. Access is restricted until the start time.
            </p>
          </div>

          {/* Quick Config Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-card border border-border p-6 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Anti-Cheat</p>
                    <p className="font-bold">Tab Switch Monitor Enabled</p>
                </div>
             </div>
             <div className="bg-card border border-border p-6 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground">
                    <ExternalLink size={24} />
                </div>
                <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Quiz Source</p>
                    <p className="font-bold underline cursor-pointer">Preview Content</p>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT: SCHEDULING LOGIC (Đếm ngược tự động) */}
        <div className="bg-card border border-border rounded-[2rem] p-8 flex flex-col items-center justify-center text-center space-y-6 shadow-sm">
           <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-bounce">
              <Timer size={40} />
           </div>
           
           <div className="space-y-2">
              <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">Automatic Activation</p>
              <h3 className="text-3xl font-black font-mono">02 : 15 : 45</h3>
              <div className="flex justify-between text-[10px] text-muted-foreground font-bold px-2 uppercase">
                <span>Hrs</span>
                <span>Min</span>
                <span>Sec</span>
              </div>
           </div>

           <div className="w-full pt-6 border-t border-border space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">Scheduled Date:</span>
                <span className="font-bold">04 April, 2026</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">Start At:</span>
                <span className="font-bold">{event.time}</span>
              </div>
           </div>

           <button className="w-full py-4 bg-background border border-border hover:border-primary/50 rounded-2xl text-xs font-black uppercase transition-all hover:shadow-lg active:scale-95">
              Edit Schedule
           </button>
           
           <p className="text-[10px] text-muted-foreground leading-relaxed">
             System will automatically open for students exactly at the scheduled time. No manual action required.
           </p>
        </div>

      </div>
    </div>
  );
}