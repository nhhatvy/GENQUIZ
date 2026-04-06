"use client";

import { Plus, Bell, ChevronDown } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { UserRole } from "@/app/constants/sidebar-routes"; // Import type của bạn

interface HeaderProps {
  role: UserRole;
}

export default function Header({ role }: HeaderProps) {
 

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-background border-b border-border transition-colors duration-300 sticky top-0 z-50">
      

      <div className="flex items-center gap-4">
        <Logo />
      </div>

      {/* Bên phải: Actions + Notifications + Profile */}
      <div className="flex items-center gap-3 md:gap-5">
        
  

        {/* Nút Thông báo */}
        <button className="relative p-2.5 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-xl transition-all group cursor-pointer">
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background animate-pulse" />
        </button>

        {/* Đường kẻ ngăn cách dọc */}
        <div className="h-8 w-[1px] bg-border mx-1 hidden sm:block" />

        {/* Cụm Profile Action */}
        <Link 
          href="/settings/profile"
          className="flex items-center gap-3 p-1 pr-2 rounded-xl hover:bg-secondary transition-all group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs border border-primary/10 group-hover:scale-105 transition-transform shrink-0">
            {role.charAt(0)}
          </div>
          
          <div className="hidden md:flex flex-col items-start leading-tight">
            <span className="text-sm font-bold text-foreground">Sarah Jenkins</span>
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
              {role.toLowerCase()}
            </span>
          </div>
          <ChevronDown size={14} className="text-muted-foreground hidden md:block group-hover:translate-y-0.5 transition-transform" />
        </Link>

      </div>

    </header>
  );
}