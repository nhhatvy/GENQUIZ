'use client';

import { 
  Users, 
  UserPlus, 
  BookOpen, 
  Search, 
  Plus, 
  ChevronRight, 
  Crown, 
  Lock,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudyGroupsPage() {
  const stats = [
    { label: "My Groups", value: "2", icon: Users, color: "text-white" },
    { label: "Total Members", value: "42", icon: UserPlus, color: "text-green-500" },
    { label: "Total Quizzes", value: "37", icon: BookOpen, color: "text-orange-500" },
  ];

  const groups = [
    {
      id: 1,
      name: "Biology Masters",
      description: "Advanced biology study group for competitive exams",
      members: 24,
      quizzes: 15,
      image: "https://images.unsplash.com/photo-1532187863486-abf9d3445661?auto=format&fit=crop&q=80&w=500",
      badge: "Leader",
      badgeIcon: Crown,
      status: "2 new quizzes",
      statusColor: "text-purple-400"
    },
    {
      id: 2,
      name: "Math Wizards",
      description: "Solving complex mathematics problems together",
      members: 18,
      quizzes: 22,
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=500",
      badge: "Private",
      badgeIcon: Lock,
      status: "Active challenge",
      statusColor: "text-blue-400"
    },
    {
      id: 3,
      name: "History Buffs",
      description: "Exploring world history through interactive quizzes",
      members: 31,
      quizzes: 18,
      image: "https://images.unsplash.com/photo-1461360226052-6e3014741f1a?auto=format&fit=crop&q=80&w=500",
      badge: null,
      status: "12 active members",
      statusColor: "text-indigo-400"
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Study Groups</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Learn together with collaborative study groups
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition active:scale-95">
          <Plus size={18} />
          Create Group
        </button>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card border border-border p-6 rounded-xl shadow-sm">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
              {stat.label}
            </p>
            <p className={cn("text-4xl font-bold leading-none", stat.color)}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* 3. SEARCH BAR */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            placeholder="Search groups..."
            className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition"
          />
        </div>
        <select className="bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium outline-none cursor-pointer w-40">
          <option>All Groups</option>
          <option>Joined</option>
          <option>Popular</option>
        </select>
      </div>

      {/* 4. GROUPS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div key={group.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all shadow-lg flex flex-col cursor-pointer">
            
            {/* Banner Image Area */}
            <div className="h-32 relative overflow-hidden">
              <img 
                src={group.image} 
                alt={group.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              
              {/* Badge */}
              {group.badge && (
                <div className={cn(
                  "absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
                  group.badge === "Leader" ? "bg-primary text-primary-foreground" : "bg-black/60 text-white backdrop-blur-md border border-white/10"
                )}>
                  {group.badgeIcon && <group.badgeIcon size={12} />}
                  {group.badge}
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg leading-tight text-white group-hover:text-primary transition">
                    {group.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 italic">
                    {group.description}
                  </p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground/50 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Group Meta */}
              <div className="flex items-center gap-5 text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users size={14} />
                  {group.members} members
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={14} />
                  {group.quizzes} quizzes
                </div>
              </div>

              {/* Bottom Status */}
              <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                <span className={cn("text-[11px] font-bold uppercase tracking-wider", group.statusColor)}>
                  {group.status}
                </span>
                <TrendingUp size={14} className="text-green-500 opacity-60" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}