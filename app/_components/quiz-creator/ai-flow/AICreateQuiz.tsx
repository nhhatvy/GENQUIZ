'use client';

import { 
  Sparkles, 
  Zap, 
  BrainCircuit, 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Mic, 
  ChevronDown,
  ArrowLeft,
  Crown
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
interface AICreateQuizProps {
  onBack: () => void;
  onFinish: (data: any) => void;
}
export default function AICreateQuiz({ onBack, onFinish }: AICreateQuizProps) {
  const [selectedBloom, setSelectedBloom] = useState(['Understand']);

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 animate-in fade-in duration-700">
      
      {/* 0. BACK BUTTON & TITLE */}
      <div className="text-center space-y-4">
        <button onClick={onBack} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition mx-auto">
          <ArrowLeft size={14} /> Back to My Quizzes
        </button>
        <div className="flex items-center justify-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Sparkles className="text-primary" size={28} />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white">
            AI-Powered Quiz Generator
          </h1>
        </div>
        <p className="text-muted-foreground">
          Upload any learning material and watch our AI create personalized quizzes in seconds
        </p>
      </div>

      {/* 1. TOP FEATURES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Smart Analysis", desc: "AI reads and understands your materials using advanced NLP technology", icon: BrainCircuit, color: "border-purple-500/30 text-purple-400" },
          { title: "Auto-Generate", desc: "Instantly creates tailored questions based on your learning objectives", icon: Zap, color: "border-green-500/30 text-green-400" },
          { title: "Lightning Fast", desc: "Generate complete quizzes in under 30 seconds with AI power", icon: Zap, color: "border-orange-500/30 text-orange-400" },
        ].map((feature, i) => (
          <div key={i} className={cn("bg-card border p-6 rounded-2xl space-y-3", feature.color)}>
            <feature.icon size={24} />
            <h3 className="font-bold text-white">{feature.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* 2. PREMIUM BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 text-white shadow-xl shadow-purple-500/10">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
             <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
                <Sparkles size={32} />
             </div>
             <div className="space-y-1">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  Powered by Advanced AI <span className="text-[10px] bg-white text-purple-600 px-1.5 py-0.5 rounded-md font-black italic">NEW</span>
                </h2>
                <p className="text-xs text-indigo-50 opacity-90 max-w-md">
                  Our AI engine uses GPT-4, OCR, and Speech-to-Text to analyze PDFs, videos, images, audio, and more.
                </p>
                <div className="flex gap-4 pt-2 text-[10px] font-bold opacity-80 uppercase tracking-widest">
                   <span>Multi-format support</span>
                   <span>Bloom's Taxonomy</span>
                   <span>Instant Feedback</span>
                </div>
             </div>
          </div>
          <button className="flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition shadow-lg whitespace-nowrap">
            <Crown size={18} /> Upgrade to Premium
          </button>
        </div>
      </div>

      {/* 3. HOW IT WORKS */}
      <div className="text-center space-y-8">
        <div className="space-y-1">
          <h2 className="text-xl font-bold">How AI Quiz Generation Works</h2>
          <p className="text-xs text-muted-foreground italic">Simple 3-step process powered by artificial intelligence</p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {[
            { step: 1, label: "Upload Content", icon: Upload, desc: "Drop your PDFs, images, videos, or paste text. AI supports 10+ formats." },
            { step: 2, label: "AI Analysis", icon: BrainCircuit, desc: "AI reads, understands, and extracts key concepts from your materials." },
            { step: 3, label: "Get Your Quiz", icon: Sparkles, desc: "Receive personalized questions ready to practice or share." },
          ].map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-4 px-6">
              <div className="relative">
                <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center text-primary shadow-sm">
                  <item.icon size={24} />
                </div>
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-4 border-background">
                  {item.step}
                </span>
              </div>
              <div className="space-y-1 text-center">
                <h4 className="font-bold text-sm">{item.label}</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CONFIGURATION FORM */}
      <div className="bg-card border border-border rounded-3xl p-8 space-y-10 shadow-sm">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="font-bold border-l-4 border-primary pl-3">Basic Information</h3>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Quiz Title *</label>
              <input 
                placeholder="e.g., Biology Chapter 1 - Cells"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition"
              />
            </div>
            <div className="space-y-2 text-white">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ">Subject *</label>
              <div className="relative">
                <select className="w-full bg-background border border-border rounded-xl px-4 py-3 appearance-none outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Select a subject</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Upload Materials */}
        <div className="space-y-4">
          <h3 className="font-bold border-l-4 border-primary pl-3 flex items-center gap-2">
            <Upload size={18} /> Upload Learning Materials
          </h3>
          <div className="space-y-4">
            <div className="flex gap-2 p-1 bg-background border border-border rounded-xl w-fit">
               <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold">
                 <Upload size={14} /> Upload File
               </button>
               <button className="flex items-center gap-2 px-4 py-2 hover:bg-secondary rounded-lg text-xs font-bold text-muted-foreground transition">
                 <FileText size={14} /> Paste Text
               </button>
            </div>

            <div className="border-2 border-dashed border-primary/20 bg-primary/5 rounded-3xl p-12 flex flex-col items-center gap-6 text-center group hover:border-primary/40 transition">
               <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center text-primary shadow-lg group-hover:scale-110 transition">
                  <Upload size={32} />
               </div>
               <div className="space-y-1">
                  <h4 className="font-bold text-lg">Drop your files here or click to browse</h4>
                  <p className="text-xs text-muted-foreground">AI supports multiple formats for maximum flexibility</p>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mt-4">
                  {[
                    { icon: FileText, label: "PDF & Docs", sub: "PDF, Word, TXT", color: "text-red-400" },
                    { icon: ImageIcon, label: "Images", sub: "JPG, PNG with OCR", color: "text-green-400" },
                    { icon: Video, label: "Videos", sub: "MP4 Lectures", color: "text-blue-400" },
                    { icon: Mic, label: "Audio", sub: "MP3 Voice notes", color: "text-orange-400" },
                  ].map((format, i) => (
                    <div key={i} className="bg-background border border-border rounded-xl p-4 flex flex-col items-center gap-2">
                      <format.icon size={24} className={format.color} />
                      <p className="text-[10px] font-black uppercase tracking-tighter">{format.label}</p>
                      <p className="text-[8px] text-muted-foreground">{format.sub}</p>
                    </div>
                  ))}
               </div>
               <p className="text-[10px] text-muted-foreground pt-4 uppercase font-bold tracking-widest">Maximum file size: 50MB</p>
            </div>
          </div>
        </div>

        {/* AI Configuration */}
        <div className="space-y-6">
          <h3 className="font-bold border-l-4 border-primary pl-3 flex items-center gap-2">
            <Zap size={18} /> AI Quiz Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Number of Questions</label>
                 <input type="number" defaultValue={10} className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Quiz Intent</label>
                 <select className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none">
                    <option>Post-learning Quiz</option>
                 </select>
               </div>
            </div>
            <div className="space-y-6">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Difficulty Level</label>
                 <select className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none">
                    <option>Medium</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Question Types</label>
                 <div className="space-y-3 pt-2">
                    {['Multiple Choice', 'True / False', 'Short Answer'].map(type => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" defaultChecked={type === 'Multiple Choice'} className="w-4 h-4 rounded border-border bg-background checked:bg-primary transition" />
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-white transition">{type}</span>
                      </label>
                    ))}
                 </div>
               </div>
            </div>
          </div>

          {/* Bloom's Taxonomy Level */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
               <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold italic">i</div>
               <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Bloom's Taxonomy Level (AI Learning Objectives)</label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: 'Remember', desc: 'Recall facts' },
                { name: 'Understand', desc: 'Explain concepts' },
                { name: 'Apply', desc: 'Use knowledge' },
                { name: 'Analyze', desc: 'Break down info' },
                { name: 'Evaluate', desc: 'Justify a stand' },
                { name: 'Create', desc: 'Produce new work' },
              ].map(level => (
                <button 
                  key={level.name}
                  onClick={() => setSelectedBloom(prev => prev.includes(level.name) ? prev.filter(x => x !== level.name) : [...prev, level.name])}
                  className={cn(
                    "p-4 rounded-xl border text-left transition-all group",
                    selectedBloom.includes(level.name) ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"
                  )}
                >
                  <p className={cn("text-sm font-black", selectedBloom.includes(level.name) ? "text-primary" : "text-white group-hover:text-primary")}>{level.name}</p>
                  <p className="text-[10px] text-muted-foreground">{level.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 5. GENERATE BUTTON */}
      <div className="flex flex-col items-center gap-4 pt-10">
         <button onClick={()=> onFinish({})} className="px-12 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-lg shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
            <Sparkles size={24} /> GENERATE AI QUIZ
         </button>
         <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Estimated time: 15-30 seconds</p>
      </div>
    </div>
  );
}