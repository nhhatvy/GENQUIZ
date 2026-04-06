'use client';
import { Check, Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const colors = [
  { id: 'purple', hex: '#7c3aed', name: 'Purple' },
  { id: 'blue', hex: '#3b82f6', name: 'Blue' },
  { id: 'green', hex: '#10b981', name: 'Green' },
  { id: 'red', hex: '#ef4444', name: 'Red' },
  { id: 'amber', hex: '#f59e0b', name: 'Amber' },
  { id: 'pink', hex: '#ec4899', name: 'Pink' },
];

export default function AppearancePage() {
  const { theme, setTheme } = useTheme();
  const [accent, setAccent] = useState('#7c3aed');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('genquiz-accent');
    if (saved) setAccent(saved);
  }, []);

  if (!mounted) return null;

  const updateColor = (hex: string) => {
    setAccent(hex);
    document.documentElement.style.setProperty('--primary', hex);
    document.documentElement.style.setProperty('--sidebar-primary', hex);
    localStorage.setItem('genquiz-accent', hex);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header - Kiểu chữ giống Events */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Appearance</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Customize how StuQuiz looks for you
        </p>
      </div>

      {/* Main Content Card - rounded-sm giống Event Library Card */}
      <div className="rounded-sm border border-border bg-card p-6 space-y-10 shadow-sm transition-colors">
        
        {/* 1. Theme Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Theme</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'dark', name: 'Dark', icon: <Moon size={18}/> },
              { id: 'light', name: 'Light', icon: <Sun size={18}/> },
            ].map((t) => (
              <button 
                key={t.id} 
                onClick={() => setTheme(t.id)} 
                className={cn(
                  "relative p-4 rounded-lg border transition-all text-left group cursor-pointer",
                  theme === t.id 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50 hover:bg-secondary/50"
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={theme === t.id ? "text-primary" : "text-muted-foreground"}>{t.icon}</span>
                    <span className="text-sm font-semibold text-foreground">{t.name}</span>
                  </div>
                  {theme === t.id && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                       <Check size={12} className="text-primary-foreground font-bold" />
                    </div>
                  )}
                </div>
                
                {/* Theme Preview Card thu nhỏ */}
                <div className={cn(
                  "h-16 w-full rounded-md border border-border/50 overflow-hidden p-2 space-y-2",
                  t.id === 'light' ? "bg-white" : t.id === 'dark' ? "bg-[#0B0B0F]" : "bg-gradient-to-r from-[#0B0B0F] to-white"
                )}>
                  <div className="h-1.5 w-8 rounded-full bg-primary/40" />
                  <div className="h-1.5 w-12 rounded-full bg-muted-foreground/20" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Accent Color Section */}
        <div className="space-y-4 border-t border-border pt-8">
          <h2 className="text-xl font-semibold text-foreground">Accent Color</h2>
          <div className="flex flex-wrap gap-8 py-2">
            {colors.map((c) => (
              <button 
                key={c.id} 
                onClick={() => updateColor(c.hex)} 
                className="flex flex-col items-center gap-3 group cursor-pointer"
              >
                <div 
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative",
                    accent === c.hex 
                      ? "ring-2 ring-primary ring-offset-4 ring-offset-card scale-110 shadow-lg shadow-primary/25" 
                      : "hover:scale-110 opacity-70 hover:opacity-100"
                  )}
                  style={{ backgroundColor: c.hex }}
                >
                  {accent === c.hex && <Check size={20} className="text-white drop-shadow-md" />}
                </div>
                <span className={cn(
                  "text-[10px] font-bold transition-colors uppercase tracking-widest",
                  accent === c.hex ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}>
                  {c.name}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Footer support link tương tự Events/Notifications */}
      <p className="text-center text-xs text-muted-foreground font-medium">
        Need help with your appearance settings? <span className="text-primary hover:underline cursor-pointer font-bold">Contact Support</span>
      </p>
    </div>
  );
}